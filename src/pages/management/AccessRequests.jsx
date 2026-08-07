import { useEffect, useState } from "react";
import {
  getAccessRequests,
  approveAccessRequest,
  rejectAccessRequest,
} from "../../components/management/managementApi";

export default function AccessRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState({});

  async function loadRequests() {
    setLoading(true);

    try {
      const data = await getAccessRequests();

      if (data.success) {
        setRequests(data.requests);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function approve(id) {
    const role = selectedRoles[id] || "worker";

    const result = await approveAccessRequest(id, role);

    alert(result.message);

    if (result.success) {
      loadRequests();
    }
  }

  async function reject(id) {
    if (!window.confirm("Reject this request?")) {
      return;
    }

    const result = await rejectAccessRequest(id);

    alert(result.message);

    if (result.success) {
      loadRequests();
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-yellow-400">
            Access Requests
          </h1>

          <p className="text-gray-400">
            Employee registration requests.
          </p>
        </div>

        <button
          onClick={loadRequests}
          className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#162842]">
        <table className="w-full">
          <thead className="border-b border-slate-700">
            <tr className="text-yellow-400">
              <th className="p-5 text-left">Name</th>
              <th className="p-5 text-left">Email</th>
              <th className="p-5 text-left">Role</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-10 text-center text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-10 text-center text-gray-400"
                >
                  No pending requests.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-slate-700"
                >
                  <td className="p-5">
                    {request.name}
                  </td>

                  <td className="p-5">
                    {request.email}
                  </td>

                  <td className="p-5">
                    <select
                      value={
                        selectedRoles[request.id] || "worker"
                      }
                      onChange={(e) =>
                        setSelectedRoles((prev) => ({
                          ...prev,
                          [request.id]: e.target.value,
                        }))
                      }
                      className="rounded-lg border border-[#27435D] bg-[#122A46] px-3 py-2 text-white"
                    >
                      <option value="worker">
                        Worker
                      </option>

                      <option value="inspector">
                        Inspector
                      </option>

                      <option value="manager">
                        Manager
                      </option>

                      <option value="admin">
                        Administrator
                      </option>
                    </select>
                  </td>

                  <td className="p-5">
                    <span className="rounded-full bg-orange-600 px-3 py-1 text-sm text-white">
                      {request.status}
                    </span>
                  </td>

                  <td className="space-x-2 p-5">
                    <button
                      onClick={() =>
                        approve(request.id)
                      }
                      className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        reject(request.id)
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
