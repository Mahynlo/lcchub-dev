export function AxisCard({ title, credits, color }: { title: string; credits: number, color: string}) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md" style={{ backgroundColor: color }}>
        <h3 className="text-xl">Eje {title}</h3>
        <p className="text-4xl font-bold text-black">{credits}</p>
        <p className="text-gray-500">Créditos</p>
      </div>
    );
  }
  