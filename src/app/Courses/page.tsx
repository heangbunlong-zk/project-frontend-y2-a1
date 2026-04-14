"use client";

import { useEffect, useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";

// heroooo
type CourseSummary = {
  id: number;
  title: string;
  level: string;
  track: string;
  mentor: string;
  rating: string;
  learners: string;
  duration: string;
  lessons: string;
  description: string;
};

const quickFilters = [
  "All Paths",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Certificate",
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Paths");
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadCourses = async () => {
      try {
        const response = await fetch("/api/courses", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load courses");
        }

        const data = (await response.json()) as { courses?: CourseSummary[] };

        if (active) {
          setCourses(data.courses ?? []);
        }
      } catch {
        if (active) {
          setCourses([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadCourses();

    return () => {
      active = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    const query = search.toLowerCase().trim();

    return courses.filter((course) => {
      const matchesSearch =
        query.length === 0 ||
        [course.title, course.track, course.description, course.mentor].some(
          (value) => value.toLowerCase().includes(query)
        );

      const matchesFilter =
        activeFilter === "All Paths" ||
        activeFilter === "Certificate" ||
        course.level === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, courses, search]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-4xl bg-slate-900 px-6 py-8 text-white shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                Professional e-learning catalog
              </span>

              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Find the right course to grow your digital skills
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                Explore structured paths, hands-on projects, and mentor-led lessons
                designed to feel like a real learning platform.
              </p>

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Search by course, skill, or mentor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-4 ring-transparent transition focus:ring-cyan-200"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">{courses.length || "4"}</p>
                <p className="mt-1 text-sm text-slate-300">active learning paths</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-sm text-slate-300">learning access</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">4.8/5</p>
                <p className="mt-1 text-sm text-slate-300">average rating</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {loading ? "Loading courses..." : `${filteredCourses.length} learning paths available`}
            </p>
            <p className="text-sm text-slate-500">
              Updated dynamically for March 2026 with beginner-to-advanced tracks.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <div className="col-span-full rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
              Loading course catalog...
            </div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                level={course.level}
                description={course.description}
                track={course.track}
                duration={course.duration}
                lessons={course.lessons}
                mentor={course.mentor}
                rating={course.rating}
                learners={course.learners}
              />
            ))
          ) : (
            <p className="col-span-full rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
              No courses found. Try another keyword.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}