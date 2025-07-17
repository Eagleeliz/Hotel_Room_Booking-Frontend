import { Outlet } from 'react-router-dom';
import { SideNav } from './SideNav';

export const Layout = () => {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-160px)]">
      <aside className="w-70 bg-rose-100 shadow-md border-r h-screen  p-4">
        <SideNav />
      </aside>
      <main className="flex-1 p-6 bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
