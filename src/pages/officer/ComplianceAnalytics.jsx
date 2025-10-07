import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function ComplianceAnalytics() {
  const COLORS = ["#00C49F", "#FFBB28"];
  const riskData = [
    { month: "Jan", high: 5, medium: 8, low: 15 },
    { month: "Feb", high: 8, medium: 10, low: 18 },
    { month: "Mar", high: 4, medium: 7, low: 20 },
  ];

  const complianceData = [
    { district: "Cuttack", compliance: 85 },
    { district: "Balasore", compliance: 72 },
    { district: "Mayurbhanj", compliance: 93 },
  ];

  const farmTypeData = [
    { name: "Pig", value: 60 },
    { name: "Poultry", value: 40 },
  ];

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-4">📊 Compliance & Performance Analytics</h1>
      <p className="text-center text-gray-600 mb-6">Track compliance rates, risk trends, and farm performance over time.</p>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-gray-600">🧾 Total Farms</h3>
          <p className="text-2xl font-bold">256</p>
        </div>
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-gray-600">✅ Assessments Completed</h3>
          <p className="text-2xl font-bold">78%</p>
        </div>
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-gray-600">⚠ High Risk Farms</h3>
          <p className="text-2xl font-bold text-red-500">12</p>
        </div>
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="text-gray-600">📈 Compliance Growth</h3>
          <p className="text-2xl font-bold text-green-600">+9%</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">📉 Risk Level Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={riskData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="high" stroke="#EF4444" />
              <Line dataKey="medium" stroke="#FACC15" />
              <Line dataKey="low" stroke="#22C55E" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">🏢 Compliance by District</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={complianceData}>
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="compliance" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow md:col-span-2">
          <h2 className="font-semibold mb-2">🐖 Farm Type Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={farmTypeData} dataKey="value" outerRadius={80} label>
                {farmTypeData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ComplianceAnalytics;
