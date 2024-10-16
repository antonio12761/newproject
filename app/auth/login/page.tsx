"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button"; // Usa il componente Button

// Schema di validazione Zod per il login
const loginSchema = z.object({
  email: z.string().email("Inserisci una email valida"),
  password: z.string().min(6, "La password deve contenere almeno 6 caratteri"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Stato per il caricamento
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // Ottieni lo stato di validità
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Valida il form mentre l'utente inserisce i dati
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsSubmitting(true); // Imposta il caricamento su true

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setIsSubmitting(false); // Reimposta il caricamento su false

    if (result?.error) {
      Swal.fire({
        icon: "error",
        title: "Errore",
        text: result.error,
      });
    } else {
      router.push("/dashboard");
    }
  };

  const handleInvalidSubmit = () => {
    Swal.fire({
      icon: "error",
      title: "Campi non validi",
      text: "Assicurati di compilare correttamente tutti i campi prima di inviare.",
    });
  };

  return (
    <Card title="Login">
      <form onSubmit={handleSubmit(onSubmit)} onInvalid={handleInvalidSubmit}>
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
          label="Login"
          type="submit"
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
        />
      </form>
    </Card>
  );
};

export default LoginPage;
