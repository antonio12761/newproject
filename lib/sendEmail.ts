import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // O il servizio che usi
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Please verify your email by clicking the link: ${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
}
