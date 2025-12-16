export type Step = {
  i: number;
  stack: number[];
  result: number[];
  action?: string;
  codeLine?: number;
  activeIndices?: number[];
};

export function buildNextWarmerTrace(arr: number[]): Step[] {
  const n = arr.length;
  const res = new Array(n).fill(0);
  const stack: number[] = [];
  const trace: Step[] = [];

  for (let i = 0; i < n; i++) {
    // consider (for loop entry)
    trace.push({
      i,
      stack: [...stack],
      result: [...res],
      action: `consider ${arr[i]}`,
      codeLine: 0,
      codeBlock: "for",
      activeIndices: [i],
    });

    // before while (while-check)
    const top = stack[stack.length - 1];
    trace.push({
      i,
      stack: [...stack],
      result: [...res],
      action: `check while`,
      codeLine: 1,
      codeBlock: "while",
      activeIndices: stack.length ? [i, top] : [i],
    });

    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      const prev = stack.pop() as number;
      // after pop (while body)
      trace.push({
        i,
        stack: [...stack],
        result: [...res],
        action: `pop ${prev}`,
        codeLine: 2,
        codeBlock: "while",
        activeIndices: [prev],
      });

      res[prev] = i - prev;
      // after set result (while body)
      trace.push({
        i,
        stack: [...stack],
        result: [...res],
        action: `set res[${prev}] = ${res[prev]}`,
        codeLine: 3,
        codeBlock: "while",
        activeIndices: [prev, i],
      });
    }

    stack.push(i);
    // push (for loop)
    trace.push({
      i,
      stack: [...stack],
      result: [...res],
      action: `push ${i}`,
      codeLine: 4,
      codeBlock: "for",
      activeIndices: [i],
    });
  }

  // done (final)
  trace.push({
    i: n,
    stack: [...stack],
    result: [...res],
    action: `done`,
    codeLine: 5,
    codeBlock: "done",
    activeIndices: [],
  });
  return trace;
}
