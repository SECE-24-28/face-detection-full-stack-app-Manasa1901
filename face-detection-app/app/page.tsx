import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-sky-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">NEXT-GEN BIOMETRICS</span>
            <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
              Intelligent Detection.
              <br />
              <span className="text-sky-700"> Instant Insights.</span>
            </h1>
            <p className="mt-6 text-base text-slate-700">
              Detect faces from images instantly using advanced facial analysis.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-sky-500"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                View Demo
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex gap-2">
                <span className="h-4 w-4 rounded-full bg-sky-200" />
                <span className="h-4 w-4 rounded-full bg-sky-400" />
                <span className="h-4 w-4 rounded-full bg-white border" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-[360px] rounded-2xl bg-white p-4 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder"
                alt="Face sample"
                className="h-80 w-full rounded-lg object-cover"
              />
              <div className="absolute left-4 bottom-4 flex items-center gap-3 rounded-lg bg-slate-50/90 px-3 py-2 shadow">
                <div className="text-xs text-slate-600">RECOGNISED</div>
                <div className="text-sm font-medium text-slate-800">Face Detected</div>
              </div>
              <div className="absolute right-4 bottom-4 flex items-center gap-2">
                <div className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">99.9%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
