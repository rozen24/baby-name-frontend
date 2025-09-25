import React, { useState } from "react";
import { toast } from "react-toastify";

const AddPopup = ({ popupType, setPopupType, fetchData }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/${popupType === "user" ? "users" : popupType + "s"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Added successfully");
        fetchData(`all${popupType.charAt(0).toUpperCase() + popupType.slice(1)}s`);
        setPopupType(null);
      } else {
        toast.error("Failed to add");
      }
    } catch (err) {
      toast.error("Error submitting data");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-lg font-bold mb-4">Add {popupType}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Render input fields based on popupType */}
          {popupType === "category" && (
            <input
              type="text"
              placeholder="Category Name"
              className="w-full border p-2 rounded"
              onChange={(e) => setFormData({ name: e.target.value })}
              required
            />
          )}
          {popupType === "origin" && (
            <input
              type="text"
              placeholder="Origin Name"
              className="w-full border p-2 rounded"
              onChange={(e) => setFormData({ name: e.target.value })}
              required
            />
          )}
          {popupType === "user" && (
            <>
              <input
                type="text"
                placeholder="Username"
                className="w-full border p-2 rounded"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <select
                className="w-full border p-2 rounded"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
              </select>
            </>
          )}
          {popupType === "name" && (
            <>
              <input
                type="text"
                placeholder="Baby Name"
                className="w-full border p-2 rounded"
                onChange={(e) => setFormData({ ...formData, babyName: e.target.value })}
                required
              />
              <textarea
                placeholder="Meaning"
                className="w-full border p-2 rounded"
                onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
              />
              <select
                className="w-full border p-2 rounded"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
                <option value="Unisex">Unisex</option>
              </select>
            </>
          )}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setPopupType(null)} className="px-3 py-1 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-500 text-pink-600 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
