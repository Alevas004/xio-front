import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBarApps from "../components/layouts/NavBarApps";
import ProviderRedux from "@/redux/ProviderRedux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xiomara Sanchez",
  description: "Servicios de Xiomara Sanchez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderRedux>
          <div className="relative ">
            <NavBarApps />
          </div>

          {children}
        </ProviderRedux>
      </body>
    </html>
  );
}
