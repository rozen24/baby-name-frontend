import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import UsersTable from "../components/admin/UsersTable";
import CategoriesTable from "../components/admin/CategoriesTable";
import OriginsTable from "../components/admin/OriginsTable";
import NamesTable from "../components/admin/NamesTable";
// import CategoriesPage from "../components/admin/CategoriesPage";
// import OriginsPage from "../components/admin/OriginsPage";
// import NamesPage from "../components/admin/NamesPage";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Topbar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/users" element={<UsersTable />} />
            <Route path="/categories" element={<CategoriesTable/>} />
            <Route path="/origins" element={<OriginsTable />} />
            <Route path="/names" element={<NamesTable/>} />
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/admin/names" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
