import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Names from "./pages/Names";
import AdminDashboard from "./pages/AdminDashboard"; // full dashboard with sidebar + routing
import LoginPage from "./pages/LoginPage"; // login page for auth
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");


  return (
    <Router>  
      <div className="">
        {/* <h1 className="text-3xl font-bold text-center mb-6">👶 Baby Names</h1> */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/names" element={<Names />} />

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin dashboard (protected) */}
          <Route
            path="/admin/*"
            element={token ? <AdminDashboard /> : <Navigate to="/login" replace />}
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* 🔔 Toast messages go here */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;

