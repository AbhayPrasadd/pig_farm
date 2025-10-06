import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  MapPin,
  Thermometer,
  ShieldAlert,
  Activity,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

export default function Alerts() {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlerts([
        {
          id: 1,
          disease: "African Swine Fever (ASF)",
          location: "Cuttack, Odisha",
          severity: "High",
          date: "2025-10-05",
          distance: "40 km away",
          recommendation:
            "Avoid transporting pigs between farms. Disinfect footwear and equipment daily.",
        },
        {
          id: 2,
          disease: "Avian Influenza (H5N1)",
          location: "Bhubaneswar, Odisha",
          severity: "Medium",
          date: "2025-10-06",
          distance: "Your District",
          recommendation:
            "Keep poultry indoors and cover feed/water to prevent contact with wild birds.",
        },
        {
          id: 3,
          disease: "Foot and Mouth Disease",
          location: "Dhenkanal, Odisha",
          severity: "Low",
          date: "2025-10-02",
          distance: "70 km away",
          recommendation:
            "Check vaccination status of cattle and report suspicious sores immediately.",
        },
      ]);
      setLoading(false);
    }, 800); // ⏩ Reduced load time
    return () => clearTimeout(timeout);
  }, []);

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((a) => a.severity.toLowerCase() === filter.toLowerCase());

  return (
    <div className="p-4 sm:p-6 md:p-10 font-poppins bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={34} />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Disease Alerts 🚨
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Stay updated on nearby outbreaks & safety steps.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-green-300 text-gray-800 px-2 sm:px-3 py-2 rounded-lg shadow-sm text-sm focus:outline-none"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1 sm:gap-2 bg-green-700 hover:bg-green-800 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold shadow-sm"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-[65vh]">
          <div className="text-center">
            <Activity
              className="animate-spin text-green-700 mx-auto mb-3"
              size={36}
            />
            <p className="text-gray-600 font-medium text-base">
              Fetching latest alerts...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Alerts List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 max-w-7xl mx-auto">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-5 sm:p-6 rounded-xl shadow-md border-l-8 ${
                  alert.severity === "High"
                    ? "border-red-600 bg-red-50"
                    : alert.severity === "Medium"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-green-600 bg-green-50"
                } hover:shadow-lg transition-all`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {alert.disease}
                  </h2>
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                      alert.severity === "High"
                        ? "bg-red-600 text-white"
                        : alert.severity === "Medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>

                <div className="space-y-1.5 text-gray-700 text-sm sm:text-base">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-green-700" />
                    <span>
                      <strong>Location:</strong> {alert.location}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Thermometer size={16} className="text-green-700" />
                    <span>
                      <strong>Date:</strong> {alert.date}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldAlert size={16} className="text-green-700" />
                    <span>
                      <strong>Proximity:</strong> {alert.distance}
                    </span>
                  </p>
                </div>

                <div className="mt-4 bg-white border border-green-200 p-3 sm:p-4 rounded-lg shadow-sm">
                  <h3 className="text-sm sm:text-base font-semibold text-green-700 mb-1">
                    Recommended Action
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {alert.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="max-w-7xl mx-auto mt-8 sm:mt-10 bg-white border border-green-300 rounded-xl shadow p-5 sm:p-6">
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="text-green-700" /> AI Summary
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Currently <strong>{alerts.length}</strong> active alerts detected in
              nearby districts. Maintain strict hygiene for the next{" "}
              <strong>7 days</strong> and restrict farm movement when possible.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
