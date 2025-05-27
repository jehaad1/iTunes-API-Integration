import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./providers/ConvexClientProvider";

export const metadata: Metadata = {
  title: "iTunes API Integration",
  description: "By Jehaad AL-Johani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
