"use client";

import { HomeNavbar } from "@/components/ui/home/navbar";
import { HomeFooter } from "@/components/ui/home/footer";
import ChatTab from "@/components/ui/chat/Chatbot";
import { AuthProvider } from "@/lib/msal-config";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <HomeNavbar />
        <main className="flex-1">
          {children}
        </main>
        <HomeFooter />

        <ChatTab />
      </div>
    </AuthProvider>
  );
}
