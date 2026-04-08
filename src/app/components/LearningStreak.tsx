"use client";

import { useState, useEffect } from "react";

type LearningStreakProps = {
  currentStreak: number;
  className?: string;
};

export default function LearningStreak({
  currentStreak,
  className = ""
}: LearningStreakProps) {
  const [animatedStreak, setAnimatedStreak] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStreak(currentStreak);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentStreak]);

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return "🔥🔥🔥";
    if (streak >= 14) return "🔥🔥";
    if (streak >= 7) return "🔥";
    if (streak >= 3) return "⚡";
    return "🌱";
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "from-orange-400 to-red-500";
    if (streak >= 14) return "from-yellow-400 to-orange-500";
    if (streak >= 7) return "from-orange-400 to-pink-500";
    if (streak >= 3) return "from-blue-400 to-indigo-500";
    return "from-green-400 to-emerald-500";
  };

  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Learning Streak</h3>
        <span className="text-2xl">{getStreakEmoji(animatedStreak)}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br ${getStreakColor(animatedStreak)} text-2xl text-white font-bold shadow-lg`}>
          {animatedStreak}
        </div>

        <div>
          <p className="text-2xl font-bold text-slate-900">{animatedStreak}</p>
          <p className="text-sm text-slate-500">
            {animatedStreak === 1 ? "day" : "days"} in a row
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Keep it up! 🔥
          </p>
        </div>
      </div>

      {/* Streak Calendar Preview */}
      <div className="mt-4">
        <p className="text-xs font-medium text-slate-600 mb-2">This Week</p>
        <div className="flex gap-1">
          {Array.from({ length: 7 }, (_, i) => {
            const dayIndex = i;
            const isActive = dayIndex < animatedStreak && animatedStreak > 0;
            return (
              <div
                key={dayIndex}
                className={`h-6 w-6 rounded-sm ${
                  isActive
                    ? `bg-linear-to-br ${getStreakColor(animatedStreak)}`
                    : "bg-slate-100"
                } flex items-center justify-center text-[10px] text-white font-bold`}
              >
                {isActive ? "✓" : ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}