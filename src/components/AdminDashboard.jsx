import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TableView from "./TableView";
import AddPopup from "./popups/AddPopup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = ({ user }) => {
  const [activeView, setActiveView] = useState("allNames");
  const [popupType, setPopupType] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(activeView);
  }, [activeView]);

  const fetchData = async (view) => {
    
    try {
      let url = "";
      if (view === "allNames") url = "/api/admin/names";
      if (view === "allCategories") url = "/api/admin/categories";
      if (view === "allOrigins") url = "/api/admin/origins";
      if (view === "allUsers") url = "/api/admin/users";

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await res.json();
      setData(result);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setActiveView={setActiveView} setPopupType={setPopupType} user={user} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <div>
            <span className="mr-4">Hi, {user.username}</span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="px-3 py-1 bg-red-500 text-pink-600 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <TableView activeView={activeView} data={data} user={user} fetchData={fetchData} />
        </main>

        {/* Popup Modal */}
        {popupType && (
          <AddPopup
            popupType={popupType}
            setPopupType={setPopupType}
            fetchData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
