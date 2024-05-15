"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => (
        <Link
        key={item.href}
        href={item.href}
        className={cn(
          "hover:bg-accent hover:text-accent-foreground",
          pathname === item.href
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        {item.title}
      </Link>
    ))}
    </nav>
  );
}
