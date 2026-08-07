import { MessageSquareMore } from "lucide-react";

export default function ManagementWidget({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open Management Hub"
      className="
        fixed
        bottom-8
        right-8
        z-[9999]
        h-16
        w-16
        flex
        items-center
        justify-center
        cursor-pointer
        group
        focus:outline-none
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-70
          blur-lg
          transition-all
          duration-300
          pointer-events-none
          group-hover:opacity-100
          group-hover:blur-xl
        "
        style={{
          background: "rgba(253,184,19,.25)",
          clipPath:
            "polygon(25% 6%,75% 6%,100% 50%,75% 94%,25% 94%,0% 50%)",
        }}
      />

      {/* Hexagon */}
      <div
        className="
          absolute
          inset-0
          bg-[#2D1B12]
          border
          border-[#4A2A18]
          transition-all
          duration-300
          group-hover:border-[#FDB813]
          group-hover:shadow-[0_0_24px_rgba(253,184,19,.55)]
        "
        style={{
          clipPath:
            "polygon(25% 6%,75% 6%,100% 50%,75% 94%,25% 94%,0% 50%)",
        }}
      />

      {/* Icon */}
      <MessageSquareMore
        size={28}
        className="
          relative
          z-10
          text-[#FDB813]
          transition-transform
          duration-300
          group-hover:scale-110
        "
      />
    </button>
  );
}
