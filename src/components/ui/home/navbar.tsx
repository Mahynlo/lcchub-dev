"use client";
//navbar para la página de home (pública)
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, Calendar, Image as ImageIcon, BookOpen } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    { name: "Inicio", href: "/home", icon: Home },
    { name: "Eventos", href: "/home/eventos", icon: Calendar },
    { name: "Galería", href: "/home/galeria", icon: ImageIcon },
    { name: "Anuncios y noticias", href: "/home/blog", icon: BookOpen },
  ];

  return (
    <div className="sticky top-0 z-50 py-0 w-full flex items-center px-6 bg-white border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      
      {/* Logo */}
      <a href="https://cc.unison.mx" target="_blank" rel="noopener noreferrer">
        <LCCIcon />
      </a>

      {/* Título */}
      <Link className="flex flex-row items-center" href="/home">
        <span className="px-3 font-mono text-blue-950 text-xl font-semibold">
          LCCHUB
        </span>
      </Link>

      {/* Navegación escritorio */}
      <nav className="hidden md:flex items-center space-x-6 px-20 ml-auto">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
          >
            <section.icon className="h-4 w-4" />
            {section.name}
          </Link>
        ))}
      </nav>

      {/* Botón hamburguesa solo móvil */}
      <div className="md:hidden ml-auto">
        <Button
          variant="ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="md:hidden absolute top-full right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-b-md z-50">
          <div className="flex flex-col py-2">
            {sections.map((section) => (
              <Link
                key={section.name}
                href={section.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                <section.icon className="h-4 w-4" />
                {section.name}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

