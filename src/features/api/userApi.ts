import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['users', 'user'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userLoginCredentials ) => ({
        url: 'auth/login',
        method: 'POST',
        body: userLoginCredentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (userRegisterPayload)=> ({
        url: 'auth/register',
        method: 'POST',
        body: userRegisterPayload,
      }),
    }),
    getUserById: builder.query({
      query: (user_id: number) => `users/${user_id}`,
      providesTags: ["user",]
    }),
    getAllUsersProfiles: builder.query({
      query: () => 'users',
      providesTags: ["users"]
    }),
    getUserProfile: builder.query({
      query: (userId: number) => `users/${userId}`,  
      providesTags: ["user"]    
    }),
    getUserByID:builder.query({
      query:(userId)=>`users/${userId}`,
      providesTags:['users']
    }),
    updateUserProfile: builder.mutation({
      query: ({ user_id, ...patch }) => ({
        url: `users/${user_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ["user", "users"]
    }),
  updateUserProfileImage: builder.mutation({
    query: ({ user_id, profile_picture }) => ({
      url: `users/${user_id}`,
      method: 'PUT',
      body: { profile_picture },
    }),
    invalidatesTags: ["user", "users"]
  }),
    deleteUserProfile: builder.mutation({
      query: (user_id) => ({
        url: `users/${user_id}`,
        method: 'DELETE',
      }),
  }),
}),
});



// Export the auto-generated hooks for each endpoint
// export default userApi;