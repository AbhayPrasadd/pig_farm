import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  MapPin,
  BarChart3,
  Bell,
  FileText,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CloudSun,
  Brain,
} from "lucide-react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const OfficerDashboard = () => {
  const [officerData, setOfficerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfficerData = async () => {
      if (auth.currentUser) {
        const officerRef = doc(db, "officers", auth.currentUser.uid);
        const officerSnap = await getDoc(officerRef);
        if (officerSnap.exists()) {
          setOfficerData(officerSnap.data());
        }
      }
      setLoading(false);
    };

    fetchOfficerData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 font-poppins text-gray-700 text-lg">
        Loading officer dashboard...
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-8 min-h-screen bg-gray-100 font-poppins text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome, {officerData?.name || "Officer"} 👋
            </h1>
            <p className="text-gray-600 mt-1">
              {officerData?.designation || "Biosecurity Officer, Jeevya Network"}
            </p>
          </div>
          <div className="hidden sm:block bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 shadow-sm">
            Last Synced: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Row 1️⃣ — Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <QuickStat
            icon={<ShieldCheck className="text-green-600" />}
            label="Farms Monitored"
            value={officerData?.farmersCount || 20}
            subtext="Total farms under supervision"
          />
          <QuickStat
            icon={<AlertTriangle className="text-red-500" />}
            label="Active Alerts"
            value={officerData?.activeAlerts || 2}
            subtext="Pending outbreak responses"
          />
          <QuickStat
            icon={<FileText className="text-blue-600" />}
            label="Reports Generated"
            value={officerData?.reportsCount || 50}
            subtext="Compliance reports this month"
          />
          <QuickStat
            icon={<TrendingUp className="text-amber-500" />}
            label="Avg. Risk Index"
            value={officerData?.riskIndex || "A+"}
            subtext="Overall biosecurity rating"
          />
        </div>

        {/* Row 2️⃣ — Main Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <DashboardCard
            to="/dashboard/risk-map"
            icon={<MapPin className="text-red-600" />}
            title="Regional Risk Map"
            subtitle="Visualize real-time farm risk zones"
          />
          <DashboardCard
            to="/dashboard/compliance-analytics"
            icon={<BarChart3 className="text-blue-600" />}
            title="Compliance Analytics"
            subtitle="Monitor trends & performance"
          />
          <DashboardCard
            to="/dashboard/advisory-management"
            icon={<Bell className="text-yellow-500" />}
            title="Advisory Management"
            subtitle="Send alerts & digital advisories"
          />
          <DashboardCard
            to="/dashboard/compliance-repository"
            icon={<FileText className="text-green-600" />}
            title="Compliance Repository"
            subtitle="Access reports & SMP records"
          />
        </div>

        {/* Row 3️⃣ — Recent Activity + Utility Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Half — Recent Activities */}
          <div className="rounded-xl shadow bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Bell className="text-green-600" /> Recent Activities
              </h2>
              <ul className="divide-y divide-gray-100">
                {[
                  {
                    title: "Advisory Issued",
                    detail:
                      "Biosecurity alert sent to 12 farms in Odisha region.",
                    time: "2 hours ago",
                  },
                  {
                    title: "Risk Assessment Completed",
                    detail: "Updated HIRA data for 5 poultry farms.",
                    time: "Yesterday",
                  },
                 
                  {
                    title: "Report Verified",
                    detail:
                      "Compliance report validated for Jharkhand region.",
                    time: "3 days ago",
                  },
                ].map((item, i) => (
                  <li key={i} className="py-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600">{item.detail}</p>
                      </div>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Half — Utility Tools (stacked 2) */}
          <div className="flex flex-col gap-6">
            <UtilityCard
              icon={<Brain className="text-indigo-600" />}
              title="Disease Outbreak Predictor"
              desc="AI tool predicting potential livestock or poultry disease outbreaks based on regional data."
              link="/dashboard/ai-predictor"
            />
            <UtilityCard
              icon={<CloudSun className="text-amber-500" />}
              title="Weather & Environment Monitor"
              desc="Monitor rainfall, humidity, and temperature trends that may affect farm health."
              link="/dashboard/weather-monitor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ✅ Reusable Components */
const QuickStat = ({ icon, label, value, subtext }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all">
      <div className="flex justify-center mb-2">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-xs text-gray-500 mt-1">{subtext}</p>
    </div>
  );
};

const DashboardCard = ({ to, icon, title, subtitle }) => {
  return (
    <Link
      to={to}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md hover:border-green-400 transition-all flex flex-col items-center text-center group"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </Link>
  );
};

const UtilityCard = ({ icon, title, desc, link }) => (
  <Link
    to={link}
    className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md hover:border-green-400 transition-all flex items-start gap-4"
  >
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  </Link>
);

export default OfficerDashboard;
