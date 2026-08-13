"use client";

import { useMemo, useState } from "react";

type Email = {
    id: string;
    to: string[];
    from: string;
    created_at: string;
    subject: string;
    bcc: string[] | null;
    cc: string[] | null;
    reply_to: string[] | null;
    last_event: string;
    scheduled_at: string | null;
    message_id: string;
};

type Props = {
    emails: Email[];
};

const eventStyles: Record<string, string> = {
    delivered: "bg-green-500/10 text-green-400",
    opened: "bg-blue-500/10 text-blue-400",
    clicked: "bg-purple-500/10 text-purple-400",
    bounced: "bg-red-500/10 text-red-400",
    complained: "bg-orange-500/10 text-orange-400",
};

function getEventLabel(event: string) {
    const labels: Record<string, string> = {
        delivered: "Délivré",
        opened: "Ouvert",
        clicked: "Cliqué",
        bounced: "Rejeté",
        complained: "Signalé",
    };

    return labels[event] ?? event;
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(date));
}

export default function EmailTable({ emails }: Props) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const pageSize = 5;

    const filteredEmails = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) {
            return emails;
        }

        return emails.filter((email) =>
            [
                email.subject,
                email.from,
                email.to.join(" "),
                email.reply_to?.join(" ") ?? "",
                email.last_event,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query)
        );
    }, [emails, search]);

    const totalPages = Math.ceil(filteredEmails.length / pageSize);

    const paginatedEmails = filteredEmails.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    function handleSearch(value: string) {
        setSearch(value);
        setPage(1);
    }

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold">
                        Emails
                    </h2>

                    <p className="text-sm text-zinc-500">
                        {filteredEmails.length} email
                        {filteredEmails.length > 1 ? "s" : ""}
                    </p>
                </div>

                <input
                    type="search"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Rechercher..."
                    className="
                        w-full rounded-lg border border-zinc-700
                        bg-zinc-900 px-4 py-2 text-sm
                        outline-none transition
                        placeholder:text-zinc-500
                        focus:border-blue-500
                        sm:w-72
                    "
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-zinc-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 bg-zinc-900/80">
                            <tr className="text-left text-zinc-400">
                                <th className="px-4 py-3 font-medium">
                                    Expéditeur
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Destinataire
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Sujet
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Statut
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800">
                            {paginatedEmails.map((email) => (
                                <tr
                                    key={email.id}
                                    className="
                                        transition
                                        hover:bg-zinc-900/50
                                    "
                                >
                                    {/* From */}
                                    <td className="px-4 py-4">
                                        <div
                                            className="max-w-56 truncate font-medium"
                                            title={email.from}
                                        >
                                            {email.from}
                                        </div>
                                    </td>

                                    {/* To */}
                                    <td className="px-4 py-4">
                                        <div
                                            className="max-w-56 truncate text-zinc-400"
                                            title={email.to.join(", ")}
                                        >
                                            {email.to.join(", ")}
                                        </div>
                                    </td>

                                    {/* Subject */}
                                    <td className="px-4 py-4">
                                        <div
                                            className="max-w-72 truncate font-medium"
                                            title={email.subject}
                                        >
                                            {email.subject}
                                        </div>
                                    </td>

                                    {/* Event */}
                                    <td className="px-4 py-4">
                                        <span
                                            className={`
                                                inline-flex items-center
                                                rounded-full px-2.5 py-1
                                                text-xs font-medium
                                                ${
                                                    eventStyles[
                                                        email.last_event
                                                    ] ??
                                                    "bg-zinc-500/10 text-zinc-400"
                                                }
                                            `}
                                        >
                                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

                                            {getEventLabel(
                                                email.last_event
                                            )}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="whitespace-nowrap px-4 py-4 text-zinc-400">
                                        {formatDate(
                                            email.created_at
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {paginatedEmails.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-12 text-center text-zinc-500"
                                    >
                                        Aucun email trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                        Page {page} sur {totalPages}
                    </p>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={page === 1}
                            onClick={() =>
                                setPage((current) => current - 1)
                            }
                            className="
                                rounded-lg border border-zinc-700
                                px-3 py-2 text-sm
                                transition
                                hover:bg-zinc-800
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            Précédent
                        </button>

                        <button
                            type="button"
                            disabled={page === totalPages}
                            onClick={() =>
                                setPage((current) => current + 1)
                            }
                            className="
                                rounded-lg border border-zinc-700
                                px-3 py-2 text-sm
                                transition
                                hover:bg-zinc-800
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}