import { useEffect } from 'react';

interface NotificationProps {
  id: string;
  message: string;
  onClose: (id: string) => void;
  duration?: number; // en milisegundos
  className?: string;
}

const Notification = ({
  id,
  message,
  onClose,
  duration = 15000,
  className = "",
}: NotificationProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, onClose, duration]);

  return (
    <div className={`bg-white border border-gray-300 shadow-lg rounded-lg px-6 py-4 min-w-[300px] md:min-w-[400px] ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-bold text-lg">Notificación</p>
          <p className="text-gray-700">{message}</p>
        </div>
        <button
          className="ml-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={() => onClose(id)}
          aria-label="Cerrar notificación"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
