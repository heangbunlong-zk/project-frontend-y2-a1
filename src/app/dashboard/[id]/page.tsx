"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import LessonViewer from "../../components/LessonViewer";
import SideBar from "../../components/SideBar";

type LessonItem = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  summary: string;
};

const fallbackLesson: LessonItem = {
  id: 1,
  title: "Introduction",
  duration: "5 min",
  completed: false,
  summary: "Loading the lesson content for your selected course.",
};

export default function LearningPage() {
  const params = useParams();
  const courseId = Number((params?.id as string) || "1");
  const [courseTitle, setCourseTitle] = useState("Learning Path");
  const [lessons, setLessons] = useState<LessonItem[]>([fallbackLesson]);
  const [currentLessonId, setCurrentLessonId] = useState<number>(fallbackLesson.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load course lessons");
        }

        const data = (await response.json()) as {
          course?: { title?: string; lessonItems?: LessonItem[] };
        };

        const nextLessons = data.course?.lessonItems?.length
          ? data.course.lessonItems
          : [fallbackLesson];

        if (active) {
          setCourseTitle(data.course?.title || `Course ${courseId}`);
          setLessons(nextLessons);
          setCurrentLessonId(nextLessons[0].id);
        }
      } catch {
        if (active) {
          setCourseTitle(`Course ${courseId}`);
          setLessons([fallbackLesson]);
          setCurrentLessonId(fallbackLesson.id);
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

  const currentLesson = useMemo(() => {
    return lessons.find((lesson) => lesson.id === currentLessonId) || lessons[0];
  }, [currentLessonId, lessons]);

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
                  {loading
                    ? "Loading your latest lesson data..."
                    : "Continue your lessons and complete the next milestone in your learning path."}
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