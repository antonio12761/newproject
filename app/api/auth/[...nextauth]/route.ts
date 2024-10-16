import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Esportiamo GET e POST per supportare le operazioni di NextAuth.js
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
