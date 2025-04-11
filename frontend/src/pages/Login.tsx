import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/fbi_logo.png";
import toast from "react-hot-toast";
import { auth } from "../api/api";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  console.log(localStorage.getItem("token"));
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await auth(email, password);
      login(res?.token);
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Company Logo" className="h-30 w-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Authentication
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
