import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 📖 Fetch users
  const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Check if API returns { users: [...] } or just [...]
        const data = Array.isArray(res.data) ? res.data : res.data.users;

        setUsers(data || []);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        setUsers([]);
        setLoading(false);
      }
    };
  useEffect(() => {
    
    fetchUsers();
  }, []);


  // ➕ Handle Add User
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User created successfully");
      setShowAddModal(false);
      setFormData({ username: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create user");
    }
  };

  // ✏️ Handle Edit Role
  const handleEditRole = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${selectedUser._id}`,
        { role: formData.role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User role updated");
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update role");
    }
  };

  // ❌ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete user");
    }
  };

  if (loading) return <Loader text="PLease Wait...Users" />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Users</h2>
        {role === "superadmin" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-pink-600 px-4 py-2 rounded-md"
          >
            + Add User
          </button>
        )}
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border"># Names</th>
              {role === "superadmin" && <th className="px-4 py-2 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.nameCount}</td>
                {role === "superadmin" && (
                  <td className="border px-4 py-2">
                    <button
                      className="text-yellow-600 mr-2"
                      onClick={() => {
                        setSelectedUser(user);
                        setFormData({ role: user.role });
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➕ Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add User</h3>
            <form onSubmit={handleAddUser} className="space-y-3">
              <input
                type="text"
                placeholder="Username"
                className="border p-2 w-full"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <select
                className="border p-2 w-full"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
              </select>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 border rounded"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-pink-600 px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✏️ Edit Role Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit User Role</h3>
            <form onSubmit={handleEditRole} className="space-y-3">
              <select
                className="border p-2 w-full"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="superadmin">Super Admin</option>
              </select>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 border rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-yellow-600 text-pink-600 px-4 py-2 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
