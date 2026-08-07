import {
  ClipboardCheck,
  ShieldCheck,
  FileSearch,
  Bell,
} from "lucide-react";
import StaffTable from "../../components/management/StaffTable";

export default function InspectorDashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-black text-[#27AE60]">
          Inspector Console
        </h1>

        <p className="mt-2 text-[#B9C6D6]">
          Verify mining activities, approve records and oversee field inspections.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-6">

        <div className="premium-card p-6">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-white">
              Assigned Inspections
            </h3>

            <ClipboardCheck
              size={26}
              className="text-[#27AE60]"
            />

          </div>

          <p className="mt-4 text-5xl font-black text-[#27AE60]">
            0
          </p>

        </div>

        <div className="premium-card p-6">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-white">
              Pending Verifications
            </h3>

            <ShieldCheck
              size={26}
              className="text-[#27AE60]"
            />

          </div>

          <p className="mt-4 text-5xl font-black text-[#27AE60]">
            0
          </p>

        </div>

        <div className="premium-card p-6">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-white">
              Workers Assigned
            </h3>

            <FileSearch
              size={26}
              className="text-[#27AE60]"
            />

          </div>

          <p className="mt-4 text-5xl font-black text-[#27AE60]">
            0
          </p>

        </div>

        <div className="premium-card p-6">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-white">
              Reports Submitted
            </h3>

            <Bell
              size={26}
              className="text-[#27AE60]"
            />

          </div>

          <p className="mt-4 text-5xl font-black text-[#27AE60]">
            0
          </p>

        </div>

      </div>

      <StaffTable />

      {/* Inspection Table */}

      <div className="premium-card overflow-hidden">

        <div className="border-b border-white/10 px-6 py-5">

          <h2 className="text-2xl font-bold text-white">
            Assigned Field Operations
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-[#163D2E] text-left">

            <tr>

              <th className="px-6 py-4">
                Worker
              </th>

              <th className="px-6 py-4">
                Mining Site
              </th>

              <th className="px-6 py-4">
                Assigned Task
              </th>

              <th className="px-6 py-4">
                Inspection Status
              </th>

              <th className="px-6 py-4">
                Last Updated
              </th>

            </tr>

          </thead>

          <tbody>
                        <tr className="border-t border-white/10">

              <td
                colSpan={5}
                className="py-14 text-center text-[#B9C6D6]"
              >
                No inspection assignments available.
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* Command Center */}

      <div className="premium-card p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Inspection Commands
        </h2>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">

          <button
            className="
              rounded-2xl
              border
              border-[#27AE6055]
              bg-[#17392B]
              p-5
              text-left
              transition
              hover:border-[#27AE60]
              hover:shadow-[0_0_25px_rgba(39,174,96,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Verify Harvest
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Confirm harvested minerals before certification.
            </p>

          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#27AE6055]
              bg-[#17392B]
              p-5
              text-left
              transition
              hover:border-[#27AE60]
              hover:shadow-[0_0_25px_rgba(39,174,96,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Approve Record
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Mark inspected records as verified.
            </p>

          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#27AE6055]
              bg-[#17392B]
              p-5
              text-left
              transition
              hover:border-[#27AE60]
              hover:shadow-[0_0_25px_rgba(39,174,96,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Reject Record
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Return incorrect records for correction.
            </p>

          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#27AE6055]
              bg-[#17392B]
              p-5
              text-left
              transition
              hover:border-[#27AE60]
              hover:shadow-[0_0_25px_rgba(39,174,96,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Submit Inspection Report
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Send completed inspection findings.
            </p>

          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#27AE6055]
              bg-[#17392B]
              p-5
              text-left
              transition
              hover:border-[#27AE60]
              hover:shadow-[0_0_25px_rgba(39,174,96,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Notify Manager
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Report urgent inspection issues immediately.
            </p>

          </button>

          <button
            className="
              rounded-2xl
              border
              border-[#27AE6055]
              bg-[#17392B]
              p-5
              text-left
              transition
              hover:border-[#27AE60]
              hover:shadow-[0_0_25px_rgba(39,174,96,.35)]
            "
          >
            <h3 className="font-bold text-white">
              Upload Evidence
            </h3>

            <p className="mt-2 text-sm text-[#B9C6D6]">
              Attach photos and supporting documents.
            </p>

          </button>

        </div>

      </div>

    </div>
  );
}