import { useEffect, useMemo, useState } from "react";
import {
  Mountain,
  MapPin,
  Layers,
  Ruler,
  Droplets,
  BarChart3,
  Search,
  Filter,
  Shield,
  Pickaxe,
  Users,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import { motion } from "framer-motion";
import GlassBadge from "./ui/GlassBadge";
import GlassInput from "./ui/GlassInput";
import StatCard from "./ui/StatCard";
import API from "./api";
import L from "leaflet";
import { useMap } from "react-leaflet";

const statusVariant = (status) => {
  if (status === "Active") return "verified";
  if (status === "Exploration") return "blue";
  if (status === "Maintenance") return "pending";
  if (status === "Depleted") return "expired";
  if (status === "Rejected") return "rejected";
  return "neutral";
};

const markerIcon = (status) => {
  let color = "blue";

  switch (status) {
    case "Active":
      color = "green";
      break;

    case "Exploration":
      color = "#FFD700";
      break;

    case "Maintenance":
      color = "orange";
      break;

    case "Depleted":
      color = "red";
      break;

    default:
      color = "violet";
  }

  return new L.DivIcon({
    className: "",
    html: `
      <div style="
        width:18px;
        height:18px;
        border-radius:50%;
        background:${color};
        border:3px solid white;
        box-shadow:0 0 18px ${color};
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

export default function MineralSources() {
  const [sources, setSources] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedSite, setSelectedSite] = useState(null);

    useEffect(() => {
    fetch(`${API}/mining-sites`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch mining sites");
        return res.json();
      })
      .then((data) => setSources(data))
      .catch((err) => console.error(err));
  }, []);

  function FlyToSite({ position }) {
      const map = useMap();

      useEffect(() => {
          if (position) {
              map.flyTo(position, 12, {
                  duration: 1.5,
              });
          }
      }, [position]);

      return null;
  }

  const filtered = sources.filter((source) => {
    const matchesSearch =
      source.site_name.toLowerCase().includes(search.toLowerCase()) ||
      source.county.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      source.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const stats = useMemo(() => {
    const active = sources.filter((s) => s.status === "Active").length;
    const totalYield = sources.reduce((sum, s) => {
      const value = parseFloat(
        String(s.yield_estimate || "")
          .replace(/,/g, "")
          .replace(/[^\d.]/g, "")
      );

      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    const counties = new Set(sources.map((s) => s.county)).size;

    return [
      {
        label: "Mining Sites",
        value: sources.length,
        gradient: "from-[#0F4C81] to-[#2196F3]",
        trendLabel: "Total sites",
      },
      {
        label: "Active Sites",
        value: active,
        gradient: "from-[#2ECC71] to-[#1E9E58]",
        trendLabel: "Currently active",
      },
      {
        label: "Est. Yields",
        value: totalYield,
        gradient: "from-[#FDB813] to-[#FF9800]",
        trendLabel: "Combined tonnes",
      },
      {
        label: "Counties",
        value: counties,
        gradient: "from-[#8B5CF6] to-[#6D28D9]",
        trendLabel: "Geographic coverage",
      },
    ];
  }, [sources]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] shadow-[0_14px_40px_-14px_rgba(79,70,229,0.9)]">
            <BarChart3 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Analytics</h2>
            <p className="text-sm text-[#7C8CA3]">Mining site intelligence &amp; analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-[#7C8CA3]" />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-auto min-w-[160px] px-3 py-2 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="exploration">Exploration</option>
            <option value="maintenance">Maintenance</option>
            <option value="depleted">Depleted</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mb-5">

       <GlassInput
         value={search}
         onChange={(e)=>setSearch(e.target.value)}
         placeholder="Search mining site..."
         icon={<Search size={18}/>}
       />

      </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* MAP */}
          <div className="lg:col-span-2 premium-card p-4 rounded-[26px] h-[700px] shadow-[0_0_25px_rgba(15,76,129,0.25)]">

            <MapContainer
              center={[-4.484722, 39.2425]}
              zoom={11}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "18px",
              }}
            >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <>
                  {filtered.map(site => (
                      console.log(
                        site.site_name,
                        site.latitude,
                        site.longitude,
                        typeof site.latitude,
                        typeof site.longitude
                      ),
                      <Marker
                        key={site.site_id}
                        position={[
                            site.latitude,
                            site.longitude
                        ]}
                        icon={markerIcon(site.status)}
                      >
                        <Popup>
                          <div className="w-72 space-y-3">

                            <div>
                              <h2 className="text-lg font-bold">
                                {site.site_name}
                              </h2>

                                <p className="text-gray-500 text-sm">
                                  {site.county}
                                </p>
                            </div>

                              <GlassBadge
                                label={site.status}
                                variant={statusVariant(site.status)}
                              />

                              <div>
                                <p className="font-semibold">
                                    Mineral
                                </p>

                               <p>{site.mineral_type}</p>
                              </div>

                        <div>
                          <p className="font-semibold">
                            Security
                          </p>

                        <p>{site.security_level}</p>
                      </div>

                        <div>
                          <p className="font-semibold">
                            Description
                          </p>

                         <p className="text-sm">
                            {site.description}
                          </p>
                        </div>

                            <div>
                              <p className="font-semibold">
                                Nearby Population
                              </p>

                              <p className="text-sm">
                                {site.nearby_population}
                              </p>
                            </div>

                              <hr />

                            <div className="grid grid-cols-2 gap-3 text-sm">

                              <div>
                                <strong>Depth</strong>

                                <br />

                                {site.depth}
                              </div>

                            <div>
                              <strong>Area</strong>

                              <br />

                              {site.area}
                            </div>

                              <div>
                                <strong>Water</strong>

                                <br />

                                {site.water_table}
                              </div>

                              <div>
                                <strong>Yield</strong>

                                <br />

                                {site.yield_estimate}
                              </div>

                            </div>

                          </div>
                        </Popup>
                      </Marker>
                  ))}
              </>
            <FlyToSite position={selectedSite} />
        </MapContainer>

        </div>

                {/* RIGHT PANEL */}
          <div className="space-y-4 h-[700px] overflow-y-auto pr-2">

            {filtered.map((site) => (
              <div
                key={site.site_id}
                onClick={() =>
                  setSelectedSite([
                    Number(site.latitude),
                    Number(site.longitude),
                  ])
                }
                className="premium-card p-5 rounded-2xl cursor-pointer border border-transparent transition-colors duration-300 hover:border-[#0F4C81] hover:shadow-[0_0_20px_rgba(15,76,129,0.35)]"
              >
                <h2 className="text-lg font-bold text-white">
                  {site.site_name}
                </h2>

                <p className="text-sm text-[#8FA2BD] mb-3">
                  {site.county}
                </p>

                <GlassBadge
                  label={site.status}
                  variant={statusVariant(site.status)}
                />

                <div className="mt-4 space-y-3">

                  <div>
                    <p className="text-[#FDB813] text-xs uppercase">
                      Mineral
                    </p>

                    <p className="text-white">
                      {site.mineral_type}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#FDB813] text-xs uppercase">
                      Description
                    </p>

                    <p className="text-sm text-[#B9C6D6]">
                      {site.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#FDB813] text-xs uppercase">
                      Nearby Population
                    </p>

                    <p className="text-sm text-[#B9C6D6]">
                      {site.nearby_population}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div>
                      <p className="text-[#FDB813] text-xs">
                        Security
                      </p>

                      <p className="text-white">
                        {site.security_level}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#FDB813] text-xs">
                        Yield
                      </p>

                      <p className="text-white">
                        {site.yield_estimate}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#FDB813] text-xs">
                        Depth
                      </p>

                      <p className="text-white">
                        {site.depth}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#FDB813] text-xs">
                        Area
                      </p>

                      <p className="text-white">
                        {site.area}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

      </div>
    </div>
  );
}
