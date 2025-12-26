"use client";

import React from "react";

export type ValueTileProps = {
  color?: string;
  valueType?: "number" | "percent" | "text";
  value: string | number;
  index?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function ValueTile({
  color,
  valueType = "number",
  value,
  index,
  className = "",
  style,
}: ValueTileProps) {
  const formatValue = () => {
    if (valueType === "percent") {
      const v = typeof value === "number" ? value : Number(value);
      return Number.isFinite(v) ? `${(v * 100).toFixed(1)}%` : String(value);
    }
    if (valueType === "number") {
      return typeof value === "number" ? value.toLocaleString() : String(value);
    }
    return String(value);
  };

  const display = formatValue();
  const background = color ?? "var(--bg-muted)";

  return (
    <div
      className={`min-w-[56px] px-4 py-2 flex flex-row items-center justify-between border-l border-black first:border-l-0 ${className}`}
      style={{ background, ...style }}
      data-testid={`value-tile-${index ?? "na"}`}
      role="group"
      aria-label={`Value tile ${index ?? ""}`}
    >
      {index !== undefined && <div className="text-xs text-gray-500 mr-3">i={index}</div>}
      <div className="text-xl font-semibold text-left">{display}</div>
    </div>
  );
}
