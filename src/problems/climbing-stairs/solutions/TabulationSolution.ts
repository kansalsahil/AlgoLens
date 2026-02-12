import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ClimbingStairsInput } from '../types';

export const TabulationSolution: Solution<ClimbingStairsInput, number> = {
  id: 'tabulation',
  name: 'Tabulation (Bottom-Up DP)',
  description: 'Bottom-up dynamic programming using an array. Build solutions from base cases (dp[1], dp[2]) up to dp[n]. Each entry dp[i] represents the number of ways to reach stair i.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `function climbStairs(n: number): number {
  if (n === 1) return 1;
  if (n === 2) return 2;

  const dp: number[] = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  // Fill the DP table
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  public int climbStairs(int n) {                             // Line 2
    if (n == 1) return 1;                                     // Line 3
    if (n == 2) return 2;                                     // Line 4
                                                              // Line 5
    int[] dp = new int[n + 1];                                // Line 6
    dp[1] = 1;                                                // Line 7
    dp[2] = 2;                                                // Line 8
                                                              // Line 9
    // Fill the DP table                                      // Line 10
    for (int i = 3; i <= n; i++) {                            // Line 11
      dp[i] = dp[i - 1] + dp[i - 2];                          // Line 12
    }                                                         // Line 13
                                                              // Line 14
    return dp[n];                                             // Line 15
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  public int ClimbStairs(int n) {                             // Line 2
    if (n == 1) return 1;                                     // Line 3
    if (n == 2) return 2;                                     // Line 4
                                                              // Line 5
    int[] dp = new int[n + 1];                                // Line 6
    dp[1] = 1;                                                // Line 7
    dp[2] = 2;                                                // Line 8
                                                              // Line 9
    // Fill the DP table                                      // Line 10
    for (int i = 3; i <= n; i++) {                            // Line 11
      dp[i] = dp[i - 1] + dp[i - 2];                          // Line 12
    }                                                         // Line 13
                                                              // Line 14
    return dp[n];                                             // Line 15
  }
}`,
    },
  ],

  execute: (input: ClimbingStairsInput): SolutionExecution<number> => {
    const { n } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Handle base cases
    if (n === 1) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'initialization',
        description: `n = 1 (base case), return 1`,
        lineNumber: 3,
        visualizationData: {
          arrays: [],
          custom: {
            n: 1,
            result: 1,
            complete: true,
          },
        },
        variables: { result: 1 },
      });
      return { steps, result: 1 };
    }

    if (n === 2) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'initialization',
        description: `n = 2 (base case), return 2`,
        lineNumber: 4,
        visualizationData: {
          arrays: [],
          custom: {
            n: 2,
            result: 2,
            complete: true,
          },
        },
        variables: { result: 2 },
      });
      return { steps, result: 2 };
    }

    // Initialize DP array
    const dp: number[] = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize DP array of size ${n + 1}. Set base cases: dp[1] = 1, dp[2] = 2`,
      lineNumber: 6,
      visualizationData: {
        arrays: [
          {
            id: 'dp',
            name: 'dp',
            values: [...dp],
            highlights: [1, 2],
            pointers: [],
          },
        ],
        custom: {
          n,
          dp: [...dp],
          currentIndex: -1,
          phase: 'initialization',
        },
      },
      variables: { n },
    });

    // Fill the DP table
    for (let i = 3; i <= n; i++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Computing dp[${i}]: Need to add ways from stair ${i - 1} and stair ${i - 2}`,
        lineNumber: 11,
        visualizationData: {
          arrays: [
            {
              id: 'dp',
              name: 'dp',
              values: [...dp],
              highlights: [i - 2, i - 1],
              pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
            },
          ],
          custom: {
            n,
            dp: [...dp],
            currentIndex: i,
            phase: 'computing',
            formula: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}]`,
            operands: [dp[i - 1], dp[i - 2]],
          },
        },
        variables: { i },
      });

      dp[i] = dp[i - 1] + dp[i - 2];

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
        lineNumber: 12,
        visualizationData: {
          arrays: [
            {
              id: 'dp',
              name: 'dp',
              values: [...dp],
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#10b981' }],
            },
          ],
          custom: {
            n,
            dp: [...dp],
            currentIndex: i,
            phase: 'computed',
            result: dp[i],
            calculation: `${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
          },
        },
        variables: { i, result: dp[i] },
      });
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `DP table complete! dp[${n}] = ${dp[n]}. There are ${dp[n]} distinct ways to climb ${n} stairs.`,
      lineNumber: 15,
      visualizationData: {
        arrays: [
          {
            id: 'dp',
            name: 'dp',
            values: [...dp],
            highlights: [n],
            pointers: [],
          },
        ],
        custom: {
          n,
          dp: [...dp],
          result: dp[n],
          complete: true,
        },
      },
      variables: { result: dp[n] },
    });

    return { steps, result: dp[n] };
  },
};
