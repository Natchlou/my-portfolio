"use client";

import { sendContactEmail } from "@/app/actions/contact";
import { useState } from "react";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget; // 👈 Store reference here
    setLoading(true);
    setStatus(null);

    const formData = new FormData(form);

    const result = await sendContactEmail({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    });

    if (result.success) {
        form.reset(); // 👈 Use stored reference
        setStatus({
            type: "success",
            message: "Votre message a bien été envoyé.",
        });
    } else {
        setStatus({
            type: "error",
            message: result.error ?? '',
        });
    }

    setLoading(false);
}

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">
                        Votre nom
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Votre nom"
                        autoComplete="off"
                        required
                        disabled={loading}
                        className="
                            rounded border-2 px-4 py-2
                            bg-gray-600/20
                            outline-none
                            transition
                            focus:border-blue-500
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email">
                        Votre email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Votre email"
                        autoComplete="off"
                        required
                        disabled={loading}
                        className="
                            rounded border-2 px-4 py-2
                            bg-gray-600/20
                            outline-none
                            transition
                            focus:border-blue-500
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="subject">
                        L&apos;objet du mail
                    </label>

                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Sujet"
                        required
                        disabled={loading}
                        className="
                            rounded border-2 px-4 py-2
                            bg-gray-600/20
                            outline-none
                            transition
                            focus:border-blue-500
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="message">
                        Votre message
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        placeholder="Votre message"
                        required
                        disabled={loading}
                        rows={6}
                        className="
                            min-h-32 resize-y
                            rounded border-2 px-4 py-2
                            bg-gray-600/20
                            outline-none
                            transition
                            focus:border-blue-500
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    />
                </div>
            </div>

            {status && (
                <div
                    role="status"
                    className={`mt-4 rounded px-4 py-3 text-sm ${
                        status.type === "success"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                    }`}
                >
                    {status.message}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="
                    mt-8 rounded border px-4 py-2
                    bg-blue-700
                    transition
                    hover:bg-blue-800
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
        </form>
    );
}