import React, { useState } from "react";
import assets from "../assets/assets";

const AuthPage = () => {
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [currState, setCurrState] = useState("Login");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDataSubmitted(true);
    console.log({ fullName, email, password, bio });
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center bg-gray-900 text-white p-6">
      
      {/* Left side (logo) */}
      <div className="flex-1 flex justify-center items-center mb-6 sm:mb-0">
        <img src={assets.logo} alt="Logo" className="w-32 sm:w-48" />
      </div>

      {/* Right side (form) */}
      <div className="flex-1 flex justify-center items-center">
        {!isDataSubmitted && (
          <form
            onSubmit={handleSubmit}
            className="border-2 bg-white/10 border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[300px] sm:w-[400px]"
          >
            <h2 className="font-medium text-2xl flex justify-between items-center">
              {currState === "signUp" ? "Sign Up" : "Login"}
              <img src={assets.arrow_icon} alt="" className="w-5 cursor-pointer" />
            </h2>

            {currState === "signUp" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="p-2 rounded bg-gray-800 text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="p-2 rounded bg-gray-800 text-white outline-none"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white outline-none"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white font-medium py-2 px-4 rounded-full"
            >
              {currState === "signUp" ? "Sign Up" : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
