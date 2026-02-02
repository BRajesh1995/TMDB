import React from "react";
import Logo from "../assets/react.svg";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-2 group">
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

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-400 bg-slate-800 scale-105"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:scale-105"
                  }`
                }
              >
                Home
              </NavLink>
              
              <NavLink
                to="/watchList"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-400 bg-slate-800 scale-105"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:scale-105"
                  }`
                }
              >
                 WatchList
              </NavLink>

              <NavLink
                to="/tv"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-400 bg-slate-800 scale-105"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:scale-105"
                  }`
                }
              >
                 TV
              </NavLink>
            </div>
          </div>
          
          {/* Mobile Menu Button - Placeholder for future mobile responsiveness if needed */}
           <div className="-mr-2 flex md:hidden">
             {/* You could add a hamburger menu toggle here */}
           </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
