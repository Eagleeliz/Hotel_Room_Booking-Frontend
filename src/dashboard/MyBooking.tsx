import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useGetBookingsByUserIdQuery } from "../features/api/BookingApi";
import { Link } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import type { Booking } from "../types/Types";

const MyBooking: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("Logged-in user:", user); // Debug: check user shape

  const userId = user?.userId;

  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetBookingsByUserIdQuery(userId!, {
    skip: !userId,
  });
  console.log("userbookings",userData)

    const bookings: Booking[] = Array.isArray(userData)
    ? userData // fallback
    : (userData as any)?.bookings ?? [];


  if (!userId) {
    return <p className="p-4 text-red-500">Please log in to view your bookings.</p>;
  }

  if (isLoading) return <p className="p-4 text-gray-600">Loading your bookings...</p>;

  if (isError) {
    console.error("Booking fetch error:", error);
    return <p className="p-4 text-red-500">Failed to load bookings.</p>;
  }

  if (!bookings || bookings.length === 0) {
    return <p className="p-4 text-gray-500">You have no bookings yet.</p>;
  }

  // Filter logic
  const now = new Date();
  const filteredBookings = bookings.filter((booking) => {
    const checkIn = new Date(booking.checkInDate);
    if (filter === "upcoming") return checkIn > now;
    if (filter === "past") return checkIn < now;
    return true;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-rose-600 mb-6">My Bookings</h2>

      {/* Filter Bar */}
      <div className="bg-white border border-gray-300 rounded-xl p-5 shadow w-full max-w-5xl mb-8">
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center text-lg font-semibold text-gray-700 whitespace-nowrap">
            Booking Category <FiFilter className="ml-2 text-rose-500 text-xl" />
          </label>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "upcoming" | "past")}
            className="w-[200px] border border-gray-300 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <option value="all">All Bookings</option>
            <option value="upcoming">Upcoming Bookings</option>
            <option value="past">Past Bookings</option>
          </select>
        </div>
      </div>

      {/* No bookings message */}
      {filter !== "all" && filteredBookings.length === 0 ? (
        <div className="text-center text-gray-500 font-medium text-lg mt-10">
          {filter === "upcoming"
            ? "You have no upcoming bookings."
            : "You have no past bookings."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-white rounded-xl shadow-lg overflow-hidden text-gray-800 w-full max-w-[700px] min-h-[500px] mx-auto"
            >
              {booking.room?.roomImg ? (
                <img
                  src={booking.room.roomImg}
                  alt="Room"
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}

              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-rose-600">
                    {booking.room?.roomType ?? "Room Type"}
                  </h3>
                  <span
                    className={`px-3 py-3 rounded-full text-sm font-semibold ${
                      booking.bookingStatus === "Confirmed"
                        ? "bg-gray-400 text-white"
                        : booking.bookingStatus === "Pending"
                        ? "bg-gray-400 text-white"
                        : "bg-gray-200 text-white"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>

                <p>
                  <span className="font-medium">Hotel:</span>{" "}
                  {booking.room?.hotel?.name ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Check-In:</span>{" "}
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Check-Out:</span>{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> KES{" "}
                  {parseFloat(booking.totalAmount).toLocaleString()}
                </p>

                <div className="flex gap-4 pt-4">
                  <Link
                    to={`/hotels/${booking.room?.hotelId}/rooms`}
                    className="flex-1 text-center px-4 py-2 rounded-md bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white hover:from-rose-600 hover:to-pink-600 text-sm font-medium shadow-md transition"
                  >
                    Rebook
                  </Link>

                  {booking.bookingStatus === "Pending" && (
                    <button
                      onClick={() => console.log("Cancel booking:", booking.bookingId)}
                      className="flex-1 text-center px-4 py-2 rounded-md bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 text-white hover:from-red-600 hover:to-rose-600 text-sm font-medium shadow-md transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
