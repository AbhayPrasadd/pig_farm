import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  ThermometerSun,
  Droplet,
  Users,
  Leaf,
  Star,
  Globe,
  Activity,
} from "lucide-react";
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
    <div className="bg-gradient-to-b from-green-100 via-emerald-50 to-white text-gray-800 min-h-screen overflow-hidden">
      {/* ---------- HERO SECTION ---------- */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background Gradient (Lighter tones) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-200 via-emerald-100 to-blue-100"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/soft-wallpaper.png')]"></div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center justify-center px-6"
        >
          {/* Logo */}
          <motion.img
            src="/assets/jeevya-logo.png"
            alt="Jeevya Logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-64 sm:w-80 md:w-96 lg:w-[28rem] mb-6 drop-shadow-2xl select-none"
          />

          {/* Heading (visible on desktop only) */}
          <h1 className="hidden md:block text-5xl lg:text-6xl font-extrabold text-green-900 mb-3 leading-tight drop-shadow-sm">
            Jeevya
          </h1>

          {/* Tagline (simple + short) */}
          <p className="hidden md:block text-lg text-gray-700 mb-8">
            Smart Farm Intelligence for a Healthier Tomorrow
          </p>

          {/* Buttons (visible only on desktop view) */}
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

          {/* Splash feel for mobile (logo only, minimal text) */}
          <p className="md:hidden mt-4 text-green-800 font-semibold tracking-wide text-lg">
            Smart Farm Intelligence
          </p>
        </motion.div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </div>
  );
};

export default LandingPage;
