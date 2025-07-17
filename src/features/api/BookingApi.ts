// src/features/api/bookingApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Booking } from '../../types/Types';

// Define UserWithBookings interface to match your API response shape
interface UserWithBookings {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  contactPhone?: string | null;
  address?: string | null;
  role?: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
  bookings: Booking[];
}

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    // credentials: 'include', // uncomment if using cookies/sessions
  }),
  tagTypes: ['Booking', 'Bookings'],
  endpoints: (builder) => ({
    // ✅ GET: All bookings
    getAllBookings: builder.query<Booking[], void>({
      query: () => `booking`,
      providesTags: ['Bookings'],
    }),

    // ✅ GET: Bookings by user (returns full user object with bookings)
getBookingsByUserId: builder.query<Booking[], number>({
  query: (userId) => `booking/user/${userId}`,
  providesTags: ['Bookings'],
}),

    // ✅ GET: Single booking
    getBookingById: builder.query<Booking, number>({
      query: (id) => `booking/${id}`,
      providesTags: ['Booking'],
    }),

    // ✅ GET: Room bookings
    getBookingsByRoomId: builder.query<Booking[], number>({
      query: (roomId) => `booking/room/${roomId}`,
    }),

    // ✅ GET: By status
    getBookingsByStatus: builder.query<Booking[], string>({
      query: (status) => `booking/status/${status}`,
    }),

    // ✅ GET: By date range
    getBookingsByDateRange: builder.query<Booking[], { startDate: string; endDate: string }>({
      query: ({ startDate, endDate }) =>
        `booking/search/date-range?startDate=${startDate}&endDate=${endDate}`,
    }),

    // ✅ GET: Room availability
    checkRoomAvailability: builder.query<any, { roomId: number; checkInDate: string; checkOutDate: string }>({
      query: ({ roomId, checkInDate, checkOutDate }) =>
        `booking/room/${roomId}/availability?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
    }),

    // ✅ POST: Create booking
    createBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (newBooking) => ({
        url: `booking`,
        method: 'POST',
        body: newBooking,
      }),
      invalidatesTags: ['Bookings'],
    }),

    // ✅ PUT: Update booking
    updateBooking: builder.mutation<Booking, { id: number; updates: Partial<Booking> }>({
      query: ({ id, updates }) => ({
        url: `booking/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Bookings', 'Booking'],
    }),

    // ✅ PATCH: Update status
    updateBookingStatus: builder.mutation<void, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `booking/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Booking'],
    }),

    // ✅ PATCH: Cancel booking
    cancelBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `booking/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Bookings'],
    }),

    // ✅ PATCH: Confirm booking
    confirmBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `booking/${id}/confirm`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Bookings'],
    }),

    // ✅ DELETE: Remove booking
    deleteBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `booking/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookings'],
    }),

    // ✅ GET: Booking with nested details
    getBookingWithDetails: builder.query<Booking, number>({
      query: (id) => `booking/${id}/details`,
    }),

    // ✅ GET: User booking history
    getUserBookingHistory: builder.query<Booking[], number>({
      query: (userId) => `booking/user/${userId}/history`,
    }),

    // ✅ GET: Hotel booking stats
    getHotelBookingsStats: builder.query<any, number>({
      query: (hotelId) => `booking/hotel/${hotelId}/stats`,
    }),

    // ✅ GET: Upcoming check-ins
    getUpcomingCheckIns: builder.query<Booking[], void>({
      query: () => `booking/reports/upcoming-checkins`,
    }),

    // ✅ GET: Upcoming check-outs
    getUpcomingCheckOuts: builder.query<Booking[], void>({
      query: () => `booking/reports/upcoming-checkouts`,
    }),
  }),
});

// Export RTK Query hooks
export const {
  useGetAllBookingsQuery,
  useGetBookingsByUserIdQuery,
  useGetBookingByIdQuery,
  useGetBookingsByRoomIdQuery,
  useGetBookingsByStatusQuery,
  useGetBookingsByDateRangeQuery,
  useCheckRoomAvailabilityQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
  useConfirmBookingMutation,
  useDeleteBookingMutation,
  useGetBookingWithDetailsQuery,
  useGetUserBookingHistoryQuery,
  useGetHotelBookingsStatsQuery,
  useGetUpcomingCheckInsQuery,
  useGetUpcomingCheckOutsQuery,
} = bookingApi;
