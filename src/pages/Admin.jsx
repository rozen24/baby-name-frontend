import { useState } from "react";
import API from "../services/api";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [form, setForm] = useState({ name: "", meaning: "", gender: "Boy" });

  // 🔹 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      alert("Login successful");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  // 🔹 Handle Add Name
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/names", form);
      alert("Name added!");
    } catch (err) {
      alert(err.response?.data?.error || "Error adding name");
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Admin Panel</h2>

      {!isLoggedIn ? (
        // 🔹 Login Form
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 w-full"
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <button className="bg-blue-500 text-pink-600 px-4 py-2 rounded w-full">
            Login
          </button>
        </form>
      ) : (
        // 🔹 Admin Dashboard
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-pink-600 px-3 py-1 rounded mb-4"
          >
            Logout
          </button>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Meaning"
              className="border p-2 w-full"
              onChange={(e) => setForm({ ...form, meaning: e.target.value })}
            />
            <select
              className="border p-2 w-full"
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option>Boy</option>
              <option>Girl</option>
              <option>Unisex</option>
            </select>
            <button className="bg-green-500 text-pink-600 px-4 py-2 rounded">
              Add Name
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
