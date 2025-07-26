// ✅ User interface to match backend payloads and support role-based access
export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  address?: string | null;
  contactPhone?: string | null;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
  bookingCount?: number;
}

// ✅ AuthState used in authSlice (no separate userType — it's part of user.role)
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
export interface Ticket {
  ticketId: number;
  subject: string;
  description: string;
  status: 'Open' | 'Pending' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  userId: number;
  user?: User; // optional in case some tickets only return userId
}

// ✅ Hotel structure (used across app and API)
export interface Hotel {
  hotelId?: number; // optional for new hotel creation
  name: string;
  location: string;
  address?: string | null;
  contactPhone?: string | null;
  category?: string | null;
  rating?: number | null;
  createdAt?: string;
  updatedAt?: string;
  hotelImg?: string | null;
}

// ✅ Hotel API response wrapper (for useGetHotelsQuery)
export interface HotelResponse {
  message: string;
  hotels: Hotel[];
}

// ✅ Room data structure
export interface Room {
  roomId: number;
  hotelId: number;
  roomType: string;
  pricePerNight: string;
  capacity: number;
  amenities: string;
  isAvailable: boolean;
  createdAt: string;
  roomImg?: string | null;
  hotel?: Hotel;
}

// ✅ Booking interface for displaying bookings
export interface Booking {
  bookingStatus: 'Pending' | 'Confirmed' | 'Cancelled';
  bookingId: number;
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
  user: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    contactPhone: string;
  };
  room: {
    roomId: number;
    hotelId: number;
    roomType: string;
    pricePerNight: string;
    capacity: number;
    amenities: string;
    isAvailable: boolean;
    createdAt: string;
    roomImg: string | null;
    hotel: {
      name: string;
      location: string;
      address: string;
    };
  };
  payment: any | null;
}

// ✅ Payment details
export type Payment = {
  paymentId?: string;
  bookingId: string;
  amount: number;
  paymentStatus: "Pending" | "Completed" | "Failed";
  paymentDate?: string;
  createdAt?: string;
  transactionId?: string;
  booking?: {
    checkInDate: string;
    checkOutDate: string;
    room?: {
      roomType: string;
      pricePerNight: string;
      hotel?: {
        hotelName: string;
      };
    };
  };
};

export type PaymentWithBooking = {
  bookingId: number;
  checkInDate: string;
  checkOutDate: string;
  bookingStatus: string;
  totalAmount: string;
  room: {
    roomType: string;
    hotelId: number;
    pricePerNight: string;
    hotel?: {
      name: string;
    };
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  payment: {
    paymentId: number;
    amount: string;
    paymentStatus: "Pending" | "Completed" | "Failed";
    paymentDate: string;
    transactionId: string | null;
    createdAt: string;
    paymentMethod: string;
  };
};



