import { X, Lock, User } from "lucide-react";
import { useState } from "react";
import GlassButton from "../ui/GlassButton";
import GlassInput from "../ui/GlassInput";
import { authenticateManagement } from "../api";
import { useNavigate } from "react-router-dom";
import ManagementRoleSelector from "./ManagementRoleSelector";

export default function ManagementPanel({
  open,
  onClose,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await authenticateManagement({
      username,
      password,
    });

    console.log("Management Login:", data);

    if (!data.success) {
      alert(data.message);
      return;
    }

    localStorage.setItem(
      "managementToken",
      data.token
    );

    localStorage.setItem(
      "managementRole",
      data.role
    );

    console.log(
      "Saved token:",
      localStorage.getItem("managementToken")
    );

    setRole(data.role);
    setAuthenticated(true);
  };

  if (!open) return null;

  if (authenticated) {
    return (
        <ManagementRoleSelector
            role={role}
            onClose={onClose}
        />
    );
  }

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/55 backdrop-blur-sm">

      <div className="w-[430px] rounded-[28px] panel-strong border border-[rgba(253,184,19,.25)] p-7 animate-scale-in">

        <div className="flex items-center justify-between">

          <div>

            <h2
              className="text-2xl font-bold text-[#FDB813]"
              style={{
                fontFamily: "Quantico",
              }}
            >
              Management Hub
            </h2>

            <p className="mt-1 text-sm text-[#B9C6D6]">
              Administrator authentication required.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-white/10"
          >
            <X size={20} />
          </button>

        </div>

        <div className="mt-7 space-y-5">

          <GlassInput
            icon={<User size={18} />}
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <GlassInput
            icon={<Lock size={18} />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <GlassButton
            variant="gold"
            className="w-full"
            onClick={handleLogin}
          >
            Authenticate
          </GlassButton>

        </div>

      </div>

    </div>
  );
}