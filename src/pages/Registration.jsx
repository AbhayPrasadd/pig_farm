import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Loader2 } from "lucide-react";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    language: "",
    state: "",
    district: "",
    village: "",
    pincode: "",
    gender: "",
    role: "farmer",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        profileCompleted: false,
        createdAt: serverTimestamp(),
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-white px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-green-100">
      

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm">
            Fill in the details to get started
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-green-700 h-5 w-5" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-green-700 h-5 w-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-green-700 h-5 w-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-4 top-3.5 text-green-700 h-5 w-5" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          {/* Language */}
          <select
            name="language"
            className="w-full p-3 border border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            onChange={handleChange}
            required
          >
            <option value="">Select Language</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Bengali">Bengali</option>
            <option value="Telugu">Telugu</option>
            <option value="Marathi">Marathi</option>
          </select>

          {/* Address Details */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="state"
              placeholder="State"
              className="p-3 border border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="district"
              placeholder="District"
              className="p-3 border border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="village"
              placeholder="Village"
              className="p-3 border border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="p-3 border border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <select
            name="gender"
            className="w-full p-3 border border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Role */}
          <select
            name="role"
            className="w-full p-3 border border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            onChange={handleChange}
            required
          >
            <option value="farmer">Farmer</option>
            <option value="officer">Officer</option>
            <option value="admin">Admin</option>
          </select>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-green-300 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" /> Creating Account...
              </>
            ) : (
              <>
                Register
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?
          <span
            onClick={() => navigate("/auth")}
            className="text-green-700 hover:text-green-900 font-semibold cursor-pointer ml-1"
          >
            Login
          </span>
        </p>

        {/* Footer */}
        <div className="text-center mt-6 border-t border-gray-100 pt-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Jeevya. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
