"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState } =
    useForm<RegisterFormInputs>({
      mode: "onChange", // Controlla la validità in tempo reale
    });
  const router = useRouter();
  const password = watch("password");

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        // Mostra alert di successo
        Swal.fire({
          icon: "success",
          title: "Registrazione riuscita",
          text: "Controlla la tua mail per confermare l'account",
        });

        // Esegui il redirect alla pagina di login
        router.push("/auth/login");
      } else {
        const errorData = await response.json();
        // Mostra alert di errore con il messaggio dell'API
        Swal.fire({
          icon: "error",
          title: "Errore",
          text:
            errorData.message || "Qualcosa è andato storto. Riprova più tardi.",
        });
      }
    } catch (error) {
      // Mostra un alert di errore generico
      Swal.fire({
        icon: "error",
        title: "Errore",
        text: "Errore di rete. Riprova più tardi.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Registrati</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-96">
        <div>
          <input
            {...register("email", { required: "L'email è richiesta" })}
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {formState.errors.email && (
            <p className="text-red-500">{formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("password", { required: "La password è richiesta" })}
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {formState.errors.password && (
            <p className="text-red-500">{formState.errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("confirmPassword", {
              required: "Conferma la password",
              validate: (value) =>
                value === password || "Le password non corrispondono",
            })}
            type="password"
            placeholder="Conferma Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {formState.errors.confirmPassword && (
            <p className="text-red-500">
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${
            formState.isValid
              ? "bg-green-500"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!formState.isValid}
        >
          Registrati
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
