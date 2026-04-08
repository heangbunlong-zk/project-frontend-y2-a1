"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/Courses", label: "Courses", icon: "📚" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/certificate", label: "Certificates", icon: "🏆" },
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
    window.localStorage.removeItem("elearn-token");
    setUser(null);
    window.dispatchEvent(new Event("elearn-auth-changed"));
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/Courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 pl-10 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </div>
            </form>

            {/* Navigation Links */}
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                {/* Notifications */}
                <button className="relative hidden rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 md:flex">
                  🔔
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                    2
                  </span>
                </button>

                {/* User Menu */}
                <div className="hidden items-center gap-3 md:flex">
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                    <div className="h-6 w-6 rounded-full bg-linear-to-br from-indigo-500 to-cyan-500 text-xs text-white flex items-center justify-center font-semibold">
                      {firstName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-700">Hi, {firstName}</span>
                  </div>

                  <Link
                    href="/dashboard"
                    className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
                >
                  ☰
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 sm:inline-flex"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
                >
                  Register
                </Link>

                <Link
                  href="/Courses"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 shadow-lg md:hidden">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 pl-10 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </div>
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive(link.href)
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile User Actions */}
            {isSignedIn && (
              <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-indigo-500 to-cyan-500 text-sm text-white flex items-center justify-center font-semibold">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Hi, {firstName}</p>
                    <p className="text-sm text-slate-500">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setShowMobileMenu(false)}
                    className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setShowMobileMenu(false);
                    }}
                    className="block w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}