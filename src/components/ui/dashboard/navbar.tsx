"use client";

import Link from "next/link";
import Image from "next/image";
import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import { LogOutIcon } from "lucide-react";
import { Button } from "../button";

interface DashboardNavbarProps {
  instance: IPublicClientApplication;
  accounts: AccountInfo[];
}

export function DashboardNavbar({ instance, accounts }: DashboardNavbarProps) {
  return (
    <div className="sticky top-0 z-10 py-0 w-full flex items-center px-6 bg-white">
      <Link className="flex flex-row items-center" href="/home">
        <LCCIcon />
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
