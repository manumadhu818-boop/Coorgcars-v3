"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DealerRegistrationData } from "@/types";

export async function registerDealer(data: DealerRegistrationData) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Registration failed. Please try again." };
  }

  // Insert dealer profile
  const { error: dealerError } = await supabase.from("dealers").insert({
    id: authData.user.id,
    name: data.name,
    business_name: data.business_name,
    phone: data.phone,
    whatsapp: data.whatsapp,
    location: data.location,
    city: data.city,
    email: data.email,
  });

  if (dealerError) {
    return { error: dealerError.message };
  }

  return { success: true, user: authData.user };
}

export async function loginDealer(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function logoutDealer() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getCurrentDealer() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: dealer } = await supabase
    .from("dealers")
    .select("*")
    .eq("id", user.id)
    .single();

  return dealer;
}
