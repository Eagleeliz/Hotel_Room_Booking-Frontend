import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useGetPaymentsByUserIdQuery } from "../features/api/PaymentApi";
import type { Payment, PaymentWithBooking } from "../types/Types";

const MyPayments: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.userId;

  const {
    data: payments,
    isLoading,
    isError,
    error,
  } = useGetPaymentsByUserIdQuery(String(userId), {
    skip: !userId,
  });
  console.log(payments)

  if (!userId) return <p className="text-black">Please log in to view your payments.</p>;
  if (isLoading) return <p className="text-black">Loading payments...</p>;
  if (isError) {
    console.error("Payment fetch error:", error);
    return <p className="text-red-500">Failed to load payments.</p>;
  }

  if (!payments || payments.length === 0) {
    return <p className="text-black">You have no payment history yet.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-rose-500 mb-6">My Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-md">
         <thead className="bg-gray-50 text-left">
  <tr>
    <th className="px-4 py-3 border-b text-black font-medium">Amount (KES)</th>
    <th className="px-4 py-3 border-b text-black font-medium">Status</th>
    <th className="px-4 py-3 border-b text-black font-medium">Payment Date</th>
    <th className="px-4 py-3 border-b text-black font-medium">Check-in</th>
    <th className="px-4 py-3 border-b text-black font-medium">Check-out</th>
    <th className="px-4 py-3 border-b text-black font-medium">Room Type</th>
    <th className="px-4 py-3 border-b text-black font-medium">Hotel</th>
    <th className="px-4 py-3 border-b text-black font-medium">Transaction ID</th>
    <th className="px-4 py-3 border-b text-black font-medium">Payment Method</th>
  </tr>
</thead>

          <tbody>
  {payments.map((item: PaymentWithBooking) => {
  const { payment, checkInDate, checkOutDate, room } = item;

  const amount = Number(payment?.amount).toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
  });

  const paymentDate = new Date(payment?.paymentDate).toLocaleDateString("en-KE");
  const createdAt = new Date(payment?.createdAt).toLocaleDateString("en-KE");

  const statusColor =
    payment?.paymentStatus === "Completed"
      ? "text-green-500"
      : payment?.paymentStatus === "Failed"
      ? "text-red-500"
      : "text-yellow-500";

  return (
    <tr key={payment?.paymentId} className="border-t text-black">
      <td className="px-4 py-2 border">{amount}</td>
      <td className={`px-4 py-2 border font-semibold ${statusColor}`}>
        {payment?.paymentStatus}
      </td>
      <td className="px-4 py-2 border">{paymentDate}</td>
      <td className="px-4 py-2 border">{checkInDate}</td>
      <td className="px-4 py-2 border">{checkOutDate}</td>
      <td className="px-4 py-2 border">{room.roomType}</td>
      <td className="px-4 py-2 border">{room.hotel?.name}</td>
      <td className="px-4 py-2 border">{payment?.transactionId ?? "N/A"}</td>
      <td className="px-4 py-2 border">{payment?.paymentMethod}</td>
    </tr>
  );
})}

</tbody>

        </table>
      </div>
    </div>
  );
};

export default MyPayments;
