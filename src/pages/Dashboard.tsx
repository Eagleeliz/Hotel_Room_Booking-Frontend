import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Layout } from "../dashboardDesign/Layout";

export default function Dashboard() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Layout />
      </div>
      <Footer />
    </div>
  );
}