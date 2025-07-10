
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {AdminLayout}from "../dashboardDesign/AdminLayout"


export default function Dashboard() {
    return (
        <div className="h-screen">
            <Navbar />
            <AdminLayout />
            <Footer />
        </div>

    );
} 