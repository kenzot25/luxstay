// Room types
export interface Room {
  id?: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  amenities: string[];
  rating: number;
  type: "single" | "double" | "suite" | "presidential";
  createdAt: string;
  updatedAt: string;
}

// Booking types
export interface Booking {
  id?: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  paymentStatus: "pending" | "completed" | "failed";
  bookingStatus: "confirmed" | "cancelled" | "pending";
  paymentMethod: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

// User Profile types
export interface UserProfile {
  id?: string;
  userId: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Wishlist types
export interface WishlistItem {
  id?: string;
  userId: string;
  roomId: string;
  createdAt: string;
  updatedAt: string;
}

// Request types
export interface CreateBookingRequest {
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  paymentMethod: string;
  specialRequests?: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
  preferences?: {
    notifications?: boolean;
    newsletter?: boolean;
    language?: string;
  };
}

export interface RoomFilters {
  price_lte?: number;
  price_gte?: number;
  location_contains?: string;
  type?: Room["type"];
  amenities_contains?: string[];
  rating_gte?: number;
  guests_gte?: number;
}
