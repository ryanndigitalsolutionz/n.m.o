import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassButton from "../components/ui/GlassButton";
import Logo from "../components/ui/Logo";
import API from "../components/api";

export default function RequestAccess() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    residence: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await fetch(`${API}/access-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message || "Failed to submit request.");
    }

    alert(
      "Request submitted successfully. An administrator will review your application. You are free to exit the application until notified."
    );

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      residence: "",
      reason: "",
    });
  } catch (error) {
     alert(error.message);
  } finally {
     setLoading(false);
  }
 };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="mining-bg" />

      <div className="w-full max-w-md rounded-[36px] panel-strong border border-[rgba(255,255,255,0.12)] overflow-hidden">

        <div className="flex items-center gap-5 px-8 pt-8">
          <Logo />

          <div>
            <h1 className="text-2xl font-extrabold text-white">
              Request Access
            </h1>

            <p className="text-sm mt-1 text-[#7C8CA3]">
              National Mining Organization
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-8"
        >

          <input
            className="input w-full"
            placeholder="First Name"
            name="first_name"
            onChange={handleChange}
            required
          />

          <input
            className="input w-full"
            placeholder="Last Name"
            name="last_name"
            onChange={handleChange}
            required
          />

          <input
            className="input w-full"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />

          <input
            className="input w-full"
            placeholder="Residence / Location"
            name="residence"
            onChange={handleChange}
            required
          />

          <textarea
            className="input w-full h-28 resize-none"
            placeholder="Reason for requesting access..."
            name="reason"
            onChange={handleChange}
            required
          />

          <GlassButton
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </GlassButton>

        </form>

      </div>
    </div>
  );
}