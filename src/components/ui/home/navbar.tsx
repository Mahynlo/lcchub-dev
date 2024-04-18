import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    <div className="sticky top-0 z-10 py-0 w-full flex items-center px-6 bg-white">
      <Link className="flex flex-row items-center" href="/">
        <LCCIcon />
        <span className="px-3 font-mono text-blue-950 text-xl font-semibold">
          LCCHUB
        </span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6 px-20 ml-auto">
        {sections.map((nameOfSection, index) => (
          <Link
            key={index}
            href={"/" + nameOfSection}
            className="text-gray-700 hover:text-purple-600 transition-colors"
          >
            {nameOfSection}
          </Link>
        ))}
      </nav>
      <Button asChild>
        <Link href="/">Mi Portal</Link>
      </Button>
    </div>
  );
}
