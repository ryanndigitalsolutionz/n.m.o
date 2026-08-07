import {
  ShieldCheck,
  Briefcase,
  Search,
  Pickaxe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const consoles = [
  {
    title: "Administrator",
    value: "admin",
    description: "Full organization access",
    icon: ShieldCheck,
    color: "#FDB813",
    route: "/dashboard/management/admin",
  },
  {
    title: "Manager",
    value: "manager",
    description: "Operations & workforce",
    icon: Briefcase,
    color: "#2F80ED",
    route: "/dashboard/management/manager",
  },
  {
    title: "Inspector",
    value: "inspector",
    description: "Mining records & verification",
    icon: Search,
    color: "#27AE60",
    route: "/dashboard/management/inspector",
  },
  {
    title: "Worker",
    value: "worker",
    description: "Assigned tasks",
    icon: Pickaxe,
    color: "#473232",
    route: "/dashboard/management/worker",
  },
];

export default function ManagementRoleSelector({
  role,
  onClose,
}) {
  const navigate = useNavigate();

  const openConsole = (consoleRole) => {
    if (
      role &&
      role.toLowerCase() === consoleRole.value
    ) {
      navigate(consoleRole.route);
      return;
    }

    alert(
      `Invalid.\n\nSorry, but ${
        role
          ? role.charAt(0).toUpperCase() + role.slice(1)
          : "your role"
      } is unauthorized here!`
    );
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/65 backdrop-blur-md">

      <div className="w-[720px] rounded-3xl border border-[#29415A] bg-[#11233B] p-8 shadow-2xl">

        <div className="mb-8 flex items-start justify-between">

          <div>
            <h2 className="text-3xl font-extrabold text-[#FDB813]">
              Choose Console
            </h2>

            <p className="mt-2 text-[#B9C6D6]">
              Select the management console available for your role.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 transition hover:text-white"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-2 gap-5">

          {consoles.map((consoleRole) => {
            const Icon = consoleRole.icon;

            const allowed =
              role &&
              role.toLowerCase() ===
                consoleRole.value;

            return (
              <button
                key={consoleRole.value}
                onClick={() =>
                  openConsole(consoleRole)
                }
                className="
                  group
                  rounded-2xl
                  border
                  border-[#28435E]
                  bg-[#172D49]
                  p-6
                  text-left
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#FDB813]
                  hover:shadow-[0_0_28px_rgba(253,184,19,.28)]
                "
              >

                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor:
                      `${consoleRole.color}22`,
                  }}
                >
                  <Icon
                    size={30}
                    color={consoleRole.color}
                  />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {consoleRole.title}
                </h3>

                <p className="mt-1 text-sm text-[#B9C6D6]">
                  {consoleRole.description}
                </p>

                <div
                  className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    allowed
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {allowed
                    ? "Available"
                    : "Unauthorized"}
                </div>

              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
}
