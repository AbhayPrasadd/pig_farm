import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="bg-gradient-to-br from-green-800 to-emerald-900 text-white py-10 text-center">
    <p className="text-sm text-white/70">
      © 2025 <span className="font-semibold text-white">Jeevya</span> — Smart Farm Intelligence
    </p>
  </footer>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-green-100 via-emerald-50 to-white text-gray-800 min-h-screen overflow-hidden flex flex-col justify-between">
      {/* ---------- HERO SECTION ---------- */}
      <section className="relative flex flex-col justify-center items-center text-center h-screen px-6 overflow-hidden">
        {/* Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-200 via-emerald-100 to-blue-100"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/soft-wallpaper.png')]"></div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.img
            src="/assets/jeevya-logo.png"
            alt="Jeevya Logo"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-56 sm:w-72 md:w-96 lg:w-[28rem] mb-4 drop-shadow-2xl select-none"
          />

          {/* Tagline - Desktop */}
          <p className="hidden md:block text-2xl font-extrabold text-green-900 mb-8 tracking-wide drop-shadow-sm">
            Farm Management Meets Biosecurity Intelligence
          </p>

          {/* Buttons - Desktop */}
          <div className="hidden sm:flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started →
            </motion.button>
            <button className="border border-green-700 text-green-800 px-10 py-4 rounded-full font-semibold hover:bg-green-700 hover:text-white transition-all">
              Learn More
            </button>
          </div>

          {/* ---------- MOBILE VIEW ---------- */}
          <div className="flex flex-col items-center md:hidden mt-4 space-y-4">
            {/* Tagline */}
            <p className="text-green-900 font-extrabold text-xl tracking-wide text-center drop-shadow-sm">
              Smart Biosecurity & Farm Management
            </p>
            <p className="text-sm text-gray-600 max-w-xs leading-snug text-center">
              Empowering farmers with real-time disease prevention, digital
              monitoring & intelligent insights.
            </p>

            {/* Mobile Get Started Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth")}
              className="mt-3 bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-700 transition-all"
            >
              Get Started →
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </div>
  );
};

export default LandingPage;
