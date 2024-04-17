import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {HomeNavbar} from "@/components/ui/home/navbar";
import {HomeFooter} from "@/components/ui/home/footer";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>
          <HomeNavbar />
          {children}
          <HomeFooter />
        </body>
    </html>
  );
}
