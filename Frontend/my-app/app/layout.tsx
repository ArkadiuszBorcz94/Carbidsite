import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./nav/Navbar";
import ProviderToaster from "./providers/ProviderToaster";


 

export const metadata: Metadata = {
  title: "CarBidSite",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <ProviderToaster/>
        <Navbar/>
        <main className="container mx-auto px-5 pt-10">
          {children}
        </main>
       </body>
    </html>
  );
}
