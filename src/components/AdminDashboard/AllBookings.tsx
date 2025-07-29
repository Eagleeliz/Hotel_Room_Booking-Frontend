import { useState, useMemo } from 'react';
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
} from '../../features/api/BookingApi';
import { FaCalendarAlt, FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllBookings = () => {
  const { data: bookings = [], isLoading, isError, refetch } = useGetAllBookingsQuery();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const [deleteBooking] = useDeleteBookingMutation();

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

  const handleStatusChange = async (booking: any) => {
    const { value: newStatus } = await Swal.fire({
      title: 'Edit Booking Status',
      input: 'select',
      inputOptions: {
        Confirmed: 'Confirmed',
        Pending: 'Pending',
        Cancelled: 'Cancelled',
      },
      inputValue: booking.bookingStatus,
      showCancelButton: true,
      confirmButtonColor: '#10B981',
    });

    if (newStatus && newStatus !== booking.bookingStatus) {
      try {
        await updateBookingStatus({ id: booking.bookingId, status: newStatus }).unwrap();
        Swal.fire('Updated!', 'Status updated successfully.', 'success');
        refetch(); // Refresh bookings
      } catch (err) {
        Swal.fire('Error', 'Failed to update status.', 'error');
      }
    }
  };

  const handleDelete = async (bookingId: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This booking will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteBooking(bookingId).unwrap();
        Swal.fire('Deleted!', 'Booking deleted successfully.', 'success');
        refetch(); // Refresh list
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete booking.', 'error');
      }
    }
  };

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
                <th className="py-3 px-4">Hotel</th>
                <th className="py-3 px-4">Room & Price</th>
                <th className="py-3 px-4">Check-in</th>
                <th className="py-3 px-4">Check-out</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.bookingId} className="border-t hover:bg-gray-50 text-sm">
                  <td className="py-4 px-4 font-medium text-gray-800">#{booking.bookingId}</td>
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
                  <td className="py-4 px-4 flex gap-2">
                    <button
                      onClick={() => handleStatusChange(booking)}
                      className="!bg-green-100 text-green-700 p-2 rounded hover:bg-green-200 transition"
                      title="Edit Status"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(booking.bookingId)}
                      className="!bg-red-100 text-red-700 p-2 rounded hover:bg-red-200 transition"
                      title="Delete Booking"
                    >
                      <FaTrash />
                    </button>
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
