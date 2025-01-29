"use client";
import ChatTab from "@/components/ui/chat/Chatbot";
import { AuthProvider } from "@/lib/msal-config";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
      
      <ChatTab />
    </div>
  );
}
