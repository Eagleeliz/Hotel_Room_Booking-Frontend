import React, { useState } from "react";
import { useGetMyProfileQuery } from "../features/api/userApi";
import { useGetBookingsByUserIdQuery } from "../features/api/BookingApi";
import { FiCalendar, FiDollarSign, FiHelpCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../CalendarStyles.css";
import { Link } from "react-router-dom";

const MyDashboard = () => {
  const { data: user, isLoading: userLoading } = useGetMyProfileQuery();
  const { data: bookings = [], isLoading: bookingsLoading } = useGetBookingsByUserIdQuery(user?.userId);

  const [selectedDate, setSelectedDate] = useState(new Date());

  if (userLoading || bookingsLoading) {
    return <div className="text-center mt-10 text-rose-500">Loading dashboard...</div>;
  }

  // Compute total payments and booking stats
  const totalPayments = bookings.reduce((sum, booking) => sum + parseFloat(booking.totalAmount || "0"), 0);
  const bookingCount = bookings.length;
  const supportTicketsCount = 2;

  // Filter for upcoming bookings
  const now = new Date();
  const upcomingBookings = bookings
    .filter((booking) => new Date(booking.checkInDate) > now)
    .sort((a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime())
    .slice(0, 3); // Show only top 3 upcoming bookings

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
  <div className="p-6 md:p-10 min-h-screen">

      {/* Welcome Card */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="bg-rose-100 border border-rose-300 rounded-2xl p-6 shadow mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rose-700">
          Welcome back, {user?.firstName} {user?.lastName}! <span className="text-3xl">👋</span>
        </h1>
        <p className="text-black mt-1 text-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-700">All Bookings</h2>
            <FiCalendar className="text-2xl text-rose-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{bookingCount}</p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Total Payments</h2>
            <FiDollarSign className="text-2xl text-pink-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">Ksh {totalPayments.toFixed(2)}</p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Support Tickets</h2>
            <FiHelpCircle className="text-2xl text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{supportTicketsCount}</p>
        </motion.div>
      </div>

      {/* Calendar and Upcoming Bookings Section */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Calendar */}
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow w-full md:w-[450px] h-[350px]">
          <Calendar
            value={selectedDate}
            onChange={(value) => setSelectedDate(value as Date)}
            tileDisabled={() => true}
          />
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white border border-rose-200 p-5 rounded-xl shadow flex flex-col">
          <h2 className="text-xl font-semibold text-rose-700 mb-4">Upcoming Bookings</h2>

          {upcomingBookings.length === 0 ? (
            <p className="text-gray-600">No upcoming bookings.</p>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="border border-rose-100 bg-rose-50 rounded-lg p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-rose-800">{booking.room.hotel.name}</h3>
                  <p className="text-sm text-gray-700">
                    {booking.room.roomType} • {new Date(booking.checkInDate).toLocaleDateString()} —{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* View All Button */}
          <Link
            to="/dashboard/orders?filter=upcoming"
            className="mt-6 inline-block text-center bg-rose-500 hover:bg-rose-600 !text-white py-2 px-4 rounded-md text-sm font-medium transition"
          >
            View All  Bookings
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default MyDashboard;
