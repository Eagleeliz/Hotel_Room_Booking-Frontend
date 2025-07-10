import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Public pages
import { Home } from "./pages/Home";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hotels from "./pages/Hotels";


// Protected components and layouts
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard"; // User dashboard wrapper
import AdminDashboard from "./pages/AdminDashboard"; // Admin dashboard wrapper

// User dashboard pages
import Analytics from "./dashboard/Analytics";
import MyBooking from "./dashboard/MyBooking";
import { MyPayments } from "./dashboard/MyPayments";
import SupportTicket from "./dashboard/SupportTicket";
import MyProfile from "./dashboard/MyProfile";
import LogOut from "./dashboard/LogOut";

// Admin dashboard pages
import AllUsers from "./components/AdminDashboard/AllUsers";
import AllBookings from "./components/AdminDashboard/AllBookings";
import AdminHotels from "./components/AdminDashboard/Hotels";
import AdminAnalytics from "./components/AdminDashboard/Analytics";
import AdminProfile from "./components/AdminDashboard/MyProfile";
import AllPayments from "./components/AdminDashboard/AllPayments";
import RoomsPage from "./pages/RoomsPage";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/hotels",
    element: <Hotels />,
  },
  {
  path: "/hotels/:hotelId/rooms",
  element: <RoomsPage />,
},

  // ✅ User Dashboard (protected)
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Analytics /> },
      { path: "orders", element: <MyBooking /> },
      { path: "payments", element: <MyPayments /> },
      { path: "support-tickets", element: <SupportTicket /> },
      { path: "profile", element: <MyProfile /> },
      { path: "logout", element: <LogOut /> },
    ],
  },

  // Admin Dashboard 
  {
    path: "/admindashboard",
    element: (
      <ProtectedRoute >
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminAnalytics /> },
      { path: "analytics", element: <AdminAnalytics /> },
      { path: "users", element: <AllUsers /> },
      { path: "hotels", element: <AdminHotels /> },
      { path: "all-bookings", element: <AllBookings /> },
      { path: "my-bookings", element: <MyBooking /> }, // Optional if admin has bookings
      { path: "my-payments", element: <MyPayments /> },
        { path: "all-payments", element: <AllPayments /> },
      { path: "profile", element: <AdminProfile /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
