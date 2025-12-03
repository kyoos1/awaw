import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";


import Landing from "./Landing/LandingPage.jsx";
import Login from "./e-commerce/Login.jsx";
import Signup from "./e-commerce/Signup.jsx";
import Dashboard from "./e-commerce/dashboard.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCurrentUser(parsed.user || null);
        setCurrentRole(parsed.role || null);
        setIsAuthenticated(!!parsed.isAuthenticated);
      } catch (e) {}
    }
  }, []);

  const handleLoginSuccess = ({ user, role }) => {
    const finalRole = role || "user";

    setCurrentUser(user);
    setCurrentRole(finalRole);
    setIsAuthenticated(true);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        user,
        role: finalRole,
        isAuthenticated: true,
      })
    );

    navigate("/dashboard", { replace: true });
  };

  const requireAuth = (element, role) => {
    if (isAuthenticated) {
      if (role && currentRole !== role) return <Navigate to="/" replace />;
      return element;
    }

    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.isAuthenticated) {
          setCurrentUser(parsed.user || null);
          setCurrentRole(parsed.role || "user");
          setIsAuthenticated(true);
          return element;
        }
      } catch (e) {}
    }

    return <Navigate to="/" replace />;
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing onLoginSuccess={handleLoginSuccess} />} />

      {/* Login */}
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />

      {/* Signup */}
      <Route
        path="/signup"
        element={<Signup onLoginSuccess={handleLoginSuccess} />}
      />

      {/* Dashboard (Protected) */}
      <Route
        path="/dashboard"
        element={requireAuth(<Dashboard />, "user")}
      />

      {/* Unknown Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
