"use client";

import React, { useState } from "react";

type Lesson = {
  id: number;
  title: string;
  completed: boolean;
  duration?: string;
};

type SideBarProps = {
  lessons: Lesson[];
  currentLessonId: number;
  onSelectLesson: (id: number) => void;
};

export default function SideBar({
  lessons,
  currentLessonId,
  onSelectLesson,
}: SideBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`${
        isOpen ? "w-72" : "w-20"
      } border-r border-slate-800 bg-slate-950 text-white transition-all duration-300`}
    >
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className={isOpen ? "block" : "hidden"}>
            <p className="text-sm font-semibold text-cyan-300">Course lessons</p>
            <h2 className="text-lg font-bold text-white">Learning Path</h2>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg bg-slate-900 p-2 text-sm hover:bg-slate-800"
          >
            {isOpen ? "←" : "→"}
          </button>
        </div>
      </div>

      <nav className="space-y-2 p-4">
        {lessons.map((lesson) => {
          const isActive = lesson.id === currentLessonId;

          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`w-full rounded-2xl px-3 py-3 text-left text-sm transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-200 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {isOpen ? lesson.title : lesson.title[0]}
                  </p>
                  {isOpen && lesson.duration ? (
                    <p className="mt-1 text-xs text-slate-300">{lesson.duration}</p>
                  ) : null}
                </div>

                {lesson.completed && isOpen ? (
                  <span className="text-xs text-emerald-300">✔</span>
                ) : null}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}