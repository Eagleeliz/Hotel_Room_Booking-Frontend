
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Layout}from "../dashboardDesign/Layout"


export default function Dashboard() {
    return (
        <div className="h-screen">
            <Navbar />
            <Layout />
            <Footer />
        </div>

    );
} 