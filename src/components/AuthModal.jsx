import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`; // backend URL

const AuthModal = ({ showModal, setShowModal , onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  // ✅ Reset form when modal opens
  useEffect(() => {
    if (showModal) {
      setForm({ username: "", email: "", password: "" });
      setError("");
    }
  }, [showModal]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ destructure from form state
  const { username, email, password } = form;

  const url = isLogin
    ? `${import.meta.env.VITE_API_URL}/auth/login`
    : `${import.meta.env.VITE_API_URL}/auth/register`;

  // ✅ send only required fields
  const payload = isLogin
    ? { email, password }
    : { username, email, password };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error);

    if (isLogin) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      if (typeof onLogin === "function") {
        onLogin(data.username, data.role, data.token);
      }
    }

    toast.message(isLogin ? "Login successful!" : "Registration successful!");
    setShowModal(false);
  } catch (err) {
    toast.error(err);
  }
};



  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-pink-500 text-pink-600 py-2 rounded-lg hover:bg-pink-600"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle */}
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-600 font-semibold hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
