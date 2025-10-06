import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Wallet,
  FileDown,
  BarChart3,
  PiggyBank,
  Trash2,
  Loader2,
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function FarmExpense() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    category: "",
    amount: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    "Feed",
    "Labor",
    "Fuel",
    "Medicine",
    "Maintenance",
    "Transport",
    "Electricity",
    "Misc",
  ];

  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const categoryTotals = categories.map((cat) => ({
    category: cat,
    total: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount), 0),
  }));

  const addExpense = () => {
    if (!newExpense.date || !newExpense.category || !newExpense.amount) return;
    setExpenses([...expenses, newExpense]);
    setNewExpense({ date: "", category: "", amount: "", notes: "" });
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Farm Expense Report", 14, 15);
    doc.autoTable({
      startY: 25,
      head: [["Date", "Category", "Amount (₹)", "Notes"]],
      body: expenses.map((e) => [e.date, e.category, e.amount, e.notes || "-"]),
    });
    doc.text(`Total: ₹${totalExpense}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save("FarmExpenseReport.pdf");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 font-poppins  text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Wallet size={34} className="text-green-700" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Farm Expense Tracker
            </h1>
            <p className="text-gray-500 text-sm">
              Track and manage farm spending efficiently
            </p>
          </div>
        </div>
        <button
          onClick={generatePDF}
          className="mt-3 sm:mt-0 flex items-center gap-2 bg-white border border-green-400 text-green-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 shadow-sm"
        >
          <FileDown size={16} /> Export PDF
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Loading data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Expense Form */}
          <div className="bg-white border border-green-300 rounded-xl shadow p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Add Expense
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <input
                type="date"
                className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-green-600"
                value={newExpense.date}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, date: e.target.value })
                }
              />
              <select
                className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-green-600"
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, category: e.target.value })
                }
              >
                <option value="">Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Amount (₹)"
                className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-green-600"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Notes"
                className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-green-600"
                value={newExpense.notes}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, notes: e.target.value })
                }
              />
            </div>

            <button
              onClick={addExpense}
              className="mt-4 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto px-4 py-2 rounded-lg font-semibold text-sm"
            >
              <PlusCircle size={16} /> Add
            </button>
          </div>

          {/* Expense Table */}
          <div className="bg-white border border-green-300 rounded-xl shadow p-4 sm:p-6 mb-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Expenses
            </h2>
            {expenses.length > 0 ? (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-100 text-left">
                    <th className="p-2 border-b">Date</th>
                    <th className="p-2 border-b">Category</th>
                    <th className="p-2 border-b">Amount (₹)</th>
                    <th className="p-2 border-b hidden sm:table-cell">Notes</th>
                    <th className="p-2 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e, i) => (
                    <tr
                      key={i}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="p-2">{e.date}</td>
                      <td className="p-2">{e.category}</td>
                      <td className="p-2 font-medium text-green-700">
                        ₹{e.amount}
                      </td>
                      <td className="p-2 hidden sm:table-cell">{e.notes || "-"}</td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => deleteExpense(i)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600 text-sm">No expenses yet.</p>
            )}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-green-300 rounded-xl shadow p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 size={18} className="text-green-700" /> Summary
              </h2>
              <ul className="space-y-1 text-sm">
                {categoryTotals.map((cat, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{cat.category}</span>
                    <span className="font-medium text-green-700">
                      ₹{cat.total}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-gray-200 pt-2 flex justify-between font-semibold text-sm">
                <span>Total:</span>
                <span className="text-green-700">₹{totalExpense}</span>
              </div>
            </div>

            <div className="bg-white border border-green-300 rounded-xl shadow p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <PiggyBank size={18} className="text-green-700" /> Spending Tip
              </h2>
              {totalExpense > 10000 ? (
                <p className="text-sm text-gray-700">
                  ⚠️ High monthly spending detected. Review feed and fuel costs.
                </p>
              ) : totalExpense > 0 ? (
                <p className="text-sm text-gray-700">
                  ✅ Spending under control. Keep tracking regularly.
                </p>
              ) : (
                <p className="text-sm text-gray-600">Add expenses to view insights.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
