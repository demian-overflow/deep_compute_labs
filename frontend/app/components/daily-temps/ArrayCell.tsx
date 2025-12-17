"use client";

import React from "react";

type Props = {
  value: React.ReactNode;
  index: number;
  isCurrent?: boolean;
  inHighlight?: boolean;
  overrideBg?: string;
  result?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function ArrayCell({
  value,
  index,
  isCurrent = false,
  inHighlight = false,
  overrideBg,
  result,
  className = "",
  style,
}: Props) {
  const background =
    overrideBg ?? (isCurrent ? "var(--bg-current)" : inHighlight ? "var(--bg-highlight)" : "var(--bg-muted)");
  const border = isCurrent ? "2px solid var(--accent)" : "1px solid var(--border-muted)";

  return (
    <div
      className={`w-20 p-2 flex flex-col items-center rounded-md ${className}`}
      style={{ background, border, ...style }}
      data-testid={`array-cell-${index}`}
    >
      <div className="text-xs text-gray-500">i={index}</div>
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-gray-800">res: {result ?? 0}</div>
    </div>
  );
}
