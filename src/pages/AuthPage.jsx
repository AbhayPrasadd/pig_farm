import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles } from "lucide-react";

const AuthPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        setError("User profile not found.");
        setIsLoading(false);
        return;
      }

      const userData = userDoc.data();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-white px-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-green-100">
      

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">Sign in to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Email Input */}
        <div className="relative mb-4">
          <Mail className="absolute left-4 top-3.5 text-green-700 h-5 w-5" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <Lock className="absolute left-4 top-3.5 text-green-700 h-5 w-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-12 pr-12 py-3 bg-white border border-green-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-green-600 hover:text-green-800 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-green-300 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" /> Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            New to Jeevya?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-green-700 hover:text-green-900 font-semibold flex items-center justify-center gap-1 transition"
            >
              <Sparkles className="w-4 h-4" />
              Create Account
            </button>
          </p>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 border-t border-gray-100 pt-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Jeevya. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
