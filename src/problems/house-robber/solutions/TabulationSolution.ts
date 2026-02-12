import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { HouseRobberInput } from '../types';

export const TabulationSolution: Solution<HouseRobberInput, number> = {
  id: 'tabulation',
  name: 'Tabulation Solution (Bottom-Up DP)',
  description: 'Bottom-up dynamic programming using a DP array. Build solutions from smaller subproblems to larger ones. dp[i] represents the maximum money that can be robbed from houses 0 to i.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  const dp = new Array(n);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    // Either rob current + dp[i-2] or skip current (dp[i-1])
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }

  return dp[n - 1];
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  public int rob(int[] nums) {                               // Line 2
    int n = nums.length;                                     // Line 3
    if (n == 0) return 0;                                    // Line 4
    if (n == 1) return nums[0];                              // Line 5
                                                             // Line 6
    int[] dp = new int[n];                                   // Line 7
    dp[0] = nums[0];                                         // Line 8
    dp[1] = Math.max(nums[0], nums[1]);                      // Line 9
                                                             // Line 10
    for (int i = 2; i < n; i++) {                            // Line 11
      // Either rob current + dp[i-2] or skip current (dp[i-1]) // Line 12
      dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);     // Line 13
    }                                                        // Line 14
                                                             // Line 15
    return dp[n - 1];                                        // Line 16
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  public int Rob(int[] nums) {                               // Line 2
    int n = nums.Length;                                     // Line 3
    if (n == 0) return 0;                                    // Line 4
    if (n == 1) return nums[0];                              // Line 5
                                                             // Line 6
    int[] dp = new int[n];                                   // Line 7
    dp[0] = nums[0];                                         // Line 8
    dp[1] = Math.Max(nums[0], nums[1]);                      // Line 9
                                                             // Line 10
    for (int i = 2; i < n; i++) {                            // Line 11
      // Either rob current + dp[i-2] or skip current (dp[i-1]) // Line 12
      dp[i] = Math.Max(nums[i] + dp[i - 2], dp[i - 1]);     // Line 13
    }                                                        // Line 14
                                                             // Line 15
    return dp[n - 1];                                        // Line 16
  }
}`,
    },
  ],

  execute: (input: HouseRobberInput): SolutionExecution<number> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const n = nums.length;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Starting tabulation with ${n} houses`,
      lineNumber: 2,
      visualizationData: {
        arrays: [],
        custom: { nums, phase: 'start' },
      },
      variables: { n },
    });

    if (n === 0) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: 'No houses',
        lineNumber: 4,
        visualizationData: {
          arrays: [],
          custom: { nums, result: 0, complete: true },
        },
        variables: { result: 0 },
      });
      return { steps, result: 0 };
    }

    if (n === 1) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: `Rob house 0: $${nums[0]}`,
        lineNumber: 5,
        visualizationData: {
          arrays: [],
          custom: { nums, result: nums[0], complete: true },
        },
        variables: { result: nums[0] },
      });
      return { steps, result: nums[0] };
    }

    const dp: number[] = new Array(n).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize: dp[0]=$${dp[0]}, dp[1]=$${dp[1]}`,
      lineNumber: 9,
      visualizationData: {
        arrays: [],
        custom: { nums, dp: [...dp], currentIndex: 1, phase: 'initializing' },
      },
      variables: { dp0: dp[0], dp1: dp[1] },
    });

    for (let i = 2; i < n; i++) {
      // Step 1: Show we're considering this house
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Considering house ${i}: $${nums[i]}`,
        lineNumber: 11,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            dp: [...dp],
            currentIndex: i,
            phase: 'considering',
          },
        },
        variables: { i, houseValue: nums[i] },
      });

      // Step 2: Calculate rob choice
      const robCurrent = nums[i] + dp[i - 2];
      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Rob house ${i}: $${nums[i]} + dp[${i - 2}] = $${nums[i]} + $${dp[i - 2]} = $${robCurrent}`,
        lineNumber: 12,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            dp: [...dp],
            currentIndex: i,
            robChoice: robCurrent,
            phase: 'calculating_rob',
            formula: `${nums[i]} + ${dp[i - 2]} = ${robCurrent}`,
          },
        },
        variables: { i, robCurrent },
      });

      // Step 3: Calculate skip choice
      const skipCurrent = dp[i - 1];
      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Skip house ${i}: dp[${i - 1}] = $${skipCurrent}`,
        lineNumber: 12,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            dp: [...dp],
            currentIndex: i,
            robChoice: robCurrent,
            skipChoice: skipCurrent,
            phase: 'calculating_skip',
          },
        },
        variables: { i, skipCurrent },
      });

      // Step 4: Make decision
      dp[i] = Math.max(robCurrent, skipCurrent);
      const decision = robCurrent > skipCurrent ? 'rob' : 'skip';
      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Decision: ${decision} house ${i}. max($${robCurrent}, $${skipCurrent}) = $${dp[i]}`,
        lineNumber: 13,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            dp: [...dp],
            currentIndex: i,
            robChoice: robCurrent,
            skipChoice: skipCurrent,
            decision,
            phase: 'decided',
          },
        },
        variables: { i, dpI: dp[i] },
      });
    }

    const result = dp[n - 1];

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Maximum: $${result}`,
      lineNumber: 16,
      visualizationData: {
        arrays: [],
        custom: { nums, dp, result, complete: true },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
