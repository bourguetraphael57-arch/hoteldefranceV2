/**
 * Envoi du formulaire par e-mail. Si SMTP_HOST est vide, le site est en MODE DÉMONSTRATION :
 * rien n'est envoyé ni stocké, et le visiteur en est informé.
 */
import nodemailer from 'nodemailer';
import { OBJETS, resume, type ContactData } from './contact';

export function isDemoMode(): boolean {
  return !process.env.SMTP_HOST;
}

export async function sendContact(d: ContactData): Promise<void> {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  const lignes = resume(d).map((r) => `${r.label} : ${r.value}`);
  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    // Adresse du visiteur en réponse uniquement si elle est valide (déjà validée en amont).
    replyTo: d.email ? { name: d.nom, address: d.email } : undefined,
    subject: `[Site] ${OBJETS[d.objet]} — ${d.nom}`.replace(/[\r\n]+/g, ' ').slice(0, 150),
    text: `${lignes.join('\n')}\n\n— Message envoyé depuis le formulaire du site.`,
  });
}
