"use client"; // Aggiungi questa direttiva per rendere il file un Client Component

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Header from "../components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <SessionProvider>
          {" "}
          {/* Avvolgi l'app nel SessionProvider */}
          <Header />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
