import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL; 
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null); // holds the user
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Connect socket
  const connectSocket = useCallback((userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, { query: { userId: userData._id } });
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => setOnlineUsers(userIds));
    newSocket.on("disconnect", () => setSocket(null));
  }, [socket?.connected]);

  // 🔹 Check auth (run only on page load)
  const checkAuth = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get("/api/auth/check");
      if (data?.user) {
        setAuthUser(data.user);
        connectSocket(data.user);
      } else {
        throw new Error("No user returned");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      setToken(null);
      setAuthUser(null);
      toast.error("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  }, [token, connectSocket]);

  // 🔹 Login / Signup
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      if (data?.token && data?.user) {
        // ✅ SET TOKEN HEADER IMMEDIATELY
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        // ✅ SET USER STATE AFTER HEADER
        setAuthUser(data.user);
        connectSocket(data.user);

        toast.success(data.message || "Login successful");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || error.message || "Login failed");
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    if (socket?.connected) socket.disconnect();
    setSocket(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
  };

  // 🔹 Update Profile
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/profile", body);
      if (data?.user) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.response?.data?.message || error.message || "Update failed");
    }
  };

  // 🔹 On page load: set token header and run checkAuth only if authUser is null
  useEffect(() => {
    if (token && !authUser) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [token, authUser, checkAuth]);

  // 🔹 Cleanup socket on unmount
  useEffect(() => {
    return () => { if (socket?.connected) socket.disconnect(); };
  }, [socket]);

  const value = {
    axios,
    token,
    authUser,
    onlineUsers,
    socket,
    loading,
    setToken,
    setAuthUser,
    setOnlineUsers,
    setSocket,
    checkAuth,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
