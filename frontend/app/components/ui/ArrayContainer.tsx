"use client";

import React from "react";
import ValueTile from "./ValueTile";

export type ArrayContainerProps = {
  items: Array<string | number>;
  /** if provided, limits number of visible elements and shows a "+N more" tile */
  maxVisibleElements?: number;
  valueType?: "number" | "percent" | "text";
  /** uniform tile color */
  color?: string;
  /** optional function to compute color per item (overrides `color`) */
  getColor?: (index: number, value: string | number) => string | undefined;
  className?: string;
};

export default function ArrayContainer({
  items,
  maxVisibleElements,
  valueType = "number",
  color,
  getColor,
  className = "",
}: ArrayContainerProps) {
  const n = items.length;

  const renderTile = (v: string | number, i: number) => (
    <ValueTile
      key={i}
      value={v}
      index={i}
      valueType={valueType}
      color={getColor?.(i, v) ?? color}
      className="flex-shrink-0"
    />
  );

  if (!maxVisibleElements || n <= maxVisibleElements) {
    return (
      <div className={`flex gap-0 flex-nowrap items-center overflow-auto divide-x divide-black ${className}`}>
        {items.map((v, idx) => renderTile(v, idx))}
      </div>
    );
  }

  // Reserve one slot for the "+N" indicator
  const reserve = 1;
  const keep = Math.max(1, maxVisibleElements - reserve);
  const headCount = Math.ceil(keep / 2);
  const tailCount = Math.floor(keep / 2);

  const head = items.slice(0, headCount);
  const tail = items.slice(n - tailCount);
  const omitted = n - (headCount + tailCount);

  return (
    <div className={`flex gap-0 flex-nowrap items-center overflow-auto divide-x divide-black ${className}`}>
      {head.map((v, idx) => renderTile(v as any, idx))}

      <div
        className="min-w-[56px] px-4 py-2 flex flex-row items-center justify-center bg-gray-50 text-sm text-gray-700 flex-shrink-0 text-center border-l border-black"
        data-testid="array-container-omitted"
      >
        +{omitted} more
      </div>

      {tail.map((v, idx) => {
        const i = n - tailCount + idx;
        return renderTile(v as any, i);
      })}
    </div>
  );
}
