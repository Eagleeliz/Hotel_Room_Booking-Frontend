import  { useState, useMemo } from 'react';
import { useGetAllBookingsQuery } from '../../features/api/BookingApi';
import { FaCalendarAlt, FaSearch, FaFilter } from 'react-icons/fa';

const AllBookings = () => {
  const { data: bookings = [], isLoading, isError } = useGetAllBookingsQuery();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.bookingId.toString().includes(search) ||
        booking.user?.userId?.toString().includes(search) ||
        booking.room?.hotel?.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? booking.bookingStatus === statusFilter : true;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  if (isLoading) return <div className="p-6 pt-20 text-gray-600">Loading bookings...</div>;
  if (isError) return <div className="p-6 pt-20 text-red-600">Failed to load bookings.</div>;

  return (
    <div className="p-6 pt-10">
      <h2 className="text-2xl font-bold mb-6">All Bookings ({filteredBookings.length})</h2>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Booking ID, User ID or Hotel..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-1/4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaFilter className="text-gray-400" />
          </div>
          <select
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredBookings.length === 0 ? (
        <div className="border p-6 text-center rounded-lg shadow text-gray-600 bg-gray-50">
          No bookings found matching your criteria.
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-rose-100 text-left">
              <tr>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Hotel Name</th>
                <th className="py-3 px-4">Room Type & Price</th>
                <th className="py-3 px-4">Check-in</th>
                <th className="py-3 px-4">Check-out</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.bookingId} className="border-t hover:bg-gray-50 text-sm">
                  <td className="py-4 px-4 text-gray-800 font-medium">#{booking.bookingId}</td>
                  <td className="py-4 px-4">{booking.user?.userId ?? 'N/A'}</td>
                  <td className="py-4 px-4">{booking.room?.hotel?.name ?? 'N/A'}</td>
                  <td className="py-4 px-4">
                    {booking.room?.roomType ?? 'N/A'} - ${booking.room?.pricePerNight}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-blue-600">
                      <FaCalendarAlt className="text-blue-500" />
                      {booking.checkInDate}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-red-600">
                      <FaCalendarAlt className="text-red-500" />
                      {booking.checkOutDate}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.bookingStatus === 'Confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.bookingStatus === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
