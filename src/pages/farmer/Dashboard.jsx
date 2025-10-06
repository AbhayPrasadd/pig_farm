import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  ClipboardCheck,
  FileText,
  AlertTriangle,
  Bot,
  GraduationCap,
  Wallet,
  Droplets,
  Wind,
  Eye,
} from "lucide-react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) setUserData(userSnap.data());
        }
      } catch (err) {
        console.error("User fetch error:", err);
      }

      await fetchWeatherData("Bhubaneswar");
      setLoading(false);
    };

    const fetchWeatherData = async (city) => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      if (!apiKey) {
        console.warn("⚠️ Weather API key is missing");
        setWeatherError("Weather data unavailable (API key missing)");
        return;
      }

      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        if (data?.error) {
          setWeatherError(data.error.message || "Weather API error");
        } else {
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Weather fetch error:", error);
        setWeatherError("Unable to load weather data");
      }
    };

    fetchUserData();
  }, []);

  const generateBiosecuritySuggestions = () => {
    if (!weatherData?.current)
      return ["Maintain daily disinfection and limit visitor entry."];

    const temp = weatherData.current?.temp_c ?? 0;
    const condition = weatherData.current?.condition?.text?.toLowerCase() ?? "";
    const farmType = userData?.farmType || "Pig Farm";
    let suggestions = [];

    if (farmType.toLowerCase().includes("pig")) {
      if (condition.includes("rain") || temp > 32)
        suggestions.push("High humidity — keep pens dry to prevent ASF.");
      if (condition.includes("storm") || condition.includes("wind"))
        suggestions.push("Secure feed storage and close open sheds.");
      if (temp < 20)
        suggestions.push("Provide heat lamps or bedding for piglets.");
    } else if (farmType.toLowerCase().includes("poultry")) {
      if (condition.includes("rain") || temp > 30)
        suggestions.push("Cover feed and water to prevent contamination.");
      if (condition.includes("fog") || temp < 18)
        suggestions.push("Improve ventilation to avoid respiratory issues.");
    }

    if (suggestions.length === 0)
      suggestions.push("Maintain daily disinfection and limit visitor entry.");

    return suggestions.slice(0, 2);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm mt-3">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 md:p-8 font-poppins">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
            👨‍🌾 Welcome, {userData?.fullName || "Farmer"} 👋
          </h1>
          <p className="text-sm text-gray-500">
            {userData?.district || "Bhubaneswar"},{" "}
            {userData?.state || "Odisha"}
          </p>
        </div>
      </div>

      {/* Weather & Suggestions */}
      <div className="bg-white border border-green-200 rounded-lg shadow-md p-5 mb-8">
        {weatherError ? (
          <p className="text-sm text-red-500">⚠️ {weatherError}</p>
        ) : weatherData?.current ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weather Info */}
            <div className="flex items-center gap-4">
              <img
                src={weatherData.current?.condition?.icon}
                alt="Weather Icon"
                className="h-12 w-12"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {weatherData.location?.name || "Unknown"}
                </h2>
                <p className="text-sm text-gray-700">
                  Temp: {weatherData.current?.temp_c ?? "--"}°C |{" "}
                  {weatherData.current?.condition?.text || "N/A"}
                </p>
                <div className="flex flex-wrap gap-3 mt-2 text-gray-600 text-xs">
                  <span className="flex items-center gap-1">
                    <Droplets size={14} /> {weatherData.current?.humidity ?? "--"}%
                    Humidity
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind size={14} /> {weatherData.current?.wind_kph ?? "--"} km/h Wind
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {weatherData.current?.vis_km ?? "--"} km Visibility
                  </span>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <h3 className="text-sm font-semibold text-green-700 mb-2">
                Biosecurity Suggestions
              </h3>
              {generateBiosecuritySuggestions().map((s, i) => (
                <p key={i} className="text-sm text-gray-700 mb-1">
                  • {s}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Loading weather data...</p>
        )}
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card
          to="/dashboard/riskAssessment"
          icon={<ClipboardCheck size={32} />}
          title="Risk Assessment"
          subtitle="Evaluate your farm’s biosecurity level"
        />
        <Card
          to="/dashboard/complianceLog"
          icon={<FileText size={32} />}
          title="Compliance Logbook"
          subtitle="Record actions and cleaning logs"
        />
        <Card
          to="/dashboard/aiAdvisor"
          icon={<Bot size={32} />}
          title="AI Assistant"
          subtitle="Ask questions in your language"
        />
        <Card
          to="/dashboard/alerts"
          icon={<AlertTriangle size={32} />}
          title="Outbreak Alerts"
          subtitle="Monitor nearby disease risks"
        />
        <Card
          to="/dashboard/training"
          icon={<GraduationCap size={32} />}
          title="Training & Learning"
          subtitle="Learn best farm safety practices"
        />
        <Card
          to="/dashboard/expenseTracker"
          icon={<Wallet size={32} />}
          title="Expense Tracker"
          subtitle="Track daily farm expenses easily"
        />
      </div>
    </div>
  );
};

// ✅ Responsive Card Component
const Card = ({ to, icon, title, subtitle }) => (
  <Link
    to={to}
    className="
      bg-white 
      border-2 border-green-200 
      rounded-xl 
      shadow-md 
      hover:shadow-xl hover:border-green-400 
      hover:-translate-y-1 
      transition-all duration-300 
      flex flex-col items-center justify-center 
      text-center 
      p-4 sm:p-6 
      min-h-[140px] sm:min-h-[200px]
    "
  >
    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gray-50 shadow-sm mb-2 sm:mb-4 text-green-700">
      {icon}
    </div>

    <h3 className="text-sm sm:text-base font-semibold text-gray-900">
      {title}
    </h3>

    {/* Hide subtitle on small screens */}
    <p className="hidden sm:block text-xs sm:text-sm text-gray-500 mt-1 leading-snug max-w-[200px]">
      {subtitle}
    </p>
  </Link>
);

export default Dashboard;
