import React from 'react';
import { useGetMyProfileQuery } from '../features/api/userApi';

const MyDashboard: React.FC = () => {
  const { data: user, isLoading, isError } = useGetMyProfileQuery();

  if (isLoading) return <p className="text-center mt-10">Loading your dashboard...</p>;
  if (isError) return <p className="text-center text-red-600 mt-10">Failed to load profile.</p>;

  return (
    <div className="p-6 md:p-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-rose-100 via-pink-200 to-rose-300 text-gray-900 p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-2xl md:text-4xl font-bold">
          Welcome back, <span className="text-rose-800">{user?.firstName}</span>!
        </h2>
        <p className="text-sm mt-2">
          Here's your dashboard where you can view and manage your profile, tickets, and more.
        </p>
      </div>

      Info Cards
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"> */}
        {/* Your Info Card */}
        {/* <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-rose-700 mb-3">Your Info</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.contactPhone}</p>
          <p><strong>Address:</strong> {user?.address}</p>
        </div> */}

        {/* Activity Placeholder */}
        {/* <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-rose-700 mb-3">Activity</h3>
          <p>You can add a calendar, booking stats, or analytics here in the future.</p>
        </div>
      </div> */}
    </div>
  );
};

export default MyDashboard;
