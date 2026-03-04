import { createContext, useContext, useState, useCallback } from "react";
import { ToastContainer } from "../components/ui";

const ToastContext = createContext(null);
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState([]);
  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToast((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToast((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }} >
      {children}
      <ToastContainer toasts={toast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
