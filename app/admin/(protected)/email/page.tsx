import EmailTable from "@/components/email/table";
import { Resend } from "resend";

export default async function AdminDashboard() {
    const resend = new Resend(process.env.RESEND_ADMIN_API_KEY);
    const { data } = await resend.emails.list()

    return (
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
            <EmailTable emails={data?.data ?? []}/>
        </div>
    )
}