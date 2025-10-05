import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Shield,
  ClipboardCheck,
  FileText,
  AlertTriangle,
  BarChart3,
  Bot,
  CloudSun,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
      fetchWeatherData("Bhubaneswar");
      setLoading(false);
    };

    const fetchWeatherData = async (city) => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Weather fetch error:", error.message);
      }
    };

    fetchUserData();
  }, []);

  // 🧠 AI-based suggestion generator for farm biosecurity
  const generateBiosecuritySuggestions = () => {
    if (!weatherData) return [];

    const temp = weatherData.current.temp_c;
    const condition = weatherData.current.condition.text.toLowerCase();
    const farmType = userData?.farmType || "Pig Farm";
    let suggestions = [];

    // Dynamic suggestions logic based on weather and farm type
    if (farmType.toLowerCase().includes("pig")) {
      if (condition.includes("rain") || temp > 32) {
        suggestions.push(
          "High humidity detected — ensure pig pens remain dry to prevent ASF and bacterial growth."
        );
      }
      if (condition.includes("storm") || condition.includes("wind")) {
        suggestions.push("Secure feed storage and close open shed sections.");
      }
      if (temp < 20) {
        suggestions.push("Low temperature — provide bedding or heat lamps for piglets.");
      }
    } else if (farmType.toLowerCase().includes("poultry")) {
      if (condition.includes("rain") || temp > 30) {
        suggestions.push("Cover feed and water to prevent contamination.");
      }
      if (condition.includes("fog") || temp < 18) {
        suggestions.push("Increase ventilation to prevent respiratory issues.");
      }
    }

    // Generic fallback
    if (suggestions.length === 0) {
      suggestions.push(
        "Maintain routine disinfection and limit visitor entry to reduce infection risk."
      );
    }

    return suggestions.slice(0, 2);
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  if (loading) {
    return (
      <div className="p-1 bg-gray-100 min-h-screen text-base font-poppins">
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-8 bg-gradient-to-br min-h-screen font-poppins text-gray-800">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-green-800">
              Welcome, {userData?.fullName || "Farmer"} 👋
            </h1>
            <p className="text-base text-gray-700">
              {userData?.district || "Bhubaneswar"},{" "}
              {userData?.state || "Odisha"}
            </p>
          </div>
          <div>
            <select
              onChange={handleLanguageChange}
              value={i18n.language}
              className="bg-white border text-sm text-black rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>

        {/* Weather + Suggestions Section */}
        <div className="bg-white p-4 rounded-md shadow-sm border mb-8 relative">
          {weatherData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={weatherData.current.condition.icon}
                  alt="Weather Icon"
                  className="h-16 w-16"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {weatherData.location.name}, {weatherData.location.country}
                  </h2>
                  <p className="text-gray-800 text-base">
                    Temp: {weatherData.current.temp_c}°C
                  </p>
                  <p className="text-gray-600 text-sm">
                    {weatherData.current.condition.text}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold text-green-700 mb-2">
                  Real-time Biosecurity Suggestions
                </h3>
                {generateBiosecuritySuggestions()?.map((suggestion, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    • {suggestion}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">{t("loading_weather")}</p>
          )}
        </div>

        {/* Main Dashboard Modules */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <Card
            to="/dashboard/riskAssessment"
            icon={<ClipboardCheck className="text-green-600" />}
            title="Risk Assessment"
            subtitle="Evaluate your farm’s biosecurity level"
          />
          <Card
            to="/dashboard/complianceLog"
            icon={<FileText className="text-indigo-600" />}
            title="Compliance Logbook"
            subtitle="Record disinfection & cleaning actions"
          />
          <Card
            to="/dashboard/aiAdvisor"
            icon={<Bot className="text-green-500" />}
            title="AI Biosecurity Assistant"
            subtitle="Ask questions in your language"
          />
          <Card
            to="/dashboard/alerts"
            icon={<AlertTriangle className="text-red-500" />}
            title="Outbreak Alerts"
            subtitle="Check nearby disease risks"
          />
          <Card
            to="/dashboard/vetReports"
            icon={<BarChart3 className="text-yellow-500" />}
            title="Vet Dashboard"
            subtitle="View inspections & reports"
          />
          <Card
            to="/dashboard/weather"
            icon={<CloudSun className="text-blue-500" />}
            title="Weather & Risk Updates"
            subtitle="Track weather-sensitive risks"
          />
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center text-xs text-gray-500">
          🐷 Powered by FarmShield | Digital Biosecurity System © 2025
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable Card Component
const Card = ({ to, icon, title, subtitle }) => {
  return (
    <Link
      to={to}
      className="bg-white border border-gray-300 p-5 rounded-md shadow hover:shadow-md transition-all flex flex-col gap-3 text-center items-center hover:border-green-400"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 leading-snug">{subtitle}</p>
    </Link>
  );
};

export default Dashboard;
