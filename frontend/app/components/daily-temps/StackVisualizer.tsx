"use client";

import React from "react";

export default function StackVisualizer({
  stack,
  temps,
}: {
  stack: number[];
  temps: number[];
}) {
  return (
    <div>
      <div className="mb-2">
        <strong>Stack (top at right)</strong>
      </div>
      <div className="min-h-[120px] flex gap-2 items-center flex-wrap">
        {stack.map((s) => (
          <div
            key={s}
            className="px-2.5 py-2 bg-white border border-gray-200 rounded-md"
          >
            <div className="text-xs text-gray-500">i={s}</div>
            <div className="font-semibold">{temps[s]}</div>
          </div>
        ))}
        {stack.length === 0 && <div className="text-gray-500">— empty —</div>}
      </div>
    </div>
  );
}
