import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-md shadow-lg border-b border-purple-800">
    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-400">💎 Crypto Lottery</h1>
      <div className="flex space-x-6 items-center text-sm font-medium">
        <Link to="/" className="hover:text-purple-300">🏠 בית</Link>
        <Link to="/lottery/1" className="hover:text-purple-300">🎟️ הגרלה</Link>
        <Link to="/dashboard" className="hover:text-purple-300">📊 הכרטיסים שלי</Link>
        <Link to="/admin" className="hover:text-purple-300">🛠️ אדמין</Link>
        <button className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 rounded text-black font-bold shadow-lg hover:from-pink-500 hover:to-purple-700 transition">
          התחבר לארנק
        </button>
      </div>
    </div>
  </nav>
);

export default NavBar;
