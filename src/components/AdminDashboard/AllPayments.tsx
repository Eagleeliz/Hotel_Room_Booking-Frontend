import React, { useState, useMemo } from 'react';
import { useGetAllPaymentsQuery } from '../../features/api/PaymentApi';
import { FaSearch, FaFilter } from 'react-icons/fa';

const AllPayments = () => {
  const { data: payments = [], isLoading, isError } = useGetAllPaymentsQuery({}); // FIXED: added {}
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredPayments = useMemo(() => {
    return payments.filter((payment: any) => {
      const matchesSearch =
        payment.paymentId?.toString().includes(search) ||
        payment.booking?.user?.userId?.toString().includes(search) ||
        payment.booking?.room?.hotel?.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? payment.paymentStatus === statusFilter : true;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  if (isLoading) return <div className="p-6 pt-20 text-gray-600">Loading payments...</div>;
  if (isError) return <div className="p-6 pt-20 text-red-600">Failed to load payments.</div>;

  return (
    <div className="p-6 pt-20">
      <h2 className="text-2xl font-bold mb-6">All Payments ({filteredPayments.length})</h2>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Payment ID, User ID, or Hotel..."
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
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Hotel Name</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment: any) => (
                <tr key={payment.paymentId} className="border-t hover:bg-gray-50 text-sm">
                  <td className="py-4 px-4 text-gray-800 font-medium">#{payment.paymentId}</td>
                  <td className="py-4 px-4">{payment.booking?.user?.userId ?? 'N/A'}</td>
                  <td className="py-4 px-4">{payment.booking?.room?.hotel?.name ?? 'N/A'}</td>
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
                  <td className="py-4 px-4">
                    {new Date(payment.paymentDate).toLocaleDateString()}
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

export default AllPayments;

