import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function OriginsTable() {
  const [origins, setOrigins] = useState([]);
  const [newOrigin, setNewOrigin] = useState("");
  const [editingOrigin, setEditingOrigin] = useState(null);

  const token = localStorage.getItem("token");

  const fetchOrigins = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/origins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrigins(res.data);
    } catch {
      toast.error("Failed to load origins");
    }
  }, [token]);

  useEffect(() => {
    fetchOrigins();
  }, [fetchOrigins]);

  const addOrigin = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/origins`,
        { name: newOrigin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Origin added");
      setNewOrigin("");
      fetchOrigins();
    } catch {
      toast.error("Failed to add origin");
    }
  };

  const updateOrigin = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/origins/${editingOrigin._id}`,
        { name: editingOrigin.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Origin updated");
      setEditingOrigin(null);
      fetchOrigins();
    } catch {
      toast.error("Failed to update origin");
    }
  };

  const deleteOrigin = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/origins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Origin deleted");
      fetchOrigins();
    } catch {
      toast.error("Failed to delete origin");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Origins</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New origin"
          value={newOrigin}
          onChange={(e) => setNewOrigin(e.target.value)}
          className="border p-2 flex-1 mr-2"
        />
        <button onClick={addOrigin} className="bg-green-600 text-pink-600 px-4 py-2 rounded">
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Origin Name</th>
            <th className="p-2 border"># Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {origins.map((origin) => (
            <tr key={origin._id}>
              <td className="p-2 border">{origin.name}</td>
              <td className="p-2 border">{origin.count}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-yellow-500 text-pink-600 px-2 py-1 rounded"
                  onClick={() => setEditingOrigin(origin)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-pink-600 px-2 py-1 rounded"
                  onClick={() => deleteOrigin(origin._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingOrigin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Origin</h3>
            <input
              type="text"
              value={editingOrigin.name}
              onChange={(e) =>
                setEditingOrigin({ ...editingOrigin, name: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-pink-600 px-4 py-2 rounded"
                onClick={() => setEditingOrigin(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-pink-600 px-4 py-2 rounded"
                onClick={updateOrigin}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OriginsTable;
