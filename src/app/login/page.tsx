"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function formatDemoName(email: string) {
  const baseName = email.split("@")[0] || "Student";
  return baseName
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user
        localStorage.setItem('elearn-token', data.token);
        localStorage.setItem('elearn-user', JSON.stringify(data.user));
        window.dispatchEvent(new Event("elearn-auth-changed"));
        router.push("/dashboard");
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section className="rounded-4xl bg-linear-to-r from-slate-950 via-indigo-900 to-cyan-600 p-6 text-white shadow-xl md:p-8">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-cyan-100">
              Student login
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Continue your learning journey with confidence
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-100 md:text-base">
              Sign in to access your dashboard, continue your courses, and track
              your certificates in a professional e-learning workspace.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-sm text-slate-200">learning access</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">120+</p>
                <p className="mt-1 text-sm text-slate-200">guided lessons</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">4.8/5</p>
                <p className="mt-1 text-sm text-slate-200">learner rating</p>
              </div>
            </div>
          </section>

          <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold text-indigo-600">Welcome back</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Login to your account</h2>
              <p className="mt-2 text-sm text-slate-500">
                Access your saved progress and continue learning.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <span className="font-medium text-indigo-600">Forgot password?</span>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Demo access: use any email and password for UI preview.
            </div>

            <p className="mt-5 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                Create one
              </Link>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
