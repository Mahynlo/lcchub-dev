import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function LCCIcon() {
  return (
    <Image
      src="/logo-lcc.png"
      width={80}
      height={80}
      alt="logo of the computer science unit lcc"
    />
  );
}

export function HomeNavbar() {
  const sections = ["Upcoming Events", "News"];
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md">
      <div className="flex items-center space-x-4">
        <Link className="block" href="#">
          <LCCIcon />
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          {sections.map((nameOfSection, index) => (
            <Link
              className="text-gray-700 hover:text-purple-400 transition-colors"
              key={index}
              href="#"
            >
              {nameOfSection}
            </Link>
          ))}
        </nav>
      </div>
      <Button size="icon" variant="outline">
        <MenuIcon className="h-4 w-4" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </header>
  );
}
