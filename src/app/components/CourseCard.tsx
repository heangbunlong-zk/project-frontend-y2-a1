"use client";

import { useRouter } from "next/navigation";

type CourseCardProps = {
  id?: number;
  title: string;
  level: string;
  description?: string;
  track?: string;
  duration?: string;
  lessons?: string;
  mentor?: string;
  rating?: string;
  learners?: string;
  ctaLabel?: string;
};

const levelThemes = {
  Beginner: {
    banner: "from-cyan-500 via-sky-500 to-indigo-600",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "🚀",
  },
  Intermediate: {
    banner: "from-violet-500 via-fuchsia-500 to-indigo-600",
    badge: "bg-amber-100 text-amber-700",
    icon: "⚡",
  },
  Advanced: {
    banner: "from-slate-800 via-indigo-800 to-cyan-600",
    badge: "bg-rose-100 text-rose-700",
    icon: "🧠",
  },
} as const;

export default function CourseCard({
  id,
  title,
  level,
  description,
  track,
  duration,
  lessons,
  mentor,
  rating,
  learners,
  ctaLabel,
}: CourseCardProps) {
  const router = useRouter();
  const theme =
    levelThemes[level as keyof typeof levelThemes] ?? levelThemes.Beginner;

  const summary =
    description ||
    "Build real skills with guided lessons, simple explanations, and hands-on practice.";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(79,70,229,0.15)]">
      <div
        className={`relative h-48 overflow-hidden bg-linear-to-br ${theme.banner} p-4`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_30%)]" />
        <div className="absolute -right-6 top-4 h-24 w-24 rounded-full bg-white/15 blur-2xl" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {track || "Learning Path"}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white">
            {rating || "4.8 ★"}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 rounded-[20px] border border-white/15 bg-slate-950/20 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                Featured Instructor
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {mentor || "Expert Mentor Series"}
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 px-3 py-2 text-3xl shadow-sm">
              {theme.icon}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.badge}`}
          >
            {level}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {learners || "1.2k learners"}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-bold leading-snug text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-slate-50 px-3 py-2">
            <p className="text-xs font-semibold text-slate-500">Lessons</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {lessons || "12 guided lessons"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-3 py-2">
            <p className="text-xs font-semibold text-slate-500">Duration</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {duration || "4 weeks"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
            Certificate
          </span>
          <span>🧩 Projects included</span>
          <span>📱 Mobile friendly</span>
        </div>

        <button
          onClick={() => router.push(id ? `/Courses/${id}` : "/Courses")}
          className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          {ctaLabel || "Explore Course"}
        </button>
      </div>
    </article>
  );
}