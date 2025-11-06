import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Logo from "/src/assets/Logo.png";
import LoginPage from '/src/assets/LoginPage.png';
import Register from "./Register";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import Contact from "./Contact";
import Portfolio from "./Portfolio";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // scroll listener (for blur background)
  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <div>
        {/* Navbar */}
        <div
          className={`fixed top-0 w-full text-white z-50 transition-all duration-300 ${
            scrollY > 50
              ? "bg-black/90 backdrop-blur-md border-b border-white border-opacity-20"
              : "bg-black"
          }`}
        >
          <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <div className="shrink-0 flex items-center">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-24 w-24 rounded-full mr-2 mt-1 pt-2"
                />
                <span className="text-2xl sm:text-3xl md:text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PortView
                </span>
              </div>

              {/* Links */}
              <nav>
                <div className="hidden md:flex items-center space-x-12 cursor-pointer">
                  {[
                    { name: "Home", to: "/" },
                    { name: "Dashboard", to: "/dashboard" },
                    { name: "Portfolio", to: "/portfolio" },
                    { name: "Analytics", to: "/analytics" },
                    { name: "Contact Us", to: "/contact" },
                  ].map((link) => (
                    <Link
                      key={link.name}
                      to={link.to}
                      onClick={() => {
                        closeMenu();
                        window.scrollTo(0, 0);
                      }}
                      className={`text-gray-300 hover:text-white transition-all duration-300 font-medium relative group ${
                        scrollY > 50 ? "hover:text-purple-400" : ""
                      }`}
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ))}

                  {/* Get Started Button */}
                  <Link
                    to="/dashboard"
                    onClick={() => closeMenu()}
                    className="bg-linear-to-r from-purple-500  hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-purple-600/30"
                  >
                    Get Started
                  </Link>

                  {/* Login/Signup Button */}
                  <Link
                    to="/login"
                    onClick={() => {
                      closeMenu();
                      window.scrollTo(0, 0);
                    }}
                    className="px-4 py-2 hover:to-pink-700 transition-all duration-200"
                  >
                    <img
                      src={LoginPage}
                      alt="Login"
                      className="h-12 w-12 rounded-full"
                    />
                  </Link>
                </div>
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className="flex flex-col text-gray-300 gap-[4.5px] hover:text-white focus:outline-none cursor-pointer"
                >
                  <div
                    className={`w-6 h-1 bg-gray-400 rounded-sm ${
                      menuOpen ? "rotate-45" : ""
                    } origin-left ease-in-out duration-500`}
                  ></div>
                  <div
                    className={`w-6 h-1 bg-gray-400 rounded-sm ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  ></div>
                  <div
                    className={`w-6 h-1 bg-gray-400 rounded-sm ${
                      menuOpen ? "-rotate-45" : ""
                    } origin-left ease-in-out duration-500`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          {menuOpen && (
            <div className="fixed top-16 left-0 w-full z-40 bg-black/95 backdrop-blur-sm border-t border-white border-opacity-10 transition-all duration-500 ease-in-out">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-sm border-t border-white border-opacity-10">
                {[
                  { name: "Home", to: "/" },
                  { name: "Dashboard", to: "/dashboard" },
                  { name: "Portfolio", to: "/portfolio" },
                  { name: "Analytics", to: "/analytics" },   
                  { name: "Contact Us", to: "/contact" },
                ].map((link) => (
                  <div
                    key={link.name}
                    className="relative w-full text-center group py-4"
                  >
                    <Link
                      to={link.to}
                      onClick={() => {
                        closeMenu();
                        window.scrollTo(0, 0);
                      }}
                      className="text-gray-300 hover:text-purple-300 font-semibold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
                  </div>
                ))}
                <Link
                  to="/program"
                  onClick={() => {
                    closeMenu();
                    window.scrollTo(0, 0);
                  }}
                  className="block text-center px-4 py-3 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all duration-300 mt-3 transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Routes (page content) */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics/>}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Register />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Navbar;
