import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { MaximumSubarrayInput } from '../types';

export const KadaneSolution: Solution<MaximumSubarrayInput, number> = {
  id: 'kadane',
  name: 'Kadane\'s Algorithm (Optimal)',
  description: 'Dynamic programming approach that maintains the maximum sum ending at the current position. At each step, decide whether to extend the existing subarray or start a new one.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend existing subarray or start new one
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (nums == null || nums.length == 0) return 0;            // Line 2
                                                              // Line 3
  int maxSum = nums[0];                                       // Line 4
  int currentSum = nums[0];                                   // Line 5
                                                              // Line 6
  for (int i = 1; i < nums.length; i++) {                    // Line 7
    // Either extend existing subarray or start new one      // Line 8
    currentSum = Math.max(nums[i], currentSum + nums[i]);     // Line 9
    maxSum = Math.max(maxSum, currentSum);                    // Line 10
  }
                                                              // Line 12
  return maxSum;                                              // Line 13
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (nums == null || nums.Length == 0) return 0;            // Line 2
                                                              // Line 3
  int maxSum = nums[0];                                       // Line 4
  int currentSum = nums[0];                                   // Line 5
                                                              // Line 6
  for (int i = 1; i < nums.Length; i++) {                    // Line 7
    // Either extend existing subarray or start new one      // Line 8
    currentSum = Math.Max(nums[i], currentSum + nums[i]);     // Line 9
    maxSum = Math.Max(maxSum, currentSum);                    // Line 10
  }
                                                              // Line 12
  return maxSum;                                              // Line 13
}`,
    },
  ],

  execute: (input: MaximumSubarrayInput): SolutionExecution<number> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let maxSum = nums[0];
    let currentSum = nums[0];
    let bestStart = 0;
    let bestEnd = 0;
    let currentStart = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize maxSum = ${nums[0]} and currentSum = ${nums[0]}. Start with the first element.`,
      lineNumber: 4,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [0],
            pointers: [],
          },
        ],
        custom: {
          nums,
          maxSum: nums[0],
          currentSum: nums[0],
          currentIndex: 0,
          currentStart: 0,
          currentEnd: 0,
          bestStart: 0,
          bestEnd: 0,
        },
      },
      variables: { maxSum: nums[0], currentSum: nums[0] },
    });

    // Process each element starting from index 1
    for (let i = 1; i < nums.length; i++) {
      const extendSum = currentSum + nums[i];
      const startNewSum = nums[i];

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `At index ${i} (value: ${nums[i]}): Compare extending (${currentSum} + ${nums[i]} = ${extendSum}) vs starting new (${startNewSum})`,
        lineNumber: 7,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: Array.from({ length: i - currentStart + 1 }, (_, idx) => currentStart + idx),
              pointers: [
                { name: 'i', index: i, color: '#fbbf24' },
                { name: 'current', index: currentStart, color: '#8b5cf6' },
              ],
            },
          ],
          custom: {
            nums,
            maxSum,
            currentSum,
            currentIndex: i,
            currentStart,
            currentEnd: i - 1,
            bestStart,
            bestEnd,
            extendSum,
            startNewSum,
            comparing: true,
          },
        },
        variables: { i, currentSum, maxSum, extendSum, startNewSum },
      });

      // Decide: extend or start new
      if (nums[i] > currentSum + nums[i]) {
        // Start new subarray
        currentSum = nums[i];
        currentStart = i;

        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `Starting new subarray is better (${nums[i]} > ${extendSum}). Reset currentSum = ${nums[i]}`,
          lineNumber: 9,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [i],
                pointers: [{ name: 'new start', index: i, color: '#8b5cf6' }],
              },
            ],
            custom: {
              nums,
              maxSum,
              currentSum,
              currentIndex: i,
              currentStart,
              currentEnd: i,
              bestStart,
              bestEnd,
              startedNew: true,
            },
          },
          variables: { currentSum, currentStart: i },
        });
      } else {
        // Extend existing subarray
        currentSum = currentSum + nums[i];

        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `Extending subarray is better (${extendSum} >= ${nums[i]}). Update currentSum = ${currentSum}`,
          lineNumber: 9,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: Array.from({ length: i - currentStart + 1 }, (_, idx) => currentStart + idx),
                pointers: [
                  { name: 'start', index: currentStart, color: '#8b5cf6' },
                  { name: 'end', index: i, color: '#10b981' },
                ],
              },
            ],
            custom: {
              nums,
              maxSum,
              currentSum,
              currentIndex: i,
              currentStart,
              currentEnd: i,
              bestStart,
              bestEnd,
              extended: true,
            },
          },
          variables: { currentSum, currentStart },
        });
      }

      // Update maxSum if needed
      if (currentSum > maxSum) {
        maxSum = currentSum;
        bestStart = currentStart;
        bestEnd = i;

        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `New maximum sum found! Update maxSum = ${maxSum}`,
          lineNumber: 10,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: Array.from({ length: i - currentStart + 1 }, (_, idx) => currentStart + idx),
                pointers: [
                  { name: 'start', index: currentStart, color: '#8b5cf6' },
                  { name: 'end', index: i, color: '#10b981' },
                ],
              },
            ],
            custom: {
              nums,
              maxSum,
              currentSum,
              currentIndex: i,
              currentStart,
              currentEnd: i,
              bestStart,
              bestEnd,
              newMaxFound: true,
            },
          },
          variables: { maxSum, bestStart, bestEnd },
        });
      }
    }

    // Final result
    const bestSubarray = nums.slice(bestStart, bestEnd + 1);
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Maximum subarray sum: ${maxSum}. Subarray: [${bestSubarray.join(', ')}] at indices [${bestStart}..${bestEnd}]`,
      lineNumber: 13,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: Array.from({ length: bestEnd - bestStart + 1 }, (_, i) => bestStart + i),
            pointers: [
              { name: 'start', index: bestStart, color: '#8b5cf6' },
              { name: 'end', index: bestEnd, color: '#10b981' },
            ],
          },
        ],
        custom: {
          nums,
          maxSum,
          bestStart,
          bestEnd,
          complete: true,
        },
      },
      variables: { result: maxSum },
    });

    return { steps, result: maxSum };
  },
};
