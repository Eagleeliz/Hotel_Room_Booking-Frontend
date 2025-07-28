// src/dashboard/LogOut.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../features/auth/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const LogOut: React.FC = () => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCredentials());
        MySwal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been successfully logged out.",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/"); // ✅ Redirect to home page
        });
      } else {
        navigate("/dashboard"); // 👈 Go back to previous page (e.g. dashboard)
      }
    });
  }, [dispatch, navigate]);

  return <div className="text-center mt-10 text-gray-600">Preparing logout...</div>;
};

export default LogOut;
