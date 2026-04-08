"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CourseCard from "../components/CourseCard";
import ProgressChart from "../components/ProgressChart";
import LearningStreak from "../components/LearningStreak";

type DashboardCourse = {
  id: number;
  title: string;
  level: string;
  track: string;
  mentor: string;
  rating: string;
  learners: string;
  progress: number;
  description: string;
  lessons: string;
  duration: string;
};

type DashboardData = {
  user: {
    name: string;
    membership: string;
  };
  myCourses: DashboardCourse[];
  stats: {
    activeCourses: number;
    averageProgress: number;
    lessonsLeft: number;
  };
};

const fallbackDashboardData: DashboardData = {
  user: {
    name: "Student",
    membership: "Pro Student",
  },
  myCourses: [],
  stats: {
    activeCourses: 0,
    averageProgress: 0,
    lessonsLeft: 0,
  },
};

function readStoredName() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = window.localStorage.getItem("elearn-user");

  if (!rawUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(rawUser) as { name?: string };
    return parsedUser.name ?? null;
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] =
    useState<DashboardData>(fallbackDashboardData);
  const [loading, setLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(7); // Mock streak data

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        const response = await fetch("/api/dashboard", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const data = (await response.json()) as DashboardData;
        const storedName = readStoredName();

        if (active) {
          setDashboardData({
            ...data,
            user: {
              ...data.user,
              name: storedName || data.user.name,
            },
          });
        }
      } catch {
        const storedName = readStoredName();

        if (active) {
          setDashboardData({
            ...fallbackDashboardData,
            user: {
              ...fallbackDashboardData.user,
              name: storedName || fallbackDashboardData.user.name,
            },
          });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const StatCard = ({ icon, value, label, color }: { icon: string; value: string | number; label: string; color: string }) => (
    <div className={`rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm ${color}`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-slate-200">{label}</p>
        </div>
      </div>
    </div>
  );

  const AchievementBadge = ({ icon, title, description, earned }: { icon: string; title: string; description: string; earned: boolean }) => (
    <div className={`rounded-xl border p-4 transition-all ${earned ? 'border-yellow-200 bg-yellow-50' : 'border-slate-200 bg-slate-50'}`}>
      <div className="flex items-center gap-3">
        <div className={`text-2xl ${earned ? 'text-yellow-600' : 'text-slate-400'}`}>{icon}</div>
        <div>
          <p className={`font-semibold ${earned ? 'text-slate-900' : 'text-slate-500'}`}>{title}</p>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="overflow-hidden rounded-[32px] bg-linear-to-r from-slate-950 via-indigo-900 to-cyan-600 p-6 text-white shadow-xl md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {dashboardData.user.membership}
                  </span>
                  <span className="text-sm text-slate-300">
                    🔥 {currentStreak} day streak
                  </span>
                </div>
                <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                  Welcome back, {dashboardData.user.name}! 👋
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
                  Track your progress, continue your lessons, and achieve your learning goals.
                  You're doing amazing!
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/Courses"
                    className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    Browse Courses
                  </Link>
                  <button className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                    View Certificates
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <StatCard
                  icon="📚"
                  value={dashboardData.stats.activeCourses}
                  label="Active Courses"
                  color=""
                />
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">📈</div>
                    <div>
                      <p className="text-2xl font-bold">{dashboardData.stats.averageProgress}%</p>
                      <p className="text-sm text-slate-200">Avg Progress</p>
                    </div>
                  </div>
                  <ProgressChart
                    progress={dashboardData.stats.averageProgress}
                    size={60}
                    className="mx-auto"
                  />
                </div>
                <StatCard
                  icon="🎯"
                  value={dashboardData.stats.lessonsLeft}
                  label="Lessons Left"
                  color=""
                />
                <StatCard
                  icon="🏆"
                  value={currentStreak}
                  label="Day Streak"
                  color=""
                />
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-900">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/Courses"
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-indigo-200"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600 group-hover:bg-indigo-200">
                    🔍
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Find Courses</p>
                    <p className="text-sm text-slate-500">Explore new topics</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/certificate"
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-green-200"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2 text-green-600 group-hover:bg-green-200">
                    🏆
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Certificates</p>
                    <p className="text-sm text-slate-500">View achievements</p>
                  </div>
                </div>
              </Link>

              <button className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-600 group-hover:bg-purple-200">
                    📊
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Analytics</p>
                    <p className="text-sm text-slate-500">Track progress</p>
                  </div>
                </div>
              </button>

              <button className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-2 text-orange-600 group-hover:bg-orange-200">
                    👥
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Study Groups</p>
                    <p className="text-sm text-slate-500">Connect with peers</p>
                  </div>
                </div>
              </button>
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-900">Recent Achievements</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AchievementBadge
                icon="🎯"
                title="First Course Started"
                description="You began your learning journey!"
                earned={true}
              />
              <AchievementBadge
                icon="🔥"
                title="7 Day Streak"
                description="Learn consistently for 7 days"
                earned={currentStreak >= 7}
              />
              <AchievementBadge
                icon="⭐"
                title="Course Completed"
                description="Finish your first course"
                earned={dashboardData.stats.averageProgress === 100}
              />
            </div>
          </section>

          {/* Active Courses */}
          <section>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600">Continue learning</p>
                <h2 className="text-2xl font-bold text-slate-900">My Active Courses</h2>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-500">
                  {loading
                    ? "Loading your progress..."
                    : `${dashboardData.myCourses.length} courses in progress`}
                </p>
                <Link
                  href="/Courses"
                  className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Browse More
                </Link>
              </div>
            </div>

            {dashboardData.myCourses.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                <div className="text-6xl">📚</div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">No active courses yet</h3>
                <p className="mt-2 text-slate-500">Start your learning journey by enrolling in a course.</p>
                <Link
                  href="/Courses"
                  className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Explore Courses
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {dashboardData.myCourses.map((course) => (
                  <div key={course.id} className="space-y-4">
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
                      ctaLabel="Continue Learning"
                    />

                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-slate-700">Progress</span>
                        <span className="font-bold text-indigo-600">{course.progress}%</span>
                      </div>

                      <div className="h-3 rounded-full bg-slate-100 mb-3">
                        <div
                          className="h-3 rounded-full bg-linear-to-r from-cyan-500 to-indigo-600 transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>{course.lessons} remaining</span>
                        <span>{course.duration} left</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Learning Insights */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-900">Learning Insights</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <LearningStreak currentStreak={currentStreak} />

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">Weekly Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Mon</span>
                    <span className="font-semibold text-slate-900">2h 30m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tue</span>
                    <span className="font-semibold text-slate-900">1h 45m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Wed</span>
                    <span className="font-semibold text-slate-900">3h 15m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Thu</span>
                    <span className="font-semibold text-slate-900">2h 00m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Fri</span>
                    <span className="font-semibold text-slate-900">1h 30m</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">Recommended Next</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium text-slate-900">Complete React Hooks</p>
                      <p className="text-sm text-slate-500">Next in your learning path</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-medium text-slate-900">Advanced JavaScript</p>
                      <p className="text-sm text-slate-500">Based on your interests</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <div>
                      <p className="font-medium text-slate-900">UI/UX Design Principles</p>
                      <p className="text-sm text-slate-500">Popular in your field</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}