// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error("Credenziali non valide.");
        }

        // Se l'email non è stata verificata
        if (!user.emailVerified) {
          throw new Error("Email non verificata.");
        }

        // Garantire che i campi siano sempre di tipo string
        return {
          ...user,
          role: user.role || "user", // Imposta un valore predefinito per `role`
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
