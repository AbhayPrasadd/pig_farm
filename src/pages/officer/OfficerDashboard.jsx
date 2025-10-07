import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  MapPin,
  BarChart3,
  Bell,
  FileText,
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
      <div className="p-4 bg-gray-100 min-h-screen font-poppins text-center">
        Loading officer dashboard...
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-8 bg-gray-50 min-h-screen font-poppins text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Officer Info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Welcome, {officerData?.name || "Officer"} 👋
            </h1>
            <p className="text-base text-gray-600">
              {officerData?.designation || "Biosecurity Officer"}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <QuickStat
            label="Farms Managed"
            value={officerData?.farmersCount || 0}
          />
          <QuickStat
            label="Active Alerts"
            value={officerData?.activeAlerts || 0}
          />
          <QuickStat
            label="Reports Generated"
            value={officerData?.reportsCount || 0}
          />
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card
            to="/dashboard/risk-map"
            icon={<MapPin className="text-red-600" />}
            title="Regional Risk Map"
            subtitle="Visualize farm risk zones"
          />
          <Card
            to="/dashboard/compliance-analytics"
            icon={<BarChart3 className="text-blue-600" />}
            title="Compliance Analytics"
            subtitle="View trends and metrics"
          />
          <Card
            to="/dashboard/advisory-management"
            icon={<Bell className="text-yellow-500" />}
            title="Advisory Management"
            subtitle="Send alerts and advisories"
          />
          <Card
            to="/dashboard/compliance-repository"
            icon={<FileText className="text-green-600" />}
            title="Compliance Repository"
            subtitle="Access reports & archives"
          />
        </div>
      </div>
    </div>
  );
};

const QuickStat = ({ label, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 text-center">
      <h3 className="text-2xl font-bold text-green-700">{value}</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

const Card = ({ to, icon, title, subtitle }) => {
  return (
    <Link
      to={to}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition-all flex flex-col items-center text-center hover:border-blue-400"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </Link>
  );
};

export default OfficerDashboard;
