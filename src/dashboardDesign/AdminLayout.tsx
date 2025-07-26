import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AdminSideNav } from "./AdminSidenav";

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 font-sans text-gray-700">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Wrapper for sidebar and content */}
      <div className="flex pt-[72px]">
        {/* Sidebar */}
        <aside className="fixed top-[72px] left-0 w-64 h-[calc(100vh-72px)] bg-rose-100 border-r shadow-md z-40 overflow-y-auto">
          <AdminSideNav />
        </aside>

        {/* Main Content (pushed right by sidebar width) */}
        <div className="ml-64 flex-1 flex flex-col min-h-[calc(100vh-72px)]">
          <main className="flex-grow px-6 pt-6 pb-16 w-full">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
