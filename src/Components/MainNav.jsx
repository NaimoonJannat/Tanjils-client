import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <nav
  className={`w-full transition-all duration-300 ${
    scrolled ? "bg-black py-3 shadow-lg" : "bg-black/40 py-6"
  }`}
>


      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold">
            Dr. ASM Tanjilur Rahman
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-white font-medium">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/appointments" className="hover:text-primary transition">
                Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="btn btn-primary btn-sm rounded-full"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Menu */}
          <div className="md:hidden dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost text-white">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 p-4 shadow bg-black text-white rounded-box w-52 space-y-3"
            >
              <li>
                <Link to="/" className="block hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="block hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="block hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="block hover:text-primary">
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="btn btn-primary btn-sm w-full mt-2"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
