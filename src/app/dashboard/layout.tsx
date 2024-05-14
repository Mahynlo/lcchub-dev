"use client";
import { AuthProvider } from "@/lib/msal-config";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
