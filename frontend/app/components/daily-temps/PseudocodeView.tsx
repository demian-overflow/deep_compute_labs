"use client";

import React from "react";

const lines = [
  "for i in 0..n-1:",
  "  while stack and arr[i] > arr[stack.top]:",
  "    prev = stack.pop()",
  "    res[prev] = i - prev",
  "  stack.push(i)",
  "return res",
];

// map each line to a block id
const lineBlocks: (string | null)[] = [
  "for",
  "while",
  "while",
  "while",
  "for",
  "done",
];

export default function PseudocodeView({
  highlightBlock,
  highlightColorMap,
}: {
  highlightBlock?: string;
  highlightColorMap?: Record<string, string>;
}) {
  return (
    <pre
      style={{
        background: "#fff",
        border: "1px solid #eee",
        padding: 12,
        borderRadius: 6,
      }}
    >
      {lines.map((l, idx) => {
        const block = lineBlocks[idx];
        const is = block && block === highlightBlock;
        const color =
          block && highlightColorMap ? highlightColorMap[block] : undefined;
        return (
          <div
            key={idx}
            style={{
              padding: "2px 0",
              borderLeft: is
                ? `4px solid ${color ?? "#f59e0b"}`
                : "4px solid transparent",
              paddingLeft: 8,
            }}
          >
            <code style={{ fontSize: 13 }}>{l}</code>
          </div>
        );
      })}
    </pre>
  );
}
