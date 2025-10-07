import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Database,
  Users,
  BarChart,
  User,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const OfficerSidebar = ({ setIsSidebarOpen }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // 🌿 Officer Menu Items
  const menuItems = useMemo(
    () => [
      { name: t("Officer Dashboard"), path: "/dashboard", icon: <Home size={20} /> },
      { name: t("Risk Map"), path: "/dashboard/risk-map", icon: <BookOpen size={20} /> },
      { name: t("Compliance Analytics"), path: "/dashboard/compliance-analytics", icon: <BarChart size={20} /> },
      { name: t("Advisory Management"), path: "/dashboard/advisory-management", icon: <Users size={20} /> },
      { name: t("Compliance Repository"), path: "/dashboard/compliance-repository", icon: <Database size={20} /> },
      { name: t("Profile"), path: "/dashboard/profile", icon: <User size={20} /> },
    ],
    [t]
  );

  return (
    <div className="bg-green-900 text-white h-full w-64 p-4 pt-20 md:pt-24 flex flex-col justify-between relative">
      {/* 🔝 Jeevya Logo (Mobile Only) */}
      <div className="md:hidden flex items-center justify-between absolute top-3 left-4 right-4">
        <div className="flex items-center gap-2">
          <img
            src="/assets/jeevya-logo.png"
            alt="Jeevya Logo"
            className="h-14 w-auto drop-shadow-lg brightness-110"
          />
          <span className="text-xl font-bold tracking-wide text-white">
            Jeevya
          </span>
        </div>

        {/* ❌ Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-white hover:text-green-300 transition-colors duration-200"
        >
          <X size={26} />
        </button>
      </div>

      {/* 🧭 Navigation Links */}
      <nav className="space-y-1 mt-20 md:mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm md:text-base font-medium transition-all ${
              location.pathname === item.path
                ? "bg-green-700 text-white shadow-sm"
                : "hover:bg-green-800 text-white/90"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* ⚙️ Footer */}
      <div className="text-center text-xs text-white/60 mt-6 mb-2">
        <hr className="border-white/20 my-2" />
        <p>Jeevya © 2025</p>
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default OfficerSidebar;
