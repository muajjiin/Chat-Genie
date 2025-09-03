import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext"; // Fixed import path

const App = () => {
  console.log("🚀 App component rendering...");
  
  const { authUser, loading } = useContext(AuthContext);
  
  console.log("📱 App state:", { authUser: !!authUser, loading });
  
  if (loading) {
    console.log("⏳ Showing loading screen...");
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium">Loading...</p>
      </div>
    );
  }
  
  console.log("✅ Rendering main app...");
  
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain min-h-screen">
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;