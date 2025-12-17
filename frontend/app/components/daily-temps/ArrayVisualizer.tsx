"use client";

import React from "react";

export default function ArrayVisualizer({
  temps,
  currentIndex = -1,
  highlight = [],
  result = [],
  indexColors,
}: {
  temps: number[];
  currentIndex?: number;
  highlight?: number[];
  result?: number[];
  indexColors?: Record<number, string>;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {temps.map((t, idx) => {
        const isCurrent = idx === currentIndex;
        const inHighlight = highlight.includes(idx);
        const overrideBg = indexColors?.[idx];
        const background =
          overrideBg ??
          (isCurrent
            ? "var(--bg-current)"
            : inHighlight
            ? "var(--bg-highlight)"
            : "var(--bg-muted)");
        const border = isCurrent ? "2px solid var(--accent)" : "1px solid var(--border-muted)";
        return (
          <div
            key={idx}
            className="w-20 p-2 flex flex-col items-center rounded-md"
            style={{ background, border }}
          >
            <div className="text-xs text-gray-500">i={idx}</div>
            <div className="text-xl font-semibold">{t}</div>
            <div className="text-xs text-gray-800">res: {result?.[idx] ?? 0}</div>
          </div>
        );
      })}
    </div>
  );
}
