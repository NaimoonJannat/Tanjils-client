import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import TopNavbar from "../Components/TopNavbar";
import MainNav from "../Components/MainNav";

const Main = () => {
  return (
    <>
      <style>{`
        /*
         * WHITE GAP FIX:
         * The gap was caused by the body/layout background (#F8F5F0 cream)
         * showing through the space between the fixed nav and the first section.
         * Fix: set the layout background to match the HeroBanner's dark navy
         * so no gap is visible. Individual sections paint their own backgrounds.
         */
        body, html {
          margin: 0;
          padding: 0;
          background: #0A1628;
        }

        .layout-root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: transparent;  /* let body color show through */
        }

        /* Fixed nav stack — TopNavbar (40px) + MainNav (~60px) = ~100px total */
        .nav-stack {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
        }

        /*
         * HeroBanner uses position:relative and fills 100svh,
         * so it naturally starts right at 0 — no padding needed.
         *
         * For every OTHER page/section that is NOT the hero,
         * we add padding-top to clear the nav stack.
         * Target: direct children of .page-content that are NOT .hero-root
         */
        .page-content {
          flex: 1;
        }

        /* Non-hero pages get pushed below the nav */
        .page-content > *:not(.hero-root) {
          padding-top: 100px;
        }

        /* If first child IS the hero, no padding — hero is full-bleed */
        .page-content > .hero-root {
          padding-top: 0;
          margin-top: 0;
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
