"use client";

import React from "react";

export default function PlayControls({
  pos,
  len,
  running,
  speed,
  onStepForward,
  onStepBack,
  onTogglePlay,
  onSpeedChange,
}: {
  pos: number;
  len: number;
  running: boolean;
  speed: number;
  onStepForward: () => void;
  onStepBack: () => void;
  onTogglePlay: () => void;
  onSpeedChange: (s: number) => void;
}) {
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={onStepBack}
        disabled={pos <= 0}
        className="px-2.5 py-1.5"
      >
        ◀ Step
      </button>
      <button
        onClick={onStepForward}
        disabled={pos >= len - 1}
        className="px-2.5 py-1.5"
      >
        Step ▶
      </button>
      <button onClick={onTogglePlay} className="px-2.5 py-1.5">
        {running ? "Pause" : "Play"}
      </button>
      <label className="ml-2 text-sm text-gray-700">
        Step {pos + 1} / {Math.max(1, len)}
      </label>
      <label className="ml-2 text-sm">Speed</label>
      <select
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="p-1.5"
      >
        <option value={1000}>Slow</option>
        <option value={600}>Normal</option>
        <option value={250}>Fast</option>
      </select>
    </div>
  );
}
