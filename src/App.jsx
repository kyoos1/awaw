import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

import Landing from "./Landing/LandingPage.jsx";
import Login from "./e-commerce/Login.jsx";
import Signup from "./e-commerce/Signup.jsx";
import Dashboard from "./e-commerce/dashboard.jsx";
import Profile from "./e-commerce/Profile.jsx";
import Cart from "./e-commerce/cart.jsx";
import Admin from "./admin/admin.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        loadUserProfile(session.user.id);
      } else {
        setCurrentUser(null);
        setCurrentRole(null);
        setIsAuthenticated(false);
        localStorage.removeItem("auth");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        await loadUserProfile(session.user.id);
      }
    } catch (error) {
      console.error("Session check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (userId) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      const role = profileData?.role || 'user';
      const email = profileData?.email || '';

      setCurrentUser(email);
      setCurrentRole(role);
      setIsAuthenticated(true);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: email,
          role: role,
          isAuthenticated: true,
          userId: userId
        })
      );
    } catch (error) {
      console.error("Profile load error:", error);
      setLoading(false);
    }
  };

  const handleLoginSuccess = async ({ user, role, userId }) => {
    setCurrentUser(user);
    setCurrentRole(role);
    setIsAuthenticated(true);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        user,
        role,
        isAuthenticated: true,
        userId
      })
    );

    // Redirect after login
    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  // Protect routes
  const requireAuth = (element, requiredRole) => {
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      );
    }

    if (isAuthenticated) {
      // If role mismatch
      if (requiredRole && currentRole !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
      }
      return element;
    }

    return <Navigate to="/" replace />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={<Landing onLoginSuccess={handleLoginSuccess} />}
      />

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

      {/* Dashboard (Authenticated: ANY ROLE) */}
      <Route
        path="/dashboard"
        element={requireAuth(<Dashboard />)}
      />

      {/* Profile */}
      <Route path="/profile" element={requireAuth(<Profile />)} />

      {/* Cart */}
      <Route path="/cart" element={requireAuth(<Cart />)} />

      {/* Admin (Admin ONLY) */}
      <Route
        path="/admin"
        element={requireAuth(<Admin />, "admin")}
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;