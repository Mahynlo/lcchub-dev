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
    <>
      <HomeNavbar />
      {children}
      <HomeFooter />

      <ChatTab />
    </>
  );
}
