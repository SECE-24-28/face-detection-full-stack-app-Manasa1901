import { loginUser } from "@/actions/auth.actions";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-sky-50 via-white to-white py-20">
      <div className="mx-auto max-w-md px-6">
        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-600">Sign in to access your face detection dashboard.</p>
          </div>

          <form action={loginUser} className="flex flex-col gap-4">
            <label className="text-xs font-medium text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              required
            />

            <label className="text-xs font-medium text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Your password"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              required
            />

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-sky-500"
            >
              Sign in
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-600">
            New here?{' '}
            <Link href="/signup" className="font-medium text-sky-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}