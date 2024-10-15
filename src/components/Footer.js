import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-400">
              At FitPro, we are dedicated to helping you achieve your health and
              fitness goals. Our app provides personalized workout plans,
              nutrition tracking, and community support to empower your journey.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-orange-400">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-orange-400">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-orange-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-2xl hover:text-orange-400" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-2xl hover:text-orange-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl hover:text-orange-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl hover:text-orange-400" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} FitPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
