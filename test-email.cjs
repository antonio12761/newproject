require("dotenv").config();

console.log("Chiave API di Resend:", process.env.RESEND_API_KEY);

const { Resend } = require("resend");

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error(
    "Chiave API di Resend mancante. Assicurati che sia impostata nel file .env"
  );
}

const resend = new Resend(RESEND_API_KEY);

const sendTestEmail = async () => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "colaizzi.antonio61@gmail.com",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    console.log("Email inviata con successo!", response);
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
  }
};

sendTestEmail();
