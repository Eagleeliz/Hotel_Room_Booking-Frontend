import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Layout = () => {
  return (
     <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 font-sans text-gray-700">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex pt-[72px]">
        {/* Fixed Sidebar below navbar */}
        <aside className="fixed top-[85px] left-0 w-64 h-[calc(100vh-72px)] bg-rose-100 border-r shadow-md z-40 overflow-y-auto">
          <SideNav />
        </aside>

        {/* Main content area */}
        <div className="ml-64 w-full">
          <main className="min-h-[calc(100vh-72px)] px-6 pt-6 pb-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
