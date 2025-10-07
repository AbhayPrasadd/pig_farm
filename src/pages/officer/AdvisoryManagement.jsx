import React, { useState } from "react";

function AdvisoryManagement() {
  const [advisories, setAdvisories] = useState([]);
  const [form, setForm] = useState({ title: "", message: "", region: "", target: "All", validity: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdvisories([...advisories, form]);
    setForm({ title: "", message: "", region: "", target: "All", validity: "" });
  };

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-4">🔔 Advisory & Alert Management</h1>
      <p className="text-center text-gray-600 mb-6">Send important advisories or alerts to farmers and vets.</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 mb-8">
        <input type="text" placeholder="Title" className="w-full border p-2 rounded" required
          value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Message content" className="w-full border p-2 rounded" rows="3" required
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
        <div className="grid md:grid-cols-3 gap-4">
          <input type="text" placeholder="Region" className="border p-2 rounded" required
            value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
          <select className="border p-2 rounded" value={form.target}
            onChange={(e) => setForm({ ...form, target: e.target.value })}>
            <option>All</option>
            <option>Farmer</option>
            <option>Vet</option>
          </select>
          <input type="date" className="border p-2 rounded"
            value={form.validity} onChange={(e) => setForm({ ...form, validity: e.target.value })} />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Send Advisory</button>
      </form>

      <div>
        <h2 className="font-semibold mb-3 text-lg">🧾 Sent Advisories</h2>
        {advisories.length === 0 ? (
          <p className="text-gray-500 italic">No advisories yet.</p>
        ) : (
          <div className="space-y-3">
            {advisories.map((adv, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg shadow border">
                <h3 className="font-bold">{adv.title}</h3>
                <p>{adv.message}</p>
                <p className="text-sm text-gray-600 mt-1">📍 {adv.region} | 🎯 {adv.target} | ⏳ Valid till {adv.validity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvisoryManagement;
