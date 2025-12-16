"use client";

import React from "react";
import type { Step } from "../../utils/buildNextWarmerTrace";

export default function TraceViewer({
  steps,
  pos,
  onJump,
}: {
  steps: Step[];
  pos: number;
  onJump: (i: number) => void;
}) {
  return (
    <div
      style={{
        maxHeight: 220,
        overflow: "auto",
        border: "1px solid #eee",
        padding: 8,
        borderRadius: 6,
      }}
    >
      <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>Trace</div>
      <ol style={{ paddingLeft: 14, margin: 0 }}>
        {steps.map((s, i) => (
          <li
            key={i}
            onClick={() => onJump(i)}
            style={{
              cursor: "pointer",
              padding: "6px",
              background: i === pos ? "#f0f8ff" : "transparent",
            }}
          >
            <div style={{ fontSize: 13 }}>{s.action}</div>
            <div style={{ fontSize: 11, color: "#666" }}>
              i={s.i} · stack=[{s.stack.join(",")}]
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
