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

    // ✅ Login
    loginUser: builder.mutation({
      query: (userLoginCredentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: userLoginCredentials,
      }),
      invalidatesTags: ['user'],
    }),

    // ✅ Register
    registerUser: builder.mutation({
      query: (userRegisterPayload) => ({
        url: 'auth/register',
        method: 'POST',
        body: userRegisterPayload,
      }),
    }),

    // ✅ Get logged-in user profile
    getMyProfile: builder.query<any, void>({
      query: () => 'users/me',
      providesTags: ['user'],
    }),

    // ✅ Update logged-in user profile
    updateMyProfile: builder.mutation({
      query: (payload) => ({
        url: 'users/me',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['user'],
    }),

    // ✅ Get all user profiles (admin)
    getAllUsersProfiles: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['users'],
    }),

    // ✅ Get user by ID (if needed)
    getUserById: builder.query({
      query: (user_id: number) => `users/${user_id}`,
      providesTags: ['user'],
    }),

    // ✅ Update any user's profile (admin)
    updateUserProfile: builder.mutation({
      query: ({ user_id, ...patch }) => ({
        url: `users/${user_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['user', 'users'],
    }),

    // ✅ Update profile image
    updateUserProfileImage: builder.mutation({
      query: ({ user_id, profile_picture }) => ({
        url: `users/${user_id}`,
        method: 'PUT',
        body: { profile_picture },
      }),
      invalidatesTags: ['user', 'users'],
    }),

    // ✅ Delete user profile
    deleteUserProfile: builder.mutation({
      query: (user_id) => ({
        url: `users/${user_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user', 'users'],
    }),

    // ✅ Corrected: Update user role via PATCH /users/role
    updateUserRole: builder.mutation<void, { userId: number; role: 'admin' | 'user' }>({
      query: ({ userId, role }) => ({
        url: 'users/role',
        method: 'PATCH',
        body: { userId, role },
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
  useUpdateUserProfileMutation,
  useUpdateUserProfileImageMutation,
  useDeleteUserProfileMutation,
  useUpdateUserRoleMutation,
} = userApi;
