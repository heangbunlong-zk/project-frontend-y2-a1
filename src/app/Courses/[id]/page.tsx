"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CourseDetail = {
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
  outcomes: string[];
  curriculum: string[];
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = Number(params.id);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    let active = true;

    const loadCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          if (active) {
            setCourse(null);
          }
          return;
        }

        const data = (await response.json()) as { course?: CourseDetail };

        if (active) {
          setCourse(data.course ?? null);
        }
      } catch {
        if (active) {
          setCourse(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadCourse();

    return () => {
      active = false;
    };
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Loading course...</h1>
          <p className="mt-2 text-sm text-slate-500">
            Fetching the latest course details for you.
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Course not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            The course you are looking for is not available right now.
          </p>
          <button
            onClick={() => router.push("/Courses")}
            className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-4xl bg-linear-to-r from-slate-950 via-indigo-900 to-cyan-600 p-6 text-white shadow-xl md:p-8">
          <button
            onClick={() => router.push("/Courses")}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            ← Back to courses
          </button>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {course.level}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {course.track}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {course.rating}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                {course.title}
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-100 md:text-base">
                {course.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold">{course.lessons}</p>
                  <p className="mt-1 text-sm text-slate-200">structured content</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold">{course.duration}</p>
                  <p className="mt-1 text-sm text-slate-200">estimated duration</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold">{course.learners}</p>
                  <p className="mt-1 text-sm text-slate-200">active learners</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/20 p-5 backdrop-blur-md">
              <p className="text-sm font-semibold text-cyan-100">Course overview</p>
              <div className="mt-4 space-y-3 text-sm text-slate-100">
                <p>
                  <span className="font-semibold">Instructor:</span> {course.mentor}
                </p>
                <p>
                  <span className="font-semibold">Track:</span> {course.track}
                </p>
                <p>
                  <span className="font-semibold">Includes:</span> lessons, practice
                  tasks, and certificate
                </p>
              </div>

              <button
                onClick={() => router.push(`/dashboard/${course.id}`)}
                className="mt-5 w-full rounded-xl bg-white py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Start Learning Now
              </button>

              <button
                onClick={() => router.push("/Courses")}
                className="mt-3 w-full rounded-xl border border-white/20 bg-transparent py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse More Courses
              </button>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">What you will learn</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700"
                  >
                    <span className="mr-2 font-semibold text-indigo-600">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Curriculum preview</h2>
              <div className="mt-4 space-y-3">
                {course.curriculum.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Module {index + 1}</p>
                      <p className="mt-1 text-sm text-slate-600">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-indigo-600">Instructor</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
                  {course.mentor.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{course.mentor}</p>
                  <p className="text-sm text-slate-500">Senior Mentor • {course.track}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-indigo-600">Why this course</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• Clear, step-by-step explanations</li>
                <li>• Real practice tasks and projects</li>
                <li>• Beginner-friendly structure with professional polish</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}