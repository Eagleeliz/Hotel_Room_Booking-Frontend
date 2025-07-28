
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../BackendUrl';

export interface Room {
  roomId: number;
  hotelId: number;
  roomType: string;
  pricePerNight: number;
  capacity: number;
  amenities: string;
  isAvailable: boolean;
  roomImg: string;
}

export interface RoomResponse {
  message?: string;
  rooms: Room[];
}

export const RoomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ['rooms', 'room'],
  endpoints: (builder) => ({
    // ✅ Get all rooms
    getRooms: builder.query<Room[], void>({
      query: () => 'rooms',
      providesTags: ['rooms'],
    }),

    // ✅ Get room by ID
    getRoomById: builder.query<Room, number>({
      query: (id) => `rooms/${id}`,
      providesTags: ['room'],
    }),

    // ✅ Get rooms by hotel ID
    getRoomsByHotelId: builder.query<Room[], number>({
      query: (hotelId) => `hotels/${hotelId}/rooms`,
      providesTags: ['rooms'],
    }),

    // ✅ Get available rooms
    getAvailableRooms: builder.query<Room[], void>({
      query: () => 'rooms/available',
      providesTags: ['rooms'],
    }),

    // ✅ Create a room
    createRoom: builder.mutation<{ message: string }, Partial<Room>>({
      query: (newRoom) => ({
        url: 'rooms',
        method: 'POST',
        body: newRoom,
      }),
      invalidatesTags: ['rooms'],
    }),

    // ✅ Update room
    updateRoom: builder.mutation<{ message: string }, { id: number } & Partial<Room>>({
      query: ({ id, ...patch }) => ({
        url: `rooms/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['room', 'rooms'],
    }),

    // ✅ Delete room
    deleteRoom: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `rooms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['rooms'],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useGetRoomsByHotelIdQuery,
  useGetAvailableRoomsQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = RoomApi;
