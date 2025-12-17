"use client";

import React from "react";
import type { Step } from "../../utils/buildNextWarmerTrace";

export default function MetricsPanel({ steps }: { steps: Step[] }) {
  const ops = steps.length;
  const peakStack = steps.reduce((m, s) => Math.max(m, s.stack.length), 0);
  return (
    <div className="border border-gray-100 p-2 rounded-md">
      <div className="text-xs text-gray-500 mb-1">Metrics</div>
      <div className="flex gap-3">
        <div>
          <div className="text-sm font-semibold">{ops}</div>
          <div className="text-xs text-gray-500">ops</div>
        </div>
        <div>
          <div className="text-sm font-semibold">{peakStack}</div>
          <div className="text-xs text-gray-500">peak stack</div>
        </div>
      </div>
    </div>
  );
}
