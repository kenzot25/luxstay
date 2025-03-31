import { User as FirebaseUser } from "firebase/auth";
import { ImageSourcePropType } from "react-native";

export interface AppUser extends Omit<FirebaseUser, "providerData"> {
  displayName: string | null;
  email: string | null;
  uid: string;
  wishlist: string[];
  providerData: any[];
}

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  amenities: string[];
  rating: number;
  type: "single" | "double" | "suite" | "presidential";
  isAvailable?: boolean;
  maxGuests: number;
}

export type PaymentOption = "10%" | "20%" | "50%" | "100%";

export interface CartItem {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  price?: number;
  paymentOption: PaymentOption;
  depositAmount: number;
  totalPrice: number;
  room?: Room;
}

export interface CartItemInput {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  paymentOption: PaymentOption;
  totalPrice: number;
  depositAmount: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  photoURL?: string;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
}

export interface BookingDetails {
  id: string;
  userId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  paymentStatus: "pending" | "completed" | "failed";
  bookingStatus: "confirmed" | "cancelled" | "pending";
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentDetails {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  method: string;
  transactionId?: string;
  createdAt: Date;
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  location?: string;
  dates?: [Date, Date];
  guests?: number;
}

export interface RoomFilters extends SearchFilters {
  priceRange?: [number, number];
  type?: Room["type"];
  amenities?: string[];
  rating?: number;
  location_contains?: string;
  price_gte?: number;
  price_lte?: number;
  rating_gte?: number;
  guests_gte?: number;
  amenities_contains?: string[];
}

export type RoomSearchResults = {
  items: Room[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};
