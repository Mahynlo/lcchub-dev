import { HomeNavbar } from "@/components/ui/home/navbar";
import { HomeFooter } from "@/components/ui/home/footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <HomeNavbar />
        {children}
        <HomeFooter />
      </body>
    </html>
  );
}
