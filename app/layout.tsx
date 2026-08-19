import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jobanpreet Singh — Full Stack Developer",
  description: "Portfolio of Jobanpreet Singh, a full stack developer building scalable SaaS, AI media and real-time web products.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
