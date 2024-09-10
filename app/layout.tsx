import type { Metadata } from "next";
import Image from "next/image";
import { Inter, Fraunces } from "next/font/google";
import { twMerge } from "tailwind-merge";

import Sidebar from "./components/Sidebar/Sidebar";
import "./globals.css";
import Logo from "./assets/images/logo.png";

const inter = Inter({ subsets: ["latin"] });

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Operation Blockchain",
  description: "A platform for Bitcoin services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(inter.className, `${fraunces.variable}`)}>
        <div className="w-full h-screen flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center border border-gray-400">
            <Sidebar />
            <div className="relative w-fit h-full flex flex-1 items-center justify-center overflow-y-scroll">
              <div className="absolute top-2 right-4 flex gap-4 items-center">
                <Image src={Logo} alt="logo" width={64} />
                {/* <span>Operation Blockchain</span> */}
              </div>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
