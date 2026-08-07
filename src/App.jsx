import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
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
import AdminDashboard from "./pages/management/AdminDashboard";
import ManagerDashboard from "./pages/management/ManagerDashboard";
import InspectorDashboard from "./pages/management/InspectorDashboard";
import WorkerDashboard from "./pages/management/WorkerDashboard";
import ManagementWidget from "./components/widgets/ManagementWidget";
import ManagementPanel from "./components/widgets/ManagementPanel";
import { authenticateManagement } from "./components/api";
import AccessRequests from "./pages/management/AccessRequests";

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

        <main className="relative flex-1 overflow-y-auto px-4 pb-8 md:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  const [managementOpen, setManagementOpen] = useState(false);

  const showManagementWidget =
    location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const googleLogin = params.get("google_login");
    const username = params.get("username");
    const role = params.get("role");

    if (googleLogin && token) {
      localStorage.setItem("access_token", token);

      if (username) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username,
            role,
          })
        );
      }

      window.history.replaceState(
        {},
        "",
        "/dashboard"
      );
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/management/access-requests"
          element={<AccessRequests />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/request-access"
          element={<RequestAccess />}
        />

        <Route
          path="/dashboard"
          element={<Layout />}
        >
          <Route index element={<Dashboard />} />

          <Route
            path="certifications"
            element={<Certificate />}
          />

          <Route
            path="shipping"
            element={<Shipping />}
          />

          <Route
            path="mineral-sources"
            element={<MineralSources />}
          />

          <Route
            path="records"
            element={<Records />}
          />

          <Route
            path="harvesting"
            element={<Harvesting />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

          <Route
            path="management/admin"
            element={
              <RoleProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="management/manager"
            element={
              <RoleProtectedRoute allowedRole="manager">
                <ManagerDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="management/inspector"
            element={
              <RoleProtectedRoute allowedRole="inspector">
                <InspectorDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="management/worker"
            element={
              <RoleProtectedRoute allowedRole="worker">
                <WorkerDashboard />
              </RoleProtectedRoute>
            }
          />
        </Route>
      </Routes>

      {showManagementWidget && (
        <>
          <ManagementWidget
            onClick={() => setManagementOpen(true)}
          />

          <ManagementPanel
            open={managementOpen}
            onClose={() => setManagementOpen(false)}
          />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
