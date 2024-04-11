import Link from "next/link";
import Image from "next/image";

function LCCIcon() {
  return (
    <Image
      src="/logo-lcc.png"
      width={80}
      height={80}
      alt="Logo de la carrera en ciencias de la computación"
    />
  );
}

export function HomeNavbar() {
  const sections = ["Eventos", "Noticias"];
  return (
    <header className="fixed top-0 w-full flex items-center px-6 py-1 bg-white bg-opacity-90">
      <Link className="flex flex-row items-center" href="#">
        <LCCIcon />
        <span className="px-3 font-mono text-blue-950 text-xl font-semibold">
          LCCHUB
        </span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6 px-20 ml-auto">
        {sections.map((nameOfSection, index) => (
          <Link
            key={index}
            href={"#" + nameOfSection}
            className="text-gray-700 hover:text-purple-400 transition-colors"
          >
            {nameOfSection}
          </Link>
        ))}
      </nav>
    </header>
  );
}
