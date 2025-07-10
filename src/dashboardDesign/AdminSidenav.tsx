import { Link } from "react-router-dom";
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
  FaLifeRing,
} from "react-icons/fa";

export const AdminSideNav = () => {
  return (
    <ul className="menu bg-orange-50 text-gray-700 shadow-lg min-h-full font-semibold p-4 space-y-3">
      <li>
        <Link to="analytics">
          <TrendingUpIcon className="text-yellow-500" />
          Analytics
        </Link>
      </li>
      <li>
        <Link to="users">
          <FaUsers className="text-pink-500" />
          Users
        </Link>
      </li>
      <li>
        <Link to="hotels">
          <FaHotel className="text-pink-500" />
          Hotels
        </Link>
      </li>
      <li>
        <Link to="rooms">
          <FaBed className="text-pink-500" />
          Rooms
        </Link>
      </li>
      <li>
        <Link to="bookings">
          <FaClipboardList className="text-pink-500" />
          All Bookings
        </Link>
      </li>
      <li>
        <Link to="support">
          <FaLifeRing className="text-yellow-600" />
          Support Tickets
        </Link>
      </li>
      <li>
        <Link to="adminprofile">
          <SquareUserRound className="text-pink-500" />
          My Profile
        </Link>
      </li>
      <li>
        <Link to="#">
          <LogOut className="text-red-500" />
          Logout
        </Link>
      </li>
    </ul>
  );
};
