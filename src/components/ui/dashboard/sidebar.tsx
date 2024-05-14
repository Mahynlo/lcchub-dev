import Link from "next/link";
export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800">
      <nav className="flex-grow">
        <ul>
          <li>
            <Link
              href="/dashboard/auth/progress"
              className="flex items-center h-16 px-6 text-gray-300 border-l-4 border-transparent hover:bg-gray-700 hover:border-blue-500"
            >
              <span className="text-lg font-semibold">Mi Progreso</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/auth/lccmap"
              className="flex items-center h-16 px-6 text-gray-300 hover:bg-gray-700"
            >
              <span className="text-lg font-semibold">Mapa interactivo</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
