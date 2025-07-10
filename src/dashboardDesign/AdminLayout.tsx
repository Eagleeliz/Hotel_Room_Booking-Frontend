import { Outlet } from 'react-router-dom';
import Card from './Card';
import { AdminSideNav } from './AdminSidenav';

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 font-sans text-gray-700">
      {/* Sidebar */}
    <aside className="min-w-[12%] h-screen border-r border-gray-200 shadow-md bg-rose-100">
  <AdminSideNav />
</aside>


      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="bg-white shadow-md rounded-xl">
          <Outlet />
        </Card>
      </main>
    </div>
  );
};
