"use client";

import React, { useEffect, useRef, useState } from "react";

import type { Step } from "../utils/buildNextWarmerTrace";
import { buildNextWarmerTrace } from "../utils/buildNextWarmerTrace";
import {
  InputEditor,
  ArrayVisualizer,
  StackVisualizer,
  TraceViewer,
  PseudocodeView,
  PlayControls,
  ResultView,
  MetricsPanel,
} from "./daily-temps";
import { usePlayTimer } from "../hooks/usePlayTimer";

export default function DailyTempsVisualizer() {
  const [input, setInput] = useState("73,74,75,71,69,72,76,73");
  const [temps, setTemps] = useState<number[]>([
    73, 74, 75, 71, 69, 72, 76, 73,
  ]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [pos, setPos] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(600);

  useEffect(() => {
    return () => {
      setRunning(false);
    };
  }, []);

  function parseInput(s: string) {
    const arr = s
      .split(/[,\s]+/)
      .map((x) => parseInt(x, 10))
      .filter((x) => !Number.isNaN(x));
    return arr;
  }

  // moved to utils/buildNextWarmerTrace

  function handleRun() {
    const arr = parseInput(input);
    setTemps(arr);
    const s = buildNextWarmerTrace(arr);
    setSteps(s);
    setPos(0);
  }

  function stepForward() {
    setPos((p) => Math.min((steps.length || 1) - 1, p + 1));
  }

  function stepBack() {
    setPos((p) => Math.max(0, p - 1));
  }

  function reset() {
    setPos(0);
    setRunning(false);
  }

  function playToggle() {
    setRunning((r) => !r);
  }

  usePlayTimer(
    running,
    () => {
      setPos((p) => {
        if (p >= (steps.length || 1) - 1) {
          setRunning(false);
          return p;
        }
        return p + 1;
      });
    },
    speed,
  );

  const cur = steps[pos] || {
    i: 0,
    stack: [],
    result: new Array(temps.length).fill(0),
    action: "none",
  };
  // block palette (colors per block id)
  const blockPalette: Record<string, string> = {
    for: "#9a5727ff",
    while: "#60a5fa",
    done: "#a78bfa",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const block = (cur as any).codeBlock as string | undefined; // ignore @typescript-eslint/no-explicit-any
  const blockColor = block ? blockPalette[block] : undefined;
  const indexColors =
    cur.activeIndices && blockColor
      ? (Object.fromEntries(
          cur.activeIndices.map((idx: number) => [idx, blockColor]),
        ) as Record<number, string>)
      : undefined;

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <InputEditor
          input={input}
          onChange={setInput}
          onBuild={handleRun}
          onReset={reset}
          presets={[{ name: "Example", value: "73,74,75,71,69,72,76,73" }]}
        />
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* left: code */}
        <div style={{ width: 660 }}>
          <PseudocodeView
            highlightBlock={block}
            highlightColorMap={blockPalette}
          />
        </div>

        {/* right: visuals */}
        <div style={{ flex: 1 }}>
          <ArrayVisualizer
            temps={temps}
            currentIndex={cur.i}
            highlight={cur.stack}
            result={cur.result}
            indexColors={indexColors}
          />

          <div
            style={{
              marginTop: 14,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <PlayControls
              pos={pos}
              len={Math.max(1, steps.length)}
              running={running}
              speed={speed}
              onStepForward={stepForward}
              onStepBack={stepBack}
              onTogglePlay={playToggle}
              onSpeedChange={setSpeed}
            />
          </div>

          <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
            <div
              style={{
                width: 260,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <StackVisualizer stack={cur.stack} temps={temps} />
              <ResultView result={cur.result} />
              <MetricsPanel steps={steps} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
