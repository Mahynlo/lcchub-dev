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
    <div className={`bg-white border border-gray-300 shadow-lg rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[280px] md:min-w-[400px] max-w-full ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="font-bold text-base md:text-lg">Advertencia</p>
          <p className="text-sm md:text-base text-gray-700">{message}</p>
        </div>
        <button
          className="ml-2 text-gray-500 hover:text-gray-700 text-2xl font-bold flex-shrink-0 w-6 h-6 flex items-center justify-center"
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
