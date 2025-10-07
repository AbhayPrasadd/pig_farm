import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons
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
  // Dummy data (10 farms/regions)
  const riskData = [
    {
      id: 1,
      title: "High Pest Infestation in Punjab Wheat Fields",
      content:
        "Recent satellite data shows rising pest activity in northern Punjab. Regular crop monitoring and biopesticides are recommended.",
      severity: "High",
      region: "Punjab",
      crop: "Wheat",
      lat: 31.1471,
      lng: 75.3412,
    },
    {
      id: 2,
      title: "Drought Risk in Maharashtra Sugarcane Belt",
      content:
        "Low rainfall recorded for the past 3 weeks. Drip irrigation and mulching are advised for moisture retention.",
      severity: "Medium",
      region: "Maharashtra",
      crop: "Sugarcane",
      lat: 19.7515,
      lng: 75.7139,
    },
    {
      id: 3,
      title: "Heavy Rainfall Alert for Eastern UP Paddy Fields",
      content:
        "IMD predicts heavy rain this week. Ensure proper field drainage to prevent crop damage.",
      severity: "High",
      region: "Uttar Pradesh",
      crop: "Paddy",
      lat: 26.8467,
      lng: 80.9462,
    },
    {
      id: 4,
      title: "Heatwave Stress in Rajasthan Cotton Crops",
      content:
        "Temperatures above 42°C are stressing cotton crops. Spray micronutrients and schedule irrigation wisely.",
      severity: "Medium",
      region: "Rajasthan",
      crop: "Cotton",
      lat: 27.0238,
      lng: 74.2179,
    },
    {
      id: 5,
      title: "Fungal Disease Risk in Assam Tea Plantations",
      content:
        "High humidity increases fungal risk. Apply preventive fungicides and prune infected leaves.",
      severity: "Medium",
      region: "Assam",
      crop: "Tea",
      lat: 26.2006,
      lng: 92.9376,
    },
    {
      id: 6,
      title: "Soil Erosion in Kerala Hilly Farms",
      content:
        "Continuous rains are causing erosion. Use contour bunding and plant cover crops.",
      severity: "Low",
      region: "Kerala",
      crop: "Mixed",
      lat: 10.8505,
      lng: 76.2711,
    },
    {
      id: 7,
      title: "Flood Threat in Bihar Maize Fields",
      content:
        "Overflowing rivers could submerge maize fields. Drain excess water immediately.",
      severity: "High",
      region: "Bihar",
      crop: "Maize",
      lat: 25.0961,
      lng: 85.3131,
    },
    {
      id: 8,
      title: "Low NDVI in MP Soybean Belt",
      content:
        "NDVI values show declining crop health due to nitrogen deficiency. Conduct soil testing and fertilize accordingly.",
      severity: "Medium",
      region: "Madhya Pradesh",
      crop: "Soybean",
      lat: 22.9734,
      lng: 78.6569,
    },
    {
      id: 9,
      title: "Cold Wave in Himachal Apple Orchards",
      content:
        "Sudden temperature drop may harm apple blossoms. Use smoke smudging for protection.",
      severity: "High",
      region: "Himachal Pradesh",
      crop: "Apple",
      lat: 31.1048,
      lng: 77.1734,
    },
    {
      id: 10,
      title: "Locust Movement Risk in Western India",
      content:
        "Satellite data shows potential locust migration. Stay alert and inform authorities.",
      severity: "Medium",
      region: "Western India",
      crop: "Various",
      lat: 23.0225,
      lng: 72.5714,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredData = riskData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const severityColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="w-7 h-7 text-red-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">
            🗺 Regional Biosecurity Risk Map
          </h1>
        </div>

        {/* Search bar */}
        <div className="flex items-center mb-6 bg-gray-100 rounded-xl px-4 py-2 shadow-sm">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by crop, region, or risk..."
            className="w-full bg-transparent outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Interactive Map */}
        <div className="h-80 w-full rounded-xl overflow-hidden shadow-md mb-8">
          <MapContainer
            center={[22.9734, 78.6569]} // India center
            zoom={5}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredData.map((farm) => (
              <Marker key={farm.id} position={[farm.lat, farm.lng]}>
                <Popup>
                  <strong>{farm.region}</strong> — {farm.severity} Risk
                  <br />
                  <em>{farm.crop}</em>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Risk List */}
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-sm text-gray-500">
                        Region: {item.region}
                      </span>
                      <span className="text-sm text-gray-500">
                        Crop: {item.crop}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-md ${severityColors[item.severity]}`}
                      >
                        {item.severity} Risk
                      </span>
                    </div>
                  </div>
                  {expandedId === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {expandedId === item.id && (
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">
              No matching risks found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskMap;
