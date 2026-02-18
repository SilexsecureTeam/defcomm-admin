import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://backend.defcomm.ng/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load auth data from sessionStorage
  const loadAuth = useCallback(() => {
    const storedToken = sessionStorage.getItem("authToken");
    const storedUser = sessionStorage.getItem("authUser");

    // console.log("[AuthContext] Loading from storage → token:", !!storedToken);
    // console.log("[loadAuth] Read from storage → token:", storedToken?.substring(0,10) + "..." || "missing");
    // console.log("[loadAuth] Setting context token to:", !!storedToken);

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      } catch (err) {
        console.error("[AuthContext] Invalid stored data", err);
        logout();
      }
    } else {
      setToken(null);
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    // Initial load
    loadAuth();

    // Listen for changes in storage (covers same-tab login/logout)
    const handleStorage = (e) => {
      if (e.key === "authToken" || e.key === "authUser") {
        // console.log("[AuthContext] Storage changed → re-loading");
        loadAuth();
      }
    };

    window.addEventListener("storage", handleStorage);

    // Extra safety: re-check after short delay (helps race conditions)
    const timer = setTimeout(loadAuth, 300);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearTimeout(timer);
    };
  }, [loadAuth]);

  const login = async (email, password) => {
    try {
      const payload = {
        email,
        password,
        device_type: "web",
        device_token: "browser-token",
      };

      const res = await axios.post(`${BASE_URL}/login`, payload);
      const response = res.data;

      const apiToken = response?.data?.access_token;
      const userData = response?.data?.user;

      if (apiToken && userData) {
        // Save to storage
        sessionStorage.setItem("authToken", apiToken);
        sessionStorage.setItem("authUser", JSON.stringify(userData));

        // Update context state right away (most important fix)
        setToken(apiToken);
        setUser(userData);
        axios.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;

        // console.log("[AuthContext] Login → context updated");

        toast.success(response?.message || "Login successful!");

        navigate("/attendancedashboard", { replace: true });
        return true;
      } else {
        throw new Error(response?.message || "Missing token/user");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Login failed";
      toast.error(msg);
      console.error("Login error:", err);
      return false;
    }
  };

  // Your existing register function (unchanged)
  const register = async (name, email, phone, password) => {
    try {
      const payload = { name, email, phone, password };
      const res = await axios.post(`${BASE_URL}/register`, payload);
      toast.success(res.data?.message || "Registration successful! Please sign in.");
      navigate("/signin");
      return true;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Registration failed";
      toast.error(msg);
      console.error("Register error:", err);
      return false;
    }
  };

  const logout = () => {
      // console.trace("[AUTH] LOGOUT CALLED FROM HERE — check stack trace below");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    toast.info("You have been logged out");
    navigate("/signin", { replace: true });
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    setToken,  // Added this
    setUser,   // Added this
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};