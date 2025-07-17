// src/api/SupportTicketApi.ts

const API_BASE = "http://localhost:5000/api/tickets";

export const getAllTickets = async (token: string) => {
  const res = await fetch(`${API_BASE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch tickets");
  return data.tickets;
};

export const getMyTickets = async (token: string) => {
  const res = await fetch(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch your tickets");
  return data.tickets;
};

export const getTicketsByStatus = async (status: string, token: string) => {
  const res = await fetch(`${API_BASE}/status/${status}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch by status");
  return data.tickets;
};

export const getTicketById = async (id: number, token: string) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Ticket not found");
  return data.ticket;
};

export const createTicket = async (
  ticket: { subject: string; description: string; userId:number},
  token: string
) => {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ticket),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Backend error response:", data); // ✅ log actual backend error
    throw new Error(data.message || "Failed to create ticket");
  }

  return data.ticket;
};


export const updateTicket = async (
  ticketId: number,
  updates: { subject?: string; description?: string; status?: string },
  token: string
) => {
  const res = await fetch(`${API_BASE}/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update ticket");
  return data.message;
};

export const deleteTicket = async (ticketId: number, token: string) => {
  const res = await fetch(`${API_BASE}/${ticketId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete ticket");
  return data.message;
};

export const resolveTicket = async (ticketId: number, token: string) => {
  const res = await fetch(`${API_BASE}/${ticketId}/resolve`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to resolve ticket");
  return data.message;
};

export const reopenTicket = async (ticketId: number, token: string) => {
  const res = await fetch(`${API_BASE}/${ticketId}/reopen`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to reopen ticket");
  return data.message;
};

// Optional (if you still allow getting tickets by userId for admin purposes)
export const getTicketsByUserId = async (userId: number, token: string) => {
  const res = await fetch(`${API_BASE}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch user tickets");
  return data.tickets;
};
