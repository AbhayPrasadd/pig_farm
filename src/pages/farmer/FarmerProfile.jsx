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
    <div className="p-4 sm:p-6 md:p-10 font-poppins  text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <User className="text-green-700" size={36} />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Farmer Profile
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your personal and farm details.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-semibold hover:bg-green-800 transition-all shadow text-sm sm:text-base">
          <Edit3 size={18} /> Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-green-300 shadow-lg rounded-2xl p-5 sm:p-8 mb-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left */}
          <div className="space-y-3 text-gray-800">
            <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-3">
              👨‍🌾 Personal Information
            </h2>
            <ProfileItem icon={<User />} label="Name" value={farmerData.fullName} />
            <ProfileItem icon={<Phone />} label="Phone" value={farmerData.phone} />
            <ProfileItem icon={<Mail />} label="Email" value={farmerData.email} />
            <ProfileItem icon={<Calendar />} label="Member Since" value={farmerData.joinDate} />
          </div>

          {/* Right */}
          <div className="space-y-3 text-gray-800">
            <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-3">
              🚜 Farm Details
            </h2>
            <ProfileItem icon={<Tractor />} label="Farm Type" value={farmerData.farmType} />
            <ProfileItem icon={<MapPin />} label="Location" value={farmerData.location} />
            <ProfileItem icon={<ShieldCheck />} label="Farm Area" value={farmerData.area} />
            <ProfileItem icon={<BookOpen />} label="Livestock Count" value={farmerData.livestockCount} />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 max-w-6xl mx-auto">
        <MetricCard
          icon={<ShieldCheck className="text-green-600" size={44} />}
          title="Biosecurity Score"
          value={`${farmerData.biosecurityScore}%`}
          color="text-green-700"
          desc="Last self-assessment"
        />
        <MetricCard
          icon={<Award className="text-yellow-500" size={44} />}
          title="Trainings Completed"
          value={farmerData.trainingsCompleted}
          color="text-yellow-600"
          desc="Gamified lessons"
        />
        <MetricCard
          icon={<Activity className="text-blue-600" size={44} />}
          title="Last Risk Assessment"
          value={farmerData.lastAssessment}
          color="text-blue-700"
          desc="Based on weather & data"
        />
      </div>

      {/* Resource Summary */}
      <div className="max-w-6xl mx-auto mt-8 sm:mt-12 bg-white border border-green-300 rounded-2xl shadow-lg p-5 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-5 flex items-center gap-2">
          <Droplets className="text-green-600" size={22} /> Resource Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ResourceCard
            title="💧 Water Usage"
            detail="Avg. 2500L/day for 120 pigs."
            suggestion="Recycle wash water using bio-filters."
          />
          <ResourceCard
            title="🌾 Feed Management"
            detail="450 kg feed consumed last week."
            suggestion="Reduce moisture exposure to avoid contamination."
          />
        </div>
      </div>
    </div>
  );
}

/* --- Reusable Subcomponents --- */

const ProfileItem = ({ icon, label, value }) => (
  <p className="flex items-center gap-3 text-sm sm:text-base">
    <span className="text-green-600">{icon}</span>
    <span>
      <strong>{label}:</strong> {value}
    </span>
  </p>
);

const MetricCard = ({ icon, title, value, color, desc }) => (
  <div className="bg-white border border-green-300 rounded-2xl shadow p-6 text-center hover:shadow-xl transition">
    <div className="flex justify-center mb-3">{icon}</div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
    <p className={`text-3xl sm:text-4xl font-bold mt-2 ${color}`}>{value}</p>
    <p className="text-xs sm:text-sm text-gray-500 mt-2">{desc}</p>
  </div>
);

const ResourceCard = ({ title, detail, suggestion }) => (
  <div className="bg-green-50 rounded-lg p-5 sm:p-6 shadow-sm border border-green-200">
    <h3 className="text-gray-800 font-semibold text-base sm:text-lg mb-2">
      {title}
    </h3>
    <p className="text-sm sm:text-base text-gray-600">{detail}</p>
    <p className="text-xs sm:text-sm text-green-700 mt-2">{suggestion}</p>
  </div>
);
