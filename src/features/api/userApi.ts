// src/features/api/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../../types/Types';
import { apiDomain } from '../../BackendUrl';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token.replace(/"/g, '')}`);
      }
      return headers;
    },
  }),
  tagTypes: ['users', 'user'],
  endpoints: (builder) => ({

     loginUser: builder.mutation({
  query: (userLoginCredentials) => ({
    url: 'auth/login',
    method: 'POST',
    body: userLoginCredentials,
  }),
  invalidatesTags: ['user'],
}),


    registerUser: builder.mutation({
      query: (userRegisterPayload) => ({
        url: 'auth/register',
        method: 'POST',
        body: userRegisterPayload,
      }),
    }),

    getMyProfile: builder.query<any,void>({
      query: () => `users/me`,
      providesTags: ['user'],
    }),

    updateMyProfile: builder.mutation({
      query: (payload) => ({
        url: 'users/me',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['user'],
    }),

getAllUsersProfiles: builder.query<User[], void>({
  query: () => 'users',
  providesTags: ['users'],
}),


    getUserById: builder.query({
      query: (user_id: number) => `users/${user_id}`,
      providesTags: ['user'],
    }),

    getUserProfile: builder.query({
      query: (userId: number) => `users/${userId}`,
      providesTags: ['user'],
    }),

    getUserByID: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ['users'],
    }),

    updateUserProfile: builder.mutation({
      query: ({ user_id, ...patch }) => ({
        url: `users/${user_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['user', 'users'],
    }),

    updateUserProfileImage: builder.mutation({
      query: ({ user_id, profile_picture }) => ({
        url: `users/${user_id}`,
        method: 'PUT',
        body: { profile_picture },
      }),
      invalidatesTags: ['user', 'users'],
    }),

    deleteUserProfile: builder.mutation({
      query: (user_id) => ({
        url: `users/${user_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user', 'users'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetAllUsersProfilesQuery,
  useGetUserByIdQuery,
  useGetUserProfileQuery,
  useGetUserByIDQuery,
  useUpdateUserProfileMutation,
  useUpdateUserProfileImageMutation,
  useDeleteUserProfileMutation,
} = userApi;
