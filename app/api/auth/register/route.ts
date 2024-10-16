import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "../../../../lib/prisma";
import { Resend } from "resend";
import { randomBytes } from "crypto"; // Per generare il token di verifica

// Inizializza Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Verifica se l'utente esiste già
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Utente già registrato." },
        { status: 400 }
      );
    }

    // Crea un nuovo utente con la password hashata
    const hashedPassword = await hash(password, 10);

    // Genera un token di verifica
    const verificationToken = randomBytes(32).toString("hex"); // Assicurati che questa linea sia presente e corretta

    // Crea un nuovo utente nel database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verificationToken, // Salva il token di verifica nel database
      },
    });

    // Invia l'email di verifica con Resend
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev", // Inserisci l'email mittente verificata su Resend
        to: email,
        subject: "Verifica la tua email",
        html: `
          <p>Ciao,</p>
          <p>Per favore, verifica la tua email cliccando sul seguente link:</p>
          <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${verificationToken}">
            Verifica la tua email
          </a>
        `,
      });

      return NextResponse.json({
        message:
          "Registrazione completata. Controlla la tua email per verificare il tuo account.",
      });
    } catch (emailError) {
      console.error("Errore durante l'invio dell'email:", emailError);

      // Elimina l'utente se l'email non può essere inviata
      await prisma.user.delete({ where: { id: newUser.id } });

      return NextResponse.json(
        {
          message:
            "Errore durante l'invio dell'email di verifica. Riprova più tardi.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    return NextResponse.json(
      { message: "Errore durante la registrazione." },
      { status: 500 }
    );
  }
}
