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
  FaCreditCard,
} from "react-icons/fa";

interface AdminSideNavProps {
  onClose?: () => void;
}

// Active and hover styles
const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center px-4 py-3 rounded-md transition-colors duration-200 gap-3 text-lg
   ${isActive ? "bg-rose-300 text-red-600 font-semibold" : "text-gray-800 hover:bg-pink-50 hover:text-rose-600"}`;

export const AdminSideNav = ({ onClose }: AdminSideNavProps) => {
  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
   <ul className="space-y-2 mt-4 md:mt-6">

      <li>
        <NavLink to="/admindashboard/analytics" className={navItemClass} onClick={handleClick}>
          {({ isActive }) => (
            <>
              <TrendingUpIcon className={`w-6 h-6 ${isActive ? "text-red-600" : "text-yellow-500"}`} />
              Analytics
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/hotels" className={navItemClass} onClick={handleClick}>
          {({ isActive }) => (
            <>
              <FaHotel className={`w-6 h-6 ${isActive ? "text-red-600" : "text-pink-500"}`} />
              All Hotels
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/all-bookings" className={navItemClass} onClick={handleClick}>
          {({ isActive }) => (
            <>
              <FaBed className={`w-6 h-6 ${isActive ? "text-red-600" : "text-pink-500"}`} />
              All Bookings
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/all-payments" className={navItemClass} onClick={handleClick}>
          {({ isActive }) => (
            <>
              <FaCreditCard className={`w-6 h-6 ${isActive ? "text-red-600" : "text-rose-600"}`} />
              All Payments
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/users" className={navItemClass} onClick={handleClick}>
          {({ isActive }) => (
            <>
              <FaUsers className={`w-6 h-6 ${isActive ? "text-red-600" : "text-pink-500"}`} />
              All Users
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/support-tickets" className={navItemClass} onClick={handleClick}>
          {({ isActive }) => (
            <>
              <FaUsers className={`w-6 h-6 ${isActive ? "text-red-600" : "text-pink-500"}`} />
              Support Tickets
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/admindashboard/profile" className={navItemClass} onClick={handleClick}>
          {({ isActive }) => (
            <>
              <SquareUserRound className={`w-6 h-6 ${isActive ? "text-red-600" : "text-pink-500"}`} />
              My Profile
            </>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/logout" className={navItemClass} onClick={handleClick}>
          <LogOut className="w-6 h-6 text-red-600" />
          <span className="text-red-600">Logout</span>
        </NavLink>
      </li>
    </ul>
  );
};
