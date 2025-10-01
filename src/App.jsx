import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Names from "./pages/Names";
import AdminDashboard from "./pages/AdminDashboard"; // full dashboard with sidebar + routing
import LoginPage from "./pages/LoginPage"; // login page for auth
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Just for frontend
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NamesPage from "./pages/NamesPage";
import SingleNamePage from "./pages/SingleNamePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="">
        {/* <h1 className="text-3xl font-bold text-center mb-6">👶 Baby Names</h1> */}
        <Routes>
          {/* Admin dashboard (protected) - No Layout wrapper */}
          <Route
            path="/admin/*"
            element={
              token ? <AdminDashboard /> : <Navigate to="/login" replace />
            }
          />
          
          {/* Auth routes - No Layout wrapper */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Frontend routes with Layout wrapper */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/names" element={<NamesPage />} />
                <Route path="/names/:id" element={<SingleNamePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          } />
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
