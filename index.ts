export type FuelType =
  | "Petrol"
  | "Diesel"
  | "Electric"
  | "Hybrid"
  | "CNG"
  | "LPG";
export type TransmissionType =
  | "Manual"
  | "Automatic"
  | "AMT"
  | "CVT"
  | "DCT";
export type BodyType =
  | "Sedan"
  | "SUV"
  | "Hatchback"
  | "MUV"
  | "Coupe"
  | "Convertible"
  | "Pickup"
  | "Van";

export interface Dealer {
  id: string;
  name: string;
  business_name: string;
  phone: string;
  whatsapp: string;
  location: string;
  city: string;
  email: string;
  logo_url?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface CarListing {
  id: string;
  dealer_id: string;
  title: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  fuel_type: FuelType;
  transmission: TransmissionType;
  body_type?: BodyType;
  color?: string;
  km_driven: number;
  ownership: number;
  city: string;
  location: string;
  price: number;
  is_negotiable: boolean;
  description?: string;
  images: string[];
  is_active: boolean;
  is_sold: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  dealers?: Dealer;
}

export interface CarListingWithDealer extends CarListing {
  dealers: Dealer;
}

export interface SearchFilters {
  brand?: string;
  fuel_type?: FuelType | "";
  city?: string;
  min_price?: number;
  max_price?: number;
  year_min?: number;
  year_max?: number;
  transmission?: TransmissionType | "";
  body_type?: BodyType | "";
  sort_by?: "price_asc" | "price_desc" | "newest" | "oldest" | "km_asc";
}

export interface DealerRegistrationData {
  name: string;
  business_name: string;
  phone: string;
  whatsapp: string;
  location: string;
  city: string;
  email: string;
  password: string;
}

export interface CarListingFormData {
  title: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  fuel_type: FuelType;
  transmission: TransmissionType;
  body_type: BodyType | "";
  color: string;
  km_driven: number;
  ownership: number;
  city: string;
  location: string;
  price: number;
  is_negotiable: boolean;
  description: string;
}

export const CAR_BRANDS = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Mahindra",
  "Honda",
  "Toyota",
  "Kia",
  "MG",
  "Volkswagen",
  "Skoda",
  "Ford",
  "Renault",
  "Nissan",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Jeep",
  "Volvo",
  "Land Rover",
  "Porsche",
  "Other",
] as const;

export const INDIAN_CITIES = [
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
  "Coorg",
  "Mysore",
  "Mangalore",
  "Hubli",
  "Belgaum",
] as const;

export const FUEL_TYPES: FuelType[] = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
  "CNG",
  "LPG",
];
export const TRANSMISSION_TYPES: TransmissionType[] = [
  "Manual",
  "Automatic",
  "AMT",
  "CVT",
  "DCT",
];
export const BODY_TYPES: BodyType[] = [
  "Sedan",
  "SUV",
  "Hatchback",
  "MUV",
  "Coupe",
  "Convertible",
  "Pickup",
  "Van",
];
