"use client";

import React from "react";

export default function ResultView({ result }: { result: number[] }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>Result</div>
      <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {result.map((r, idx) => (
          <div
            key={idx}
            style={{
              width: 56,
              padding: 8,
              background: "#fafafa",
              border: "1px solid #eee",
              borderRadius: 6,
              textAlign: "center",
            }}
          >
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}
