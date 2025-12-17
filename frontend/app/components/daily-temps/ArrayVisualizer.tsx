"use client";

import React from "react";
import ArrayCell from "./ArrayCell";

type RenderCellArgs = {
  value: unknown;
  index: number;
  isCurrent: boolean;
  inHighlight: boolean;
  result?: unknown;
  overrideBg?: string;
};

export default function ArrayVisualizer({
  // legacy prop `temps` is supported, but `items` is the generic name
  temps,
  items,
  currentIndex = -1,
  highlight = [],
  result = [],
  indexColors,
  renderCell,
}: {
  temps?: unknown[];
  items?: unknown[];
  currentIndex?: number;
  highlight?: number[];
  result?: unknown[];
  indexColors?: Record<number, string>;
  renderCell?: (args: RenderCellArgs) => React.ReactNode;
}) {
  const arr = items ?? temps ?? [];

  return (
    <div className="flex gap-2 flex-wrap">
      {arr.map((t, idx) => {
        const isCurrent = idx === currentIndex;
        const inHighlight = highlight.includes(idx);
        const overrideBg = indexColors?.[idx];

        if (renderCell) {
          return (
            <React.Fragment key={idx}>
              {renderCell({ value: t, index: idx, isCurrent, inHighlight, result: result?.[idx], overrideBg })}
            </React.Fragment>
          );
        }

        return (
          <ArrayCell
            key={idx}
            value={t}
            index={idx}
            isCurrent={isCurrent}
            inHighlight={inHighlight}
            result={result?.[idx]}
            overrideBg={overrideBg}
          />
        );
      })}
    </div>
  );
}
