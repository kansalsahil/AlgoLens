import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ClimbingStairsInput } from '../types';

export const MemoizationSolution: Solution<ClimbingStairsInput, number> = {
  id: 'memoization',
  name: 'Memoization (Top-Down DP)',
  description: 'Top-down dynamic programming with memoization. Cache results of subproblems to avoid redundant calculations. Each subproblem is computed only once.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `function climbStairs(n: number): number {
  const memo: Map<number, number> = new Map();

  function dp(i: number): number {
    // Base cases
    if (i === 1) return 1;
    if (i === 2) return 2;

    // Check memo
    if (memo.has(i)) {
      return memo.get(i)!;
    }

    // Calculate and store in memo
    const result = dp(i - 1) + dp(i - 2);
    memo.set(i, result);
    return result;
  }

  return dp(n);
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  private Map<Integer, Integer> memo = new HashMap<>();      // Line 2
                                                              // Line 3
  public int climbStairs(int n) {                             // Line 4
    return dp(n);                                             // Line 5
  }                                                           // Line 6
                                                              // Line 7
  private int dp(int i) {                                     // Line 8
    // Base cases                                             // Line 9
    if (i == 1) return 1;                                     // Line 10
    if (i == 2) return 2;                                     // Line 11
                                                              // Line 12
    // Check memo                                             // Line 13
    if (memo.containsKey(i)) {                                // Line 14
      return memo.get(i);                                     // Line 15
    }                                                         // Line 16
                                                              // Line 17
    // Calculate and store in memo                            // Line 18
    int result = dp(i - 1) + dp(i - 2);                       // Line 19
    memo.put(i, result);                                      // Line 20
    return result;                                            // Line 21
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  private Dictionary<int, int> memo = new Dictionary<int, int>();  // Line 2
                                                              // Line 3
  public int ClimbStairs(int n) {                             // Line 4
    return Dp(n);                                             // Line 5
  }                                                           // Line 6
                                                              // Line 7
  private int Dp(int i) {                                     // Line 8
    // Base cases                                             // Line 9
    if (i == 1) return 1;                                     // Line 10
    if (i == 2) return 2;                                     // Line 11
                                                              // Line 12
    // Check memo                                             // Line 13
    if (memo.ContainsKey(i)) {                                // Line 14
      return memo[i];                                         // Line 15
    }                                                         // Line 16
                                                              // Line 17
    // Calculate and store in memo                            // Line 18
    int result = Dp(i - 1) + Dp(i - 2);                       // Line 19
    memo[i] = result;                                         // Line 20
    return result;                                            // Line 21
  }
}`,
    },
  ],

  execute: (input: ClimbingStairsInput): SolutionExecution<number> => {
    const { n } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const memo = new Map<number, number>();
    const callStack: Array<{ n: number; depth: number }> = [];

    // Helper function to track memoized recursive calls
    function dpMemo(current: number, depth: number): number {
      callStack.push({ n: current, depth });

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Call dp(${current})`,
        lineNumber: 8,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            currentN: current,
            depth,
            memo: Object.fromEntries(memo),
            memoArray: Array.from(memo.entries()).map(([k, v]) => ({ index: k, value: v })),
            callStack: [...callStack],
            phase: 'checking',
          },
        },
        variables: { n: current, depth },
      });

      // Base cases
      if (current === 1) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Base case: dp(1) = 1`,
          lineNumber: 10,
          visualizationData: {
            arrays: [],
            custom: {
              n,
              currentN: current,
              depth,
              memo: Object.fromEntries(memo),
              memoArray: Array.from(memo.entries()).map(([k, v]) => ({ index: k, value: v })),
              callStack: [...callStack],
              phase: 'base_case',
              result: 1,
            },
          },
          variables: { result: 1 },
        });
        callStack.pop();
        return 1;
      }

      if (current === 2) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Base case: dp(2) = 2`,
          lineNumber: 11,
          visualizationData: {
            arrays: [],
            custom: {
              n,
              currentN: current,
              depth,
              memo: Object.fromEntries(memo),
              memoArray: Array.from(memo.entries()).map(([k, v]) => ({ index: k, value: v })),
              callStack: [...callStack],
              phase: 'base_case',
              result: 2,
            },
          },
          variables: { result: 2 },
        });
        callStack.pop();
        return 2;
      }

      // Check memo
      if (memo.has(current)) {
        const cached = memo.get(current)!;
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Cache hit! dp(${current}) = ${cached} (retrieved from memo)`,
          lineNumber: 15,
          visualizationData: {
            arrays: [],
            custom: {
              n,
              currentN: current,
              depth,
              memo: Object.fromEntries(memo),
              memoArray: Array.from(memo.entries()).map(([k, v]) => ({ index: k, value: v, highlight: k === current })),
              callStack: [...callStack],
              phase: 'cache_hit',
              result: cached,
            },
          },
          variables: { result: cached },
        });
        callStack.pop();
        return cached;
      }

      // Calculate
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Cache miss. Computing dp(${current}) = dp(${current - 1}) + dp(${current - 2})`,
        lineNumber: 19,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            currentN: current,
            depth,
            memo: Object.fromEntries(memo),
            memoArray: Array.from(memo.entries()).map(([k, v]) => ({ index: k, value: v })),
            callStack: [...callStack],
            phase: 'computing',
          },
        },
        variables: {},
      });

      const left = dpMemo(current - 1, depth + 1);
      const right = dpMemo(current - 2, depth + 1);
      const result = left + right;

      // Store in memo
      memo.set(current, result);

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Computed dp(${current}) = ${left} + ${right} = ${result}. Storing in memo.`,
        lineNumber: 20,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            currentN: current,
            depth,
            memo: Object.fromEntries(memo),
            memoArray: Array.from(memo.entries()).map(([k, v]) => ({ index: k, value: v, highlight: k === current })),
            callStack: [...callStack],
            phase: 'storing',
            result,
            leftResult: left,
            rightResult: right,
          },
        },
        variables: { left, right, result },
      });

      callStack.pop();
      return result;
    }

    // Initial step
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Starting memoization solution for n = ${n}. Initialize empty memo cache.`,
      lineNumber: 2,
      visualizationData: {
        arrays: [],
        custom: {
          n,
          memo: {},
          memoArray: [],
          callStack: [],
          phase: 'start',
        },
      },
      variables: { n },
    });

    const result = dpMemo(n, 0);

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Memoization complete! There are ${result} distinct ways to climb ${n} stairs. Final memo cache has ${memo.size} entries.`,
      lineNumber: 21,
      visualizationData: {
        arrays: [],
        custom: {
          n,
          result,
          memo: Object.fromEntries(memo),
          memoArray: Array.from(memo.entries()).map(([k, v]) => ({ index: k, value: v })),
          complete: true,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
