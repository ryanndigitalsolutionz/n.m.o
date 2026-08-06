import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./components/Dashboard";
import Certificate from "./components/Certificate";
import Shipping from "./components/Shipping";
import MineralSources from "./components/MineralSources";
import Records from "./components/Records";
import Harvesting from "./components/Harvesting";
import Settings from "./components/Settings";

import ForgotPassword from "./context/ForgotPassword";
import ResetPassword from "./context/ResetPassword";
import RequestAccess from "./context/RequestAccess";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/certifications": "Certificates",
  "/dashboard/shipping": "Verification",
  "/dashboard/mineral-sources": "Analytics",
  "/dashboard/records": "Reports",
  "/dashboard/harvesting": "Training",
  "/dashboard/settings": "Settings",
};

function Layout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "N.M.O";

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#0A1628]">
      <div className="mining-bg" />

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} />

        <main className="relative flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 pb-8">
          <div className="mx-auto max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
      <BrowserRouter>
          <Routes>

              <Route path="/" element={<Login />} />

              <Route path="/login" element={<Login />} />

              <Route path="/dashboard" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="certifications" element={<Certificate />} />
                  <Route path="shipping" element={<Shipping />} />
                  <Route path="mineral-sources" element={<MineralSources />} />
                  <Route path="records" element={<Records />} />
                  <Route path="harvesting" element={<Harvesting />} />
                  <Route path="settings" element={<Settings />} />
              </Route>

          </Routes>
      </BrowserRouter>
  );
}
