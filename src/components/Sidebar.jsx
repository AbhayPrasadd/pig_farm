import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ClipboardCheck,
  FileText,
  NotebookPen,
  Bot,
  GraduationCap,
  Wallet,
  User,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Sidebar = ({ setIsSidebarOpen }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // 🌾 Farmer Menu Items
  const menuItems = useMemo(
    () => [
      { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
      { name: "Risk Assessment", path: "/dashboard/riskAssessment", icon: <ClipboardCheck size={20} /> },
      { name: "Logbooks", path: "/dashboard/complianceLogbook", icon: <NotebookPen size={20} /> },
      { name: "Compliance", path: "/dashboard/complianceLog", icon: <FileText size={20} /> },
      { name: "AI Advisor", path: "/dashboard/aiAdvisor", icon: <Bot size={20} /> },
      { name: "Training & Learning", path: "/dashboard/training", icon: <GraduationCap size={20} /> },
      { name: "Expense Tracker", path: "/dashboard/expense", icon: <Wallet size={20} /> },
      { name: "Profile", path: "/dashboard/profilePage", icon: <User size={20} /> },
    ],
    [t]
  );

  return (
    <div className="bg-green-900 text-white h-full w-64 p-4 pt-20 md:pt-24 flex flex-col justify-between relative">
      {/* 🔝 Mobile Logo + Close Button */}
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

        {/* Close Button (Mobile only) */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-white hover:text-green-300 transition-colors duration-200"
        >
          <X size={26} />
        </button>
      </div>

      {/* 🧭 Navigation Links */}
      <nav className="space-y-1 mt-20 md:mt-4">
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

export default Sidebar;
