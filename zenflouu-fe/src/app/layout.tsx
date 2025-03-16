"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { AuthProvider } from "@/components/AuthContext/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable}`}
          style={{ backgroundColor: "white" }}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
