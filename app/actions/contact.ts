// app/actions/contact.ts

"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().min(2, "Nom invalide"),
    email: z.string().email("Email invalide"), // z.email() top-level = Zod v4 only
    subject: z.string().min(2, "Sujet invalide"),
    message: z.string().min(10, "Message trop court"),
});

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function sendContactEmail(data: unknown) {
    const result = contactSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            error: "Les informations envoyées sont invalides.",
        };
    }

    const { name, email, subject, message } = result.data;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    try {
        const { error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [process.env.CONTACT_EMAIL!],
            replyTo: email,
            subject: `[Portfolio] ${subject}`,
            html: `
                <div style="
                    margin: 0;
                    padding: 40px 20px;
                    background-color: #f4f4f5;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                ">
                    <div style="
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border: 1px solid #e4e4e7;
                        border-radius: 16px;
                        overflow: hidden;
                    ">

                        <!-- Header -->
                        <div style="
                            padding: 28px 32px;
                            background: #18181b;
                            color: #ffffff;
                        ">
                            <div style="
                                font-size: 14px;
                                font-weight: 600;
                                letter-spacing: 0.5px;
                                opacity: 0.7;
                                margin-bottom: 8px;
                            ">
                                PORTFOLIO
                            </div>

                            <h1 style="
                                margin: 0;
                                font-size: 24px;
                                line-height: 1.3;
                                font-weight: 700;
                            ">
                                Nouveau message
                            </h1>

                            <p style="
                                margin: 8px 0 0;
                                color: #a1a1aa;
                                font-size: 14px;
                            ">
                                Quelqu'un vient de vous contacter depuis votre portfolio.
                            </p>
                        </div>

                        <!-- Content -->
                        <div style="padding: 32px;">

                            <!-- Sender -->
                            <div style="
                                margin-bottom: 24px;
                                padding: 16px;
                                background: #fafafa;
                                border: 1px solid #e4e4e7;
                                border-radius: 12px;
                            ">
                                <div style="
                                    margin-bottom: 14px;
                                    color: #71717a;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                ">
                                    Expéditeur
                                </div>

                                <div style="
                                    color: #18181b;
                                    font-size: 15px;
                                    line-height: 1.6;
                                ">
                                    <strong>${safeName}</strong>
                                    <br />

                                    <a
                                        href="mailto:${safeEmail}"
                                        style="
                                            color: #2563eb;
                                            text-decoration: none;
                                        "
                                    >
                                        ${safeEmail}
                                    </a>
                                </div>
                            </div>

                            <!-- Subject -->
                            <div style="margin-bottom: 24px;">
                                <div style="
                                    margin-bottom: 8px;
                                    color: #71717a;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                ">
                                    Sujet
                                </div>

                                <div style="
                                    color: #18181b;
                                    font-size: 18px;
                                    font-weight: 600;
                                ">
                                    ${safeSubject}
                                </div>
                            </div>

                            <!-- Message -->
                            <div>
                                <div style="
                                    margin-bottom: 8px;
                                    color: #71717a;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                ">
                                    Message
                                </div>

                                <div style="
                                    padding: 18px;
                                    background: #fafafa;
                                    border-left: 3px solid #18181b;
                                    border-radius: 0 8px 8px 0;
                                    color: #3f3f46;
                                    font-size: 15px;
                                    line-height: 1.7;
                                ">
                                    ${safeMessage}
                                </div>
                            </div>

                        </div>

                        <!-- Footer -->
                        <div style="
                            padding: 20px 32px;
                            background: #fafafa;
                            border-top: 1px solid #e4e4e7;
                            color: #a1a1aa;
                            font-size: 12px;
                            text-align: center;
                        ">
                            Message envoyé depuis le formulaire de contact du portfolio.
                        </div>

                    </div>
                </div>`,
        });

        if (error) {
            console.error("Resend error:", error);

            return {
                success: false,
                error: "Impossible d'envoyer le message.",
            };
        }

        return {
            success: true,
        };
    } catch (error) {
        console.error("Contact error:", error);

        return {
            success: false,
            error: "Une erreur est survenue.",
        };
    }
}