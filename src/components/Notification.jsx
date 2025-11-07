import { useState, useEffect } from "react";

export default function Notification({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-red-400 text-white px-4 py-2 rounded-md shadow-lg animate-slide-up">
      {message}
    </div>
  );
}
