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
  FaCreditCard,
  FaCalendarCheck,
} from "react-icons/fa";

export const AdminSideNav = () => {
  return (
 <ul className="menu bg-rose-100 text-gray-700 shadow-lg h-full font-semibold p-4 space-y-3">

      <li>
        <Link to="/admindashboard/analytics" className="hover:bg-orange-100 rounded-md px-2 py-2 flex items-center">
          <TrendingUpIcon className="text-yellow-500 mr-2" />
          Analytics
        </Link>
      </li>
      <li>
        <Link to="/admindashboard/hotels" className="hover:bg-orange-100 rounded-md px-2 py-2 flex items-center">
          <FaHotel className="text-pink-500 mr-2" />
        All  Hotels
        </Link>
      </li>
      <li>
        <Link to="/admindashboard/all-bookings" className="hover:bg-orange-100 rounded-md px-2 py-2 flex items-center">
          <FaBed className="text-pink-500 mr-2" />
          All Bookings
        </Link>
      </li>
   
      <li>
        <Link to="/admindashboard/all-payments" className="hover:bg-orange-100 rounded-md px-2 py-2 flex items-center">
          <FaCreditCard className="text-rose-600 mr-2" />
         All Payments
        </Link>
      </li>
      <li>
        <Link to="/admindashboard/users" className="hover:bg-orange-100 rounded-md px-2 py-2 flex items-center">
          <FaUsers className="text-pink-500 mr-2" />
          All Users
        </Link>
      </li>

         <li>
        <Link to="/admindashboard/my-bookings" className="hover:bg-orange-100 rounded-md px-2 py-2 flex items-center">
          <FaCalendarCheck className="text-rose-600 mr-2" />
          My Bookings
        </Link>
      </li>
    
       <li>
        <Link to="/admindashboard/my-payments" className="hover:bg-orange-100 rounded-md px-2 py-2 flex items-center">
          <FaCreditCard className="text-rose-600 mr-2" />
          My Payments
        </Link>
      </li>
        <li>
        <Link to="/admindashboard/profile" className="hover:bg-orange-100 rounded-md px-2 py-2 flex items-center">
          <SquareUserRound className="text-pink-500 mr-2" />
          My Profile
        </Link>
      </li>
      <li>
        <Link to="#" className="hover:bg-orange-100 rounded-md px-2 py-2 flex items-center">
          <LogOut className="text-red-500 mr-2" />
          Logout
        </Link>
      </li>
    </ul>
  );
};
