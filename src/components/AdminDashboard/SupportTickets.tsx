// src/dashboard/SupportTicket.tsx
import { useEffect, useState, useMemo } from 'react';
import {
  Loader2,
  AlertCircle,
  Trash2,
  CheckCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  getAllTickets,
  deleteTicket,
  resolveTicket,
} from '../../features/api/SupportTicketApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { Ticket } from '../../types/Types';

const MySwal = withReactContent(Swal);

const SupportTicket = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);
    getAllTickets(token)
      .then(setTickets)
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const filteredTickets = useMemo(() => {
    if (statusFilter === 'All') return tickets;
    return tickets.filter((t) => t.status.toLowerCase() === statusFilter.toLowerCase());
  }, [tickets, statusFilter]);

  const handleDelete = async (ticketId: number) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'This ticket will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
    });

    if (result.isConfirmed && token) {
      try {
        await deleteTicket(ticketId, token);
        setTickets(tickets.filter((t) => t.ticketId !== ticketId));
        MySwal.fire('Deleted!', 'Ticket has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        MySwal.fire('Error', 'Failed to delete ticket.', 'error');
      }
    }
  };

  const handleResolve = async (ticketId: number) => {
    if (!token) return;
    try {
      await resolveTicket(ticketId, token);
      setTickets((prev) =>
        prev.map((t) =>
          t.ticketId === ticketId ? { ...t, status: 'Resolved' } : t
        )
      );
      MySwal.fire('Success', 'Ticket resolved successfully.', 'success');
    } catch (err) {
      console.error(err);
      MySwal.fire('Error', 'Failed to resolve ticket.', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-900">Admin Ticket Dashboard</h1>
        <p className="text-gray-600">Manage all submitted support tickets</p>
      </div>

      <div className="mb-6 flex justify-end">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {error ? (
          <div className="col-span-full text-center p-8 bg-white rounded-xl shadow">
            <AlertCircle className="text-red-500 w-8 h-8 mb-3 mx-auto" />
            <p className="text-gray-600">Failed to load tickets.</p>
          </div>
        ) : isLoading ? (
          <div className="col-span-full text-center p-8 bg-white rounded-xl shadow">
            <Loader2 className="animate-spin text-indigo-500 w-6 h-6 mx-auto" />
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="col-span-full text-center p-8 bg-white rounded-xl shadow">
            <AlertCircle className="text-blue-500 w-8 h-8 mb-3 mx-auto" />
            <p className="text-gray-600">No tickets found.</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="bg-white rounded-xl shadow p-4 relative border border-gray-200"
            >
              <span className={`absolute top-4 left-4 text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide ${
                ticket.status === 'Resolved'
                  ? 'bg-green-100 text-green-800'
                  : ticket.status === 'Open'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {ticket.status}
              </span>
              <h3 className="text-md font-bold text-gray-900 mb-3 mt-10">{ticket.subject}</h3>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Description:</span> {ticket.description}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">User ID:</span> {ticket.userId}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Email:</span> {ticket.user?.email || 'N/A'}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <span className="font-medium">Created At:</span> {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-2">
                {ticket.status === 'Open' && (
                  <button
                    onClick={() => handleResolve(ticket.ticketId)}
                    className="inline-flex items-center gap-1 text-white text-xs font-medium px-3 py-1 rounded bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 hover:from-red-500 hover:to-rose-400 transition"
                  >
                    <CheckCircle className="w-4 h-4" /> Resolve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(ticket.ticketId)}
                  className="inline-flex items-center gap-1 text-white text-xs font-medium px-3 py-1 rounded bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 hover:from-red-500 hover:to-rose-400 transition"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SupportTicket;