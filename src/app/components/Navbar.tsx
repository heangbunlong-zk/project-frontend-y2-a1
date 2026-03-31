"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/Courses", label: "Courses" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/certificate", label: "Certificates" },
];

type DemoUser = {
  name?: string;
  email?: string;
};

function readStoredUser(): DemoUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedUser = window.localStorage.getItem("elearn-user");

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser) as DemoUser;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const syncUser = () => {
      setUser(readStoredUser());
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("elearn-auth-changed", syncUser as EventListener);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener(
        "elearn-auth-changed",
        syncUser as EventListener
      );
    };
  }, []);

  const firstName = user?.name?.split(" ")[0] || "Student";
  const isSignedIn = Boolean(user?.name || user?.email);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }

    return pathname?.startsWith(href);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("elearn-user");
    setUser(null);
    window.dispatchEvent(new Event("elearn-auth-changed"));
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-indigo-600 text-lg text-white shadow-md">
            🎓
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">E-Learn</p>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Professional Academy
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-indigo-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {isSignedIn ? (
            <>
              <div className="hidden rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 sm:block">
                Hi, {firstName}
              </div>
              <Link
                href="/dashboard"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                My Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 sm:inline-flex"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
              >
                Register
              </Link>

              <Link
                href="/Courses"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Start Learning
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}