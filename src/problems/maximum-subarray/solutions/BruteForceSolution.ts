import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { MaximumSubarrayInput } from '../types';

export const BruteForceSolution: Solution<MaximumSubarrayInput, number> = {
  id: 'brute-force',
  name: 'Brute Force',
  description: 'Try all possible subarrays and track the maximum sum. For each starting position, calculate the sum of all subarrays beginning at that position.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  code: `function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];

  // Try every possible starting position
  for (let start = 0; start < nums.length; start++) {
    let currentSum = 0;
    // Try every possible ending position
    for (let end = start; end < nums.length; end++) {
      currentSum += nums[end];
      maxSum = Math.max(maxSum, currentSum);
    }
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
                                                              // Line 5
  // Try every possible starting position                    // Line 6
  for (int start = 0; start < nums.length; start++) {        // Line 7
    int currentSum = 0;                                       // Line 8
    // Try every possible ending position                    // Line 9
    for (int end = start; end < nums.length; end++) {        // Line 10
      currentSum += nums[end];                                // Line 11
      maxSum = Math.max(maxSum, currentSum);                  // Line 12
    }
  }
                                                              // Line 15
  return maxSum;                                              // Line 16
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (nums == null || nums.Length == 0) return 0;            // Line 2
                                                              // Line 3
  int maxSum = nums[0];                                       // Line 4
                                                              // Line 5
  // Try every possible starting position                    // Line 6
  for (int start = 0; start < nums.Length; start++) {        // Line 7
    int currentSum = 0;                                       // Line 8
    // Try every possible ending position                    // Line 9
    for (int end = start; end < nums.Length; end++) {        // Line 10
      currentSum += nums[end];                                // Line 11
      maxSum = Math.Max(maxSum, currentSum);                  // Line 12
    }
  }
                                                              // Line 15
  return maxSum;                                              // Line 16
}`,
    },
  ],

  execute: (input: MaximumSubarrayInput): SolutionExecution<number> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let maxSum = nums[0];
    let bestStart = 0;
    let bestEnd = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize maxSum = ${nums[0]}. We'll try all possible subarrays.`,
      lineNumber: 4,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          nums,
          maxSum: nums[0],
          currentSum: 0,
          start: -1,
          end: -1,
          bestStart: 0,
          bestEnd: 0,
        },
      },
      variables: { maxSum: nums[0] },
    });

    // Try every possible starting position
    for (let start = 0; start < nums.length; start++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Starting new subarray at index ${start} (value: ${nums[start]})`,
        lineNumber: 7,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [start],
              pointers: [{ name: 'start', index: start, color: '#3b82f6' }],
            },
          ],
          custom: {
            nums,
            maxSum,
            currentSum: 0,
            start,
            end: start - 1,
            bestStart,
            bestEnd,
          },
        },
        variables: { start, maxSum },
      });

      let currentSum = 0;

      // Try every possible ending position
      for (let end = start; end < nums.length; end++) {
        currentSum += nums[end];

        const highlightIndices = [];
        for (let i = start; i <= end; i++) {
          highlightIndices.push(i);
        }

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Subarray [${start}..${end}]: sum = ${currentSum}${currentSum > maxSum ? ' (new maximum!)' : ''}`,
          lineNumber: 11,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: highlightIndices,
                pointers: [
                  { name: 'start', index: start, color: '#3b82f6' },
                  { name: 'end', index: end, color: '#10b981' },
                ],
              },
            ],
            custom: {
              nums,
              maxSum,
              currentSum,
              start,
              end,
              bestStart,
              bestEnd,
              comparing: true,
            },
          },
          variables: { start, end, currentSum, maxSum },
        });

        if (currentSum > maxSum) {
          maxSum = currentSum;
          bestStart = start;
          bestEnd = end;

          steps.push({
            id: `step-${stepId++}`,
            type: 'assignment',
            description: `New maximum sum found! Update maxSum = ${maxSum}`,
            lineNumber: 12,
            visualizationData: {
              arrays: [
                {
                  id: 'nums',
                  name: 'nums',
                  values: nums,
                  highlights: highlightIndices,
                  pointers: [
                    { name: 'start', index: start, color: '#3b82f6' },
                    { name: 'end', index: end, color: '#10b981' },
                  ],
                },
              ],
              custom: {
                nums,
                maxSum,
                currentSum,
                start,
                end,
                bestStart,
                bestEnd,
                newMaxFound: true,
              },
            },
            variables: { maxSum, bestStart, bestEnd },
          });
        }
      }
    }

    // Final result
    const bestSubarray = nums.slice(bestStart, bestEnd + 1);
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Maximum subarray sum: ${maxSum}. Subarray: [${bestSubarray.join(', ')}] at indices [${bestStart}..${bestEnd}]`,
      lineNumber: 16,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: Array.from({ length: bestEnd - bestStart + 1 }, (_, i) => bestStart + i),
            pointers: [
              { name: 'start', index: bestStart, color: '#3b82f6' },
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
