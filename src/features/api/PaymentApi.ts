// src/features/api/paymentApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";
import { apiDomain } from "../../BackendUrl";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl:apiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    // ✅ Get all payments (optional, admin use)
    getAllPayments: builder.query({
      query: () => "payments",
      providesTags: ["Payments"],
    }),

    // ✅ Get payments by userId
    getPaymentsByUserId: builder.query({
      query: (userId: string) => `payments/user/${userId}`,
      providesTags: ["Payments"],
    }),

    // ✅ Create Stripe PaymentIntent (session)
    createPaymentIntent: builder.mutation({
      query: ({ amount, bookingId }: { amount: number; bookingId: string }) => ({
        url: "create-payment-intent",
        method: "POST",
        body: { amount, bookingId },
      }),
      invalidatesTags: ["Payments"],
    }),

    // ✅ Optional: update payment status manually
    updatePaymentStatus: builder.mutation({
      query: ({ bookingId, status }: { bookingId: string; status: "Pending" | "Completed" }) => ({
        url: "payments/status",
        method: "PATCH",
        body: { bookingId, status },
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentsByUserIdQuery,
  useCreatePaymentIntentMutation,
  useUpdatePaymentStatusMutation,
} = paymentApi;
