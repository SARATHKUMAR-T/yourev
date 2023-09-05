"use client";
import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Lato, Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";

const mont = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zemo",
  description: "self development app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mont.className} relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
