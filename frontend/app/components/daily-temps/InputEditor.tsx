"use client"

import React from 'react'

type Preset = { name: string; value: string }

export default function InputEditor({
  input,
  onChange,
  onBuild,
  onReset,
  presets = [],
}: {
  input: string
  onChange: (s: string) => void
  onBuild: () => void
  onReset: () => void
  presets?: Preset[]
}) {
  return (
    <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
      <input aria-label="temperatures" value={input} onChange={e => onChange(e.target.value)} style={{flex:1,padding:8,fontSize:14}} />
      <button onClick={onBuild} style={{padding:'8px 12px'}}>Build</button>
      <button onClick={onReset} style={{padding:'8px 12px'}}>Reset</button>
      {presets.length > 0 && (
        <select onChange={e => onChange(e.target.value)} style={{padding:8}} defaultValue="">
          <option value="">Presets</option>
          {presets.map(p => <option key={p.name} value={p.value}>{p.name}</option>)}
        </select>
      )}
    </div>
  )
}
