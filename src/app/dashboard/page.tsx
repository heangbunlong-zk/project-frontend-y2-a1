"use client";

import CourseCard from "../components/CourseCard";

const myCourses = [
  {
    id: 1,
    title: "C++ Basics",
    level: "Beginner",
    track: "Programming",
    mentor: "Sarah Khan",
    rating: "4.8 ★",
    learners: "1.4k learners",
    progress: 40,
    description:
      "Continue learning variables, loops, and functions with guided examples.",
    lessons: "8 lessons left",
    duration: "3 weeks left",
  },
  {
    id: 2,
    title: "React Development",
    level: "Intermediate",
    track: "Frontend",
    mentor: "Daniel Lee",
    rating: "4.9 ★",
    learners: "2.1k learners",
    progress: 70,
    description:
      "Keep building reusable components and interactive UI patterns.",
    lessons: "5 lessons left",
    duration: "2 weeks left",
  },
];

export default function DashboardPage() {
  const userName = "Student";
  const averageProgress = Math.round(
    myCourses.reduce((total, course) => total + course.progress, 0) /
      myCourses.length
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[32px] bg-linear-to-r from-slate-950 via-indigo-900 to-cyan-600 p-6 text-white shadow-xl">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">
                Learning dashboard
              </p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                Welcome back, {userName} 👋
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
                Track your weekly progress, continue your lessons, and stay focused
                on your learning path like a real professional platform.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">{myCourses.length}</p>
                <p className="mt-1 text-sm text-slate-200">active courses</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">{averageProgress}%</p>
                <p className="mt-1 text-sm text-slate-200">average progress</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">13</p>
                <p className="mt-1 text-sm text-slate-200">lessons left</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Continue learning</p>
              <h2 className="text-2xl font-bold text-slate-900">My active courses</h2>
            </div>
            <p className="text-sm text-slate-500">
              Pick up where you left off and finish your weekly goals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {myCourses.map((course) => (
              <div key={course.id} className="space-y-3">
                <CourseCard
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
                  ctaLabel="Continue Course"
                />

                <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">Course progress</span>
                    <span className="font-semibold text-indigo-600">{course.progress}%</span>
                  </div>

                  <div className="mt-3 h-2.5 rounded-full bg-slate-100">
                    <div
                      className="h-2.5 rounded-full bg-linear-to-r from-cyan-500 to-indigo-600"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Keep going — you still have {course.lessons.toLowerCase()}.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}