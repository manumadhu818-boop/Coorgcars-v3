"use server";

import { createClient } from "@/lib/supabase/server";
import { CarListingFormData, SearchFilters } from "@/types";
import { revalidatePath } from "next/cache";

export async function createCarListing(
  data: CarListingFormData,
  images: string[]
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: listing, error } = await supabase
    .from("car_listings")
    .insert({
      ...data,
      dealer_id: user.id,
      images,
      body_type: data.body_type || null,
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/browse");
  revalidatePath("/dashboard");

  return { success: true, listing };
}

export async function updateCarListing(
  id: string,
  data: Partial<CarListingFormData>,
  images?: string[]
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const updateData: Record<string, unknown> = { ...data };
  if (images) updateData.images = images;

  const { error } = await supabase
    .from("car_listings")
    .update(updateData)
    .eq("id", id)
    .eq("dealer_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/browse");
  revalidatePath(`/cars/${id}`);
  revalidatePath("/dashboard");

  return { success: true };
}

export async function deleteCarListing(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("car_listings")
    .delete()
    .eq("id", id)
    .eq("dealer_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/browse");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function toggleListingStatus(id: string, is_active: boolean) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("car_listings")
    .update({ is_active })
    .eq("id", id)
    .eq("dealer_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function getCarListings(filters?: SearchFilters) {
  const supabase = await createClient();

  let query = supabase
    .from("car_listings")
    .select("*, dealers(*)")
    .eq("is_active", true)
    .eq("is_sold", false);

  if (filters?.brand) {
    query = query.ilike("brand", `%${filters.brand}%`);
  }
  if (filters?.fuel_type) {
    query = query.eq("fuel_type", filters.fuel_type);
  }
  if (filters?.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }
  if (filters?.min_price) {
    query = query.gte("price", filters.min_price);
  }
  if (filters?.max_price) {
    query = query.lte("price", filters.max_price);
  }
  if (filters?.year_min) {
    query = query.gte("year", filters.year_min);
  }
  if (filters?.year_max) {
    query = query.lte("year", filters.year_max);
  }
  if (filters?.transmission) {
    query = query.eq("transmission", filters.transmission);
  }
  if (filters?.body_type) {
    query = query.eq("body_type", filters.body_type);
  }

  // Sorting
  switch (filters?.sort_by) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "km_asc":
      query = query.order("km_driven", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query.limit(50);

  if (error) return { error: error.message, data: [] };
  return { data: data || [], error: null };
}

export async function getCarById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("car_listings")
    .select("*, dealers(*)")
    .eq("id", id)
    .single();

  if (error) return null;

  // Increment views
  await supabase.rpc("increment_car_views", { listing_id: id });

  return data;
}

export async function getDealerListings(dealerId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("car_listings")
    .select("*")
    .eq("dealer_id", dealerId)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data || [];
}

export async function uploadCarImage(
  file: File,
  dealerId: string
): Promise<string | null> {
  const supabase = await createClient();

  const ext = file.name.split(".").pop();
  const fileName = `${dealerId}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("car-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return null;

  const {
    data: { publicUrl },
  } = supabase.storage.from("car-images").getPublicUrl(fileName);

  return publicUrl;
}
