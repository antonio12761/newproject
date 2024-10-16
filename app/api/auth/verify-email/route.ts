// app/api/auth/verify-email/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/auth/login?error=missing_token`
    ); // URL assoluto
  }

  // Trova l'utente con il token di verifica
  const user = await prisma.user.findUnique({
    where: { verificationToken: token },
  });

  if (!user) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/auth/login?error=invalid_token`
    ); // URL assoluto
  }

  // Verifica l'email e rimuovi il token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(), // Aggiorna la data di verifica
      verificationToken: null, // Rimuovi il token dopo la verifica
    },
  });

  // Reindirizza alla pagina di login con un messaggio di successo
  return NextResponse.redirect(
    `${process.env.NEXTAUTH_URL}/auth/login?success=email_verified`
  ); // URL assoluto
}
