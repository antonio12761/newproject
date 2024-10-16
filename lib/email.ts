import sgMail from "@sendgrid/mail";

// Imposta la tua API Key di SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

console.log("API Key di SendGrid:", process.env.SENDGRID_API_KEY);

export const sendVerificationEmail = async (to: string, token: string) => {
  const fromEmail = process.env.EMAIL_USER ?? "no-reply@example.com"; // Fallback se EMAIL_USER è undefined

  const msg = {
    to, // Destinatario
    from: fromEmail, // Verifica che l'email sia sempre una stringa
    subject: "Verifica la tua email",
    html: `<p>Per favore, verifica la tua email cliccando sul seguente link:</p>
           <a href="${
             process.env.NEXTAUTH_URL ?? "http://localhost:3000"
           }/api/auth/verify-email?token=${token}">Verifica Email</a>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email inviata con successo!");
  } catch (error) {
    if (error instanceof Error && "response" in error) {
      const sgError = error as any;
      console.error("Errore durante l'invio dell'email:", sgError.message);
      if (sgError.response && sgError.response.body) {
        console.error("Risposta di errore di SendGrid:", sgError.response.body);
      }
    } else {
      console.error("Errore sconosciuto:", error);
    }
  }
};
