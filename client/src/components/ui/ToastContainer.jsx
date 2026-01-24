const colors = {
  success: "border-green-600",
  error: "border-red-600",
  info: "border-blue-600",
};

const ToastContainer = ({ toasts }) => {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 text-white bg-neutral-700 border rounded shadow-md animate-slide-in ${
            colors[toast.type]
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
