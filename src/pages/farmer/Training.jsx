import React, { useState } from "react";
import {
  PlayCircle,
  CheckCircle2,
  Award,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";

const lessonsData = [
  {
    id: 1,
    title: "🧼 Disinfection & Cleaning Basics",
    duration: "2 min",
    points: 20,
    completed: false,
    image: "/images/disinfection.jpg",
  },
  {
    id: 2,
    title: "💉 Vaccination Awareness",
    duration: "3 min",
    points: 25,
    completed: false,
    image: "/images/vaccination.jpg",
  },
  {
    id: 3,
    title: "🚪 Visitor Entry Hygiene",
    duration: "2 min",
    points: 15,
    completed: true,
    image: "/images/visitor.jpg",
  },
];

export default function TrainingHub() {
  const [xp, setXp] = useState(60);
  const [level] = useState("Level 1: Trainee");

  return (
    <div className="bg-gray-50 min-h-screen font-poppins text-gray-800">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-5 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              FarmShield Learning Hub
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Learn how to protect your animals and improve farm biosecurity.
            </p>
          </div>

          <div className="mt-3 sm:mt-0 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-800 font-semibold flex items-center justify-between gap-3 shadow-sm">
            <span>{level}</span>
            <span className="text-green-700 font-bold">{xp}/100 XP</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Continue Learning Section */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            Continue Learning
          </h2>

          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <img
                src="/images/animal-health.jpg"
                alt="Animal Health Monitoring"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Next Up: Animal Health Monitoring
                </h3>
                <p className="text-sm text-gray-600">
                  Learn how to spot early signs of illness in your herd.
                </p>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
              <PlayCircle size={16} /> Resume Lesson
            </button>
          </div>
        </section>

        {/* Getting Started Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-5">
            Getting Started
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonsData.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-44 w-full">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                  {lesson.completed && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-semibold text-sm">
                      <CheckCircle2 size={18} className="mr-1" />
                      Completed
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {lesson.title}
                  </h3>

                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <Clock size={14} />
                    <span>{lesson.duration}</span>
                    <span className="mx-1">•</span>
                    <span className="flex items-center gap-1 text-green-700 font-medium">
                      <Star size={14} /> {lesson.points} XP
                    </span>
                  </div>

                  <button
                    className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                      lesson.completed
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {lesson.completed ? (
                      "Review Lesson"
                    ) : (
                      <>
                        <PlayCircle size={16} /> Start Lesson
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Badge / Reward Section */}
        <section className="mt-12 text-center">
          <div className="bg-white border border-gray-200 rounded-xl shadow p-8 max-w-3xl mx-auto">
            <Award
              size={48}
              className="text-yellow-500 mx-auto mb-3 animate-bounce"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Earn Badges as You Learn!
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Gain XP and unlock badges like{" "}
              <span className="font-semibold text-green-700">
                “Hygiene Hero”
              </span>{" "}
              and{" "}
              <span className="font-semibold text-green-700">
                “Biosecurity Expert”
              </span>{" "}
              as you complete training modules.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
