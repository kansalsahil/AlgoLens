import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { HouseRobberInput } from '../types';

export const SpaceOptimizedSolution: Solution<HouseRobberInput, number> = {
  id: 'space-optimized',
  name: 'Space Optimized Solution',
  description: 'Optimized bottom-up DP using only two variables instead of an array. Since we only need the previous two values, we can maintain O(1) space complexity.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  let prev2 = nums[0];           // dp[i-2]
  let prev1 = Math.max(nums[0], nums[1]); // dp[i-1]

  for (let i = 2; i < n; i++) {
    const current = Math.max(nums[i] + prev2, prev1);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
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
    int prev2 = nums[0];           // dp[i-2]                // Line 7
    int prev1 = Math.max(nums[0], nums[1]); // dp[i-1]       // Line 8
                                                             // Line 9
    for (int i = 2; i < n; i++) {                            // Line 10
      int current = Math.max(nums[i] + prev2, prev1);        // Line 11
      prev2 = prev1;                                         // Line 12
      prev1 = current;                                       // Line 13
    }                                                        // Line 14
                                                             // Line 15
    return prev1;                                            // Line 16
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
    int prev2 = nums[0];           // dp[i-2]                // Line 7
    int prev1 = Math.Max(nums[0], nums[1]); // dp[i-1]       // Line 8
                                                             // Line 9
    for (int i = 2; i < n; i++) {                            // Line 10
      int current = Math.Max(nums[i] + prev2, prev1);        // Line 11
      prev2 = prev1;                                         // Line 12
      prev1 = current;                                       // Line 13
    }                                                        // Line 14
                                                             // Line 15
    return prev1;                                            // Line 16
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
      description: `Starting space-optimized solution with ${n} houses`,
      lineNumber: 2,
      visualizationData: {
        arrays: [],
        custom: { nums, phase: 'start', variables: [] },
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

    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize: prev2=$${prev2}, prev1=$${prev1}`,
      lineNumber: 8,
      visualizationData: {
        arrays: [],
        custom: {
          nums,
          currentIndex: 1,
          phase: 'initializing',
          variables: [
            { name: 'prev2', value: prev2, represents: 'dp[i-2]', updated: true },
            { name: 'prev1', value: prev1, represents: 'dp[i-1]', updated: true },
          ],
        },
      },
      variables: { prev2, prev1 },
    });

    for (let i = 2; i < n; i++) {
      // Step 1: Considering house
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Considering house ${i}: $${nums[i]}`,
        lineNumber: 10,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: i,
            phase: 'considering',
            variables: [
              { name: 'prev2', value: prev2, represents: `dp[${i-2}]` },
              { name: 'prev1', value: prev1, represents: `dp[${i-1}]` },
            ],
          },
        },
        variables: { i, houseValue: nums[i] },
      });

      // Step 2: Calculate rob choice
      const robCurrent = nums[i] + prev2;
      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Rob house ${i}: $${nums[i]} + prev2 = $${nums[i]} + $${prev2} = $${robCurrent}`,
        lineNumber: 11,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: i,
            robChoice: robCurrent,
            phase: 'calculating_rob',
            variables: [
              { name: 'prev2', value: prev2, represents: `dp[${i-2}]` },
              { name: 'prev1', value: prev1, represents: `dp[${i-1}]` },
            ],
          },
        },
        variables: { i, robCurrent },
      });

      // Step 3: Calculate skip choice
      const skipCurrent = prev1;
      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Skip house ${i}: prev1 = $${skipCurrent}`,
        lineNumber: 11,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: i,
            robChoice: robCurrent,
            skipChoice: skipCurrent,
            phase: 'calculating_skip',
            variables: [
              { name: 'prev2', value: prev2, represents: `dp[${i-2}]` },
              { name: 'prev1', value: prev1, represents: `dp[${i-1}]` },
            ],
          },
        },
        variables: { i, skipCurrent },
      });

      // Step 4: Make decision
      const current = Math.max(robCurrent, skipCurrent);
      const decision = robCurrent > skipCurrent ? 'rob' : 'skip';

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Decision: ${decision} house ${i}. max($${robCurrent}, $${skipCurrent}) = $${current}`,
        lineNumber: 11,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: i,
            robChoice: robCurrent,
            skipChoice: skipCurrent,
            decision,
            phase: 'computing',
            variables: [
              { name: 'prev2', value: prev2, represents: `dp[${i - 2}]`, updated: false },
              { name: 'prev1', value: prev1, represents: `dp[${i - 1}]`, updated: false },
              { name: 'current', value: current, represents: `dp[${i}]`, updated: true },
            ],
          },
        },
        variables: { i, current },
      });

      prev2 = prev1;
      prev1 = current;
    }

    const result = prev1;

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Maximum: $${result}`,
      lineNumber: 16,
      visualizationData: {
        arrays: [],
        custom: {
          nums,
          result,
          complete: true,
          variables: [
            { name: 'prev2', value: prev2, represents: `dp[${n - 2}]`, updated: false },
            { name: 'prev1', value: prev1, represents: `dp[${n - 1}]`, updated: false },
          ],
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
