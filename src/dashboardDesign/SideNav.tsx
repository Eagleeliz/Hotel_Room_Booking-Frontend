import {
  LogOut,
  SquareUserRound,
  TicketCheck,
  LayoutDashboard,
} from "lucide-react";
import { FaCreditCard } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export const SideNav = () => {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2 rounded-md transition gap-2 ${
      isActive
        ? "bg-rose-100 text-rose-600 font-semibold"
        : "text-gray-800 hover:bg-rose-50"
    }`;

  return (
    <ul className="menu bg-rose-50 shadow-md w-full gap-2 min-h-full p-4">
      <li>
        <NavLink to="/dashboard" end className={navItemClass}>
          <LayoutDashboard className="text-rose-600" />
          <span>Analytics</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/orders" className={navItemClass}>
          <FaCalendarCheck className="text-rose-600" />
          <span>My Bookings</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payments" className={navItemClass}>
          <FaCreditCard className="text-rose-600" />
          <span>My Payments</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/support-tickets" className={navItemClass}>
          <TicketCheck className="text-rose-600" />
          <span>Support Tickets</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className={navItemClass}>
          <SquareUserRound className="text-rose-600" />
          <span>My Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/logout" className={navItemClass}>
          <LogOut className="text-red-600" />
          <span className="text-red-600">Logout</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-house text-green-500"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <span>Home</span>
        </NavLink>
      </li>
    </ul>
  );
};
