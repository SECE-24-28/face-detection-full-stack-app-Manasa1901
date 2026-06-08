import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

import FaceDetector from "@/components/FaceDetector";
import EmailAlert from "@/components/EmailAlert";

import { logoutUser } from "@/actions/auth.actions";

export default async function DashboardPage() {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    const payload = verifyToken(token) as {
        userId: string;
        email: string;
    };

    const user = await prisma.user.findUnique({
        where: {
            id: Number(payload.userId),
        },
        select: {
            email: true,
            entries: true,
        },
    });

    return (
        <>
            <EmailAlert email={payload.email} />

            <main className="min-h-screen bg-gradient-to-r from-sky-50 via-white to-white py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <header className="mb-10 rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="space-y-2">
                                <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Face Detection Dashboard</p>
                                <h1 className="text-2xl font-semibold text-slate-900">Welcome back, {payload.email}</h1>
                                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                                    Analyze images, track usage, and manage your secure face detection workflow with confidence.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 shadow-sm">
                                    Entries: <span className="font-semibold text-slate-900">{user?.entries}</span>
                                </div>
                                <form action={logoutUser}>
                                    <button
                                        className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </div>
                        </div>
                    </header>

                    <div className="grid gap-8 xl:grid-cols-[1.7fr_0.9fr]">
                        <section className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500 font-bold">Detection workspace</p>
                                </div>
                            </div>

                            <FaceDetector userId={Number(payload.userId)} />
                        </section>

                        <aside className="space-y-6">
                            <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
                                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Overview</p>
                                <div className="mt-6 grid gap-4">
                                    <div className="rounded-3xl bg-slate-50 p-5">
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">User</p>
                                        <p className="mt-2 text-lg font-semibold text-slate-900">{payload.email}</p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-50 p-5">
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total entries</p>
                                        <p className="mt-2 text-lg font-semibold text-slate-900">{user?.entries}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
                                <p className="text-sm uppercase tracking-[0.35em] font-bold text-slate-500">Tips</p>
                                <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                                    <li>Use high-contrast images for better detection.</li>
                                    <li>Keep faces centered for cleaner results.</li>
                                    <li>Refresh the page after detection to update your stats.</li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}