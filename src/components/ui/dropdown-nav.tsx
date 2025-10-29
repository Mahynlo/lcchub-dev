"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type DropdownItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

interface DropdownNavProps {
  title: string;
  items: DropdownItem[];
  icon?: React.ReactNode;
  align?: "left" | "right";
}

export function DropdownNav({
  title,
  items,
  icon,
  align = "right",
}: DropdownNavProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Botón principal */}
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-gray-700 hover:text-purple-600 transition-colors"
      >
        {icon && <span className="mr-1">{icon}</span>}
        {title}
        <ChevronDown
          size={16}
          className={`ml-1 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {/* Contenido desplegable */}
      {open && (
        <div
          className={`absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 z-50 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

