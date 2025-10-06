import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  CloudSun,
  Wind,
  Thermometer,
  Droplet,
  AlertCircle,
} from "lucide-react";

const Weather = () => {
  const [location, setLocation] = useState("Loading...");
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [advice, setAdvice] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);

  const API_KEY = "8b75356541d14871aa0164352252503";
  const CACHE_KEY = "weatherDataCache";
  const CACHE_EXPIRY_MINUTES = 30;

  useEffect(() => {
    const fetchWeather = async (city) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`
        );
        const data = await response.json();
        setWeatherData(data.current);
        setForecast(data.forecast.forecastday);
        generateAdvice(data);

        const cacheData = {
          timestamp: Date.now(),
          data,
          location: city,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

        setTimeout(() => {
          localStorage.removeItem(CACHE_KEY);
        }, CACHE_EXPIRY_MINUTES * 60 * 1000);
      } catch (error) {
        console.error("Weather API error:", error.message);
      }
    };

    const generateAdvice = (data) => {
      const today = data.forecast.forecastday[0];
      let adviceMsg = "Weather is moderate. Monitor crops regularly.";
      let alertMsg = "";

      if (today.day.daily_will_it_rain) {
        adviceMsg =
          "🌧️ Rain expected today. Avoid spraying pesticides and plan irrigation.";
      }

      for (let day of data.forecast.forecastday) {
        if (day.day.condition.text.toLowerCase().includes("storm")) {
          alertMsg = `⚠️ Severe storm expected on ${day.date}. Take precautions!`;
          break;
        }
      }

      setAdvice(adviceMsg);
      setAlert(alertMsg);
    };

    const fetchLocationAndWeather = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLocation("Unknown");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const city = userData.district || "Delhi";
          setLocation(`${userData.district}, ${userData.state}`);

          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            const ageMinutes = (Date.now() - parsed.timestamp) / 60000;

            if (
              ageMinutes < CACHE_EXPIRY_MINUTES &&
              parsed.location === city
            ) {
              setWeatherData(parsed.data.current);
              setForecast(parsed.data.forecast.forecastday);
              generateAdvice(parsed.data);
              setLoading(false);
              return;
            }
          }

          await fetchWeather(city);
        } else {
          setLocation("Unknown");
        }
      } catch (err) {
        console.error("Error fetching user location:", err);
        setLocation("Error");
      }

      setLoading(false);
    };

    fetchLocationAndWeather();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-xl font-semibold text-gray-600 animate-pulse">
        Fetching weather data...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-4 px-3 sm:px-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Location Header */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-blue-800">
          {location}
        </h1>

        {/* Current Weather & Advice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Weather */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 text-center">
              Current Weather
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <CloudSun className="h-20 w-20 text-yellow-500 drop-shadow-md" />
              <div className="space-y-2 text-lg font-medium text-center sm:text-left">
                <p className="text-2xl font-bold text-gray-800">
                  {weatherData?.condition.text}
                </p>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                  <Thermometer className="h-5 w-5 mr-2 text-red-500" />
                  {weatherData?.temp_c}°C
                </p>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                  <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                  {weatherData?.humidity}%
                </p>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                  <Wind className="h-5 w-5 mr-2 text-gray-700" />
                  {weatherData?.wind_kph} km/h
                </p>
              </div>
            </div>
          </div>

          {/* Advice Section */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-blue-100 text-center hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">
              Weather Advice
            </h2>
            <p className="text-gray-700 text-lg font-medium leading-relaxed">
              {advice}
            </p>

            {alert && (
              <div className="mt-6 bg-red-100 border border-red-300 text-red-700 p-3 rounded-xl flex items-center justify-center gap-2 shadow-sm">
                <AlertCircle className="h-6 w-6 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">{alert}</span>
              </div>
            )}
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-blue-100 shadow-lg p-5 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
            5-Day Weather Forecast
          </h2>

          {/* Mobile Card Layout */}
          <div className="block sm:hidden space-y-4">
            {forecast.map((day, idx) => (
              <div
                key={idx}
                className="p-4 bg-blue-50 rounded-xl shadow-sm border border-blue-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-800">{day.date}</p>
                  <p className="text-sm text-blue-700 font-medium">
                    {day.day.condition.text}
                  </p>
                </div>
                <div className="flex justify-around text-sm text-gray-700">
                  <span>🌡 {day.day.avgtemp_c}°C</span>
                  <span>💧 {day.day.avghumidity}%</span>
                  <span>🌬 {day.day.maxwind_kph} km/h</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100 text-gray-700 text-sm">
                  <th className="p-3">Date</th>
                  <th className="p-3">Condition</th>
                  <th className="p-3">Temp (°C)</th>
                  <th className="p-3">Humidity</th>
                  <th className="p-3">Wind</th>
                </tr>
              </thead>
              <tbody>
                {forecast.map((day, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50 text-gray-800 font-medium transition"
                  >
                    <td className="p-3">{day.date}</td>
                    <td className="p-3">{day.day.condition.text}</td>
                    <td className="p-3 text-blue-600">{day.day.avgtemp_c}°C</td>
                    <td className="p-3 text-green-600">{day.day.avghumidity}%</td>
                    <td className="p-3 text-gray-700">
                      {day.day.maxwind_kph} km/h
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
