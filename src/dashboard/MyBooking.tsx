
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useGetBookingsByUserIdQuery } from "../features/api/BookingApi";
import { Link } from "react-router-dom";

const MyBooking: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useGetBookingsByUserIdQuery(user?.id!, {
    skip: !user?.id,
  });

  if (!user?.id) {
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-rose-600 mb-6">My Bookings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.bookingId}
            className="bg-white rounded-xl shadow-lg overflow-hidden text-gray-800 w-full max-w-[700px] min-h-[500px] mx-auto"
          >
            {/* Room Image */}
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

            {/* Booking Info */}
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-rose-600">
                  {booking.room?.roomType ?? "Room Type"}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.bookingStatus === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.bookingStatus === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
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

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Link
                  to={`/hotels/${booking.room?.hotelId}/rooms`}
                  className="flex-1 text-center px-4 py-2 rounded-md bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 !text-white hover:from-rose-600 hover:to-pink-600 text-sm font-medium shadow-md transition"
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
    </div>
  );
};

export default MyBooking;
