import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useGetPaymentsByUserIdQuery } from '../features/api/PaymentApi';
import { FaSearch, FaFilter } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyPayments = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.userId?.toString() || '');
  const { data: bookings = [], isLoading, isError } = useGetPaymentsByUserIdQuery(userId);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // ✅ Extract payments from bookings
  const allPayments = useMemo(() => {
    return bookings
      .filter((booking: any) => booking.payment) // Only include bookings with a payment
      .map((booking: any) => ({
        ...booking.payment,
        hotelName: booking.room?.hotel?.name ?? 'N/A',
        paymentDate: booking.payment?.paymentDate,
      }));
  }, [bookings]);

  // ✅ Apply filtering
  const filteredPayments = useMemo(() => {
    return allPayments.filter((payment: any) => {
      const matchesSearch =
        payment.paymentId?.toString().includes(search) ||
        payment.hotelName?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? payment.paymentStatus === statusFilter : true;

      return matchesSearch && matchesStatus;
    });
  }, [allPayments, search, statusFilter]);

  // ✅ Show alert if user has no payments after loading
  useEffect(() => {
    if (!isLoading && allPayments.length === 0) {
      Swal.fire({
        title: 'No Payments Found',
        text: 'You have not made any payments yet.',
        icon: 'info',
        confirmButtonColor: '#3B82F6',
      });
    }
  }, [isLoading, allPayments.length]);

  if (isLoading) return <div className="p-6 pt-20 text-gray-600">Loading your payments...</div>;
  if (isError) return <div className="p-6 pt-20 text-red-600">Failed to load payments.</div>;

  return (
    <div className="p-6 pt-10">
      <h2 className="text-2xl font-bold mb-6">My Payments ({filteredPayments.length})</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Payment ID or Hotel..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-1/4">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredPayments.length === 0 ? (
        <div className="border p-6 text-center rounded-lg shadow text-gray-600 bg-gray-50">
          No payments found matching your criteria.
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-rose-100 text-left">
              <tr>
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4">Hotel</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment: any) => (
                <tr key={payment.paymentId} className="border-t hover:bg-gray-50 text-sm">
                  <td className="py-4 px-4 font-medium">#{payment.paymentId}</td>
                  <td className="py-4 px-4">{payment.hotelName}</td>
                  <td className="py-4 px-4">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">${payment.amount}</td>
                  <td className="py-4 px-4">{payment.paymentMethod}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.paymentStatus === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : payment.paymentStatus === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {payment.paymentStatus}
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

export default MyPayments;
