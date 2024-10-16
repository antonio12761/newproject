// app/auth/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react"; // Usa il signIn di NextAuth
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2"; // SweetAlert2 per i messaggi di alert

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const success = searchParams.get("success");

    if (error) {
      if (error === "invalid_token") {
        setMessage("Token non valido.");
      } else if (error === "missing_token") {
        setMessage("Token mancante.");
      } else {
        setMessage("Errore durante il login.");
      }
    }

    if (success) {
      Swal.fire({
        icon: "success",
        title: "Email verificata",
        text: "Email verificata con successo! Ora puoi effettuare il login.",
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Verifica che i campi email e password siano compilati
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campi mancanti",
        text: "Per favore, inserisci sia l'email che la password.",
      });
      return;
    }

    // Usa `signIn` di NextAuth per eseguire l'autenticazione
    const result = await signIn("credentials", {
      redirect: false, // Disabilita il redirect automatico
      email,
      password,
    });

    if (result?.error) {
      if (result.error.includes("Email non verificata")) {
        Swal.fire({
          icon: "error",
          title: "Email non verificata",
          text: "La tua email non è stata verificata. Controlla la tua posta.",
        });
      } else {
        setMessage(result.error);
      }
    } else {
      router.push("/dashboard"); // Reindirizza alla dashboard se il login ha successo
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
