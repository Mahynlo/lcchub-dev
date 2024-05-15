import type { Metadata } from "next";
import { fontSans } from "@/lib/fonts";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "LCC Hub",
  description: "Social Service Project for the LCC Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div vaul-drawer-wrapper="">
          <div className="relative flex min-h-screen flex-col bg-background">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
