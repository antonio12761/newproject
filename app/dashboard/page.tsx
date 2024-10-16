"use client"; // Questo componente funziona solo sul client

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Se l'utente non è autenticato, reindirizza al login
  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  if (status === "loading") {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Benvenuto, {session?.user?.email}</p>
    </div>
  );
};

export default DashboardPage;
