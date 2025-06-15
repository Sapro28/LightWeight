import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import Navbar from "@/components/navigation/Navbar";
import FooterSection from "@/components/navigation/FooterSection";
import { Analytics } from "@vercel/analytics/react";

const mainFont = Inter({
  variable: "--font-main",
  subsets: ["latin"],
  display: "swap",
});

const codeFont = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LightWeight",
  description: "Lightweight baby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body
          className={`${mainFont.variable} ${codeFont.variable} antialiased font-main`}
        >
          <Navbar />
          <main className="pt-24 flex-grow">{children}</main>
          <FooterSection />
          <Analytics />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
