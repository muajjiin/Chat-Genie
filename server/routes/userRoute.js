import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import assets from '../assets/assets';
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, setToken, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currState === "Sign up") {
        if (!isDataSubmitted) {
          setIsDataSubmitted(true);
          setLoading(false);
          return;
        }

        // Signup API call
        const { data } = await axios.post("/api/auth/signup", {
          fullname: fullName,
          email,
          password,
          bio,
        });

        if (data.success && data.token && data.user) {
          // Set token & user in context
          setToken(data.token);
          setAuthUser(data.user);
          localStorage.setItem("token", data.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          toast.success(data.message || "Account created successfully");
          navigate("/"); // redirect to home page
        } else {
          toast.error(data.message || "Signup failed");
        }
      } else {
        // Login flow
        await login("login", { email, password });
        navigate("/"); // redirect after successful login
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img src={assets.logo_big} alt="Logo" className="w-[min(30vw,250px)]"/>
      <form onSubmit={onSubmitHandler} className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && <img 
            onClick={() => setIsDataSubmitted(false)} 
            src={assets.arrow_icon} 
            alt="Back" 
            className="w-5 cursor-pointer" 
          />}
        </h2>

        {/* Fullname for Sign up */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input 
            onChange={(e) => setFullName(e.target.value)} 
            value={fullName}
            type="text" 
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            placeholder="FULL NAME" 
            required
          />
        )}

        {/* Email and Password */}
        {!isDataSubmitted && (
          <>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              type="email" 
              placeholder="Email Address" 
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              type="password" 
              placeholder="Password" 
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </>
        )}

        {/* Bio for Sign up */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea 
            onChange={(e) => setBio(e.target.value)} 
            value={bio}
            rows={4} 
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a short bio.." 
            required
          />
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer disabled:opacity-50"
        >
          {loading ? "Processing..." : currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account? <span
                onClick={() => { setCurrState("Login"); setIsDataSubmitted(false); }}
                className="font-medium text-violet-500 cursor-pointer"
              >Login here</span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an Account <span
                onClick={() => { setCurrState("Sign up"); setIsDataSubmitted(false); }}
                className="font-medium text-violet-500 cursor-pointer"
              >click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
