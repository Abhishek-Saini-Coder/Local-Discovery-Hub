export enum UserRole {
  BUSINESS_OWNER = "Business Owner",
  GENERAL_USER = "General User",
  ADMIN = "Administrator", // Future use
}

export interface User {
  id: string;
  email: string; 
  name: string; // Display name
  role: UserRole;
  // Mock password for local simulation
  password?: string; 
}

export enum BusinessCategory {
  FOOD_AND_DINING = "Food & Dining", // Restaurants, Cafes, Food Trucks
  ACCOMMODATION = "Accommodation", // Hotels, Guesthouses, Student Housing, Rentals
  SHOPPING_AND_RETAIL = "Shopping & Retail", // Retail Shops, Boutiques, Discount Stores
  PROFESSIONAL_SERVICES = "Professional Services", // Laundry, Repair, Salons, Legal, Accounting
  HEALTH_AND_WELLNESS = "Health & Wellness", // Gyms, Clinics, Pharmacies, Spas
  REAL_ESTATE = "Real Estate", // Agencies, Property Listings
  ARTS_AND_ENTERTAINMENT = "Arts & Entertainment", // Cinemas, Galleries, Venues, Events
  EDUCATION_AND_TUTORING = "Education & Tutoring", // Schools, Tutors
  COMMUNITY_AND_LOCAL_GROUPS = "Community & Local Groups", // Clubs, Non-profits
  OTHER = "Other",
}

export interface CatalogueItem {
  id: string;
  name: string;
  description: string;
  price: string; // e.g., "$10" or "Varies"
  imageUrl?: string;
}

export interface Review {
  id: string;
  businessId: string; 
  userId: string; 
  userName: string;
  userRole: UserRole;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string
}

export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  contactEmail?: string;
  contactPhone?: string;
  location: string;
  imageUrl?: string;
  ownerId?: string; // Link to User.id if they are a business owner
  catalogueItems: CatalogueItem[];
  reviews: Review[];
  averageRating?: number; // Calculated or stored
}

export interface BusinessFormData {
  name: string;
  category: BusinessCategory;
  description: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  imageUrl: string;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}

export interface CommunityPost {
  id: string;
  userId: string; 
  userName: string; 
  userRole: UserRole;
  content: string;
  timestamp: string; // ISO date string
  // replies?: CommunityPostReply[]; // Future enhancement
}

export interface PostFormData {
    content: string;
}

// Retain original FormData for BusinessForm, renamed to BusinessFormData
export type { BusinessFormData as FormData };