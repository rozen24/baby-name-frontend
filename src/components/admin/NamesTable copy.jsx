import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function NamesTable() {
  const [names, setNames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);

  const [filters, setFilters] = useState({
    gender: "",
    category: "",
    origin: "",
    search: "",
  });

  const [BabyName, setBabyName] = useState({
    name: "",
    gender: "",
    category: "",
    origin: "",
    meaning: "",
  });

  const [editingName, setEditingName] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchNames = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/names`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setNames(res.data);
    } catch {
      toast.error("Failed to load names");
    }
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(res.data);
  };

  const fetchOrigins = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/origins`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrigins(res.data);
  };

  useEffect(() => {
    fetchNames();
    fetchCategories();
    fetchOrigins();
  }, [filters]);

  const addName = async () => {
    try {
      await axios.post("${import.meta.env.VITE_API_URL}/names", BabyName, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Name added");
      setBabyName({ name: "", gender: "", category: "", origin: "", meaning: "" });
      fetchNames();
    } catch {
      toast.error("Failed to add name");
    }
  };

  const updateName = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/names/${editingName._id}`,
        editingName,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Name updated");
      setEditingName(null);
      fetchNames();
    } catch {
      toast.error("Failed to update name");
    }
  };

  const deleteName = async (id) => {
    if (role !== "superadmin") {
      return toast.error("Only superadmin can delete names");
    }
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/names/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Name deleted");
      fetchNames();
    } catch {
      toast.error("Failed to delete name");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Baby Names</h2>

      {/* Filters */}
      <div className="flex space-x-2 mb-4">
        <select
          className="border p-2"
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">All Genders</option>
          <option value="Boy">Boy</option>
          <option value="Girl">Girl</option>
          <option value="Unisex">Unisex</option>
        </select>

        {/* <select
          className="border p-2"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={filters.origin}
          onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
        >
          <option value="">All Origins</option>
          {origins.map((o) => (
            <option key={o._id} value={o.name}>
              {o.name}
            </option>
          ))}
        </select> */}

        <select
          className="border p-2"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={filters.origin}
          onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
        >
          <option value="">All Origins</option>
          {origins.map((o) => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>


        <input
          type="text"
          placeholder="Search by name"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border p-2 flex-1"
        />
      </div>

      {/* Add new name form */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Add New Name</h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="Name"
            value={BabyName.name}
            onChange={(e) => setBabyName({ ...BabyName, name: e.target.value })}
            className="border p-2"
          />
          <select
            value={BabyName.gender}
            onChange={(e) => setBabyName({ ...BabyName, gender: e.target.value })}
            className="border p-2"
          >
            <option value="">Gender</option>
            <option value="Boy">Boy</option>
            <option value="Girl">Girl</option>
            <option value="Unisex">Unisex</option>
          </select>
          {/* <select
            value={BabyName.category}
            onChange={(e) => setBabyName({ ...BabyName, category: e.target.value })}
            className="border p-2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select> */}
          <select
            value={BabyName.category}
            onChange={(e) => setBabyName({ ...BabyName, category: e.target.value })}
            className="border p-2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          {/* <select
            value={BabyName.origin}
            onChange={(e) => setBabyName({ ...BabyName, origin: e.target.value })}
            className="border p-2"
          >
            <option value="">Select Origin</option>
            {origins.map((o) => (
              <option key={o._id} value={o.name}>
                {o.name}
              </option>
            ))}
          </select> */}
          <select
            value={BabyName.origin}
            onChange={(e) => setBabyName({ ...BabyName, origin: e.target.value })}
            className="border p-2"
          >
            <option value="">Select Origin</option>
            {origins.map((o) => (
              <option key={o._id} value={o._id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Meaning"
          value={BabyName.meaning}
          onChange={(e) => setBabyName({ ...BabyName, meaning: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={addName}
          className="bg-green-600 text-pink-600 px-4 py-2 rounded"
        >
          Add Name
        </button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Origin</th>
            <th className="p-2 border">Meaning</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {names.map((n) => (
            <tr key={n._id}>
              <td className="p-2 border">{n.name}</td>
              <td className="p-2 border">{n.gender}</td>
              {/* <td className="p-2 border">{n.category}</td>
              <td className="p-2 border">{n.origin}</td> */}
              <td className="p-2 border">{n.category?.name || "-"}</td>
              <td className="p-2 border">{n.origin?.name || "-"}</td>

              <td className="p-2 border">{n.meaning}</td>
              <td className="p-2 border">{new Date(n.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-yellow-500 text-pink-600 px-2 py-1 rounded"
                  onClick={() => setEditingName(n)}
                >
                  Edit
                </button>
                {role === "superadmin" && (
                  <button
                    className="bg-red-600 text-pink-600 px-2 py-1 rounded"
                    onClick={() => deleteName(n._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit popup */}
      {editingName && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Name</h3>
            <input
              type="text"
              value={editingName.name}
              onChange={(e) =>
                setEditingName({ ...editingName, name: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <textarea
              value={editingName.meaning}
              onChange={(e) =>
                setEditingName({ ...editingName, meaning: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-pink-600 px-4 py-2 rounded"
                onClick={() => setEditingName(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-pink-600 px-4 py-2 rounded"
                onClick={updateName}
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

export default NamesTable;
