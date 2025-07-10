// features/api/hotelApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Hotel {
  hotelId: number; // 🛠️ Renamed from 'id'
  hotelImg: string;
  name: string;
  location: string;
  address: string;
  contactPhone: string;
  category: string;
  rating: number;
  // imageUrl later
}

export interface HotelResponse {
  message: string;
  hotels: Hotel[];
}

export const HotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['hotels', 'hotel'],
  endpoints: (builder) => ({
    // ✅ GET all hotels
    getHotels: builder.query<HotelResponse, void>({
      query: () => 'hotels',
      providesTags: ['hotels'],
    }),

    // ✅ GET single hotel by hotelId
    getHotelById: builder.query<{ message: string; hotel: Hotel }, number>({
      query: (hotelId) => `hotels/${hotelId}`,
      providesTags: ['hotel'],
    }),

    // ✅ Create a hotel
    createHotel: builder.mutation<Hotel, Partial<Hotel>>({
      query: (newHotel) => ({
        url: 'hotels',
        method: 'POST',
        body: newHotel,
      }),
      invalidatesTags: ['hotels'],
    }),

    // ✅ Update a hotel
    updateHotel: builder.mutation<Hotel, { hotelId: number } & Partial<Hotel>>({
      query: ({ hotelId, ...patch }) => ({
        url: `hotels/${hotelId}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['hotels', 'hotel'],
    }),

    // ✅ Delete a hotel
    deleteHotel: builder.mutation<{ message: string }, number>({
      query: (hotelId) => ({
        url: `hotels/${hotelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['hotels'],
    }),
  }),
});

// 🧪 Auto-generated hooks
export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = HotelApi;
