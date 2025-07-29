import { useState, useMemo } from 'react';
import {
  useGetAllUsersProfilesQuery,
  useDeleteUserProfileMutation,
  useUpdateUserProfileMutation,
} from '../../features/api/userApi';
import { useGetAllBookingsQuery } from '../../features/api/BookingApi';
import { FaTrash, FaEye, FaPen } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import Swal from 'sweetalert2';

export const AllUsers = () => {
  const { data: users, isLoading } = useGetAllUsersProfilesQuery();
  const { data: allBookings = [], isLoading: loadingBookings } = useGetAllBookingsQuery();
  const [deleteUser] = useDeleteUserProfileMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const userBookings = useMemo(() => {
    return allBookings.filter((b) => b.user?.userId === selectedUserId);
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
      text: 'This user will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
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

  // ✅ Updated to send only role and user_id
  const handleRoleChange = async (userId: number, currentRole: 'admin' | 'user') => {
    const { value: newRole } = await Swal.fire({
      title: 'Edit User Role',
      input: 'select',
      inputOptions: {
        admin: 'Admin',
        user: 'User',
      },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonColor: '#10B981',
    });

    if (newRole && newRole !== currentRole) {
      try {
        await updateUserProfile({ user_id: userId, role: newRole }).unwrap();
        Swal.fire('Updated!', 'User role updated successfully.', 'success');
      } catch {
        Swal.fire('Error', 'Failed to update role.', 'error');
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
    <div className="p-6 pt-10 min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-3 py-1 border border-gray-300 rounded-md w-full sm:w-1/3 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-1 border border-gray-300 rounded-md w-full sm:w-1/4 text-sm"
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
          <table className="min-w-full bg-white shadow rounded-lg text-sm">
            <thead className="bg-rose-100 text-left">
              <tr>
                <th className="py-2 px-3">First</th>
                <th className="py-2 px-3">Last</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Phone</th>
                <th className="py-2 px-3">Address</th>
                <th className="py-2 px-3">Role</th>
                <th className="py-2 px-3">Bookings</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-3">{user.firstName}</td>
                  <td className="py-2 px-3">{user.lastName}</td>
                  <td className="py-2 px-3">{user.email}</td>
                  <td className="py-2 px-3">{user.contactPhone || 'N/A'}</td>
                  <td className="py-2 px-3">{user.address || 'N/A'}</td>
                  <td className="py-2 px-3 capitalize">{user.role}</td>
                  <td className="py-2 px-3 text-center">
                    <div className="text-xs font-medium">
                      {
                        allBookings.filter((b) => b.user?.userId === user.userId).length
                      }
                    </div>
                    <button
                      onClick={() => openModal(user.userId)}
                      className="mt-1 inline-flex items-center gap-1 !text-white text-xs px-2 py-1 rounded !bg-rose-500 hover:bg-rose-400"
                    >
                      <FaEye className="w-3 h-3" />
                      View
                    </button>
                  </td>
                  <td className="py-2 px-3 flex gap-1 items-center">
                    <button
                      onClick={() => handleDelete(user.userId)}
                      className="p-1 !bg-red-100 text-red-700 rounded hover:bg-red-200"
                      title="Delete"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleRoleChange(user.userId, user.role)}
                      className="p-1 !bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      title="Edit Role"
                    >
                      <FaPen className="w-3 h-3" />
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
                      <th className="px-4 py-2">Hotel</th>
                      <th className="px-4 py-2">Room</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Check-in</th>
                      <th className="px-4 py-2">Check-out</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userBookings.map((b) => (
                      <tr key={b.bookingId} className="border-t">
                        <td className="px-4 py-2 text-black">#{b.bookingId}</td>
                        <td className="px-4 py-2 text-black">{b.room?.hotel?.name ?? 'N/A'}</td>
                        <td className="px-4 py-2 text-black">{b.room?.roomType ?? 'N/A'}</td>
                        <td className="px-4 py-2 text-black">${b.room?.pricePerNight ?? '0'}</td>
                        <td className="px-4 py-2 text-black">{b.checkInDate}</td>
                        <td className="px-4 py-2 text-black">{b.checkOutDate}</td>
                        <td className="px-4 py-2 text-black capitalize">{b.bookingStatus ?? 'pending'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-400"
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
