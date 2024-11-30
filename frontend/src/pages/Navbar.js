import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate to the login page
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white px-4 py-3 flex justify-between items-center shadow-md">
      {/* Left Side - Title */}
      <h1 className="text-black text-lg font-semibold">Employee Details</h1>

      {/* Right Side - Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
      >
        <FiLogOut className="mr-2 text-xl" />
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
