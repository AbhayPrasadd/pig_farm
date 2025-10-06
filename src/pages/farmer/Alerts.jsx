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
    setTimeout(() => {
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
    }, 1200);
  }, []);

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((a) => a.severity.toLowerCase() === filter.toLowerCase());

  return (
    <div className="p-6 md:p-10 font-poppins bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={40} />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              Disease Outbreak Alerts 🚨
            </h1>
            <p className="text-base text-gray-600">
              Stay updated on nearby outbreaks and safety advisories.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-green-300 text-gray-800 px-3 py-2 rounded-lg shadow-sm text-sm focus:outline-none"
          >
            <option value="All">All Severities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-center">
            <Activity className="animate-spin text-green-700 mx-auto mb-4" size={40} />
            <p className="text-gray-600 font-medium text-lg">
              Fetching live alerts…
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 rounded-xl shadow-md border-l-8 ${
                alert.severity === "High"
                  ? "border-red-600 bg-red-50"
                  : alert.severity === "Medium"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-green-500 bg-green-50"
              } transition-all hover:shadow-lg`}
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {alert.disease}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
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

              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <MapPin size={18} className="text-green-700" />
                  <span>
                    <strong>Location:</strong> {alert.location}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Thermometer size={18} className="text-green-700" />
                  <span>
                    <strong>Date:</strong> {alert.date}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <ShieldAlert size={18} className="text-green-700" />
                  <span>
                    <strong>Proximity:</strong> {alert.distance}
                  </span>
                </p>
              </div>

              <div className="mt-4 bg-white border border-green-200 p-4 rounded-lg shadow-sm">
                <h3 className="text-base font-semibold text-green-700 mb-1">
                  Recommended Action
                </h3>
                <p className="text-sm text-gray-700">{alert.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Section */}
      {!loading && (
        <div className="max-w-7xl mx-auto mt-10 bg-white border border-green-300 rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-700" /> AI Summary
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            There are currently <strong>{alerts.length}</strong> disease alerts in
            nearby regions. Based on current weather and outbreak trends, extra
            hygiene and restricted farm movement are advised for the next{" "}
            <strong>7 days</strong>. Keep monitoring updates for your district.
          </p>
        </div>
      )}
    </div>
  );
}
