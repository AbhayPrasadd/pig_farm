import { Home, ClipboardCheck, Bot, AlertTriangle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomTabBar = ({ isSidebarOpen }) => {
  const location = useLocation();

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 bg-green-900 text-white shadow-md border-t border-green-800 z-30 transition-all duration-300 ${
        isSidebarOpen ? "mb-[calc(100vh-4rem)]" : ""
      }`}
    >
      <div className="flex justify-between items-center px-4 py-2">
        {/* 🏠 Home */}
        <Link to="/dashboard">
          <div className="flex flex-col items-center gap-1">
            <Home
              size={22}
              className={location.pathname === "/dashboard" ? "text-yellow-300" : "text-white"}
            />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        {/* 📋 Risk Assessment */}
        <Link to="/dashboard/riskAssessment">
          <div className="flex flex-col items-center gap-1">
            <ClipboardCheck
              size={22}
              className={
                location.pathname === "/dashboard/riskAssessment"
                  ? "text-yellow-300"
                  : "text-white"
              }
            />
            <span className="text-xs">Assess</span>
          </div>
        </Link>

        {/* 🤖 AI Advisor */}
        <Link to="/dashboard/aiAdvisor">
          <div className="flex flex-col items-center gap-1 scale-125">
            <Bot
              size={26}
              className={
                location.pathname === "/dashboard/aiAdvisor"
                  ? "text-yellow-300"
                  : "text-yellow-300"
              }
            />
            <span className="text-xs">AI Help</span>
          </div>
        </Link>

        {/* ⚠️ Alerts */}
        <Link to="/dashboard/alerts">
          <div className="flex flex-col items-center gap-1">
            <AlertTriangle
              size={22}
              className={
                location.pathname === "/dashboard/alerts"
                  ? "text-yellow-300"
                  : "text-white"
              }
            />
            <span className="text-xs">Alerts</span>
          </div>
        </Link>

        {/* 👤 Profile */}
        <Link to="/dashboard/profilePage">
          <div className="flex flex-col items-center gap-1">
            <User
              size={22}
              className={
                location.pathname === "/dashboard/profilePage"
                  ? "text-yellow-300"
                  : "text-white"
              }
            />
            <span className="text-xs">Profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BottomTabBar;
