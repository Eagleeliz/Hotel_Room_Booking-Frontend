import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 font-sans text-gray-700 flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-1 pt-[72px]">
        {/* Fixed Sidebar */}
        <aside className="w-64 fixed top-[72px] left-0 h-[calc(100vh-72px)] bg-rose-100 border-r shadow-md z-40 overflow-y-auto">
          <SideNav />
        </aside>

        {/* Main Content Area */}
        <div className="ml-64 flex-1 flex flex-col">
          <main className="flex-grow px-6 pt-6 pb-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
