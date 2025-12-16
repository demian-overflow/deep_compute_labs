"use client"

import React from 'react'

const lines = [
  'for i in 0..n-1:',
  '  while stack and arr[i] > arr[stack.top]:',
  '    prev = stack.pop()',
  '    res[prev] = i - prev',
  '  stack.push(i)',
  'return res',
]

export default function PseudocodeView({ highlight = -1, highlightColor = '#f59e0b' }: { highlight?: number, highlightColor?: string }) {
  return (
    <pre style={{background:'#fff',border:'1px solid #eee',padding:12,borderRadius:6}}>
      {lines.map((l, idx) => {
        const is = idx === highlight
        return (
          <div
            key={idx}
            style={{
              padding: '2px 0',
              borderLeft: is ? `4px solid ${highlightColor}` : '4px solid transparent',
              paddingLeft: 8,
            }}
          >
            <code style={{fontSize:13}}>{l}</code>
          </div>
        )
      })}
    </pre>
  )
}
