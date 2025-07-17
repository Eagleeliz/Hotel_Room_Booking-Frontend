// src/dashboard/SupportTicket.tsx

import React, { useEffect, useState } from "react";
import {
  getMyTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../features/api/SupportTicketApi";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Ticket {
  ticketId: number;
  subject: string;
  status: string;
  description?: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const SupportTicket: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [formErrors, setFormErrors] = useState<{ subject?: string; description?: string }>({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (!token) throw new Error("You must be logged in.");
        const data = await getMyTickets(token);
        setTickets(Array.isArray(data) ? data : []);
      } catch (err: any) {
        if (err.message.includes("No tickets found")) {
          setTickets([]);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    const errors: { subject?: string; description?: string } = {};
    if (!subject.trim()) errors.subject = "Subject is required";
    if (!description.trim()) errors.description = "Description is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      if (!token) throw new Error("Missing authentication token");

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;

      if (editingTicket) {
        await updateTicket(
          editingTicket.ticketId,
          {
            subject: subject.trim(),
            description: description.trim(),
          },
          token
        );

        const updatedTickets = await getMyTickets(token);
        setTickets(updatedTickets);

        MySwal.fire("Updated!", "Ticket updated successfully!", "success");
      } else {
        const newTicket = await createTicket(
          {
            subject: subject.trim(),
            description: description.trim(),
            userId,
          },
          token
        );

        setTickets([...tickets, newTicket]);
        MySwal.fire("Created!", "Ticket created successfully!", "success");
      }

      setSubject("");
      setDescription("");
      setShowForm(false);
      setEditingTicket(null);
    } catch (err: any) {
      console.error("Error:", err);
      MySwal.fire("Error", err.message || "Failed to submit ticket", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTicket = (ticket: Ticket) => {
    if (ticket.status !== "Open") {
      MySwal.fire("Notice", "Only open tickets can be edited", "warning");
      return;
    }
    setSubject(ticket.subject);
    setDescription(ticket.description || "");
    setEditingTicket(ticket);
    setShowForm(true);
  };

  const handleDeleteTicket = async (ticketId: number) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-xl",
        confirmButton: "!bg-rose-600 !text-white",
        cancelButton: "!bg-gray-300 !text-gray-800",
      },
      reverseButtons: true,
      position: "center",
    });

    if (result.isConfirmed) {
      try {
        if (!token) throw new Error("Missing authentication token");
        await deleteTicket(ticketId, token);
        setTickets((prev) => prev.filter((t) => t.ticketId !== ticketId));
        MySwal.fire("Deleted!", "Ticket deleted successfully!", "success");
      } catch (err: any) {
        console.error("Delete error:", err);
        MySwal.fire("Error", err.message || "Failed to delete ticket", "error");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSubject("");
    setDescription("");
    setEditingTicket(null);
    setFormErrors({});
  };

  if (loading) return <p className="p-4 text-gray-600">Loading support tickets...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-rose-600">My Support Tickets</h2>
        {!showForm && (
          <button
            onClick={() => {
              setSubject("");
              setDescription("");
              setEditingTicket(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white px-5 py-2 rounded-md shadow-md hover:from-rose-600 hover:to-pink-600 transition"
          >
            {tickets.length === 0 ? "Create Your First Ticket" : "Create New Ticket"}
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateTicket}
          className="bg-white shadow-xl rounded-xl p-6 mb-8 w-full max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4 text-rose-600">
            {editingTicket ? "Edit Ticket" : "Create New Ticket"}
          </h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              {formErrors.subject && <p className="text-sm text-red-500 mt-1">{formErrors.subject}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Describe your issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              {formErrors.description && <p className="text-sm text-red-500 mt-1">{formErrors.description}</p>}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-rose-300 text-white px-6 py-2 rounded-md shadow-md hover:bg-rose-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white px-6 py-2 rounded-md shadow-md hover:from-rose-600 hover:to-red-600 transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : editingTicket ? "Update Ticket" : "Submit Ticket"}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="flex flex-col items-center space-y-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.ticketId}
            className="bg-white rounded-xl p-6 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300 relative w-3/4"
          >
            <span
              className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                ticket.status === "Open"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {ticket.status}
            </span>

            <div className="absolute top-3 right-3 flex space-x-3">
              {ticket.status === "Open" && (
                <button
                  onClick={() => handleEditTicket(ticket)}
                  className="bg-pink-500 text-white p-1 rounded-full shadow-md hover:bg-pink-600 transition"
                  title="Edit Ticket"
                >
                  <FiEdit size={18} />
                </button>
              )}
              <button
                onClick={() => handleDeleteTicket(ticket.ticketId)}
                className="bg-rose-500 text-white p-1 rounded-full shadow-md hover:bg-rose-600 transition"
                title="Delete Ticket"
              >
                <FiTrash2 size={18} />
              </button>
            </div>

            <h4 className="text-lg font-bold text-gray-800 mb-1 mt-8">{ticket.subject}</h4>
            {ticket.description && (
              <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
            )}
            <p className="text-xs text-gray-400">
              Created: {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportTicket;
