"use client";

import { useState } from "react";

import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "react-responsive";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Sidebar from "./components/Sidebar/Sidebar";
import Logo from "./components/Logo";

import "./globals.css";

const geistSans = localFont({
  src: [
    {
      path: "./assets/fonts/Geist-Regular.otf",
      weight: "400",
    },
    {
      path: "./assets/fonts/Geist-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <SpeedInsights />
        <div className="w-full h-screen flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center md:border md:border-gray-400 overflow-hidden">
            <Sidebar
              isMobile={isMobile}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <div
              className={twMerge(
                "relative w-fit h-full flex flex-1 items-center justify-center overflow-y-scroll",
                isSidebarOpen && isMobile ? "opacity-10" : ""
              )}
            >
              <Logo />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
