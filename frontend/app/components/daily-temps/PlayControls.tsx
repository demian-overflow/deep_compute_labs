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
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button
        onClick={onStepBack}
        disabled={pos <= 0}
        style={{ padding: "6px 10px" }}
      >
        ◀ Step
      </button>
      <button
        onClick={onStepForward}
        disabled={pos >= len - 1}
        style={{ padding: "6px 10px" }}
      >
        Step ▶
      </button>
      <button onClick={onTogglePlay} style={{ padding: "6px 10px" }}>
        {running ? "Pause" : "Play"}
      </button>
      <label style={{ marginLeft: 8, fontSize: 13, color: "#444" }}>
        Step {pos + 1} / {Math.max(1, len)}
      </label>
      <label style={{ marginLeft: 8, fontSize: 13 }}>Speed</label>
      <select
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        style={{ padding: 6 }}
      >
        <option value={1000}>Slow</option>
        <option value={600}>Normal</option>
        <option value={250}>Fast</option>
      </select>
    </div>
  );
}
