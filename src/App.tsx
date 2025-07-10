import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hotels from "./pages/Hotels";

import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Analytics from "./dashboard/Analytics";
import MyBooking from "./dashboard/MyBooking";
import { MyPayments } from "./dashboard/MyPayments";
import SupportTicket from "./dashboard/SupportTicket";
import MyProfile from "./dashboard/MyProfile";
import LogOut from "./dashboard/LogOut";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <Error />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <Error />,
  },
  {
    path: "/hotels",
    element: <Hotels />,
    errorElement: <Error />,
  },
  // Dashboard with nested routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true, // default route: /dashboard
        element: <Analytics />,
      },
      {
        path: "orders", // /dashboard/orders
        element: <MyBooking />,
      },
      {
        path: "payments", // /dashboard/payments
        element: <MyPayments />,
      },
      {
        path: "support-tickets", // /dashboard/support-tickets
        element: <SupportTicket />,
      },
      {
        path: "profile", // /dashboard/profile
        element: <MyProfile />,
      },
      {
        path: "logout", // /dashboard/logout
        element: <LogOut />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
