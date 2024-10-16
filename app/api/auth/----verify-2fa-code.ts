import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, code } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.twoFactorCode !== code) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
  }

  // Rimuovi il codice 2FA dopo verifica
  await prisma.user.update({
    where: { email },
    data: { twoFactorCode: null },
  });

  return NextResponse.json({ message: '2FA verification successful' });
}
