import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Toast = ({ toastConfig, onClose }) => {
  const { message, bgColor = "#333", textColor = "#fff" } = toastConfig;
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const toastRoot = document.getElementById("toast-root");

  return toastRoot
    ? ReactDOM.createPortal(
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg transition-all transform ${
            isClosing ? "animate-slide-out" : "animate-slide-in"
          }`}
          style={{
            backgroundColor: bgColor,
            color: textColor,
            minWidth: "200px",
          }}
        >
          {message}
        </div>,
        toastRoot
      )
    : null;
};

export default Toast;