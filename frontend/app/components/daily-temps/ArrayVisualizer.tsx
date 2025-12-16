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
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {temps.map((t, idx) => {
        const isCurrent = idx === currentIndex;
        const inHighlight = highlight.includes(idx);
        const overrideBg = indexColors?.[idx];
        const background =
          overrideBg ??
          (isCurrent ? "#fffae6" : inHighlight ? "#e6f7ff" : "#f6f6f6");
        const border = isCurrent ? "2px solid #ffb020" : "1px solid #ddd";
        return (
          <div
            key={idx}
            style={{
              width: 80,
              padding: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background,
              border,
              borderRadius: 6,
            }}
          >
            <div style={{ fontSize: 12, color: "#666" }}>i={idx}</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{t}</div>
            <div style={{ fontSize: 12, color: "#333" }}>
              res: {result?.[idx] ?? 0}
            </div>
          </div>
        );
      })}
    </div>
  );
}
