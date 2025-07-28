import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useGetPaymentsByUserIdQuery } from "../features/api/PaymentApi";
import type { PaymentWithBooking } from "../types/Types";

const MyPayments: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.userId;

  const {
    data: payments,
    isLoading,
    isError,
    error,
  } = useGetPaymentsByUserIdQuery(userId?.toString() ?? "", {
    skip: !userId,
  });

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
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-rose-600 mb-6">My Payments</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
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
                  <td className="px-4 py-2 border">{room?.roomType ?? "N/A"}</td>
                  <td className="px-4 py-2 border">{room?.hotel?.name ?? "N/A"}</td>
                  <td className="px-4 py-2 border">{payment?.transactionId ?? "N/A"}</td>
                  <td className="px-4 py-2 border">{payment?.paymentMethod}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {payments.map((item: PaymentWithBooking) => {
          const { payment, checkInDate, checkOutDate, room } = item;
          const amount = Number(payment?.amount).toLocaleString("en-KE", {
            style: "currency",
            currency: "KES",
          });
          const paymentDate = new Date(payment?.paymentDate).toLocaleDateString("en-KE");
          const statusColor =
            payment?.paymentStatus === "Completed"
              ? "text-green-500"
              : payment?.paymentStatus === "Failed"
              ? "text-red-500"
              : "text-yellow-500";

          return (
            <div
              key={payment?.paymentId}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
            >
              <p><span className="font-semibold">Amount:</span> {amount}</p>
              <p className="font-semibold">
                <span>Status:</span>{" "}
                <span className={statusColor}>{payment?.paymentStatus}</span>
              </p>
              <p><span className="font-semibold">Payment Date:</span> {paymentDate}</p>
              <p><span className="font-semibold">Check-in:</span> {checkInDate}</p>
              <p><span className="font-semibold">Check-out:</span> {checkOutDate}</p>
              <p><span className="font-semibold">Room Type:</span> {room?.roomType ?? "N/A"}</p>
              <p><span className="font-semibold">Hotel:</span> {room?.hotel?.name ?? "N/A"}</p>
              <p><span className="font-semibold">Transaction ID:</span> {payment?.transactionId ?? "N/A"}</p>
              <p><span className="font-semibold">Method:</span> {payment?.paymentMethod}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPayments;
