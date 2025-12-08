import type { Metadata } from "next";
//import { fontSans } from "@/lib/fonts";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CacheSubjectProvider } from "./dashboard/auth/profile/SubjectCache";

export const metadata: Metadata = {
  title: {
    default: "LCCHUB",
    template: "%s | LCCHUB"
  },
  description: "Portal de la comunidad de Ciencias de la Computación de la Universidad de Sonora",
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
          //fontSans.variable,
        )}
      >
        <div vaul-drawer-wrapper="">
          <div className="relative flex min-h-screen flex-col bg-background">
            <CacheSubjectProvider>
              {children}
            </CacheSubjectProvider>
            
          </div>
        </div>
      </body>
    </html>
  );
}
