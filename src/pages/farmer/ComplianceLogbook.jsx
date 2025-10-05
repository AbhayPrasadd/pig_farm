import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  ClipboardList,
  SprayCan,
  Syringe,
  Users,
  Trash2,
  Truck,
  Droplets,
  Brain,
  FileDown,
} from "lucide-react";

const logTypes = {
  disinfection: {
    title: "🧼 Disinfection & Cleaning Log",
    icon: <SprayCan className="text-green-600" size={22} />,
    fields: [
      { label: "Date", type: "date" },
      { label: "Area/Section Cleaned", type: "text" },
      { label: "Disinfectant Used", type: "text" },
      { label: "Person Responsible", type: "text" },
      { label: "Verified by Supervisor", type: "select", options: ["Yes", "No"] },
      { label: "Remarks", type: "text" },
    ],
    insight: "AI will detect missed disinfection days or repeated neglect.",
  },
  vaccination: {
    title: "💉 Health & Vaccination Log",
    icon: <Syringe className="text-blue-600" size={22} />,
    fields: [
      { label: "Date", type: "date" },
      { label: "Vaccine Name", type: "text" },
      { label: "Batch Number", type: "text" },
      { label: "Animal Group", type: "text" },
      { label: "Administered By", type: "text" },
      { label: "Next Due Date", type: "date" },
    ],
    insight: "AI will flag overdue vaccinations automatically.",
  },
  visitors: {
    title: "🚪 Visitor & Worker Entry Log",
    icon: <Users className="text-yellow-600" size={22} />,
    fields: [
      { label: "Date", type: "date" },
      { label: "Name", type: "text" },
      { label: "Purpose of Visit", type: "text" },
      { label: "Time In", type: "time" },
      { label: "Sanitization Done", type: "select", options: ["Yes", "No"] },
      { label: "PPE Used", type: "select", options: ["Yes", "No"] },
    ],
    insight: "AI will summarize visitor frequency and hygiene compliance.",
  },
  waste: {
    title: "🗑️ Waste Disposal Log",
    icon: <Trash2 className="text-red-600" size={22} />,
    fields: [
      { label: "Date", type: "date" },
      { label: "Waste Type", type: "text" },
      { label: "Quantity", type: "text" },
      { label: "Disposal Method", type: "select", options: ["Composting", "Burning", "Landfill"] },
      { label: "Collected By", type: "text" },
      { label: "Verified", type: "select", options: ["Yes", "No"] },
    ],
    insight: "System will warn if waste not disposed for >3 days.",
  },
  vehicles: {
    title: "🚜 Vehicle Disinfection Log",
    icon: <Truck className="text-purple-600" size={22} />,
    fields: [
      { label: "Date", type: "date" },
      { label: "Vehicle Number", type: "text" },
      { label: "Purpose", type: "text" },
      { label: "Disinfection Done", type: "select", options: ["Yes", "No"] },
      { label: "Disinfectant Used", type: "text" },
      { label: "Remarks", type: "text" },
    ],
    insight: "AI can track vehicles that skip disinfection frequently.",
  },
  feedwater: {
    title: "🌾 Feed & Water Hygiene Log",
    icon: <Droplets className="text-emerald-600" size={22} />,
    fields: [
      { label: "Date", type: "date" },
      { label: "Check Type", type: "select", options: ["Feed", "Water"] },
      { label: "Condition", type: "select", options: ["Good", "Fair", "Poor"] },
      { label: "Action Taken", type: "text" },
      { label: "Verified By", type: "text" },
    ],
    insight: "AI can detect poor hygiene trends and send alerts.",
  },
};

export default function ComplianceLogbook() {
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({});
  const [records, setRecords] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const log = logTypes[selected];

  const handleChange = (label, value) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecords((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({});
    setSubmitted(true);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(log.title + " Report", 14, 15);
    const tableData = records.map((rec) =>
      log.fields.map((f) => rec[f.label] || "")
    );
    doc.autoTable({
      head: [log.fields.map((f) => f.label)],
      body: tableData,
      startY: 25,
      theme: "grid",
    });
    doc.save(`${log.title.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="p-6 md:p-10 font-poppins bg-gray-50 min-h-screen text-gray-800">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <ClipboardList className="text-green-700" size={34} />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance Logbook</h1>
          <p className="text-gray-600 text-base">
            Record daily activities and view reports instantly.
          </p>
        </div>
      </div>

      {/* SELECTOR */}
      <div className="bg-white border border-green-300 rounded-lg shadow-sm p-4 mb-6">
        <label className="block font-semibold text-gray-800 mb-2">
          Select Log Type
        </label>
        <select
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            setSubmitted(false);
            setRecords([]);
          }}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-green-500"
        >
          <option value="">-- Choose Log Type --</option>
          {Object.entries(logTypes).map(([key, val]) => (
            <option key={key} value={key}>
              {val.title}
            </option>
          ))}
        </select>
      </div>

      {/* FORM */}
      {log && (
        <div className="bg-white border border-green-200 rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            {log.icon}
            <h2 className="text-2xl font-semibold text-gray-900">{log.title}</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {log.fields.map((field) => (
              <div
                key={field.label}
                className="flex flex-col bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm"
              >
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    value={formData[field.label] || ""}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select</option>
                    {field.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.label] || ""}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                    placeholder={field.placeholder || ""}
                  />
                )}
              </div>
            ))}
            <div className="col-span-full flex gap-3 mt-2">
              <button
                type="submit"
                className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition-all"
              >
                Save Entry
              </button>
              {records.length > 0 && (
                <button
                  type="button"
                  onClick={exportPDF}
                  className="bg-white border border-green-400 text-green-700 px-5 py-2 rounded-md font-semibold hover:bg-green-50 transition-all flex items-center gap-2"
                >
                  <FileDown size={18} /> Export PDF
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* RECORD TABLE */}
      {records.length > 0 && (
        <div className="bg-white border border-green-200 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Recent Log Entries
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-green-100 text-gray-800">
                <tr>
                  {log.fields.map((f) => (
                    <th key={f.label} className="p-2 border text-left">
                      {f.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    {log.fields.map((f) => (
                      <td key={f.label} className="p-2 border text-gray-700">
                        {record[f.label] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2 mt-4 text-green-700">
            <Brain size={18} />
            <p className="text-sm">{log.insight}</p>
          </div>
        </div>
      )}
    </div>
  );
}
