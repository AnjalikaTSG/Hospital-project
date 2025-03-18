import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  console.log("location", location);
  const isActive = (path) => location.pathname === path;


  return (
    <div className="w-1/6 bg-[#5073ee] flex items-center translate-x-[-100%] md:translate-x-0 ">
      <ul className="space-y-4 p-4 w-full h-fit ">
        <li>
          <Link
            to="/"
            className={`flex items-c
              enter p-2 rounded gap-3 text-white ${
              isActive("")
                ? "bg-blue-800 font-semibold"
                : "hover:font-semibold"
            }`}
          >
            <span>Dashboard Overview</span>
          </Link>
        </li>
        <li>
          <Link
            to="/registerScreen"
            className={`flex items-center p-2 rounded gap-3 text-white ${
              isActive("/registerScreen")
                ? "bg-blue-800 font-semibold"
                : "hover:font-semibold"
            }`}
          >
            <span>Register Screen</span>
          </Link>
        </li>
        <li>
          <Link
            to="/loginScreen"
            className={`flex items-center p-2 rounded gap-3 text-white ${
              isActive("/loginScreen")
                ? "bg-blue-800 font-semibold"
                : "hover:font-semibold"
            }`}
          >
            <span>Login Screen</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center p-2 rounded gap-3 text-white ${
              isActive("/dashboard")
                ? "bg-blue-800 font-semibold"
                : "hover:font-semibold"
            }`}
          >
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/personalDetails"
            className={`flex items-center p-2 rounded gap-3 text-white ${
              isActive("/personalDetails")
                ? "bg-blue-800 font-semibold"
                : "hover:font-semibold"
            }`}
          >
            <span>Personal Details</span>
          </Link>
        </li>
        <li>
          <Link
            to="/personalDetails"
            className={`flex items-center p-2 rounded gap-3 text-white ${
              isActive("/personalDetails")
                ? "bg-blue-800 font-semibold"
                : "hover:font-semibold"
            }`}
          >
            <span>Personal Details</span>
          </Link>
        </li>
          

       
      </ul>
    </div>
  );
};

export default SideBar;
