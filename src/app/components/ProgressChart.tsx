"use client";

import { useEffect, useRef } from "react";

type ProgressChartProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export default function ProgressChart({
  progress,
  size = 120,
  strokeWidth = 8,
  className = ""
}: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size - strokeWidth) / 2;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#f1f5f9"; // slate-100
    ctx.lineWidth = strokeWidth;
    ctx.stroke();

    // Progress arc
    const startAngle = -Math.PI / 2; // Start from top
    const endAngle = startAngle + (progress / 100) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = progress >= 100 ? "#10b981" : "#3b82f6"; // green-500 or blue-500
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Center text
    ctx.fillStyle = "#1e293b"; // slate-800
    ctx.font = `bold ${size * 0.15}px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${progress}%`, centerX, centerY - size * 0.05);

    ctx.fillStyle = "#64748b"; // slate-500
    ctx.font = `${size * 0.08}px system-ui`;
    ctx.fillText("Complete", centerX, centerY + size * 0.08);
  }, [progress, size, strokeWidth]);

  return (
    <div className={`inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="block"
      />
    </div>
  );
}