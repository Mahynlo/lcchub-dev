export function AxisCard({
  title,
  credits,
  color,
}: {
  title: string;
  credits: number | string;
  color: string;
}) {
  return (
    <div
      className="p-3 md:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      style={{ backgroundColor: color }}
    >
      <h3 className="text-sm md:text-xl font-medium">Eje {title}</h3>
      <p className="text-2xl md:text-4xl font-bold text-black">{Number(credits)}</p>
      <p className="text-xs md:text-base text-gray-500">Créditos</p>
    </div>
  );
}
