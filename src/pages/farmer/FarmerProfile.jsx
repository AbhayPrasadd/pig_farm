import React from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Tractor,
  Award,
  ShieldCheck,
  BookOpen,
  Calendar,
  Droplets,
  Activity,
} from "lucide-react";

export default function FarmerProfile() {
  // 🌱 Dummy Farmer Data
  const farmerData = {
    fullName: "Ramesh Kumar",
    phone: "+91 9876543210",
    email: "ramesh.kumar@farmshield.in",
    farmType: "Pig Farm",
    location: "Bhubaneswar, Odisha",
    area: "6 Acres",
    livestockCount: 120,
    biosecurityScore: 82,
    trainingsCompleted: 6,
    joinDate: "March 12, 2024",
    lastAssessment: "October 5, 2025",
  };

  return (
    <div className="p-8 md:p-16 font-poppins bg-gray-50 min-h-screen text-gray-800">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <User className="text-green-700" size={42} />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Farmer Profile
            </h1>
            <p className="text-lg text-gray-600">
              Manage your personal and farm information here.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-all shadow">
          <Edit3 size={20} /> Edit Profile
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white border border-green-300 shadow-lg rounded-2xl p-10 mb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div className="space-y-4 text-gray-800">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              👨‍🌾 Personal Information
            </h2>
            <p className="flex items-center gap-3 text-lg">
              <User className="text-green-600" size={20} />
              <span>
                <strong>Name:</strong> {farmerData.fullName}
              </span>
            </p>
            <p className="flex items-center gap-3 text-lg">
              <Phone className="text-green-600" size={20} />
              <span>
                <strong>Phone:</strong> {farmerData.phone}
              </span>
            </p>
            <p className="flex items-center gap-3 text-lg">
              <Mail className="text-green-600" size={20} />
              <span>
                <strong>Email:</strong> {farmerData.email}
              </span>
            </p>
            <p className="flex items-center gap-3 text-lg">
              <Calendar className="text-green-600" size={20} />
              <span>
                <strong>Member Since:</strong> {farmerData.joinDate}
              </span>
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4 text-gray-800">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              🚜 Farm Details
            </h2>
            <p className="flex items-center gap-3 text-lg">
              <Tractor className="text-green-600" size={20} />
              <span>
                <strong>Farm Type:</strong> {farmerData.farmType}
              </span>
            </p>
            <p className="flex items-center gap-3 text-lg">
              <MapPin className="text-green-600" size={20} />
              <span>
                <strong>Location:</strong> {farmerData.location}
              </span>
            </p>
            <p className="flex items-center gap-3 text-lg">
              <ShieldCheck className="text-green-600" size={20} />
              <span>
                <strong>Farm Area:</strong> {farmerData.area}
              </span>
            </p>
            <p className="flex items-center gap-3 text-lg">
              <BookOpen className="text-green-600" size={20} />
              <span>
                <strong>Livestock Count:</strong> {farmerData.livestockCount}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* PERFORMANCE METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
          <ShieldCheck className="text-green-600 mx-auto mb-3" size={48} />
          <h3 className="text-xl font-semibold text-gray-900">
            Biosecurity Score
          </h3>
          <p className="text-5xl font-bold text-green-700 mt-2">
            {farmerData.biosecurityScore}%
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on last self-assessment
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
          <Award className="text-yellow-500 mx-auto mb-3" size={48} />
          <h3 className="text-xl font-semibold text-gray-900">
            Trainings Completed
          </h3>
          <p className="text-5xl font-bold text-yellow-600 mt-2">
            {farmerData.trainingsCompleted}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Gamified micro-lessons completed
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
          <Activity className="text-blue-600 mx-auto mb-3" size={48} />
          <h3 className="text-xl font-semibold text-gray-900">
            Last Risk Assessment
          </h3>
          <p className="text-lg font-bold text-blue-700 mt-2">
            {farmerData.lastAssessment}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last analyzed weather & farm data
          </p>
        </div>
      </div>

      {/* RESOURCE SUMMARY */}
      <div className="max-w-7xl mx-auto mt-12 bg-white border border-green-300 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-2">
          <Droplets className="text-green-600" size={24} /> Resource Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-gray-800 font-semibold text-lg mb-2">
              💧 Water Usage
            </h3>
            <p className="text-base text-gray-600">
              Avg. 2500L/day for 120 pigs.
            </p>
            <p className="text-sm text-green-700 mt-2">
              Suggestion: Recycle wash water using bio-filter setup.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-gray-800 font-semibold text-lg mb-2">
              🌾 Feed Management
            </h3>
            <p className="text-base text-gray-600">
              450 kg feed consumed last week.
            </p>
            <p className="text-sm text-green-700 mt-2">
              Insight: Reduce moisture exposure to avoid contamination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
