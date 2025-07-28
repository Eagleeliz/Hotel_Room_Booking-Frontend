import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const LogOUt: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    MySwal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log out",
      cancelButtonText: "Cancel",
      background: '#f8fafc',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear all authentication state
        dispatch(clearCredentials());
        
        // Clear all stored tokens and data
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        localStorage.removeItem('persist:root'); // If using redux-persist
        
        // Show success message
        MySwal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
          timer: 1500,
          showConfirmButton: false,
          background: '#f8fafc',
        }).then(() => {
          navigate("/"); // Redirect to login page
        });
      } else {
        // If cancelled, go back to admin dashboard
        navigate("/admindashboard");
      }
    });
  }, [dispatch, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-gray-600 animate-pulse">
        Processing logout request...
      </div>
    </div>
  );
};

export default LogOUt;