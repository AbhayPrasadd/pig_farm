import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// 🌾 Farmer Pages
import Dashboard from "./pages/farmer/Dashboard";
import RiskAssessment from "./pages/farmer/RiskAssessment";
import ComplianceLog from "./pages/farmer/ComplianceLog";
import ComplianceLogbook from "./pages/farmer/ComplianceLogbook";
import AIAdvisor from "./pages/farmer/AIAdvisor";
import Alerts from "./pages/farmer/Alerts";
import Weather from "./pages/farmer/Weather";
import Training from "./pages/farmer/Training";
import FarmerProfile from "./pages/farmer/FarmerProfile"; 
import FarmExpense from "./pages/farmer/FarmExpense"; 

// 🧑‍💼 Officer Pages
import OfficerDashboard from "./pages/officer/OfficerDashboard";
import RiskMap from "./pages/officer/RiskMap";
import ComplianceRepository from "./pages/officer/ComplianceRepository";
import AdvisoryManagement from "./pages/officer/AdvisoryManagement";
import ComplianceAnalytics from "./pages/officer/ComplianceAnalytics";
import OfficerProfile from "./pages/officer/OfficerProfile";
// import AlertsOfficer from "./pages/officer/Alerts";
// import KnowledgeBase from "./pages/officer/KnowledgeBase";

// 🏛️ Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import FarmerManagement from "./pages/admin/UserManagement";
import OfficerManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";
import UserManagement from "./pages/admin/UserManagement";

// 🌍 Public Pages
import LandingPage from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import Registration from "./pages/Registration";

// 🧱 Components
import Layout from "./components/Layout";
// import RiskMap from "./pages/officer/RiskMap";

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
              {role === "farmer" && <Dashboard />}
              {role === "officer" && <OfficerDashboard />}
              {role === "admin" && <AdminDashboard />}
            </Layout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      >
        {/* 🌾 Farmer Routes */}
        {role === "farmer" && (
          <>
            <Route index element={<Dashboard />} />
            <Route path="riskAssessment" element={<RiskAssessment />} />
            <Route path="complianceLog" element={<ComplianceLog />} />
            <Route path="complianceLogbook" element={<ComplianceLogbook />} />
            <Route path="aiAdvisor" element={<AIAdvisor />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="weather" element={<Weather />} />
            <Route path="training" element={<Training />} />
            <Route path="expense" element={<FarmExpense/>} />
            <Route path="profilePage" element={<FarmerProfile />} /> 
          </>
        )}

        {/* 🧑‍💼 Officer Routes */}
        {role === "officer" && (
          <>
            <Route index element={<OfficerDashboard />} />
            <Route path="risk-map" element={<RiskMap />} />
            <Route path="compliance-repository" element={<ComplianceRepository />} />
            <Route path="advisory-management" element={<AdvisoryManagement />} />
            <Route path="compliance-analytics" element={<ComplianceAnalytics />} />
            <Route path="profile" element={<OfficerProfile />} />
            {/* <Route path="alerts" element={<AlertsOfficer />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} /> */}
          </>
        )}

        {/* 🏛️ Admin Routes */}
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
