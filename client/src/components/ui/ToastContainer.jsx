import { useEffect, useState } from "react";

const colors = {
  success: "border-green-500 bg-green-600",
  error: "border-red-600 bg-red-600",
  info: "border-blue-600 bg-blue-600",
};

const ToastContainer = ({ toasts }) => {
  const [visibleToasts, setVisibleToasts] = useState([]);

  // Whenever `toasts` change, add them to local state
  useEffect(() => {
    const newToasts = toasts.map((t) => ({ ...t, leaving: false }));
    setVisibleToasts((prev) => [...prev, ...newToasts]);
  }, [toasts]);

  useEffect(() => {
    visibleToasts.forEach((toast) => {
      if (!toast.leaving) {
        // Slide out after 2 seconds
        const timer = setTimeout(() => {
          setVisibleToasts((prev) =>
            prev.map((t) =>
              t.id === toast.id ? { ...t, leaving: true } : t
            )
          );

          // Remove from state after animation (0.5s)
          setTimeout(() => {
            setVisibleToasts((prev) =>
              prev.filter((t) => t.id !== toast.id)
            );
          }, 500);
        }, 3000);

        return () => clearTimeout(timer);
      }
    });
  }, [visibleToasts]);

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 text-white border rounded shadow-md transition-transform duration-500 ${
            colors[toast.type]
          } ${toast.leaving ? "opacity-0 animate-slide-out" : "animate-slide-in "} `}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
