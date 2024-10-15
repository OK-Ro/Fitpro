"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa"; // Importing a fitness icon

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About Us" },
    { href: "#blog", label: "Blog" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <FaDumbbell className="h-8 w-8 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-800">FitPro</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              to="#signin"
              className="hidden md:inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
            >
              Sign In
            </Link>
            <Link
              to="#login"
              className="hidden md:inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition duration-200 shadow-md"
            >
              Login
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col px-5">
              <Link
                to="#signin"
                className="block w-full px-5 py-3 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                Sign In
              </Link>
              <Link
                to="#login"
                className="block w-full mt-2 px-5 py-3 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
