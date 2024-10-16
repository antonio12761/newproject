"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button"; // Usa il componente Button

// Schema di validazione Zod per la registrazione
const registerSchema = z.object({
  email: z.string().email("Inserisci una email valida"),
  password: z.string().min(6, "La password deve contenere almeno 6 caratteri"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Stato per gestire l'invio del form

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // Ottieni gli errori e lo stato di validità
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // Valida il form mentre l'utente inserisce i dati
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsSubmitting(true); // Imposta lo stato di invio in corso
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registrazione completata",
          text: "Controlla la tua email per verificare l'account.",
        });
      } else {
        const errorData = await res.json();
        Swal.fire({
          icon: "error",
          title: "Errore",
          text: errorData.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Errore",
        text: "Errore durante la registrazione.",
      });
    } finally {
      setIsSubmitting(false); // Reimposta lo stato dopo la registrazione
    }
  };

  const handleInvalidSubmit = () => {
    // Mostra un alert se il form non è valido e si tenta di cliccare il pulsante
    Swal.fire({
      icon: "error",
      title: "Campi non validi",
      text: "Assicurati di compilare correttamente tutti i campi prima di inviare.",
    });
  };

  return (
    <Card title="Registrazione">
      <h1 className="text-center mb-4">Registrati</h1>
      <form onSubmit={handleSubmit(onSubmit)} onInvalid={handleInvalidSubmit}>
        {/* Componente Input riutilizzabile */}
        <Input
          label="Email"
          type="email"
          placeholder="Inserisci la tua email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Inserisci la tua password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          label="Registrati"
          type="submit"
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
        />
      </form>
    </Card>
  );
};

export default RegisterPage;
