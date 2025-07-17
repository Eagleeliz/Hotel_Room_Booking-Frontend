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
    `flex items-center px-4 py-3 rounded-md transition-colors duration-200 gap-3 text-lg
     ${isActive ? "bg-rose-300 text-red-600 font-semibold" : "text-gray-800 hover:bg-pink-50 hover:text-rose-600"}`;

  return (
    <ul className="menu bg-rose-100 shadow-md w-66 min-h-full p-2 space-y-2">
      <li>
        <NavLink to="/dashboard" end className={navItemClass}>
          {({ isActive }) => (
            <>
              <LayoutDashboard className={`w-6 h-6 ${isActive ? "text-red-600" : "text-rose-600"}`} />
              <span>Dashboard</span>
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/orders" className={navItemClass}>
          {({ isActive }) => (
            <>
              <FaCalendarCheck className={`w-6 h-6 ${isActive ? "text-red-600" : "text-rose-600"}`} />
              <span>My Bookings</span>
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payments" className={navItemClass}>
          {({ isActive }) => (
            <>
              <FaCreditCard className={`w-6 h-6 ${isActive ? "text-red-600" : "text-rose-600"}`} />
              <span>My Payments</span>
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/support-tickets" className={navItemClass}>
          {({ isActive }) => (
            <>
              <TicketCheck className={`w-6 h-6 ${isActive ? "text-red-600" : "text-rose-600"}`} />
              <span>Support Tickets</span>
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className={navItemClass}>
          {({ isActive }) => (
            <>
              <SquareUserRound className={`w-6 h-6 ${isActive ? "text-red-600" : "text-rose-600"}`} />
              <span>My Profile</span>
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/logout" className={navItemClass}>
          <LogOut className="text-red-600 w-6 h-6" />
          <span className="text-red-600">Logout</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className={navItemClass}>
          {({ isActive }) => (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-house w-6 h-6 ${isActive ? "text-red-600" : "text-green-500"}`}
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>Home</span>
            </>
          )}
        </NavLink>
      </li>
    </ul>
  );
};
