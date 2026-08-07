import {
  ClipboardList,
  Hammer,
  Users,
  Bell,
} from "lucide-react";
import StaffTable from "../../components/management/StaffTable";

export default function ManagerDashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-black text-[#2F80ED]">
          Manager Console
        </h1>

        <p className="mt-2 text-[#B9C6D6]">
          Manage workers, assign mining tasks and monitor field operations.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-6">

        <div className="premium-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Workers Online
            </h3>

            <Users
              size={26}
              className="text-[#2F80ED]"
            />
          </div>

          <p className="mt-4 text-5xl font-black text-[#2F80ED]">
            0
          </p>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Active Tasks
            </h3>

            <Hammer
              size={26}
              className="text-[#2F80ED]"
            />
          </div>

          <p className="mt-4 text-5xl font-black text-[#2F80ED]">
            0
          </p>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Pending Reports
            </h3>

            <ClipboardList
              size={26}
              className="text-[#2F80ED]"
            />
          </div>

          <p className="mt-4 text-5xl font-black text-[#2F80ED]">
            0
          </p>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Notifications
            </h3>

            <Bell
              size={26}
              className="text-[#2F80ED]"
            />
          </div>

          <p className="mt-4 text-5xl font-black text-[#2F80ED]">
            0
          </p>
        </div>

      </div>

      {/* Workers Table */}

      <div className="premium-card overflow-hidden">

        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="text-2xl font-bold text-white">
            Workforce
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-[#162B45] text-left">

            <tr>

              <th className="px-6 py-4">
                Username
              </th>

              <th className="px-6 py-4">
                Role
              </th>

              <th className="px-6 py-4">
                Current Task
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Progress
              </th>

              <th className="px-6 py-4">
                Last Seen
              </th>

            </tr>

          </thead>

          <tbody>
                        <tr className="border-t border-white/10">

              <td
                colSpan={6}
                className="py-14 text-center text-[#B9C6D6]"
              >
                No workers available.
              </td>

            </tr>

          </tbody>

        </table>

      </div>

       <StaffTable />

      {/* Command Center */}

      <div className="premium-card p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Command Center
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

          <button
            className="
              rounded-2xl
              border
              border-[#2F80ED55]
              bg-[#183557]
              p-5
              text-left
              transition
              hover:border-[#2F80ED]
              hover:shadow-[0_0_25px_rgba(47,128,237,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Assign Tasks
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Create new assignments for workers.
            </p>
          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#2F80ED55]
              bg-[#183557]
              p-5
              text-left
              transition
              hover:border-[#2F80ED]
              hover:shadow-[0_0_25px_rgba(47,128,237,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Reassign Tasks
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Move unfinished work to another employee.
            </p>
          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#2F80ED55]
              bg-[#183557]
              p-5
              text-left
              transition
              hover:border-[#2F80ED]
              hover:shadow-[0_0_25px_rgba(47,128,237,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Team Broadcast
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Send a notification to your workforce.
            </p>
          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#2F80ED55]
              bg-[#183557]
              p-5
              text-left
              transition
              hover:border-[#2F80ED]
              hover:shadow-[0_0_25px_rgba(47,128,237,.35)]
            "
          >
            <h3 className="font-bold text-white">
              View Reports
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Review submitted field reports.
            </p>
          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#2F80ED55]
              bg-[#183557]
              p-5
              text-left
              transition
              hover:border-[#2F80ED]
              hover:shadow-[0_0_25px_rgba(47,128,237,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Mark Completed
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Finalize completed assignments.
            </p>
          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#2F80ED55]
              bg-[#183557]
              p-5
              text-left
              transition
              hover:border-[#2F80ED]
              hover:shadow-[0_0_25px_rgba(47,128,237,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Request Workers
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Notify administrators that additional staff are needed.
            </p>
          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#2F80ED55]
              bg-[#183557]
              p-5
              text-left
              transition
              hover:border-[#2F80ED]
              hover:shadow-[0_0_25px_rgba(47,128,237,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Generate Report
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Export team activity and productivity.
            </p>
          </button>

        </div>

      </div>

    </div>
  );
}