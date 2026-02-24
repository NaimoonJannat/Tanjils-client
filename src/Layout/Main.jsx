import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import TopNavbar from "../Components/TopNavbar";
import MainNav from "../Components/MainNav";

const Main = () => {
  return (
    <>
      <style>{`
        .layout-root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #F8F5F0;
        }
        /* Fixed nav stack */
        .nav-stack {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
        }
        /* Push content below fixed nav (TopNavbar 36px + MainNav ~60px) */
        .page-content {
          flex: 1;
          /* HeroBanner handles its own offset;
             for other pages, padding-top pushes content below the nav */
        }
        /* Non-hero pages: add padding so content isn't hidden under nav */
        .page-content > *:not(.hero-root) {
          padding-top: 96px;
        }
      `}</style>

      <div className="layout-root">
        {/* Fixed Navigation */}
        <div className="nav-stack">
          <TopNavbar />
          <MainNav />
        </div>

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Main;
