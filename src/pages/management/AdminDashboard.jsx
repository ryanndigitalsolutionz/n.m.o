import { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  ClipboardList,
  ShieldCheck,
  Briefcase,
  Search,
  Pickaxe,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import StaffTable from "../../components/management/StaffTable";
import { useNavigate } from "react-router-dom";

const API = "https://nmo-production.up.railway.app/api";

const roleIcons = {
  admin: ShieldCheck,
  manager: Briefcase,
  inspector: Search,
  worker: Pickaxe,
};

const roleNames = {
  admin: "Administrator",
  manager: "Manager",
  inspector: "Inspector",
  worker: "Worker",
};

export default function AdminDashboard() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);

  const [showAssignTask, setShowAssignTask] =
    useState(false);

  const [showRequests, setShowRequests] =
    useState(false);

  const [showInvite, setShowInvite] =
    useState(false);

  async function loadStaff() {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("managementToken");

      const response = await fetch(
        `${API}/management/staff`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load staff."
        );
      }

      setStaff(data.staff || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaff();
  }, []);

  const stats = useMemo(() => {
    const admins = staff.filter(
      (u) => u.role === "admin"
    );

    const managers = staff.filter(
      (u) => u.role === "manager"
    );

    const inspectors = staff.filter(
      (u) => u.role === "inspector"
    );

    const workers = staff.filter(
      (u) => u.role === "worker"
    );

    return {
      admins,
      managers,
      inspectors,
      workers,
      onlineManagers: managers.filter(
        (u) => u.online
      ).length,
      onlineInspectors: inspectors.filter(
        (u) => u.online
      ).length,
      onlineWorkers: workers.filter(
        (u) => u.online
      ).length,
    };
  }, [staff]);

    return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-black text-[#FDB813]">
            Administrator Console
          </h1>

          <p className="mt-2 text-[#B9C6D6]">
            Complete organization control center.
          </p>
        </div>


        <button
          onClick={loadStaff}
          className="rounded-xl bg-[#FDB813] px-5 py-3 font-bold text-black transition hover:scale-105"
        >
          Refresh
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-6">

        <div className="premium-card p-6">

          <Users className="mb-3 text-[#FDB813]" />

          <h3 className="text-white">
            Managers Online
          </h3>

          <p className="mt-3 text-4xl font-black text-[#FDB813]">
            {stats.onlineManagers}
          </p>

        </div>

        <div className="premium-card p-6">

          <Search className="mb-3 text-green-400" />

          <h3 className="text-white">
            Inspectors Online
          </h3>

          <p className="mt-3 text-4xl font-black text-green-400">
            {stats.onlineInspectors}
          </p>

        </div>

        <div className="premium-card p-6">

          <Pickaxe className="mb-3 text-orange-400" />

          <h3 className="text-white">
            Workers Online
          </h3>

          <p className="mt-3 text-4xl font-black text-orange-400">
            {stats.onlineWorkers}
          </p>

        </div>

        <div className="premium-card p-6">

          <UserCheck className="mb-3 text-cyan-400" />

          <h3 className="text-white">
            Total Employees
          </h3>

          <p className="mt-3 text-4xl font-black text-cyan-400">
            {staff.length}
          </p>

        </div>

      </div>

      <StaffTable />

      {/* Command Center */}

      <div className="premium-card p-6">

        <h2 className="mb-6 text-2xl font-bold text-[#FDB813]">
          Command Center
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/management/access-requests")}
            className="rounded-xl bg-[#FDB813] px-5 py-3 font-bold text-black"
          >
              List Access Requests
          </button>

          <button
            onClick={() => navigate("/management/tasks/new")}
            className="rounded-xl bg-blue-600 px-5 py-3 font-bold"
          >
              Assign Tasks
          </button>

          <button
            onClick={() => navigate("/management/invite")}
            className="rounded-xl bg-green-600 px-5 py-3 font-bold"
          >
              Invite Employee
          </button>

        </div>

      </div>

      {/* Staff Table */}

      <div className="premium-card overflow-hidden">

        <div className="border-b border-[#27435D] p-6">

          <h2 className="text-2xl font-bold text-white">
            Management Team
          </h2>

        </div>

        {loading ? (

          <div className="p-10 text-center text-gray-300">
            Loading staff...
          </div>

        ) : error ? (

          <div className="p-10 text-center text-red-400">
            {error}
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-[#122A46]">

              <tr>

                <th className="p-4 text-left">
                  Username
                </th>

                <th className="text-left">
                  Role
                </th>

                <th className="text-left">
                  Status
                </th>

                <th className="text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {staff.map((user) => {

                const Icon = roleIcons[user.role];

                return (

                  <tr
                    key={user.user_id}
                    className="border-b border-[#20364E]"
                  >

                    <td className="p-4">
                      {user.username}
                    </td>

                    <td>

                      <div className="flex items-center gap-2">

                        <Icon size={18} />

                        {roleNames[user.role]}

                      </div>

                    </td>

                    <td>

                      {user.online ? (

                        <span className="inline-flex items-center gap-2 text-green-400">

                          <CheckCircle2 size={16} />

                          Online

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-2 text-gray-400">

                          <Clock3 size={16} />

                          Offline

                        </span>

                      )}

                    </td>

                    <td>

                      <button
                        onClick={() =>
                          setSelectedUser(user)
                        }
                        className="rounded-lg bg-[#FDB813] px-4 py-2 text-sm font-bold text-black"
                      >
                        Manage
                      </button>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        )}

      </div>

      {selectedUser && (

        <div className="premium-card p-6">

          <h2 className="text-2xl font-bold text-[#FDB813]">

            Selected Employee

          </h2>

          <p className="mt-4 text-xl">
            {selectedUser.username}
          </p>

          <p className="text-[#B9C6D6]">
            {roleNames[selectedUser.role]}
          </p>

        </div>

      )}

    </div>
  );
}