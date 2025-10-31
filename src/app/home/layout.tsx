"use server";

import { HomeNavbar } from "@/components/ui/home/navbar";
import { HomeFooter } from "@/components/ui/home/footer";
import ChatTab from "@/components/ui/chat/Chatbot";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <main className="flex-1">
        {children}
      </main>
      <HomeFooter />

      <ChatTab />
    </div>
  );
}
