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
    <pre className="bg-white border border-gray-100 p-3 rounded-md">
      {lines.map((l, idx) => {
        const block = lineBlocks[idx];
        const is = block && block === highlightBlock;
        const color =
          block && highlightColorMap ? highlightColorMap[block] : undefined;
        return (
          <div
            key={idx}
            className="py-0.5 pl-2 border-l-4"
            style={{ borderLeftColor: is ? color ?? "var(--accent-strong)" : "transparent" }}
          >
            <code className="text-sm">{l}</code>
          </div>
        );
      })}
    </pre>
  );
}
