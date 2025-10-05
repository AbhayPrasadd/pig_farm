import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// 🌾 New Farmer Pages (Biosecurity-focused)
import Dashboard from "./pages/farmer/Dashboard"; // updated dashboard (you already have)
import RiskAssessment from "./pages/farmer/RiskAssessment"; // 🆕 new page
import ComplianceLog from "./pages/farmer/ComplianceLog"; // 🆕 new page
import AIAdvisor from "./pages/farmer/AIAdvisor"; // 🆕 new page
import Alerts from "./pages/farmer/Alerts"; // 🆕 new page
import Weather from "./pages/farmer/Weather"; // can reuse existing

// 🧑‍💼 Officer Pages (KEEP OLD)
import OfficerDashboard from "./pages/officer/OfficerDashboard";
import AdvisoryManagement from "./pages/officer/AdvisoryManagement";
import AlertsOfficer from "./pages/officer/Alerts";
import CropData from "./pages/officer/CropData";
import FarmerQueries from "./pages/officer/FarmerQueries";
import KnowledgeBase from "./pages/officer/KnowledgeBase";
import ReportAnalytics from "./pages/officer/ReportAnalytics";
import OfficerProfile from "./pages/officer/OfficerProfile";

// 🏛️ Admin Pages (KEEP OLD)
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import FarmerManagement from "./pages/admin/UserManagement";
import OfficerManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";
import UserManagement from "./pages/admin/UserManagement";

// 🌍 Public Pages (same)
import LandingPage from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import Registration from "./pages/Registration";

// 🧱 Components
import Layout from "./components/Layout";

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(currentUser);
          setRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage setUser={setUser} />} />
      <Route path="/register" element={<Registration />} />

      {/* 🔒 Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          user && role ? (
            <Layout role={role}>
              {/* render dashboard based on role */}
              {role === "farmer" && <Dashboard />}
              {role === "officer" && <OfficerDashboard />}
              {role === "admin" && <AdminDashboard />}
            </Layout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      >

        {/* 🌾 Farmer Routes (Biosecurity Updated) */}
        {role === "farmer" && (
          <>
            <Route index element={<Dashboard />} />
            <Route path="riskAssessment" element={<RiskAssessment />} />
            <Route path="complianceLog" element={<ComplianceLog />} />
            <Route path="aiAdvisor" element={<AIAdvisor />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="weather" element={<Weather />} />
          </>
        )}

        {/* 🧑‍💼 Officer Routes (Unchanged) */}
        {role === "officer" && (
          <>
            <Route index element={<OfficerDashboard />} />
            <Route path="advisory-management" element={<AdvisoryManagement />} />
            <Route path="alerts" element={<AlertsOfficer />} />
            <Route path="crop-data" element={<CropData />} />
            <Route path="farmer-queries" element={<FarmerQueries />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="reports-analytics" element={<ReportAnalytics />} />
            <Route path="profile" element={<OfficerProfile />} />
          </>
        )}

        {/* 🏛️ Admin Routes (Unchanged) */}
        {role === "admin" && (
          <>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="farmer-management" element={<FarmerManagement />} />
            <Route path="officer-management" element={<OfficerManagement />} />
            <Route path="settings" element={<Settings />} />
          </>
        )}
      </Route>

      {/* 🚧 Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
