"use client";

import React from "react";

type Preset = { name: string; value: string };

export default function InputEditor({
  input,
  onChange,
  onBuild,
  onReset,
  presets = [],
}: {
  input: string;
  onChange: (s: string) => void;
  onBuild: () => void;
  onReset: () => void;
  presets?: Preset[];
}) {
  return (
    <div className="flex gap-2 items-center mb-2">
      <input
        aria-label="temperatures"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-2 text-sm"
      />
      <button onClick={onBuild} className="px-3 py-2">
        Build
      </button>
      <button onClick={onReset} className="px-3 py-2">
        Reset
      </button>
      {presets.length > 0 && (
        <select
          onChange={(e) => onChange(e.target.value)}
          className="p-2"
          defaultValue=""
        >
          <option value="">Presets</option>
          {presets.map((p) => (
            <option key={p.name} value={p.value}>
              {p.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
