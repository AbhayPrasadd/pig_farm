import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  ThermometerSun,
  Droplet,
  Users,
  ArrowRight,
  Leaf,
  CheckCircle,
  Star,
  Globe,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------------- Reusable Glass Card ---------------- */
const GlassCard = ({ children, className = "" }) => (
  <div
    className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl ${className}`}
  >
    {children}
  </div>
);

/* ---------------- Feature Card ---------------- */
const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100">
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4 bg-gradient-to-br ${color}`}
    >
      <Icon className="text-white w-7 h-7" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

/* ---------------- Stat Card ---------------- */
const StatCard = ({ number, label, icon: Icon }) => (
  <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl p-6 text-center shadow-md">
    <Icon className="w-8 h-8 mx-auto mb-3 text-green-600" />
    <div className="text-3xl font-bold text-gray-800">{number}</div>
    <p className="text-gray-600 text-sm">{label}</p>
  </div>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
  <footer className="bg-gradient-to-br from-green-900 to-blue-900 text-white py-12 mt-20">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center mb-4">
          <ShieldCheck className="w-8 h-8 text-green-400 mr-2" />
          <h3 className="text-2xl font-bold">AgriSafe</h3>
        </div>
        <p className="text-gray-300">
          Empowering farmers with digital biosecurity and disease prevention.
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

/* ---------------- Landing Page ---------------- */
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-blue-900 opacity-90"></div>
        <div className="absolute inset-0 bg-pattern opacity-20"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Protecting Farms, <br /> Preventing Outbreaks.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            AgriSafe is your AI-powered digital companion for farm biosecurity,
            disease prevention, and risk monitoring.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 shadow-lg transform hover:scale-105 transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5 inline-block ml-2" />
            </button>
            <button className="border border-white/40 px-10 py-4 rounded-xl font-bold text-white hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            The Biosecurity Challenge
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Farms are vulnerable to diseases like Avian Influenza and ASF.
            Lack of monitoring, poor hygiene tracking, and limited awareness lead
            to major losses in livestock and crops every year.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <FeatureCard
              icon={AlertTriangle}
              title="Outbreak Risk"
              description="Farmers struggle to detect early warning signs of disease spread."
              color="from-red-500 to-orange-500"
            />
            <FeatureCard
              icon={Droplet}
              title="Poor Sanitation Tracking"
              description="Manual disinfection records make compliance inconsistent."
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={Activity}
              title="No Centralized Monitoring"
              description="Health and inspection data is scattered across departments."
              color="from-green-600 to-emerald-600"
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Smart Digital Solution
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            AgriSafe integrates AI, IoT, and cloud technology to automate
            hygiene tracking, disease prediction, and compliance reporting —
            keeping your farm healthy and your animals safe.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <FeatureCard
              icon={ThermometerSun}
              title="Real-Time Disease Alerts"
              description="AI-driven alerts warn you before outbreaks spread."
              color="from-yellow-500 to-orange-500"
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Smart Risk Assessment"
              description="Automated HIRA tools evaluate and reduce infection risks."
              color="from-green-600 to-teal-600"
            />
            <FeatureCard
              icon={Users}
              title="Collaborative Compliance"
              description="Track hygiene tasks, inspections, and approvals in one place."
              color="from-blue-600 to-indigo-600"
            />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 text-gray-900">
            Proven Impact
          </h2>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            What Farmers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              {
                quote: "AgriSafe helped us avoid an outbreak this year.",
                author: "Ramesh Kumar",
                role: "Poultry Farmer, Haryana",
              },
              {
                quote: "Digital logbooks make biosecurity tracking easy.",
                author: "Sunita Devi",
                role: "Pig Farmer, Bihar",
              },
              {
                quote: "The alerts saved my livestock from infection.",
                author: "Ajay Singh",
                role: "Cattle Farmer, UP",
              },
            ].map((t, idx) => (
              <GlassCard key={idx} className="p-8 text-left bg-white/70">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
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

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-blue-700 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          Join the Biosecure Farming Revolution
        </h2>
        <p className="text-lg text-white/90 mb-10 max-w-3xl mx-auto">
          Start protecting your farm today with AgriSafe — digital tools for a
          safer, healthier agricultural future.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="bg-white text-green-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-50 shadow-lg transform hover:scale-105 transition-all"
        >
          Get Started Now
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
