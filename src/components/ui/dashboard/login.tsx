"use client";

import { Button } from "@/components/ui/button";
import { Sticker } from "lucide-react";
import { KeyRound } from "lucide-react";
import { loginRequest } from "@/lib/msal-config";
import { useMsal } from "@azure/msal-react";

export default function Login() {
  const { instance, inProgress } = useMsal();
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-2 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Sticker className="h-10 w-10" />
          <h1 className="text-3xl font-bold tracking-tighter">
            Bienvenido de vuelta
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Necesitas volver a acceder a tu cuenta
          </p>
        </div>

        <Button
          className="flex w-full items-center justify-center gap-2 rounded-md border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:ring-gray-300"
          variant="outline"
          onClick={() => {
            instance.loginPopup(loginRequest).catch((e) => {
              console.error(e);
            });
          }}
        >
          <KeyRound className="h-5 w-5" />
          Accede con tu cuenta IdenTIdad Unison
        </Button>
      </div>
    </div>
  );
}
