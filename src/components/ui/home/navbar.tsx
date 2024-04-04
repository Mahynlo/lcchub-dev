import Link from "next/link";
import { Button } from "@/components/ui/button";

function MenuIcon(props) {
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

function SchoolIcon(props) {
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
      <path d="m4 6 8-4 8 4" />
      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 5v17" />
      <path d="M6 5v17" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  );
}

export function HomeNavbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md">
      <div className="flex items-center space-x-4">
        <Link className="block" href="#">
          <SchoolIcon className="h-8 w-8" />
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            className="text-gray-700 hover:text-gray-900 transition-colors"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-gray-700 hover:text-gray-900 transition-colors"
            href="#"
          >
            Events
          </Link>
          <Link
            className="text-gray-700 hover:text-gray-900 transition-colors"
            href="#"
          >
            News
          </Link>
          <Link
            className="text-gray-700 hover:text-gray-900 transition-colors"
            href="#"
          >
            Gallery
          </Link>
          <Link
            className="text-gray-700 hover:text-gray-900 transition-colors"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </div>
      <Button size="icon" variant="outline">
        <MenuIcon className="h-4 w-4" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </header>
  );
}
