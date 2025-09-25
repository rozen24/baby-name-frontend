import React from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-2">
      <h2 className="text-lg font-semibold">Welcome, {username} ({role})</h2>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-pink-600 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
