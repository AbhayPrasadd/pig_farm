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

/* ---------- Reusable Glass Card ---------- */
const GlassCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-xl transition-all duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

/* ---------- Feature Card ---------- */
const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 transform hover:-translate-y-2"
  >
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4 bg-gradient-to-br ${color} shadow-md`}
    >
      <Icon className="text-white w-7 h-7" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

/* ---------- Stat Card ---------- */
const StatCard = ({ number, label, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/90 backdrop-blur-md border border-green-100 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition"
  >
    <Icon className="w-8 h-8 mx-auto mb-3 text-green-600" />
    <div className="text-3xl font-bold text-gray-800">{number}</div>
    <p className="text-gray-600 text-sm">{label}</p>
  </motion.div>
);

/* ---------- Footer ---------- */
const Footer = () => (
  <footer className="bg-gradient-to-br from-green-900 to-blue-900 text-white py-12 mt-20">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center mb-4">
          <ShieldCheck className="w-8 h-8 text-green-400 mr-2" />
          <h3 className="text-2xl font-bold">AgriSafe</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Empowering every farmer with smart digital safety — no tech skills needed.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Platform</h4>
        <ul className="space-y-2 text-gray-300">
          <li>Dashboard</li>
          <li>Alerts</li>
          <li>Compliance Tools</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Company</h4>
        <ul className="space-y-2 text-gray-300">
          <li>About</li>
          <li>Careers</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Support</h4>
        <ul className="space-y-2 text-gray-300">
          <li>Help Center</li>
          <li>FAQs</li>
          <li>Community</li>
        </ul>
      </div>
    </div>
    <div className="mt-10 border-t border-white/20 pt-6 text-center text-gray-400 text-sm">
      © 2025 AgriSafe. All Rights Reserved.
    </div>
  </footer>
);

/* ---------- Landing Page ---------- */
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Parallax Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-blue-700"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/green-dust-and-scratches.png')]"></div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white px-6"
        >
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-yellow-300 drop-shadow-lg" />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-xl">
            Protecting Every Farm, <br /> Preventing Every Outbreak.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            AgriSafe brings smart protection — track hygiene, get voice alerts, and stay worry-free.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-yellow-400 to-green-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg"
            >
              Get Started →
            </motion.button>
            <button className="border border-white/40 px-10 py-4 rounded-full font-bold text-white hover:bg-white/10 transition duration-300">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Animated Scroll Down Arrow */}
        <motion.div
          className="absolute bottom-6 flex justify-center w-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white opacity-80 drop-shadow-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">The Biosecurity Challenge</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Farmers face invisible threats — from bird flu to swine fever — due to low awareness and poor monitoring.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <FeatureCard icon={AlertTriangle} title="Outbreak Risk" description="Farmers struggle to detect early disease signs." color="from-red-500 to-orange-500" />
            <FeatureCard icon={Droplet} title="Poor Sanitation Tracking" description="Manual logs make hygiene tracking unreliable." color="from-blue-500 to-cyan-500" />
            <FeatureCard icon={Activity} title="No Centralized Monitoring" description="Scattered data slows quick action." color="from-green-600 to-emerald-600" />
          </div>
        </motion.div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-100">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Smart Digital Solution</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            With AI, IoT sensors, and voice-enabled tools — AgriSafe keeps every farmer safe, informed, and connected.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <FeatureCard icon={ThermometerSun} title="Real-Time Disease Alerts" description="AI warns before outbreaks spread." color="from-yellow-500 to-orange-500" />
            <FeatureCard icon={ShieldCheck} title="Smart Risk Assessment" description="AI-based evaluation of infection risk." color="from-green-600 to-teal-600" />
            <FeatureCard icon={Users} title="Collaborative Compliance" description="One dashboard for inspections & hygiene." color="from-blue-600 to-indigo-600" />
          </div>
        </motion.div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-10 text-gray-900"
          >
            Proven Impact
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard number="40%" label="Disease Risk Reduced" icon={ShieldCheck} />
            <StatCard number="25%" label="Less Water Used" icon={Droplet} />
            <StatCard number="5K+" label="Farms Protected" icon={Leaf} />
            <StatCard number="12+" label="Countries Covered" icon={Globe} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">What Farmers Say</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              {
                quote: "AgriSafe helped us stop an outbreak before it spread.",
                author: "Ramesh Kumar",
                role: "Poultry Farmer, Haryana",
              },
              {
                quote: "Voice alerts and easy logbook help us every day.",
                author: "Sunita Devi",
                role: "Pig Farmer, Bihar",
              },
              {
                quote: "Now our cattle are safe, and we feel confident.",
                author: "Ajay Singh",
                role: "Cattle Farmer, UP",
              },
            ].map((t, idx) => (
              <GlassCard key={idx} className="p-8 text-left bg-white/80">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
                <div className="font-semibold text-gray-900">{t.author}</div>
                <div className="text-sm text-gray-600">{t.role}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-blue-700 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6"
        >
          Join the Biosecure Farming Revolution
        </motion.h2>
        <p className="text-lg text-white/90 mb-10 max-w-3xl mx-auto">
          Protect your animals. Protect your income. Join AgriSafe today — simple tools for a safe tomorrow.
        </p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/auth")}
          className="bg-white text-green-700 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-50 transition-all"
        >
          Get Started Now
        </motion.button>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
