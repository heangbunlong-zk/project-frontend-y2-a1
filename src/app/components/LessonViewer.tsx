type LessonViewerProps = {
  lessonTitle?: string;
  lessonSummary?: string;
};

export default function LessonViewer({
  lessonTitle = "Lesson Content",
  lessonSummary = "Watch the lesson, review the notes, and complete the quick exercise to continue.",
}: LessonViewerProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Current lesson</p>
          <h2 className="text-2xl font-bold text-slate-900">{lessonTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {lessonSummary}
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          In progress
        </span>
      </div>

      <div className="mt-5 flex aspect-video w-full items-center justify-center rounded-2xl bg-slate-950 text-white">
        <div className="text-center">
          <p className="text-4xl">▶</p>
          <p className="mt-2 text-sm text-slate-300">Video / PDF learning area</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">📌 Key concepts explained clearly</div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">🧩 Practice task included</div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">✅ Mark complete when finished</div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Mark as Complete
        </button>
        <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Download Notes
        </button>
      </div>
    </div>
  );
}