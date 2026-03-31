"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type PlatformData = {
  brand: {
    name: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  resources: string[];
  contact: {
    email: string;
    phone: string;
    hours: string;
  };
  footerNote: string;
};

const defaultPlatformData: PlatformData = {
  brand: {
    name: "E-Learn",
  },
  stats: [
    { value: "120+", label: "Lessons" },
    { value: "Expert", label: "Mentors" },
    { value: "Certificates", label: "Available" },
  ],
  resources: ["Learning Paths", "Certificates", "Student Support"],
  contact: {
    email: "support@elearn.com",
    phone: "+20 100 123 4567",
    hours: "Sun - Thu, 9:00 AM - 6:00 PM",
  },
  footerNote: "Built for a clean, modern, and professional learning experience.",
};

export default function Footer() {
  const [platform, setPlatform] = useState<PlatformData>(defaultPlatformData);

  useEffect(() => {
    let active = true;

    const loadPlatformData = async () => {
      try {
        const response = await fetch("/api/platform", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as PlatformData;

        if (active) {
          setPlatform(data);
        }
      } catch {
        // Keep fallback footer content when the API is unavailable.
      }
    };

    void loadPlatformData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <footer className="mt-auto bg-slate-950 text-slate-300">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-300">
              Ready to grow your skills?
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              Start learning with a more professional e-learning experience
            </h2>
          </div>

          <Link
            href="/Courses"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Explore Courses
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{platform.brand.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              A modern platform for learning programming, front-end development,
              and practical digital skills through guided lessons and projects.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {platform.stats.map((item) => (
                <span
                  key={`${item.value}-${item.label}`}
                  className="rounded-full bg-white/10 px-3 py-1 text-slate-200"
                >
                  {item.value} {item.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Platform
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Courses" className="transition hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {platform.resources.map((item) => (
                <li key={item}>
                  <span className="transition hover:text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Contact
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>{platform.contact.email}</p>
              <p>{platform.contact.phone}</p>
              <p>{platform.contact.hours}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {platform.brand.name}. All rights reserved.</p>
          <p>{platform.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}