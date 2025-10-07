import React, { useState } from "react";

function ComplianceRepository() {
  const [search, setSearch] = useState("");
  const data = [
    { id: 1, farm: "GreenField Farm", owner: "Ramesh", district: "Cuttack", type: "Pig", risk: "High", date: "2025-09-21" },
    { id: 2, farm: "Sunrise Poultry", owner: "Sita", district: "Balasore", type: "Poultry", risk: "Medium", date: "2025-09-18" },
  ];

  const filtered = data.filter((d) =>
    d.farm.toLowerCase().includes(search.toLowerCase()) || d.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-4">📁 Compliance Record Repository</h1>
      <p className="text-center text-gray-600 mb-6">Access and manage all farm compliance reports in one place.</p>

      <input
        type="text"
        placeholder="🔍 Search by farm or owner"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 border p-2 rounded shadow-sm"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded-xl">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Farm</th>
              <th className="p-3">Owner</th>
              <th className="p-3">District</th>
              <th className="p-3">Type</th>
              <th className="p-3">Risk</th>
              <th className="p-3">Last Updated</th>
              <th className="p-3">Download</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{row.farm}</td>
                <td className="p-3">{row.owner}</td>
                <td className="p-3">{row.district}</td>
                <td className="p-3">{row.type}</td>
                <td className={`p-3 font-semibold ${row.risk === "High" ? "text-red-500" : row.risk === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                  {row.risk}
                </td>
                <td className="p-3">{row.date}</td>
                <td className="p-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplianceRepository;
