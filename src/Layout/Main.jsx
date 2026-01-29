import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import TopNavbar from "../Components/TopNavbar";
import Navbar2 from "../Components/Navbar2";

const Main = () => {
    return (
        <div>
            <TopNavbar></TopNavbar>
            {/* Navbar */}
            <Navbar2></Navbar2>
            {/* outlet */}
            <div className="min-h-[calc(100vh-306px)]">
                <Outlet></Outlet>
            </div>
            {/* footer */}
            <Footer></Footer>
        </div>
    );
};

export default Main;