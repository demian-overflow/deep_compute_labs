export type Step = {
  i: number
  stack: number[]
  result: number[]
  action?: string
  codeLine?: number
  activeIndices?: number[]
}

export function buildNextWarmerTrace(arr: number[]): Step[] {
  const n = arr.length
  const res = new Array(n).fill(0)
  const stack: number[] = []
  const trace: Step[] = []

  for (let i = 0; i < n; i++) {
    // consider (line 0)
    trace.push({ i, stack: [...stack], result: [...res], action: `consider ${arr[i]}`, codeLine: 0, activeIndices: [i] })

    // before while (line 1)
    const top = stack[stack.length - 1]
    trace.push({ i, stack: [...stack], result: [...res], action: `check while`, codeLine: 1, activeIndices: stack.length ? [i, top] : [i] })

    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      const prev = stack.pop() as number
      // after pop (line 2)
      trace.push({ i, stack: [...stack], result: [...res], action: `pop ${prev}`, codeLine: 2, activeIndices: [prev] })

      res[prev] = i - prev
      // after set result (line 3)
      trace.push({ i, stack: [...stack], result: [...res], action: `set res[${prev}] = ${res[prev]}`, codeLine: 3, activeIndices: [prev, i] })
    }

    stack.push(i)
    // push (line 4)
    trace.push({ i, stack: [...stack], result: [...res], action: `push ${i}`, codeLine: 4, activeIndices: [i] })
  }

  // done (line 5)
  trace.push({ i: n, stack: [...stack], result: [...res], action: `done`, codeLine: 5, activeIndices: [] })
  return trace
}
