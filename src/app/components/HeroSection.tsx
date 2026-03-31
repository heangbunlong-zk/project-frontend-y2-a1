"use client";

import { useEffect, useState } from "react";

type HeroData = {
  banner: {
    badge: string;
    title: string;
    description: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  featuredCourses?: Array<{
    id: number;
    title: string;
    lessons: string;
  }>;
};

const defaultHeroData: HeroData = {
  banner: {
    badge: "Professional e-learning experience",
    title: "Learn front-end and web development with clear, guided lessons",
    description:
      "Study with structured paths, real projects, and dashboard tracking that feels like a modern learning platform.",
  },
  stats: [
    { value: "120+", label: "video lessons" },
    { value: "24+", label: "hands-on projects" },
    { value: "4.8/5", label: "student rating" },
  ],
  featuredCourses: [
    { id: 2, title: "React Development", lessons: "18 lessons" },
    { id: 1, title: "C++ Basics", lessons: "14 lessons" },
  ],
};

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>(defaultHeroData);

  useEffect(() => {
    let active = true;

    const loadHeroData = async () => {
      try {
        const response = await fetch("/api/platform", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as HeroData;

        if (active) {
          setHeroData(data);
        }
      } catch {
        // Keep fallback hero data when the API is unavailable.
      }
    };

    void loadHeroData();

    return () => {
      active = false;
    };
  }, []);

  const featuredCourses =
    heroData.featuredCourses ?? defaultHeroData.featuredCourses ?? [];

  return (
    <section className="bg-[linear-gradient(180deg,#eef6ff_0%,#f8fafc_100%)] py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            {heroData.banner.badge}
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            {heroData.banner.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            {heroData.banner.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/Courses"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Start Learning
            </a>

            <a
              href="/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Open Dashboard
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
            {heroData.stats.map((item) => (
              <div key={`${item.value}-${item.label}`}>
                <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="rounded-[24px] bg-slate-900 p-5 text-white">
            <p className="text-sm text-cyan-100">Weekly learning plan</p>
            <h2 className="mt-2 text-2xl font-bold">Stay on track</h2>

            <div className="mt-5 space-y-3">
              {featuredCourses.slice(0, 2).map((course, index) => (
                <div key={course.id} className="rounded-2xl bg-white/10 p-3">
                  <p className="text-sm font-semibold">{course.title}</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Lesson {index + 6} • {course.lessons}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-linear-to-r from-cyan-500 to-indigo-600 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/80">
                Certificate ready
              </p>
              <p className="mt-1 text-sm font-semibold">
                Finish your next module to unlock a shareable certificate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}