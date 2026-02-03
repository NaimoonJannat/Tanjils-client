import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import TopNavbar from "../Components/TopNavbar";
import Navbar2 from "../Components/Navbar2";
import MainNav from "../Components/MainNav";

const Main = () => {
  return (
    <div>
      {/* FIXED NAV STACK */}
      <div className="fixed top-0 left-0 w-full z-50">
        <TopNavbar />
        <MainNav />
      </div>

      {/* Page Content */}
     <div className="min-h-[calc(100vh-306px)]">
  <Outlet />
</div>


      <Footer />
    </div>
  );
};

export default Main;
