import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Award, Lock } from "lucide-react";
import API from "./api";
import GlassButton from "./ui/GlassButton";
import Logo from "./ui/Logo";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const googleError =
    searchParams.get("error");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");
  const isLogin = searchParams.get("mode") !== "signup";

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
   e.preventDefault();

   setLoading(true);
   setError("");
   setSuccess("");

   try {
     const response = await fetch(`${API}/login`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email: loginData.email.trim(),
         password: loginData.password,
        }),
     });

     const data = await response.json();

     if (!response.ok) {
       throw new Error(
         data.message ||
         data.description ||
         "Login failed."
       );
     }

     localStorage.setItem(
       "token",
       data.access_token
     );

     localStorage.setItem(
       "user",
       JSON.stringify(data.user)
     );

     switch (data.user.role) {
       case "admin":
       case "manager":
       case "inspector":
       case "worker":
         navigate("/dashboard");
         break;

       default:
         navigate("/dashboard");
     }
 
   } catch (err) {
     setError(err.message);
   } finally {
     setLoading(false);
   }
 };
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: registerData.username.trim(), email: registerData.email.trim(), password: registerData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.description || "Registration failed.");
      }

      setSuccess("Account created successfully. Please sign in.");
      setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
      navigate("/login?mode=signin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center px-6 py-10">
    <div className="mining-bg" />

    <div className="w-full max-w-md rounded-[36px] panel-strong border border-[rgba(255,255,255,0.12)] overflow-hidden animate-scale-in">

      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-8">
        <div className="flex items-center gap-5">
          <Logo />
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              N.M.O
            </h1>

            <p className="mt-1 text-sm text-[#7C8CA3]">
              Mining Certificate Management
            </p>
          </div>
        </div>
      </div>


      {/* Form */}
      <div className="px-8 py-8">

        {error && (
          <div className="mb-5 rounded-2xl border border-[rgba(229,57,53,0.4)] bg-[rgba(229,57,53,0.12)] text-[#FF8A80] px-4 py-3 text-sm animate-fade-in">
            {error}
          </div>
        )}

        {googleError === "access_denied" && (
          <div className="mb-5 rounded-2xl border border-[rgba(229,57,53,0.4)] bg-[rgba(229,57,53,0.12)] text-[#FF8A80] px-4 py-3 text-sm animate-fade-in">
            This Google account hasn't been approved yet.
            <br />
            Please request access first.
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-2xl border border-[rgba(46,204,113,0.4)] bg-[rgba(46,204,113,0.12)] text-[#58E68C] px-4 py-3 text-sm animate-fade-in">
            {success}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <button
            type="button"
            onClick={() => {
              window.location.href = `${API}/auth/google`;
            }}
            className="btn btn-blue w-full"
          >
            Continue with Google
          </button>

          <div>
            <label className="block mb-2 text-sm font-semibold text-[#B9C6D6]">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="example@email.com"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-[#B9C6D6]">
              Password
            </label>

            <div className="relative">

              <input
                type={showLoginPassword ? "text" : "password"}
                name="password"
                required
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Enter password"
                className="input w-full pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowLoginPassword(!showLoginPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7C8CA3]"
              >
                {showLoginPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-[#FDB813] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-gold w-full text-[17px] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-[#7C8CA3]">
            Need access to N.M.O?{" "}

            <button
              type="button"
              onClick={() => navigate("/request-access")}
              className="font-bold text-[#8B5CF6] hover:underline"
            >
              Request Access
            </button>
          </p>

        </form>

      </div>

      {/* Footer */}
      <div className="border-t border-[rgba(255,255,255,0.08)] px-8 py-5 flex items-center justify-center gap-6 text-sm text-[#7C8CA3]">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={15} className="text-[#2ECC71]" />
          Secure
        </span>

        <span className="flex items-center gap-1.5">
          <Award size={15} className="text-[#FDB813]" />
          Verified
        </span>

        <span className="flex items-center gap-1.5">
          <Lock size={15} className="text-[#2196F3]" />
          Encrypted
        </span>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.08)] px-8 py-4 text-center text-sm text-[#7C8CA3]">
        © {new Date().getFullYear()} N.M.O
      </div>

    </div>
  </div>
);
}