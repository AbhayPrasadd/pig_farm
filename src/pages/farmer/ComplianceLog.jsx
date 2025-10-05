import React, { useEffect, useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  BarChart3,
  AlertTriangle,
  PlusCircle,
  FileDown,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

const ComplianceLog = () => {
  const [loading, setLoading] = useState(true);
  const [complianceData, setComplianceData] = useState(null);

  useEffect(() => {
    // Simulated fetch (for prototype)
    setTimeout(() => {
      setComplianceData({
        farmerName: "Ramesh Kumar",
        farmType: "Pig Farm",
        location: "Bhubaneswar, Odisha",
        riskLevel: "Moderate",
        complianceScore: 82,
        totalTasks: 35,
        completedTasks: 29,
        missedTasks: 6,
        aiInsights: [
          "Disinfection log missed twice this week.",
          "Waste disposal not recorded on Wednesday.",
          "Great consistency in visitor entry logs — keep it up!",
        ],
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg">
            Loading Compliance Overview...
          </p>
        </div>
      </div>
    );
  }

  const data = complianceData;
  const completionPercent = Math.round(
    (data.completedTasks / data.totalTasks) * 100
  );

  return (
    <div className="p-6 md:p-10 font-poppins bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Compliance Dashboard
            </h1>
            <p className="text-base text-gray-600 mt-1">
              Monitor and manage your farm’s biosecurity compliance effortlessly.
            </p>
          </div>
          <div className="h-1 w-32 bg-green-600 rounded-full mt-3 sm:mt-0"></div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farm Info */}
        <div className="bg-white border border-green-300 rounded-xl shadow-md hover:shadow-lg transition p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
            <ClipboardList size={22} /> Farm Summary
          </h2>
          <div className="text-base text-gray-700 space-y-2">
            <p>
              <strong>Farmer:</strong> {data.farmerName}
            </p>
            <p>
              <strong>Farm Type:</strong> {data.farmType}
            </p>
            <p>
              <strong>Location:</strong> {data.location}
            </p>
            <p>
              <strong>Risk Level:</strong>{" "}
              <span className="font-semibold text-yellow-600">
                {data.riskLevel}
              </span>
            </p>
          </div>
        </div>

        {/* Compliance Score */}
        <div className="bg-white border border-green-300 rounded-xl shadow-md hover:shadow-lg transition p-6 col-span-2">
          <h2 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
            <BarChart3 size={22} /> Compliance Overview
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-5xl font-bold text-green-700">
                {data.complianceScore}%
              </p>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Overall Compliance Score
              </p>
            </div>

            <div className="w-full sm:w-1/2">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-right">
                {data.completedTasks}/{data.totalTasks} tasks completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* AI Insights */}
        <div className="lg:col-span-2 bg-white border border-green-300 rounded-xl shadow-md hover:shadow-lg transition p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
            <AlertTriangle size={22} /> AI Compliance Insights
          </h2>
          {data.aiInsights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-gray-700 mb-3 border-b border-gray-100 pb-3 last:border-b-0"
            >
              {index < 2 ? (
                <AlertTriangle className="text-red-500 w-5 h-5 mt-1" />
              ) : (
                <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
              )}
              <p className="text-base">{insight}</p>
            </div>
          ))}
        </div>

        {/* Activity Summary */}
        <div className="bg-white border border-green-300 rounded-xl shadow-md hover:shadow-lg transition p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
            <ClipboardList size={22} /> Activity Summary
          </h2>
          <div className="text-base text-gray-700 space-y-3">
            <p className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={18} /> Completed:
              </span>
              <span className="font-semibold">{data.completedTasks}</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <XCircle className="text-red-600" size={18} /> Missed:
              </span>
              <span className="font-semibold">{data.missedTasks}</span>
            </p>
            <p className="flex items-center justify-between border-t border-gray-100 pt-2 mt-2">
              <span>Total Activities:</span>
              <span className="font-semibold">{data.totalTasks}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col mt-6 gap-3">
            <Link
              to="/dashboard/complianceLogbook"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-md px-5 py-2.5 text-base font-semibold shadow-sm"
            >
              <PlusCircle size={18} /> Log New Activity
            </Link>
            <button className="flex items-center justify-center gap-2 bg-white border border-green-500 text-green-700 rounded-md px-5 py-2.5 text-base font-semibold hover:bg-green-50 transition-all shadow-sm">
              <FileDown size={18} /> Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceLog;
