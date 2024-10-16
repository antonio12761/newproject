// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Trova l'utente nel database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'Credenziali non valide' },
      { status: 401 }
    );
  }

  // Controlla se l'email è stata verificata
  if (!user.emailVerified) {
    // Reindirizza alla pagina di login con un messaggio di avviso
    return NextResponse.json(
      { message: 'Email non verificata. Controlla la tua posta.' },
      { status: 403 }
    );
  }

  // Confronta la password inserita con quella salvata nel database
  const isPasswordCorrect = await compare(password, user.password);
  
  if (!isPasswordCorrect) {
    return NextResponse.json(
      { message: 'Credenziali non valide' },
      { status: 401 }
    );
  }

  // Se tutto va bene, reindirizza alla dashboard
  return NextResponse.redirect('/dashboard');
}
