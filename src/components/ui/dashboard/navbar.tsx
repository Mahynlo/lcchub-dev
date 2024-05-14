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

export function DashboardNavbar() {
  return (
    <div className="sticky top-0 z-10 py-0 w-full flex items-center px-6 bg-white">
      <Link className="flex flex-row items-center" href="/home">
        <LCCIcon />
        <span className="px-3 font-mono text-blue-950 text-xl font-semibold">
          LCCHUB
        </span>
      </Link>
      </div>
  );
}
