import { DashboardNavbar } from "@/components/ui/dashboard/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardNavbar />
      {children}
    </div>
  );
}