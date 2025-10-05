import React, { useState } from "react";
import {
  PlayCircle,
  Award,
  CheckCircle2,
  Star,
  Brain,
} from "lucide-react";

const lessonsData = [
  {
    id: 1,
    title: "🧼 Disinfection & Cleaning Basics",
    duration: "2 min",
    completed: false,
    points: 20,
    thumbnail:
      "https://images.unsplash.com/photo-1588776814546-4871f715c3be?auto=format&fit=crop&w=800&q=60",
    quiz: [
      {
        q: "How often should pig pens be disinfected?",
        options: ["Weekly", "Daily", "Monthly"],
        correct: "Daily",
      },
      {
        q: "Which disinfectant is effective against ASF?",
        options: ["Virkon S", "Plain Water", "Soap"],
        correct: "Virkon S",
      },
    ],
  },
  {
    id: 2,
    title: "💉 Vaccination Awareness",
    duration: "3 min",
    completed: false,
    points: 25,
    thumbnail:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
    quiz: [
      {
        q: "Who should administer vaccines?",
        options: ["Farm Owner", "Local Vet", "Any Worker"],
        correct: "Local Vet",
      },
      {
        q: "What to record after vaccination?",
        options: ["Batch No.", "Animal Name", "Feed Type"],
        correct: "Batch No.",
      },
    ],
  },
  {
    id: 3,
    title: "🚪 Visitor Entry Hygiene",
    duration: "2 min",
    completed: false,
    points: 15,
    thumbnail:
      "https://images.unsplash.com/photo-1600878458526-1d5d2c3c2d10?auto=format&fit=crop&w=800&q=60",
    quiz: [
      {
        q: "What should visitors wear before entering?",
        options: ["PPE Kit", "Normal Clothes", "Footwear Only"],
        correct: "PPE Kit",
      },
      {
        q: "Why limit visitor access?",
        options: [
          "To reduce disease risk",
          "To save time",
          "To maintain records",
        ],
        correct: "To reduce disease risk",
      },
    ],
  },
];

export default function Training() {
  const [lessons, setLessons] = useState(lessonsData);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleQuizSubmit = () => {
    let correct = 0;
    selectedLesson.quiz.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    const score = (correct / selectedLesson.quiz.length) * 100;
    const newXP = xp + selectedLesson.points;
    setXp(newXP);

    const updatedLessons = lessons.map((l) =>
      l.id === selectedLesson.id ? { ...l, completed: true } : l
    );
    setLessons(updatedLessons);

    const newBadge =
      newXP >= 60
        ? "🏆 Farm Safety Master"
        : newXP >= 40
        ? "🥈 Hygiene Hero"
        : newXP >= 20
        ? "🥉 Biosecurity Beginner"
        : null;

    if (newBadge && !badges.includes(newBadge)) setBadges([...badges, newBadge]);

    setShowResult({ score, correct, total: selectedLesson.quiz.length });
  };

  return (
    <div className="p-6 md:p-10 font-poppins bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Brain className="text-green-700" size={36} />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              FarmShield Learning Hub 🎓
            </h1>
            <p className="text-base text-gray-600">
              Complete lessons, earn XP, and master biosecurity practices.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-green-300 px-5 py-3 rounded-lg text-center">
          <p className="text-sm font-medium text-gray-600">Your XP</p>
          <p className="text-3xl font-bold text-green-700">{xp}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-3 rounded-full mb-8 overflow-hidden">
        <div
          className="h-3 bg-green-600"
          style={{ width: `${Math.min((xp / 100) * 100, 100)}%` }}
        ></div>
      </div>

      {/* Badges Section */}
      {badges.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Award className="text-yellow-500" /> Your Achievements
          </h2>
          <div className="flex flex-wrap gap-3">
            {badges.map((b, i) => (
              <div
                key={i}
                className="bg-white border border-green-300 px-4 py-2 rounded-lg shadow-sm font-medium text-green-800"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`bg-white border border-green-300 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden ${
              lesson.completed ? "opacity-90" : ""
            }`}
          >
            <div className="relative">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="h-40 w-full object-cover"
              />
              {!lesson.completed && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
                  <PlayCircle size={40} className="text-white opacity-90" />
                </div>
              )}
              {lesson.completed && (
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                  Completed
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {lesson.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Duration: {lesson.duration}
                </p>
                <p className="text-sm text-gray-500">
                  XP Reward:{" "}
                  <span className="font-semibold text-green-700">
                    {lesson.points}
                  </span>
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedLesson(lesson);
                  setAnswers({});
                  setShowResult(false);
                }}
                className={`mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all ${
                  lesson.completed
                    ? "bg-gray-200 text-gray-600 cursor-default"
                    : "bg-green-700 text-white hover:bg-green-800"
                }`}
                disabled={lesson.completed}
              >
                {lesson.completed ? (
                  <>
                    <CheckCircle2 size={18} /> Done
                  </>
                ) : (
                  <>
                    <PlayCircle size={18} /> Start Lesson
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedLesson(null)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedLesson.title}
            </h2>

            {!showResult ? (
              <>
                {selectedLesson.quiz.map((q, i) => (
                  <div key={i} className="mb-5">
                    <p className="text-gray-800 font-medium mb-2">
                      {i + 1}. {q.q}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt) => (
                        <label
                          key={opt}
                          className="block text-sm text-gray-700 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`q${i}`}
                            value={opt}
                            checked={answers[i] === opt}
                            onChange={(e) =>
                              setAnswers({ ...answers, [i]: e.target.value })
                            }
                            className="mr-2 accent-green-600"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleQuizSubmit}
                  className="w-full mt-6 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition-all"
                >
                  Submit Answers
                </button>
              </>
            ) : (
              <div className="text-center py-6">
                <Star className="text-yellow-400 w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  You scored {showResult.score.toFixed(0)}%
                </h3>
                <p className="text-gray-700 mb-3">
                  Correct Answers: {showResult.correct}/{showResult.total}
                </p>
                <p className="text-green-700 font-medium mb-4">
                  +{selectedLesson.points} XP Earned!
                </p>
                <button
                  className="bg-green-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-800"
                  onClick={() => setSelectedLesson(null)}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
