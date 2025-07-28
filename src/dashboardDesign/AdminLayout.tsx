import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { AdminSideNav } from "./AdminSidenav";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <div className="min-h-screen w-screen overflow-x-auto flex flex-col font-sans text-gray-700 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">

      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 pt-[60px]">
        {/* Responsive Sidebar */}
        <aside
          className={`fixed z-40 top-[72px] left-0 h-[calc(100vh-72px)] w-64 bg-rose-100 border-r shadow-md overflow-y-auto transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
        >
          <AdminSideNav onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
  <div
    className="fixed inset-0 bg-transparent z-30 md:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}


        {/* Main content */}
        <div className="flex-1 flex flex-col ml-0 md:ml-64">
          <main className="flex-grow px-4 sm:px-6 pb-16 overflow-x-auto">
  <Outlet />
</main>

        </div>
      </div>
    </div>
  );
};
