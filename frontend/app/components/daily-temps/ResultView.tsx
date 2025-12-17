"use client";

import React from "react";

export default function ResultView({ result }: { result: number[] }) {
  return (
    <div>
      <div className="text-sm font-semibold">Result</div>
      <div className="mt-2 flex gap-2 flex-wrap">
        {result.map((r, idx) => (
          <div
            key={idx}
            className="w-14 p-2 bg-gray-50 border border-gray-100 rounded-md text-center"
          >
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}
