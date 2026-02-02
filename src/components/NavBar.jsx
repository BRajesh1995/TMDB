import React from "react";
import Logo from "../assets/react.svg";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/watchList", label: "WatchList" },
    { to: "/tv", label: "TV" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
              <img 
                src={Logo} 
                alt="Logo" 
                className="h-8 w-8 transition-transform duration-300 group-hover:rotate-180" 
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent tracking-wide">
                TMDB
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-blue-400 bg-slate-800 scale-105"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:scale-105"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
           <div className="-mr-2 flex md:hidden">
             <button
               onClick={toggleMenu}
               className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white transition-colors"
               aria-expanded="false"
             >
               <span className="sr-only">Open main menu</span>
               {isMenuOpen ? (
                 <X className="block h-6 w-6" aria-hidden="true" />
               ) : (
                 <Menu className="block h-6 w-6" aria-hidden="true" />
               )}
             </button>
           </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top-5 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900 border-b border-slate-700 shadow-xl">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "text-blue-400 bg-slate-800"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
