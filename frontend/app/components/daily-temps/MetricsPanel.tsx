"use client";

import React from "react";
import type { Step } from "../../utils/buildNextWarmerTrace";

export default function MetricsPanel({ steps }: { steps: Step[] }) {
  const ops = steps.length;
  const peakStack = steps.reduce((m, s) => Math.max(m, s.stack.length), 0);
  return (
    <div style={{ border: "1px solid #eee", padding: 8, borderRadius: 6 }}>
      <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
        Metrics
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{ops}</div>
          <div style={{ fontSize: 12, color: "#666" }}>ops</div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{peakStack}</div>
          <div style={{ fontSize: 12, color: "#666" }}>peak stack</div>
        </div>
      </div>
    </div>
  );
}
