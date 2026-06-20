export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  } else if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1)}K`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatKm(km: number): string {
  if (km >= 100000) {
    return `${(km / 100000).toFixed(1)}L km`;
  }
  return `${km.toLocaleString("en-IN")} km`;
}

export function getOwnershipLabel(ownership: number): string {
  const labels: Record<number, string> = {
    1: "1st Owner",
    2: "2nd Owner",
    3: "3rd Owner",
    4: "4th Owner",
    5: "5th+ Owner",
  };
  return labels[ownership] || `${ownership}th Owner`;
}

export function getWhatsAppUrl(phone: string, carTitle: string, carId: string): string {
  const message = encodeURIComponent(
    `Hi! I'm interested in the ${carTitle} listed on CoorgCars. Listing ID: ${carId}`
  );
  const cleanPhone = phone.replace(/\D/g, "");
  const phoneWithCode = cleanPhone.startsWith("91")
    ? cleanPhone
    : `91${cleanPhone}`;
  return `https://wa.me/${phoneWithCode}?text=${message}`;
}

export function getYearsSince(year: number): string {
  const currentYear = new Date().getFullYear();
  const diff = currentYear - year;
  if (diff === 0) return "Brand New";
  if (diff === 1) return "1 year old";
  return `${diff} years old`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const PRICE_RANGES = [
  { label: "Under ₹2 Lakh", min: 0, max: 200000 },
  { label: "₹2L – ₹5L", min: 200000, max: 500000 },
  { label: "₹5L – ₹10L", min: 500000, max: 1000000 },
  { label: "₹10L – ₹20L", min: 1000000, max: 2000000 },
  { label: "₹20L – ₹50L", min: 2000000, max: 5000000 },
  { label: "Above ₹50L", min: 5000000, max: 999999999 },
];
