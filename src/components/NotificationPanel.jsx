import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Award,
  Truck,
  GraduationCap,
  UserPlus,
} from "lucide-react";

const icons = {
  certificate: Award,
  shipment: Truck,
  training: GraduationCap,
  invitation: UserPlus,
};

const colors = {
  certificate: "text-[#FDB813]",
  shipment: "text-[#2196F3]",
  training: "text-[#2ECC71]",
  invitation: "text-[#8B5CF6]",
};

export default function NotificationPanel({
  open,
  notifications = [],
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          className="absolute right-0 top-16 w-[390px] rounded-3xl border border-white/10 bg-[#122238]/95 backdrop-blur-3xl shadow-2xl overflow-hidden z-50"
        >
          <div className="px-6 py-5 border-b border-white/10">
            <h2 className="font-quantico text-xl text-white flex items-center gap-3">
              <Bell size={20} />
              Notifications
            </h2>

            <p className="text-[#7C8CA3] text-sm mt-1">
              Latest activity
            </p>
          </div>

          <div className="max-h-[420px] overflow-y-auto">

            {notifications.length === 0 && (

              <div className="py-14 text-center">

                <Bell
                  className="mx-auto text-[#516276]"
                  size={36}
                />

                <p className="mt-4 text-[#9FB0C3]">
                  No notifications.
                </p>

              </div>

            )}

            {notifications.map((item) => {

              const Icon = icons[item.type] || Bell;

              return (

                <button
                  key={item.id}
                  className="w-full text-left px-6 py-4 border-b border-white/5 hover:bg-white/5 transition"
                >
                  <div className="flex gap-4">

                    <div
                      className={`mt-1 ${colors[item.type]}`}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between">

                        <h3 className="text-white font-semibold">

                          {item.title}

                        </h3>

                        {!item.read && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#FDB813]" />
                        )}

                      </div>

                      <p className="text-[#AAB7C5] text-sm mt-1">
                        {item.message}
                      </p>

                      <p className="text-xs text-[#66788E] mt-2">
                        {item.time}
                      </p>

                    </div>

                  </div>
                </button>

              );

            })}

          </div>

          <div className="p-4 bg-black/10">
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}