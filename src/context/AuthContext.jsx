// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    const storedUser = sessionStorage.getItem("authUser");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        // Optional: axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } catch (err) {
        console.error("Invalid stored auth data", err);
        logout();
      }
    }
    setLoading(false);
  }, []); // ← no deps needed here since logout is stable

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

      // Extract from the actual structure
      const apiToken = response?.data?.access_token;
      const userData = response?.data?.user;

      if (apiToken && userData) {
        sessionStorage.setItem("authToken", apiToken);
        sessionStorage.setItem("authUser", JSON.stringify(userData));

        setToken(apiToken);
        setUser(userData);

        // Optional: set axios default header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;

        toast.success(response?.message || "Login successful!");
        navigate("/attendancedashboard"); // ← your desired route
        return true;
      } else {
        throw new Error(
          response?.message || "Login failed - missing token or user data",
        );
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMsg);
      console.error("Login error:", err);
      return false;
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const payload = { name, email, phone, password };

      const res = await axios.post(`${BASE_URL}/register`, payload);

      toast.success(
        res.data?.message || "Registration successful! Please sign in.",
      );
      navigate("/signin"); // redirect to login after register
      return true;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Registration failed. Try again.";
      toast.error(errorMsg);
      console.error("Register error:", err);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
    toast.info("You have been logged out");
    navigate("/signin");
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
