import { NavLink } from "react-router-dom";
import {
  TrendingUpIcon,
  SquareUserRound,
  LogOut,
} from "lucide-react";
import {
  FaUsers,
  FaHotel,
  FaBed,
  FaClipboardList,
  FaCreditCard,
  FaCalendarCheck,
} from "react-icons/fa";

// Active and hover styles
const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center px-4 py-3 rounded-md transition-colors duration-200 gap-3 text-lg
   ${isActive ? "bg-rose-300 text-red-600 font-semibold" : "text-gray-800 hover:bg-pink-50 hover:text-rose-600"}`;

export const AdminSideNav = () => {
  return (
    <ul className="space-y-2">

      <li>
        <NavLink to="/admindashboard/analytics" className={navItemClass}>
          {({ isActive }) => (
            <>
              <TrendingUpIcon className={`w-6 h-6 ${isActive ? "text-red-600" : "text-yellow-500"}`} />
              Analytics
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/hotels" className={navItemClass}>
          {({ isActive }) => (
            <>
              <FaHotel className={`w-6 h-6 ${isActive ? "text-red-600" : "text-pink-500"}`} />
              All Hotels
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/all-bookings" className={navItemClass}>
          {({ isActive }) => (
            <>
              <FaBed className={`w-6 h-6 ${isActive ? "text-red-600" : "text-pink-500"}`} />
              All Bookings
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/all-payments" className={navItemClass}>
          {({ isActive }) => (
            <>
              <FaCreditCard className={`w-6 h-6 ${isActive ? "text-red-600" : "text-rose-600"}`} />
              All Payments
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/users" className={navItemClass}>
          {({ isActive }) => (
            <>
              <FaUsers className={`w-6 h-6 ${isActive ? "text-red-600" : "text-pink-500"}`} />
              All Users
            </>
          )}
        </NavLink>
      </li>



      <li>
        <NavLink to="/admindashboard/profile" className={navItemClass}>
          {({ isActive }) => (
            <>
              <SquareUserRound className={`w-6 h-6 ${isActive ? "text-red-600" : "text-pink-500"}`} />
              My Profile
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/logout" className={navItemClass}>
          <LogOut className="w-6 h-6 text-red-600" />
          <span className="text-red-600">Logout</span>
        </NavLink>
      </li>

    </ul>
  );
};
