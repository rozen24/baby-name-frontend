import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import EditPopup from "./popups/EditPopup";

const TableView = ({ activeView, data, user, fetchData }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [originFilter, setOriginFilter] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    setFilteredData(
      data.filter((row) => {
        const matchesSearch = search
          ? row.babyName?.toLowerCase().includes(search.toLowerCase())
          : true;
        const matchesGender = genderFilter ? row.gender === genderFilter : true;
        const matchesCategory = categoryFilter ? row.category?.name === categoryFilter : true;
        const matchesOrigin = originFilter ? row.origin?.name === originFilter : true;

        return matchesSearch && matchesGender && matchesCategory && matchesOrigin;
      })
    );
  }, [data, search, genderFilter, categoryFilter, originFilter]);

  const handleDelete = async (id, type) => {
    try {
      await fetch(`/api/admin/${type}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Deleted successfully");
      fetchData(activeView);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <div className="bg-white shadow rounded p-4 overflow-auto">
      {/* Filters + Search (only for names view) */}
      {activeView === "allNames" && (
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="border p-2 rounded flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Boy">Boy</option>
            <option value="Girl">Girl</option>
            <option value="Unisex">Unisex</option>
          </select>
          <select
            className="border p-2 rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {[...new Set(data.map((d) => d.category?.name))].map(
              (cat) =>
                cat && (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                )
            )}
          </select>
          <select
            className="border p-2 rounded"
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
          >
            <option value="">All Origins</option>
            {[...new Set(data.map((d) => d.origin?.name))].map(
              (org) =>
                org && (
                  <option key={org} value={org}>
                    {org}
                  </option>
                )
            )}
          </select>
        </div>
      )}

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(data[0])
              .filter((key) => key !== "_id" && key !== "__v")
              .map((key) => (
                <th key={key} className="p-2 text-left capitalize">
                  {key}
                </th>
              ))}
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row._id} className="border-b hover:bg-gray-50">
              {Object.entries(row)
                .filter(([key]) => key !== "_id" && key !== "__v")
                .map(([key, val]) => (
                  <td key={key} className="p-2">
                    {typeof val === "object" && val?.name ? val.name : val.toString()}
                  </td>
                ))}
              <td className="p-2 flex space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setEditItem(row)}
                >
                  <FaEdit />
                </button>
                {user.role === "superAdmin" && (
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      handleDelete(row._id, activeView.replace("all", "").toLowerCase())
                    }
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit popup */}
      {editItem && (
        <EditPopup
          item={editItem}
          setEditItem={setEditItem}
          activeView={activeView}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default TableView;
