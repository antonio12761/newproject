import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString();
  await prisma.user.update({
    where: { email },
    data: { twoFactorCode },
  });

  // Logica per inviare il codice via email o SMS

  return NextResponse.json({ message: "2FA code sent" });
}
