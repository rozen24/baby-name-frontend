import { useState, useEffect } from "react";
import { Menu, Search, User } from "lucide-react";
import AuthModal from "./AuthModal";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [auth, setAuth] = useState({ username: null, role: null, token: null });
  const navigate = useNavigate();

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (token) setAuth({ token, role, username });
  }, []);

  // ✅ Login callback
  const handleLogin = (username, role, token) => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);
    }

    setAuth({ username, role, token });
    setShowModal(false);

    // ✅ Direct redirect for admins
    if (role === "superadmin" || role === "editor") {
      navigate("/adminDashboard");
    }
  };

  // ✅ Logout clears localStorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setAuth({ username: null, role: null, token: null });
    navigate("/");
  };

  return (
    <header className="bg-pink-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-pink-600">
          <Link to="/">👶 BabyNames</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-pink-600">Boys</a>
          <a href="#" className="hover:text-pink-600">Girls</a>
          <a href="#" className="hover:text-pink-600">Unisex</a>
          <a href="#" className="hover:text-pink-600">By Alphabet</a>
        </nav>

        {/* Search + Auth */}
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 cursor-pointer hover:text-pink-600" />

          {auth.username ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Hi, {auth.username} ({auth.role})
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-3 py-1.5 bg-pink-500 text-pink-600 rounded-lg hover:bg-pink-600"
            >
              <User className="w-4 h-4 mr-1" /> Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-white px-4 pb-3 space-y-2 shadow-md">
          <a href="#" className="block hover:text-pink-600">Boys</a>
          <a href="#" className="block hover:text-pink-600">Girls</a>
          <a href="#" className="block hover:text-pink-600">Unisex</a>
          <a href="#" className="block hover:text-pink-600">By Alphabet</a>
        </nav>
      )}

      {/* Auth Modal */}
      <AuthModal
        showModal={showModal}
        setShowModal={setShowModal}
        onLogin={handleLogin}
      />
    </header>
  );
};

export default Header;
