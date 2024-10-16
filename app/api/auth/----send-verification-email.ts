import { PrismaClient } from '@prisma/client';
import { sendVerificationEmail } from '../../../lib/sendEmail'; // Funzione helper
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const verificationToken = Math.random().toString(36).substring(2);
  await prisma.user.update({
    where: { email },
    data: { verificationToken },
  });

  await sendVerificationEmail(user.email, verificationToken);
  return NextResponse.json({ message: 'Email sent' });
}
