"use client";

import Link from "next/link";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";
import { Button } from "../button";
import { useMsal } from "@azure/msal-react";

export function DashboardNavbar() {
  const { instance, accounts } = useMsal();
  return (
    <div className="sticky top-0 z-50 py-0 w-full flex items-center px-6 bg-white border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
       <a href="https://cc.unison.mx" target="_blank" rel="noopener noreferrer">
        <LCCIcon />
      </a>
      <Link className="flex flex-row items-center" href="/home">
        {/* <LCCIcon /> */}
        <span className="px-3 font-mono text-blue-950 text-xl font-semibold">
          LCCHUB
        </span>
      </Link>
    
      {accounts && accounts.length > 0 && (
        <div className="flex flex-row items-center ml-auto">
          <Button
            className="flex flex-row items-center px-3 py-2 text-blue-950 font-semibold bg-white rounded-md hover:bg-blue-100"
            onClick={() =>
              instance.logoutRedirect({ postLogoutRedirectUri: "/home" })
            }
          >
            <LogOutIcon size={20} />
            <span className="pl-1">Salir</span>
          </Button>
        </div>
      )}
    </div>
  );
}

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
