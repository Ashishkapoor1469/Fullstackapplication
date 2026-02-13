import { useEffect, useState } from "react";

const MAX_TOASTS = 6;

const colors = {
  success:
    "border-green-400/40 bg-green-500/15 shadow-green-500/20",
  error:
    "border-red-400/40 bg-red-500/15 shadow-red-500/20",
  info:
    "border-blue-400/40 bg-blue-500/15 shadow-blue-500/20",
};

const ToastContainer = ({ toasts }) => {
  const [visibleToasts, setVisibleToasts] = useState([]);

  /* Add new toasts (QUEUE SYSTEM) */
  useEffect(() => {
    setVisibleToasts((prev) => {
      const incoming = toasts.map((t) => ({ ...t, leaving: false }));
      let combined = [...prev, ...incoming];

      if (combined.length > MAX_TOASTS) {
        const excess = combined.length - MAX_TOASTS;
        combined = combined.map((toast, index) =>
          index < excess ? { ...toast, leaving: true } : toast
        );
      }

      return combined;
    });
  }, [toasts]);

  /* Auto-dismiss */
  useEffect(() => {
    const timers = visibleToasts.map((toast) => {
      if (toast.leaving) return null;

      return setTimeout(() => {
        setVisibleToasts((prev) =>
          prev.map((t) =>
            t.id === toast.id ? { ...t, leaving: true } : t
          )
        );

        setTimeout(() => {
          setVisibleToasts((prev) =>
            prev.filter((t) => t.id !== toast.id)
          );
        }, 500);
      }, 2500);
    });

    return () => timers.forEach((t) => t && clearTimeout(t));
  }, [visibleToasts]);

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            relative px-4 py-3 text-white rounded-xl border
            backdrop-blur-xl backdrop-saturate-150
            bg-linear-to-br from-white/10 to-white/5
            shadow-lg ${colors[toast.type]}
            ${
              toast.leaving
                ? "translate-x-full opacity-0 animate-slide-out"
                : "translate-x-0 opacity-100 animate-slide-in"
            }
          `}
        >
          {/* Glass shine */}
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-tr from-white/20 via-transparent to-transparent opacity-30" />

          <span className="relative z-10">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
