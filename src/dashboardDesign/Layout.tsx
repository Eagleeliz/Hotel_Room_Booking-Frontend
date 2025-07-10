import { Outlet } from 'react-router-dom';
import { SideNav } from './SideNav';

export const Layout = () => {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-160px)]"> {/* Adjusts height between Navbar and Footer */}
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r p-4">
        <SideNav />
      </aside>

      {/* Content area for selected section */}
      <main className="flex-1 p-6 bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
