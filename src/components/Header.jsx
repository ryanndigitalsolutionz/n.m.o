import { Bell, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getManagementNotifications, markManagementNotificationRead, deleteManagementNotification } from "./management/managementApi";
import Profile from "./Profile";
import NotificationPanel from "./NotificationPanel";

function useLiveDate() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return now;
}

export default function Header({ title }) {
  const now = useLiveDate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [notifications, setNotifications] = useState([]);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const initials = user.username
    ? user.username
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    : null;

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    async function loadNotifications() {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const data = await getManagementNotifications();

        setNotifications(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(err);
      }
    }

    loadNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header
      className="
        relative
        z-20
        mx-4
        my-4
        md:mx-6
        lg:mx-8
        flex
        items-center
        justify-between
        rounded-3xl
        border
        border-[rgba(255,255,255,.10)]
        bg-[rgba(15,34,56,.35)]
        px-6
        py-5
        backdrop-blur-2xl
        shadow-[0_20px_60px_-30px_rgba(0,0,0,.7)]
      "
    >
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FDB813]">
          Welcome, {user.username || "Visitor"}
        </span>

        <h1 className="text-3xl font-extrabold text-white">
          {title}
        </h1>

        <p className="text-sm text-[#B9C6D6]">
          {dateStr}
        </p>
      </div>

      <div className="flex items-center gap-3">

        {/* Notifications */}

        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setNotificationsOpen(
                !notificationsOpen
              )
            }
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              border-[rgba(255,255,255,.1)]
              bg-white/5
              text-[#B9C6D6]
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <Bell size={20} />

            {notifications.some(
              (n) => !n.is_read
            ) && (
              <span
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[#FDB813]
                "
              />
            )}
          </button>

          <NotificationPanel
            open={notificationsOpen}
            notifications={notifications}
          />
        </div>

        {/* Profile */}

        <div
          ref={profileRef}
          className="relative z-50"
        >
          <button
            type="button"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[rgba(253,184,19,.3)]
              bg-gradient-to-r
              from-[#0F4C81]
              to-[#0A2A47]
              px-3
              py-2
              text-white
              transition
              hover:brightness-110
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#FDB813]
                to-[#C98A00]
                font-bold
                text-[#1A1200]
              "
            >
              {initials || <User size={18} />}
            </div>

            <div className="hidden lg:block">
              <div className="text-sm font-bold">
                {user.username || "Guest"}
              </div>

              <div className="text-xs text-[#B9C6D6]">
                {user.role || "Member"}
              </div>
            </div>
          </button>

          <Profile
            open={profileOpen}
            onClose={() =>
              setProfileOpen(false)
            }
          />
        </div>

      </div>
    </header>
  );
}
