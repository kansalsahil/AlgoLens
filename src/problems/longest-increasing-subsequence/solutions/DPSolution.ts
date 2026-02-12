import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { LongestIncreasingSubsequenceInput } from '../types';

export const DPSolution: Solution<LongestIncreasingSubsequenceInput, number> = {
  id: 'dp',
  name: 'Dynamic Programming (O(n²))',
  description: 'Use a DP array where dp[i] represents the length of the longest increasing subsequence ending at index i. For each element, check all previous elements and extend their subsequences if the current element is larger.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(n)',
  code: `function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0;

  const n = nums.length;
  const dp = Array(n).fill(1);
  let maxLength = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLength = Math.max(maxLength, dp[i]);
  }

  return maxLength;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (nums == null || nums.length == 0) return 0;       // Line 2
                                                         // Line 3
  int n = nums.length;                                   // Line 4
  int[] dp = new int[n];                                 // Line 5
  Arrays.fill(dp, 1);                                    // Line 6
  int maxLength = 1;                                     // Line 7
                                                         // Line 8
  for (int i = 1; i < n; i++) {                          // Line 9
    for (int j = 0; j < i; j++) {                        // Line 10
      if (nums[j] < nums[i]) {                           // Line 11
        dp[i] = Math.max(dp[i], dp[j] + 1);              // Line 12
      }
    }
    maxLength = Math.max(maxLength, dp[i]);              // Line 15
  }
                                                         // Line 17
  return maxLength;                                      // Line 18
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (nums == null || nums.Length == 0) return 0;       // Line 2
                                                         // Line 3
  int n = nums.Length;                                   // Line 4
  int[] dp = new int[n];                                 // Line 5
  Array.Fill(dp, 1);                                     // Line 6
  int maxLength = 1;                                     // Line 7
                                                         // Line 8
  for (int i = 1; i < n; i++) {                          // Line 9
    for (int j = 0; j < i; j++) {                        // Line 10
      if (nums[j] < nums[i]) {                           // Line 11
        dp[i] = Math.Max(dp[i], dp[j] + 1);              // Line 12
      }
    }
    maxLength = Math.Max(maxLength, dp[i]);              // Line 15
  }
                                                         // Line 17
  return maxLength;                                      // Line 18
}`,
    },
  ],

  execute: (input: LongestIncreasingSubsequenceInput): SolutionExecution<number> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const n = nums.length;
    const dp = Array(n).fill(1);
    const prev = Array(n).fill(-1); // Track previous element for reconstruction
    let maxLength = 1;
    let maxIndex = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize DP array with all 1s. Each element forms a subsequence of length 1 by itself.`,
      lineNumber: 2,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [],
            pointers: [],
          },
          {
            id: 'dp',
            name: 'dp (LIS length ending at i)',
            values: [...dp],
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          nums,
          dp: [...dp],
          maxLength,
          maxIndex,
          phase: 'init',
        },
      },
      variables: { dp: [...dp], maxLength },
    });

    // Process each element
    for (let i = 1; i < n; i++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Processing index ${i} (value: ${nums[i]}). Check all previous elements to find subsequences we can extend.`,
        lineNumber: 9,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#8b5cf6' }],
            },
            {
              id: 'dp',
              name: 'dp (LIS length ending at i)',
              values: [...dp],
              highlights: [i],
              pointers: [],
            },
          ],
          custom: {
            nums,
            dp: [...dp],
            maxLength,
            maxIndex,
            currentIndex: i,
            phase: 'outer-loop',
          },
        },
        variables: { i, dp: [...dp] },
      });

      const comparisons: Array<{ j: number; canExtend: boolean; newLength?: number }> = [];

      for (let j = 0; j < i; j++) {
        const canExtend = nums[j] < nums[i];
        const comparison = { j, canExtend, newLength: canExtend ? dp[j] + 1 : undefined };
        comparisons.push(comparison);

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: canExtend
            ? `nums[${j}] = ${nums[j]} < ${nums[i]} = nums[${i}]. Can extend! LIS ending at ${j} has length ${dp[j]}, so extending gives length ${dp[j] + 1}.`
            : `nums[${j}] = ${nums[j]} >= ${nums[i]} = nums[${i}]. Cannot extend this subsequence.`,
          lineNumber: 11,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [i, j],
                pointers: [
                  { name: 'i', index: i, color: '#8b5cf6' },
                  { name: 'j', index: j, color: '#f59e0b' },
                ],
              },
              {
                id: 'dp',
                name: 'dp (LIS length ending at i)',
                values: [...dp],
                highlights: [i, j],
                pointers: [],
              },
            ],
            custom: {
              nums,
              dp: [...dp],
              maxLength,
              maxIndex,
              currentIndex: i,
              compareIndex: j,
              canExtend,
              phase: 'comparing',
              comparisons: comparisons.slice(),
            },
          },
          variables: { i, j, canExtend },
        });

        if (canExtend) {
          const newLength = dp[j] + 1;
          if (newLength > dp[i]) {
            dp[i] = newLength;
            prev[i] = j;

            steps.push({
              id: `step-${stepId++}`,
              type: 'assignment',
              description: `Update dp[${i}] = ${dp[i]}. Found a longer subsequence by extending the one ending at index ${j}.`,
              lineNumber: 12,
              visualizationData: {
                arrays: [
                  {
                    id: 'nums',
                    name: 'nums',
                    values: nums,
                    highlights: [i, j],
                    pointers: [
                      { name: 'i', index: i, color: '#8b5cf6' },
                      { name: 'j', index: j, color: '#10b981' },
                    ],
                  },
                  {
                    id: 'dp',
                    name: 'dp (LIS length ending at i)',
                    values: [...dp],
                    highlights: [i],
                    pointers: [],
                  },
                ],
                custom: {
                  nums,
                  dp: [...dp],
                  maxLength,
                  maxIndex,
                  currentIndex: i,
                  compareIndex: j,
                  updated: true,
                  phase: 'updated',
                  comparisons: comparisons.slice(),
                },
              },
              variables: { dp: [...dp] },
            });
          }
        }
      }

      // Update maxLength
      if (dp[i] > maxLength) {
        maxLength = dp[i];
        maxIndex = i;

        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `New maximum LIS length found: ${maxLength} (ending at index ${i})`,
          lineNumber: 15,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [i],
                pointers: [{ name: 'max', index: i, color: '#10b981' }],
              },
              {
                id: 'dp',
                name: 'dp (LIS length ending at i)',
                values: [...dp],
                highlights: [i],
                pointers: [],
              },
            ],
            custom: {
              nums,
              dp: [...dp],
              maxLength,
              maxIndex,
              currentIndex: i,
              newMaxFound: true,
              phase: 'new-max',
              comparisons,
            },
          },
          variables: { maxLength, maxIndex },
        });
      }
    }

    // Reconstruct the LIS
    const lis: number[] = [];
    let current = maxIndex;
    while (current !== -1) {
      lis.unshift(nums[current]);
      current = prev[current];
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Longest Increasing Subsequence has length ${maxLength}. Example LIS: [${lis.join(', ')}]`,
      lineNumber: 18,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [],
            pointers: [],
          },
          {
            id: 'dp',
            name: 'dp (LIS length ending at i)',
            values: [...dp],
            highlights: [maxIndex],
            pointers: [],
          },
        ],
        custom: {
          nums,
          dp: [...dp],
          maxLength,
          maxIndex,
          lis,
          lisIndices: lis.map((val) => nums.indexOf(val)),
          complete: true,
          phase: 'complete',
        },
      },
      variables: { result: maxLength, lis },
    });

    return { steps, result: maxLength };
  },
};
