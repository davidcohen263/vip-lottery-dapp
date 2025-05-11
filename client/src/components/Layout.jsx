import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
    <NavBar />
    <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
  </div>
);

export default Layout;
