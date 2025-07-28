import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SideNav } from "./SideNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-700 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      {/* Top Navbar (Fixed) */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 pt-[72px]">
        {/* Responsive Sidebar */}
        <aside
          className={`fixed z-40 top-[72px] left-0 h-[calc(100vh-72px)] w-64 bg-rose-100 border-r shadow-md overflow-y-auto transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
        >
          <SideNav onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-0 md:ml-64">
          <main className="flex-grow px-4 sm:px-6 pt-6 pb-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
