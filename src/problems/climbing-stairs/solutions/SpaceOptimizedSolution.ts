import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ClimbingStairsInput } from '../types';

export const SpaceOptimizedSolution: Solution<ClimbingStairsInput, number> = {
  id: 'space-optimized',
  name: 'Space Optimized DP',
  description: 'Space-optimized dynamic programming solution. Instead of storing all values, keep only the last two values since we only need dp[i-1] and dp[i-2] to compute dp[i].',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `function climbStairs(n: number): number {
  if (n === 1) return 1;
  if (n === 2) return 2;

  let prev2 = 1;  // dp[i-2]
  let prev1 = 2;  // dp[i-1]

  // Calculate iteratively
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  public int climbStairs(int n) {                             // Line 2
    if (n == 1) return 1;                                     // Line 3
    if (n == 2) return 2;                                     // Line 4
                                                              // Line 5
    int prev2 = 1;  // dp[i-2]                                // Line 6
    int prev1 = 2;  // dp[i-1]                                // Line 7
                                                              // Line 8
    // Calculate iteratively                                  // Line 9
    for (int i = 3; i <= n; i++) {                            // Line 10
      int current = prev1 + prev2;                            // Line 11
      prev2 = prev1;                                          // Line 12
      prev1 = current;                                        // Line 13
    }                                                         // Line 14
                                                              // Line 15
    return prev1;                                             // Line 16
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
    int prev2 = 1;  // dp[i-2]                                // Line 6
    int prev1 = 2;  // dp[i-1]                                // Line 7
                                                              // Line 8
    // Calculate iteratively                                  // Line 9
    for (int i = 3; i <= n; i++) {                            // Line 10
      int current = prev1 + prev2;                            // Line 11
      prev2 = prev1;                                          // Line 12
      prev1 = current;                                        // Line 13
    }                                                         // Line 14
                                                              // Line 15
    return prev1;                                             // Line 16
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

    // Initialize variables
    let prev2 = 1;  // dp[i-2]
    let prev1 = 2;  // dp[i-1]

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize prev2 = 1 (ways to reach stair 1), prev1 = 2 (ways to reach stair 2)`,
      lineNumber: 6,
      visualizationData: {
        arrays: [],
        custom: {
          n,
          prev2,
          prev1,
          currentIndex: 2,
          phase: 'initialization',
          variables: [
            { name: 'prev2', value: prev2, represents: 'dp[1]' },
            { name: 'prev1', value: prev1, represents: 'dp[2]' },
          ],
        },
      },
      variables: { prev2, prev1 },
    });

    // Calculate iteratively
    for (let i = 3; i <= n; i++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Computing for stair ${i}: current = prev1 + prev2 = ${prev1} + ${prev2}`,
        lineNumber: 11,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            prev2,
            prev1,
            currentIndex: i,
            phase: 'computing',
            formula: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}]`,
            variables: [
              { name: 'prev2', value: prev2, represents: `dp[${i - 2}]` },
              { name: 'prev1', value: prev1, represents: `dp[${i - 1}]` },
            ],
          },
        },
        variables: { i, prev2, prev1 },
      });

      const current = prev1 + prev2;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `current = ${prev1} + ${prev2} = ${current}`,
        lineNumber: 11,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            prev2,
            prev1,
            current,
            currentIndex: i,
            phase: 'computed',
            calculation: `${prev1} + ${prev2} = ${current}`,
            variables: [
              { name: 'prev2', value: prev2, represents: `dp[${i - 2}]` },
              { name: 'prev1', value: prev1, represents: `dp[${i - 1}]` },
              { name: 'current', value: current, represents: `dp[${i}]` },
            ],
          },
        },
        variables: { current },
      });

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Shift values: prev2 = ${prev1}, prev1 = ${current}`,
        lineNumber: 12,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            prev2: prev1,
            prev1: current,
            currentIndex: i,
            phase: 'shifting',
            variables: [
              { name: 'prev2', value: prev1, represents: `dp[${i - 1}]`, updated: true },
              { name: 'prev1', value: current, represents: `dp[${i}]`, updated: true },
            ],
          },
        },
        variables: { prev2: prev1, prev1: current },
      });

      prev2 = prev1;
      prev1 = current;
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Space-optimized solution complete! prev1 = ${prev1}. There are ${prev1} distinct ways to climb ${n} stairs using O(1) space.`,
      lineNumber: 16,
      visualizationData: {
        arrays: [],
        custom: {
          n,
          prev2,
          prev1,
          result: prev1,
          complete: true,
          variables: [
            { name: 'prev2', value: prev2, represents: `dp[${n - 1}]` },
            { name: 'prev1', value: prev1, represents: `dp[${n}]` },
          ],
        },
      },
      variables: { result: prev1 },
    });

    return { steps, result: prev1 };
  },
};
