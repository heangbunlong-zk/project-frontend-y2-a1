import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              Join E-Learn
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Create your professional learning account
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Build your profile, enroll in structured courses, and track your
              certificates and progress in one place.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Guided learning paths for every level",
                "Progress dashboard and lesson tracking",
                "Certificates for completed programs",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  <span className="mr-2 font-semibold text-indigo-600">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-4xl bg-slate-900 p-6 text-white shadow-xl md:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold text-cyan-200">Start free</p>
              <h2 className="mt-1 text-2xl font-bold">Create your account</h2>
              <p className="mt-2 text-sm text-slate-300">
                Get started with your first learning path in minutes.
              </p>
            </div>

            <form className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">Full name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Goal</label>
                <select className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none">
                  <option>Frontend Developer</option>
                  <option>Programming Basics</option>
                  <option>Full Stack Growth</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" className="rounded" />
                  I agree to the platform terms and learning policy.
                </label>
              </div>

              <div className="md:col-span-2">
                <Link
                  href="/dashboard"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Create Account
                </Link>
              </div>
            </form>

            <p className="mt-5 text-center text-sm text-slate-300">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
