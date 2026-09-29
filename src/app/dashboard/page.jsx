import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in");
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg">Welcome back, {session.user.name}!</p>
            <p className="text-gray-500">Your email is {session.user.email}</p>
        </div>
    );
}
