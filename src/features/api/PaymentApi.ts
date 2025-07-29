import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";
import { apiDomain } from "../../BackendUrl";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
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

    // ✅ Update payment status by paymentId
    updatePaymentStatus: builder.mutation({
      query: ({ paymentId, status }: { paymentId: number; status: "Pending" | "Completed" | "Failed" }) => ({
        url: "payments/status",
        method: "PATCH",
        body: { paymentId, status },
      }),
      invalidatesTags: ["Payments"],
    }),

    // ✅ Delete payment by ID
    deletePayment: builder.mutation({
      query: (paymentId: number) => ({
        url: `payments/${paymentId}`,
        method: "DELETE",
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
  useDeletePaymentMutation,
} = paymentApi;
