import React, { useState, useMemo } from 'react';
import {
  useGetAllUsersProfilesQuery,
  useDeleteUserProfileMutation,
} from '../../features/api/userApi';
import { useGetAllBookingsQuery } from '../../features/api/BookingApi';
import { FaTrash, FaEye } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import Swal from 'sweetalert2';

export const AllUsers = () => {
  const { data: users, isLoading } = useGetAllUsersProfilesQuery();
  const { data: allBookings = [], isLoading: loadingBookings } = useGetAllBookingsQuery();
  const [deleteUser] = useDeleteUserProfileMutation();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // ✅ Filter bookings for the selected user
  const userBookings = useMemo(() => {
  const filtered = allBookings.filter((b) => b.user?.userId === selectedUserId);
  console.log('Selected User ID:', selectedUserId);
  console.log('Matching Bookings:', filtered);
  return filtered;
}, [allBookings, selectedUserId]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((u) => {
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      return (
        fullName.includes(search.toLowerCase()) &&
        (roleFilter ? u.role === roleFilter : true)
      );
    });
  }, [users, search, roleFilter]);

  const handleDelete = async (userId: number) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteUser(userId).unwrap();
        Swal.fire('Deleted!', 'User deleted successfully.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete user.', 'error');
      }
    }
  };

  const openModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/4"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-rose-100 text-left">
              <tr>
                <th className="py-3 px-4">First Name</th>
                <th className="py-3 px-4">Last Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Bookings</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId} className="border-t">
                  <td className="py-3 px-4">{user.firstName}</td>
                  <td className="py-3 px-4">{user.lastName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.contactPhone || 'N/A'}</td>
                  <td className="py-3 px-4">{user.address || 'N/A'}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-medium">
                        {
                          allBookings.filter((b) => b.user?.userId === user.userId).length
                        }
                      </span>
                      <button
                        onClick={() => openModal(user.userId)}
                        className="inline-flex items-center gap-1 text-white text-xs font-medium px-3 py-1 rounded bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-rose-400 hover:to-pink-400 transition"
                      >
                        <FaEye className="w-4 h-4" />
                        View All
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(user.userId)}
                      className="inline-flex items-center gap-1 text-white text-xs font-medium px-3 py-1 rounded bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 hover:from-red-500 hover:to-rose-400 transition"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Booking Modal */}
       <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <Dialog.Title className="text-xl font-semibold">User Bookings</Dialog.Title>
        <button
          onClick={closeModal}
          className="text-gray-600 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
      </div>

      {loadingBookings ? (
        <p>Loading bookings...</p>
      ) : userBookings.length === 0 ? (
        <div className="text-center text-gray-500 italic py-8">
          This user has not made any bookings yet.
        </div>
      ) : (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="min-w-full table-auto border text-sm text-left">
            <thead className="bg-rose-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">Hotel Name</th>
                <th className="px-4 py-2">Room Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Check-in</th>
                <th className="px-4 py-2">Check-out</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map((booking) => (
                <tr key={booking.bookingId} className="border-t">
                 <td className="px-4 py-2 text-black">#{booking.bookingId}</td>
<td className="px-4 py-2 text-black">{booking.room?.hotel?.name ?? 'N/A'}</td>
<td className="px-4 py-2 text-black">{booking.room?.roomType ?? 'N/A'}</td>
<td className="px-4 py-2 text-black">${booking.room?.pricePerNight ?? '0'}</td>
<td className="px-4 py-2 text-black">{booking.checkInDate}</td>
<td className="px-4 py-2 text-black">{booking.checkOutDate}</td>
<td className="px-4 py-2 text-black capitalize">{booking.bookingStatus ?? 'pending'}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-right">
        <button
          onClick={closeModal}
          className="inline-block px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white font-semibold rounded hover:from-rose-400 hover:to-pink-400"
        >
          Close
        </button>
      </div>
    </Dialog.Panel>
  </div>
</Dialog>

    </div>
  );
};
