import React from "react";
import Logo from "../assets/react.svg";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex space-x-8 items-center pl-3 py-4">
        <li>
          <NavLink to="/">
            <img src={Logo} alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => `text-3xl font-bold ${isActive ? "text-blue-500 underline" : "text-black"}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watchList"
            className={({ isActive }) => `text-3xl font-bold ${isActive ? "text-blue-500 underline" : "text-black"}`}
          >
            WatchList
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
