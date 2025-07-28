import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { BiHome, BiPhone, BiInfoCircle, BiHotel } from "react-icons/bi";
import { GrDashboard } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { clearCredentials } from "../features/auth/authSlice";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/");
  };

  return (
   <nav className="bg-rose-200 py-3 px-0 w-full shadow-lg md:rounded-b-lg">
      <div className="w-full flex justify-between items-center px-4">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold text-gray-800">
          Golden Home Hotels
        </div>

        {/* Hamburger Menu Icon */}
   <div className="md:hidden">
  <button
    onClick={onMenuClick ?? (() => setMenuOpen(!menuOpen))}
    className="p-2 rounded-full border-2 border-rose-200 bg-white text-rose-600 
              hover:bg-rose-50 transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
    aria-label={menuOpen ? "Close menu" : "Open menu"}
  >
    {menuOpen ? (
      <FaTimes 
        size={20} 
        className="text-rose-600 transition-transform duration-200" 
      />
    ) : (
      <FaBars 
        size={20} 
        className="text-rose-600 transition-transform duration-200" 
      />
    )}
  </button>
</div>


        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-10 text-base lg:text-lg font-semibold text-gray-700">
          <li>
            <Link to="/" className="flex items-center px-4 py-2.5 rounded-md hover:text-gray-900 transition duration-300">
              <BiHome className="text-xl text-rose-600 mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex items-center px-4 py-2.5 rounded-md hover:text-gray-900 transition duration-300">
              <BiInfoCircle className="text-xl text-rose-600 mr-2" />
              About
            </Link>
          </li>
          <li>
            <Link to="/hotels" className="flex items-center px-4 py-2.5 rounded-md hover:text-gray-900 transition duration-300">
              <BiHotel className="text-xl text-rose-600 mr-2" />
              Hotels
            </Link>
          </li>
          <li>
            <Link to="/contact" className="flex items-center px-4 py-2.5 rounded-md hover:text-gray-900 transition duration-300">
              <BiPhone className="text-xl text-rose-600 mr-2" />
              Contact
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        {!isAuthenticated ? (
          <div className="hidden md:flex space-x-4">
            <Link to="/register" className="flex items-center gap-2 px-5 py-2 rounded-lg text-lg font-semibold border border-white bg-pink-100 text-rose-600 hover:bg-pink-200 transition-all duration-300">
              <FaUserPlus className="text-xl" /> Register
            </Link>
            <Link to="/login" className="flex items-center gap-2 px-5 py-2 rounded-lg text-lg font-semibold border border-white bg-pink-100 text-rose-600 hover:bg-pink-200 transition-all duration-300">
              <FaSignInAlt className="text-xl" /> Login
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="!bg-pink-300 !text-black hover:bg-pink-200 border border-white px-5 py-2 rounded-lg text-base font-semibold flex items-center gap-2 transition-all duration-300"
              >
                <span>Hey, {user?.firstName}</span>
                <svg
                  className="w-5 h-5 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <ul className="dropdown-content bg-white rounded-box shadow-md mt-3 w-52 p-2 z-[100]">
                <li>
                              <Link
            to={user?.role === "admin" ? "/admindashboard/analytics" : "/dashboard"}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-base font-semibold border border-white bg-pink-100 text-rose-600 hover:bg-pink-200 transition-all duration-300 whitespace-nowrap"
          >
            <GrDashboard className="text-xl" />
            <span>{user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}</span>
          </Link>

                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="!flex items-center !gap-2 !px-5 !py-2 !rounded-lg !text-base !font-semibold border !border-white !bg-pink-100 !text-rose-600 !hover:bg-pink-200 !transition-all duration-300"
                  >
                    <FaSignOutAlt className="text-xl" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
  <div className="md:hidden bg-white shadow-lg rounded-lg mx-4 mt-2 p-4 animate-fade-in text-center">
    {/* Navigation Links */}
    <ul className="flex flex-col space-y-2 items-center">
      <li className="w-full">
        <Link 
          to="/" 
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center px-4 py-3 rounded-lg text-gray-800 hover:bg-rose-50 transition-colors w-full"
        >
          <BiHome className="text-xl text-rose-600 mr-3" />
          Home
        </Link>
      </li>
      <li className="w-full">
        <Link 
          to="/about" 
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center px-4 py-3 rounded-lg text-gray-800 hover:bg-rose-50 transition-colors w-full"
        >
          <BiInfoCircle className="text-xl text-rose-600 mr-3" />
          About
        </Link>
      </li>
      <li className="w-full">
        <Link 
          to="/hotels" 
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center px-4 py-3 rounded-lg text-gray-800 hover:bg-rose-50 transition-colors w-full"
        >
          <BiHotel className="text-xl text-rose-600 mr-3" />
          Hotels
        </Link>
      </li>
      <li className="w-full">
        <Link 
          to="/contact" 
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center px-4 py-3 rounded-lg text-gray-800 hover:bg-rose-50 transition-colors w-full"
        >
          <BiPhone className="text-xl text-rose-600 mr-3" />
          Contact
        </Link>
      </li>
    </ul>

    {/* Auth Buttons */}
    <div className="mt-4 pt-4 border-t border-rose-100">
      {!isAuthenticated ? (
        <div className="flex flex-col items-center space-y-3">
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-rose-600 !text-white hover:bg-rose-700 transition-colors w-full"
          >
            <FaUserPlus className="text-lg" />
            Register
          </Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-rose-600 text-rose-600 hover:bg-rose-50 transition-colors w-full"
          >
            <FaSignInAlt className="text-lg" />
            Login
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <Link
            to={user?.role === "admin" ? "/admindashboard/analytics" : "/dashboard"}
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors w-full"
          >
            <GrDashboard className="text-lg" />
            {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-rose-600 text-rose-600 hover:bg-rose-50 transition-colors w-full"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;
