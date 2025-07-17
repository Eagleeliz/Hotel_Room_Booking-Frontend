// types/Types.ts

// ✅ User interface to match backend payloads and support role-based access
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactPhone?: string;
  address?: string;
  role: 'user' | 'admin'; // Required for all users
}

// ✅ AuthState used in authSlice (no separate userType — it's part of user.role)
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ✅ Booking interface for displaying bookings in dashboard or admin panel
export interface Booking {
  bookingId: number;
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: string;
  bookingStatus: "Pending" | "Confirmed" | "Cancelled";
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

// ✅ Hotel structure (embedded in Room)
export interface Hotel {
  name: string;
  location: string;
  address: string;
}

// ✅ Payment details (extend this if needed)
export interface Payment {
  paymentId: number;
  bookingId: number;
  amountPaid: string;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  createdAt: string;
}
