"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import SideBar from "../../components/SideBar";
import LessonViewer from "../../components/LessonViewer";

type LessonItem = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  summary: string;
};

const courseTitles: Record<string, string> = {
  "1": "C++ Basics",
  "2": "React Development",
  "3": "Advanced Web Development",
};

const lessonsByCourse: Record<string, LessonItem[]> = {
  "1": [
    {
      id: 1,
      title: "Introduction",
      duration: "6 min",
      completed: true,
      summary: "Understand the course structure and set up your first C++ environment.",
    },
    {
      id: 2,
      title: "Variables",
      duration: "10 min",
      completed: true,
      summary: "Learn how variables work and how to store values in clean, readable code.",
    },
    {
      id: 3,
      title: "Loops",
      duration: "12 min",
      completed: false,
      summary: "Practice repeating tasks efficiently with loops and simple exercises.",
    },
  ],
  "2": [
    {
      id: 1,
      title: "React Overview",
      duration: "8 min",
      completed: true,
      summary: "See how React powers component-driven interfaces and reusable UI patterns.",
    },
    {
      id: 2,
      title: "Props & State",
      duration: "14 min",
      completed: false,
      summary: "Use props and state to create dynamic, interactive components.",
    },
    {
      id: 3,
      title: "Hooks Practice",
      duration: "16 min",
      completed: false,
      summary: "Apply hooks to manage state and side effects in realistic frontend examples.",
    },
  ],
  "3": [
    {
      id: 1,
      title: "Architecture Review",
      duration: "11 min",
      completed: true,
      summary: "Review scalable project architecture and modern web engineering decisions.",
    },
    {
      id: 2,
      title: "API Integration",
      duration: "15 min",
      completed: false,
      summary: "Connect your app with APIs and understand robust data-flow patterns.",
    },
    {
      id: 3,
      title: "Deployment Strategy",
      duration: "13 min",
      completed: false,
      summary: "Prepare your app for production with deployment and optimization best practices.",
    },
  ],
};

export default function LearningPage() {
  const params = useParams();
  const courseId = (params?.id as string) || "1";
  const courseTitle = courseTitles[courseId] || `Course ${courseId}`;

  const lessons = useMemo(() => {
    return lessonsByCourse[courseId as keyof typeof lessonsByCourse] || lessonsByCourse["1"];
  }, [courseId]);

  const [currentLessonId, setCurrentLessonId] = useState<number>(lessons[0].id);

  const currentLesson =
    lessons.find((lesson) => lesson.id === currentLessonId) || lessons[0];

  const completedCount = lessons.filter((lesson) => lesson.completed).length;
  const progress = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SideBar
        lessons={lessons}
        currentLessonId={currentLessonId}
        onSelectLesson={(id) => setCurrentLessonId(id)}
      />

      <div className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600">Learning classroom</p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900">{courseTitle}</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Continue your lessons and complete the next milestone in your learning path.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                  <p className="font-semibold text-slate-900">{progress}%</p>
                  <p className="text-slate-500">progress</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                  <p className="font-semibold text-slate-900">{completedCount}/{lessons.length}</p>
                  <p className="text-slate-500">completed</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                  <p className="font-semibold text-slate-900">{currentLesson.duration}</p>
                  <p className="text-slate-500">current lesson</p>
                </div>
              </div>
            </div>
          </section>

          <LessonViewer
            lessonTitle={currentLesson.title}
            lessonSummary={currentLesson.summary}
          />
        </div>
      </div>
    </div>
  );
}