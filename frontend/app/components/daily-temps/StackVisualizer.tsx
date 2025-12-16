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
      <div style={{ marginBottom: 8 }}>
        <strong>Stack (top at right)</strong>
      </div>
      <div
        style={{
          minHeight: 120,
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {stack.map((s) => (
          <div
            key={s}
            style={{
              padding: "8px 10px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: 6,
            }}
          >
            <div style={{ fontSize: 12, color: "#666" }}>i={s}</div>
            <div style={{ fontWeight: 600 }}>{temps[s]}</div>
          </div>
        ))}
        {stack.length === 0 && <div style={{ color: "#888" }}>— empty —</div>}
      </div>
    </div>
  );
}
