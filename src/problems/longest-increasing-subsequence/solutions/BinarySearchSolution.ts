import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { LongestIncreasingSubsequenceInput } from '../types';

export const BinarySearchSolution: Solution<LongestIncreasingSubsequenceInput, number> = {
  id: 'binary-search',
  name: 'Binary Search + Patience Sorting (O(n log n))',
  description: 'Use a "tails" array where tails[i] is the smallest ending value of all increasing subsequences of length i+1. For each number, use binary search to find its position in the tails array. This is based on the patience sorting algorithm.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',
  code: `function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0;

  const tails: number[] = [];

  for (const num of nums) {
    // Binary search for the position to insert num
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // If left === tails.length, append to the end
    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }

  return tails.length;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (nums == null || nums.length == 0) return 0;       // Line 2
                                                         // Line 3
  List<Integer> tails = new ArrayList<>();               // Line 4
                                                         // Line 5
  for (int num : nums) {                                 // Line 6
    // Binary search for the position to insert num     // Line 7
    int left = 0;                                        // Line 8
    int right = tails.size();                            // Line 9
                                                         // Line 10
    while (left < right) {                               // Line 11
      int mid = (left + right) / 2;                      // Line 12
      if (tails.get(mid) < num) {                        // Line 13
        left = mid + 1;                                  // Line 14
      } else {
        right = mid;                                     // Line 16
      }
    }
                                                         // Line 19
    // If left == tails.size(), append to the end       // Line 20
    if (left == tails.size()) {                          // Line 21
      tails.add(num);                                    // Line 22
    } else {
      tails.set(left, num);                              // Line 24
    }
  }
                                                         // Line 27
  return tails.size();                                   // Line 28
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (nums == null || nums.Length == 0) return 0;       // Line 2
                                                         // Line 3
  List<int> tails = new List<int>();                    // Line 4
                                                         // Line 5
  foreach (int num in nums) {                            // Line 6
    // Binary search for the position to insert num     // Line 7
    int left = 0;                                        // Line 8
    int right = tails.Count;                             // Line 9
                                                         // Line 10
    while (left < right) {                               // Line 11
      int mid = (left + right) / 2;                      // Line 12
      if (tails[mid] < num) {                            // Line 13
        left = mid + 1;                                  // Line 14
      } else {
        right = mid;                                     // Line 16
      }
    }
                                                         // Line 19
    // If left == tails.Count, append to the end        // Line 20
    if (left == tails.Count) {                           // Line 21
      tails.Add(num);                                    // Line 22
    } else {
      tails[left] = num;                                 // Line 24
    }
  }
                                                         // Line 27
  return tails.Count;                                    // Line 28
}`,
    },
  ],

  execute: (input: LongestIncreasingSubsequenceInput): SolutionExecution<number> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const tails: number[] = [];
    const tailsHistory: number[][] = []; // Track history for visualization

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize empty tails array. tails[i] will store the smallest ending value of all increasing subsequences of length i+1.`,
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
            id: 'tails',
            name: 'tails (smallest tail for each length)',
            values: [],
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          nums,
          tails: [],
          phase: 'init',
          lisLength: 0,
        },
      },
      variables: { tails: [] },
    });

    // Process each number
    for (let idx = 0; idx < nums.length; idx++) {
      const num = nums[idx];

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Processing nums[${idx}] = ${num}. Use binary search to find where it fits in the tails array.`,
        lineNumber: 6,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [idx],
              pointers: [{ name: 'current', index: idx, color: '#8b5cf6' }],
            },
            {
              id: 'tails',
              name: 'tails (smallest tail for each length)',
              values: [...tails],
              highlights: [],
              pointers: [],
            },
          ],
          custom: {
            nums,
            tails: [...tails],
            currentNum: num,
            currentIndex: idx,
            phase: 'processing',
            lisLength: tails.length,
          },
        },
        variables: { idx, num, tails: [...tails] },
      });

      // Binary search
      let left = 0;
      let right = tails.length;
      const binarySearchSteps: Array<{ left: number; right: number; mid: number }> = [];

      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        binarySearchSteps.push({ left, right, mid });

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Binary search: left=${left}, right=${right}, mid=${mid}. tails[${mid}]=${tails[mid]} ${
            tails[mid] < num ? '<' : '>='
          } ${num}. ${tails[mid] < num ? 'Search right half.' : 'Search left half.'}`,
          lineNumber: 13,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [idx],
                pointers: [{ name: 'current', index: idx, color: '#8b5cf6' }],
              },
              {
                id: 'tails',
                name: 'tails (smallest tail for each length)',
                values: [...tails],
                highlights: [mid],
                pointers: [
                  { name: 'left', index: left, color: '#f59e0b' },
                  { name: 'right', index: right - 1, color: '#ef4444' },
                  { name: 'mid', index: mid, color: '#10b981' },
                ],
              },
            ],
            custom: {
              nums,
              tails: [...tails],
              currentNum: num,
              currentIndex: idx,
              binarySearch: { left, right, mid },
              phase: 'binary-search',
              lisLength: tails.length,
            },
          },
          variables: { left, right, mid },
        });

        if (tails[mid] < num) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      // Insert or replace
      const oldTails = [...tails];
      const isAppend = left === tails.length;

      if (isAppend) {
        tails.push(num);
        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `${num} is larger than all tails. Append to extend the LIS length to ${tails.length}.`,
          lineNumber: 22,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [idx],
                pointers: [{ name: 'current', index: idx, color: '#8b5cf6' }],
              },
              {
                id: 'tails',
                name: 'tails (smallest tail for each length)',
                values: [...tails],
                highlights: [left],
                pointers: [{ name: 'append', index: left, color: '#10b981' }],
              },
            ],
            custom: {
              nums,
              tails: [...tails],
              oldTails,
              currentNum: num,
              currentIndex: idx,
              insertPosition: left,
              appended: true,
              phase: 'appended',
              lisLength: tails.length,
            },
          },
          variables: { tails: [...tails], position: left },
        });
      } else {
        const oldValue = tails[left];
        tails[left] = num;
        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `Replace tails[${left}] = ${oldValue} with ${num}. This maintains the smallest tail for subsequences of length ${
            left + 1
          }.`,
          lineNumber: 24,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [idx],
                pointers: [{ name: 'current', index: idx, color: '#8b5cf6' }],
              },
              {
                id: 'tails',
                name: 'tails (smallest tail for each length)',
                values: [...tails],
                highlights: [left],
                pointers: [{ name: 'replace', index: left, color: '#f59e0b' }],
              },
            ],
            custom: {
              nums,
              tails: [...tails],
              oldTails,
              currentNum: num,
              currentIndex: idx,
              insertPosition: left,
              replaced: true,
              oldValue,
              phase: 'replaced',
              lisLength: tails.length,
            },
          },
          variables: { tails: [...tails], position: left, oldValue },
        });
      }

      tailsHistory.push([...tails]);
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `The length of the tails array is ${tails.length}, which is the length of the longest increasing subsequence.`,
      lineNumber: 28,
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
            id: 'tails',
            name: 'tails (smallest tail for each length)',
            values: [...tails],
            highlights: Array.from({ length: tails.length }, (_, i) => i),
            pointers: [],
          },
        ],
        custom: {
          nums,
          tails: [...tails],
          complete: true,
          phase: 'complete',
          lisLength: tails.length,
          tailsHistory,
        },
      },
      variables: { result: tails.length },
    });

    return { steps, result: tails.length };
  },
};
