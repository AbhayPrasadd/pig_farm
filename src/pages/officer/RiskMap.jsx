import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Filter, AlertTriangle, Search } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const RiskMap = () => {
  // 🦠 Dummy Jeevya biosecurity data
  const bioData = [
    {
      id: 1,
      region: "Odisha",
      risk: 0.85,
      hazard: "Avian Influenza",
      category: "Poultry",
      lat: 20.9517,
      lng: 85.0985,
      detail:
        "Detected unusual mortality in layer poultry units. Rapid Response Team deployed for containment.",
    },
    {
      id: 2,
      region: "Bihar",
      risk: 0.6,
      hazard: "FMD Outbreak",
      category: "Cattle",
      lat: 25.0961,
      lng: 85.3131,
      detail:
        "Reports of foot-and-mouth disease. Vaccination drive ongoing in nearby villages.",
    },
    {
      id: 3,
      region: "Kerala",
      risk: 0.45,
      hazard: "Water Contamination",
      category: "Sanitation",
      lat: 10.8505,
      lng: 76.2711,
      detail:
        "Wastewater from dairy units contaminating nearby streams. Disinfection and testing ongoing.",
    },
    {
      id: 4,
      region: "Punjab",
      risk: 0.78,
      hazard: "Swine Fever",
      category: "Pig Farms",
      lat: 31.1471,
      lng: 75.3412,
      detail:
        "ASF confirmed in 2 districts. Biosecurity lockdown enforced in affected zones.",
    },
    {
      id: 5,
      region: "Assam",
      risk: 0.92,
      hazard: "Zoonotic Disease Risk",
      category: "Cross-species",
      lat: 26.2006,
      lng: 92.9376,
      detail:
        "Wild boar migration near pig farms raises zoonotic risk. Barrier fencing advised.",
    },
  ];

  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState("All");
  const [filterType, setFilterType] = useState("All");

  // Utility Functions
  const getColor = (risk) => {
    if (risk > 0.8) return "rgba(239, 68, 68, 0.9)"; // red
    if (risk > 0.5) return "rgba(234, 179, 8, 0.9)"; // yellow
    return "rgba(34, 197, 94, 0.9)"; // green
  };

  const getRadius = (risk) => 25 + risk * 25;

  // Filtering Logic
  const filteredData = bioData.filter((d) => {
    const matchesSearch =
      d.region.toLowerCase().includes(search.toLowerCase()) ||
      d.hazard.toLowerCase().includes(search.toLowerCase());
    const matchesRisk =
      filterRisk === "All" ||
      (filterRisk === "High" && d.risk > 0.7) ||
      (filterRisk === "Medium" && d.risk > 0.4 && d.risk <= 0.7) ||
      (filterRisk === "Low" && d.risk <= 0.4);
    const matchesType =
      filterType === "All" || d.category === filterType;
    return matchesSearch && matchesRisk && matchesType;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50 font-poppins">
      {/* Sidebar (Left Section) */}
      <div className="md:w-[40%] w-full bg-white border-r border-gray-200 px-6 py-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">
            Jeevya Biosecurity RiskMap
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center mb-3">
            <Filter className="text-green-700 mr-2" />
            <h2 className="font-semibold text-gray-800 text-lg">Filter Risks</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Risk Level
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Poultry">Poultry</option>
                <option value="Cattle">Cattle</option>
                <option value="Pig Farms">Pig Farms</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Cross-species">Cross-species</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Region / Hazard
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Type to search..."
                  className="w-full bg-transparent outline-none text-sm text-gray-700"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Summary Cards */}
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-900">{item.hazard}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      item.risk > 0.8
                        ? "bg-red-100 text-red-700"
                        : item.risk > 0.5
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {(item.risk * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.region}</p>
                <p className="text-xs text-gray-500 mt-1">{item.detail}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Category: {item.category}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4 italic">
              No matching data found.
            </p>
          )}
        </div>
      </div>

      {/* Map (Right Section) */}
      <div className="md:w-[60%] w-full relative bg-gray-100">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <MapContainer
            center={[22.9734, 78.6569]}
            zoom={5}
            scrollWheelZoom
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredData.map((loc) => (
              <CircleMarker
                key={loc.id}
                center={[loc.lat, loc.lng]}
                radius={getRadius(loc.risk)}
                pathOptions={{
                  color: getColor(loc.risk),
                  fillColor: getColor(loc.risk),
                  fillOpacity: 0.4,
                }}
              >
                <Popup>
                  <div className="font-semibold text-gray-900">{loc.hazard}</div>
                  <p className="text-sm text-gray-700">
                    Risk: {(loc.risk * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{loc.detail}</p>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-white/90 rounded-lg shadow-md p-3 border border-gray-200 text-sm">
          <h4 className="font-semibold text-gray-800 mb-1">🧭 Risk Intensity</h4>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 bg-green-500 rounded"></span>
            <span>Low</span>
            <span className="w-4 h-4 bg-yellow-400 rounded"></span>
            <span>Medium</span>
            <span className="w-4 h-4 bg-red-500 rounded"></span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMap;
