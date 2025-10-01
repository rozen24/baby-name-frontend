import React, { useState } from "react";
import { toast } from "react-toastify";

const EditPopup = ({ item, setEditItem, activeView, fetchData }) => {
  const [formData, setFormData] = useState(item);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const type = activeView.replace("all", "").toLowerCase();
      const res = await fetch(`/api/admin/${type}/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Updated successfully");
        fetchData(activeView);
        setEditItem(null);
      } else {
        toast.error("Failed to update");
      }
    } catch (err) {
      toast.error("Error updating data");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-lg font-bold mb-4">Edit {activeView.slice(3)}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* For names */}
          {activeView === "allNames" && (
            <>
              <input
                type="text"
                placeholder="Baby Name"
                className="w-full border p-2 rounded"
                value={formData.babyName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, babyName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Meaning"
                className="w-full border p-2 rounded"
                value={formData.meaning || ""}
                onChange={(e) =>
                  setFormData({ ...formData, meaning: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <select
                className="w-full border p-2 rounded"
                value={formData.gender || ""}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
                <option value="Unisex">Unisex</option>
              </select>
            </>
          )}

          {/* For categories */}
          {activeView === "allCategories" && (
            <input
              type="text"
              placeholder="Category Name"
              className="w-full border p-2 rounded"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}

          {/* For origins */}
          {activeView === "allOrigins" && (
            <input
              type="text"
              placeholder="Origin Name"
              className="w-full border p-2 rounded"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}

          {/* For users (superAdmin only) */}
          {activeView === "allUsers" && (
            <select
              className="w-full border p-2 rounded"
              value={formData.role || ""}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
            </select>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setEditItem(null)}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-pink-600 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
