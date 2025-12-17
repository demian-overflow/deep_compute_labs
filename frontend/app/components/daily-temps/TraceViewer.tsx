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
    <div className="max-h-[220px] overflow-auto border border-gray-100 p-2 rounded-md">
      <div className="text-xs text-gray-500 mb-1">Trace</div>
      <ol className="pl-3.5 m-0">
        {steps.map((s, i) => (
          <li
            key={i}
            onClick={() => onJump(i)}
            className="cursor-pointer p-1.5"
            style={{ background: i === pos ? "var(--bg-step-active)" : "transparent" }}
          >
            <div className="text-sm">{s.action}</div>
            <div className="text-xs text-gray-500">
              i={s.i} · stack=[{s.stack.join(",")}]
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
