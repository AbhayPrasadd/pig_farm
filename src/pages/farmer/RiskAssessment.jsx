import React, { useEffect, useState } from "react";
import {
  Brain,
  CloudSun,
  MapPin,
  User,
  Loader2,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const formatDate = (d) =>
  d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export default function RiskAssessment() {
  const [userData, setUserData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [stage, setStage] = useState("loading");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [advice, setAdvice] = useState("");
  const [insights, setInsights] = useState({ atRisk: [], performing: [] });

  const QUESTION_SETS = {
    rainy: [
      { key: "drainage", text: "Are drainage channels clear after rainfall?", suggestion: "Improve drainage systems to prevent waterlogging in pens." },
      { key: "feed_protected", text: "Is feed protected from moisture or contamination?", suggestion: "Store feed in dry, covered areas to avoid bacterial growth." },
      { key: "visitor_control", text: "Are visitors restricted during wet conditions?", suggestion: "Restrict visitor entry during wet weather to avoid disease spread." },
      { key: "water_clean", text: "Are water troughs cleaned in the last 24 hours?", suggestion: "Clean and disinfect water troughs regularly to maintain hygiene." },
      { key: "footbaths", text: "Are disinfectant footbaths available at all entry points?", suggestion: "Place disinfectant footbaths at entry points and refresh daily." },
    ],
    cold: [
      { key: "piglet_heat", text: "Are piglets provided with heating or warm bedding?", suggestion: "Provide bedding or heaters for piglets in cold conditions." },
      { key: "insulation", text: "Are sheds insulated to prevent cold drafts?", suggestion: "Seal gaps and insulate sheds to retain warmth." },
      { key: "ventilation", text: "Is ventilation adjusted to avoid damp air?", suggestion: "Balance ventilation to remove moisture while maintaining warmth." },
      { key: "water_temp", text: "Is drinking water kept at a moderate temperature?", suggestion: "Avoid very cold water for animals to prevent stress." },
      { key: "record_temp", text: "Is shed temperature recorded daily?", suggestion: "Record shed temperature daily for better climate control." },
    ],
    normal: [
      { key: "disinfection", text: "Are cleaning and disinfection logs updated daily?", suggestion: "Keep disinfection logs up-to-date to ensure consistency." },
      { key: "ppe", text: "Is staff wearing protective equipment (PPE)?", suggestion: "Ensure all workers use PPE before entering animal zones." },
      { key: "boundary", text: "Is the farm boundary secured to prevent wild entry?", suggestion: "Install fencing or secure boundaries to avoid external contamination." },
      { key: "vehicle", text: "Are vehicles disinfected before entry?", suggestion: "Disinfect all incoming vehicles to prevent external pathogen entry." },
      { key: "training", text: "Are staff trained in daily biosecurity practices?", suggestion: "Provide regular refresher training to improve biosecurity habits." },
    ],
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        let udata = null;
        if (auth?.currentUser) {
          const ref = doc(db, "users", auth.currentUser.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) udata = snap.data();
        }
        if (!udata) {
          udata = {
            fullName: "Ramesh Kumar",
            farmType: "Pig Farm",
            district: "Bhubaneswar",
            state: "Odisha",
          };
        }
        if (!mounted) return;
        setUserData(udata);

        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        let weatherData = null;
        if (apiKey) {
          const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${udata.district || "Bhubaneswar"}`;
          const r = await fetch(url);
          if (r.ok) weatherData = await r.json();
        }
        if (!weatherData) {
          weatherData = {
            location: { name: udata.district, country: "India" },
            current: { temp_c: 31, humidity: 78, condition: { text: "Light rain" } },
          };
        }
        setWeather(weatherData);

        const cond = (weatherData.current.condition.text || "").toLowerCase();
        const temp = Number(weatherData.current.temp_c || 999);
        let context = "normal";
        if (cond.includes("rain") || weatherData.current.humidity > 70) context = "rainy";
        else if (temp < 20) context = "cold";

        setStage("analyzing");
        setTimeout(() => {
          setQuestions(QUESTION_SETS[context]);
          setStage("ready");
        }, 2500);
      } catch {
        setStage("ready");
        setQuestions(QUESTION_SETS.normal);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, []);

  const setAnswer = (key, val) => setAnswers((p) => ({ ...p, [key]: val }));

  function submitAssessment() {
    const total = questions.length || 1;
    const yesCount = questions.filter((q) => answers[q.key] === "yes").length;
    const pct = Math.round((yesCount / total) * 100);
    setScore(pct);

    if (pct > 80) setAdvice("✅ Excellent — Your farm biosecurity is strong.");
    else if (pct > 50) setAdvice("⚠️ Moderate — Some practices can be improved.");
    else setAdvice("🚨 High Risk — Immediate improvements are needed.");

    const atRisk = questions
      .filter((q) => answers[q.key] === "no")
      .map((q) => q.suggestion);
    const performing = questions
      .filter((q) => answers[q.key] === "yes")
      .map((q) => `Good work on: ${q.text.toLowerCase()}`);

    setInsights({ atRisk, performing });
    setStage("results");
  }

  const resetAssessment = () => {
    setAnswers({});
    setScore(null);
    setAdvice("");
    setInsights({ atRisk: [], performing: [] });
    setStage("analyzing");
    setTimeout(() => setStage("ready"), 1000);
  };

  const condText = weather?.current?.condition?.text || "Unknown";

  return (
    <div className="p-6 md:p-10 font-poppins bg-gray-50 min-h-screen text-gray-800">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <Brain className="text-green-700" size={36} />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Smart Biosecurity Self-Assessment
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Custom checklist generated from your farm profile & Realtime data.
          </p>
        </div>
      </div>

      {/* FARM INFO */}
      <div className="bg-white border border-gray-200 rounded-xl shadow p-5 mb-6 text-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <User className="text-green-600" size={20} />
            <span><b>Farmer:</b> {userData?.fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-green-600" size={20} />
            <span><b>Location:</b> {userData?.district}, {userData?.state}</span>
          </div>
          <div className="flex items-center gap-2">
            <CloudSun className="text-green-600" size={20} />
            <span><b>Weather:</b> {condText} ({weather?.current?.temp_c}°C)</span>
          </div>
          <div><b>Date:</b> {formatDate(new Date())}</div>
        </div>
      </div>

      {/* STAGES */}
      {stage === "analyzing" && (
        <div className="text-center bg-white p-6 rounded-xl border shadow-sm">
          <Loader2 className="animate-spin mx-auto text-green-600" size={40} />
          <p className="mt-3 text-gray-800 text-lg font-semibold">
            Analyzing weather & farm data…
          </p>
          <p className="text-gray-600 mt-2 text-base">
            Generating your dynamic checklist, please wait.
          </p>
        </div>
      )}

      {stage === "ready" && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow space-y-5">
          <h2 className="text-2xl font-semibold text-gray-900">
            AI-Generated Checklist
          </h2>
          <p className="text-gray-700 text-base">
            Please answer all questions below to assess your biosecurity level.
          </p>

          <div className="grid gap-4">
            {questions.map((q, i) => (
              <div
                key={q.key}
                className="border border-gray-100 shadow-sm rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-gray-50 transition"
              >
                <span className="text-lg text-gray-800 font-medium">
                  {i + 1}. {q.text}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setAnswer(q.key, "yes")}
                    className={`px-4 py-2 rounded-lg text-base font-medium border transition ${
                      answers[q.key] === "yes"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                    }`}
                  >
                    <CheckCircle size={18} className="inline mr-1" /> Yes
                  </button>
                  <button
                    onClick={() => setAnswer(q.key, "no")}
                    className={`px-4 py-2 rounded-lg text-base font-medium border transition ${
                      answers[q.key] === "no"
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"
                    }`}
                  >
                    <XCircle size={18} className="inline mr-1" /> No
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={submitAssessment}
            className="mt-4 bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition"
          >
            Generate Risk Summary
          </button>
        </div>
      )}

      {stage === "results" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border shadow">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Risk Summary</h2>
            <p className="text-gray-700 text-lg font-medium mb-2">
              Biosecurity Score:{" "}
              <span
                className={`font-bold ${
                  score > 80 ? "text-green-600" : score > 50 ? "text-yellow-600" : "text-red-600"
                }`}
              >
                {score}%
              </span>
            </p>

            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
              <div
                className={`h-3 ${
                  score > 80 ? "bg-green-600" : score > 50 ? "bg-yellow-500" : "bg-red-600"
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>

            <p className="text-base text-gray-800 font-medium">{advice}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🚨 Suggested Improvements</h3>
              {insights.atRisk.length ? (
                <ul className="list-disc list-inside text-base text-gray-700 space-y-1">
                  {insights.atRisk.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-base text-gray-600">No improvement areas detected.</p>
              )}
            </div>
            <div className="bg-white p-5 rounded-xl border shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">✅ Good Practices Maintained</h3>
              {insights.performing.length ? (
                <ul className="list-disc list-inside text-base text-gray-700 space-y-1">
                  {insights.performing.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-base text-gray-600">No positive checks yet.</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.print()}
              className="bg-white border border-gray-300 px-5 py-2 rounded-lg text-gray-800 hover:bg-gray-100 text-base font-medium"
            >
              📥 Download Report
            </button>
            <button
              onClick={resetAssessment}
              className="bg-green-700 text-white px-6 py-2 rounded-lg text-base font-semibold hover:bg-green-800"
            >
              Reassess
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
