// src/pages/UserDashboard.tsx
import Analytics from "../dashboard/Analytics";
import {MyPayments} from "../dashboard/MyPayments";
import MyBooking from "../dashboard/MyBooking";
import SupportTicket from "../dashboard/SupportTicket";
import MyProfile from "../dashboard/MyProfile";

const UserDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-700">Welcome to Your Dashboard</h1>

      <section>
        <Analytics />
      </section>

      <section>
        <MyPayments />
      </section>

      <section>
        <MyBooking />
      </section>

      <section>
        <SupportTicket />
      </section>
    </div>
  );
};

export default UserDashboard;
