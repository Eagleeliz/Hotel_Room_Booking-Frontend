import React, { useEffect, useMemo, useState } from 'react';
import { useGetAllBookingsQuery } from '../../features/api/BookingApi';
import { useGetAllUsersProfilesQuery, useGetMyProfileQuery } from '../../features/api/userApi';
import { useGetHotelsQuery } from '../../features/api/HotelApi';
import { useGetRoomsQuery } from '../../features/api/RoomApi';
import { getAllTickets } from '../../features/api/SupportTicketApi';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FiUsers, FiCalendar, FiDollarSign, FiHome, FiGrid, FiHelpCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../CalendarStyles.css';

const Analytics = () => {
  const { data: bookings = [], isLoading: loadingBookings } = useGetAllBookingsQuery();
  const { data: users = [], isLoading: loadingUsers } = useGetAllUsersProfilesQuery();
  const { data: hotelData, isLoading: loadingHotels } = useGetHotelsQuery();
  const { data: rooms = [], isLoading: loadingRooms } = useGetRoomsQuery();
  const { data: adminUser, isLoading: adminLoading } = useGetMyProfileQuery();
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const data = await getAllTickets(token.replace(/"/g, ''));
        setTickets(data);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      } finally {
        setLoadingTickets(false);
      }
    };
    fetchTickets();
  }, []);

  const totalRevenue = useMemo(() => {
    return bookings?.reduce((sum, b) => {
      const amount = parseFloat(b?.totalAmount || '0');
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  }, [bookings]);

  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.checkInDate === today);

  const monthlyData = useMemo(() => {
    const grouped: { [month: string]: number } = {};
    bookings.forEach(b => {
      const month = new Date(b.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
      grouped[month] = (grouped[month] || 0) + 1;
    });

    return Object.entries(grouped)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  }, [bookings]);

  if (loadingBookings || loadingUsers || loadingHotels || loadingRooms || loadingTickets || adminLoading) {
    return <p className="text-center mt-10 text-rose-500">Loading analytics...</p>;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 md:p-10 pt-[90px] min-h-screen">
      {/* Welcome Section */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="bg-rose-100 border border-rose-300 rounded-2xl p-6 shadow mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rose-700">
          Welcome back, Admin {adminUser?.firstName}! <span className="text-3xl">👋</span>
        </h1>
        <p className="text-black mt-1 text-sm">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Bookings" value={bookings.length} icon={<FiCalendar className="text-2xl text-rose-500" />} />
        <StatCard title="Today's Bookings" value={todayBookings.length} icon={<FiCalendar className="text-2xl text-rose-400" />} />
        <StatCard title="Total Revenue" value={`KES ${totalRevenue.toFixed(2)}`} icon={<FiDollarSign className="text-2xl text-rose-500" />} />
        <StatCard title="Total Users" value={users.length} icon={<FiUsers className="text-2xl text-rose-500" />} />
        <StatCard title="Total Hotels" value={hotelData?.hotels?.length || 0} icon={<FiHome className="text-2xl text-rose-500" />} />
        <StatCard title="Total Rooms" value={rooms.length} icon={<FiGrid className="text-2xl text-rose-500" />} />
        <StatCard title="Support Tickets" value={tickets.length} icon={<FiHelpCircle className="text-2xl text-rose-500" />} />
      </div>

      {/* Chart and Calendar */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow w-full md:w-[450px] h-[350px]">
          <Calendar
            value={selectedDate}
            onChange={(value) => setSelectedDate(value as Date)}
            tileDisabled={() => true}
          />
        </div>

        <div className="bg-white border border-rose-200 p-4 rounded-xl shadow flex flex-col">
          <h2 className="text-xl font-semibold text-rose-700 mb-4">Monthly Booking Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#f43f5e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Stat Card styled like MyDashboard
const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white border border-gray-200 rounded-2xl p-6 shadow"
  >
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </motion.div>
);

export default Analytics;
