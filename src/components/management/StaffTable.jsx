import { useEffect, useState } from "react";
import { getStaff } from "./managementApi";

export default function StaffTable() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaff();
  }, []);

  async function loadStaff() {
    try {
      const token = localStorage.getItem("managementToken");
      const data = await getStaff();

      if (Array.isArray(data)) {
        setStaff(data);
      } else if (data.staff) {
        setStaff(data.staff);
      } else {
        setStaff([]);
      }
    } catch (err) {
      console.error(err);
      setStaff([]);
    }

    setLoading(false);
  }

  return (
    <div className="premium-card p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-white">
          Staff Directory
        </h2>

        <button
          onClick={loadStaff}
          className="
            rounded-xl
            border
            border-[#FDB813]
            px-4
            py-2
            text-sm
            text-[#FDB813]
            transition
            hover:bg-[#FDB813]
            hover:text-black
          "
        >
          Refresh
        </button>

      </div>


      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-[#29415A]">

              <th className="py-3 text-left text-[#FDB813]">
                Username
              </th>

              <th className="py-3 text-left text-[#FDB813]">
                Role
              </th>

              <th className="py-3 text-left text-[#FDB813]">
                Status
              </th>

              <th className="py-3 text-left text-[#FDB813]">
                Last Seen
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={4}
                  className="py-10 text-center text-[#B9C6D6]"
                >
                  Loading staff...
                </td>

              </tr>

            ) : staff.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="py-10 text-center text-[#B9C6D6]"
                >
                  No staff found.
                </td>

              </tr>

            ) : (

              staff.map((user) => (

                <tr
                  key={user.user_id}
                  className="
                    border-b
                    border-[#22354C]
                    hover:bg-[#182B45]
                  "
                >

                  <td className="py-4 font-semibold text-white">
                    {user.username}
                  </td>

                  <td className="py-4">

                    <span
                      className="
                        rounded-full
                        bg-[#FDB81322]
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-[#FDB813]
                      "
                    >
                      {user.role === "admin"
                        ? "Administrator"
                        : user.role.charAt(0).toUpperCase() +
                          user.role.slice(1)}
                    </span>

                  </td>

                  <td className="py-4">

                    {user.online ? (

                      <span
                        className="
                          rounded-full
                          bg-green-500/20
                          px-3
                          py-1
                          text-xs
                          text-green-300
                        "
                      >
                        ● Online
                      </span>

                    ) : (

                    <span
                       className="
                       rounded-full
                       bg-red-500/20
                       px-3
                       py-1
                       text-xs
                       text-red-300
                        "
                       >
                        ● Offline
                    </span>

                    )}

                  </td>

                  <td className="py-4 text-[#B9C6D6]">
                    {user.last_active || "-"}
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
