import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { SearchRotatedArrayInput } from '../types';

export const BinarySearchSolution: Solution<SearchRotatedArrayInput, number> = {
  id: 'binary-search',
  name: 'Binary Search (Optimal)',
  description: 'Use modified binary search to find target in O(log n) time by identifying which half is sorted.',
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  code: `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  int left = 0;                                                 // Line 2
  int right = nums.length - 1;                                  // Line 3
                                                                // Line 4
  while (left <= right) {                                       // Line 5
    int mid = (left + right) / 2;                               // Line 6
                                                                // Line 7
    if (nums[mid] == target) {                                  // Line 8
      return mid;                                               // Line 9
    }
                                                                // Line 11
    // Determine which half is sorted                           // Line 12
    if (nums[left] <= nums[mid]) {                              // Line 13
      // Left half is sorted                                    // Line 14
      if (nums[left] <= target && target < nums[mid]) {         // Line 15
        right = mid - 1;
      } else {                                                  // Line 17
        left = mid + 1;
      }
    } else {                                                    // Line 20
      // Right half is sorted                                   // Line 21
      if (nums[mid] < target && target <= nums[right]) {        // Line 22
        left = mid + 1;
      } else {                                                  // Line 24
        right = mid - 1;
      }
    }
  }
                                                                // Line 29
  return -1;
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  int left = 0;                                                 // Line 2
  int right = nums.Length - 1;                                  // Line 3
                                                                // Line 4
  while (left <= right) {                                       // Line 5
    int mid = (left + right) / 2;                               // Line 6
                                                                // Line 7
    if (nums[mid] == target) {                                  // Line 8
      return mid;                                               // Line 9
    }
                                                                // Line 11
    // Determine which half is sorted                           // Line 12
    if (nums[left] <= nums[mid]) {                              // Line 13
      // Left half is sorted                                    // Line 14
      if (nums[left] <= target && target < nums[mid]) {         // Line 15
        right = mid - 1;
      } else {                                                  // Line 17
        left = mid + 1;
      }
    } else {                                                    // Line 20
      // Right half is sorted                                   // Line 21
      if (nums[mid] < target && target <= nums[right]) {        // Line 22
        left = mid + 1;
      } else {                                                  // Line 24
        right = mid - 1;
      }
    }
  }
                                                                // Line 29
  return -1;
}`,
    },
  ],
  execute: (input: SearchRotatedArrayInput): SolutionExecution<number> => {
    const { nums, target } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let left = 0;
    let right = nums.length - 1;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Search for target = ${target} using binary search. Array is rotated, need to identify sorted half.`,
      lineNumber: 2,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [],
            pointers: [
              { name: 'left', index: left, color: '#3b82f6' },
              { name: 'right', index: right, color: '#ef4444' },
            ],
          },
        ],
        custom: {
          target,
          left,
          right,
          searchSpace: right - left + 1,
        },
      },
      variables: { target, left, right },
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Calculate mid = ${mid}. Check if nums[mid] (${nums[mid]}) equals target (${target}).`,
        lineNumber: 6,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [mid],
              pointers: [
                { name: 'left', index: left, color: '#3b82f6' },
                { name: 'mid', index: mid, color: '#10b981' },
                { name: 'right', index: right, color: '#ef4444' },
              ],
            },
          ],
          custom: {
            target,
            left,
            mid,
            right,
            midValue: nums[mid],
            checking: true,
            searchSpace: right - left + 1,
          },
        },
        variables: { left, mid, right },
      });

      if (nums[mid] === target) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Found target ${target} at index ${mid}!`,
          lineNumber: 9,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [mid],
                pointers: [
                  { name: 'found', index: mid, color: '#10b981' },
                ],
              },
            ],
            custom: {
              target,
              result: mid,
              found: true,
            },
          },
          variables: { result: mid },
        });

        return { steps, result: mid };
      }

      // Determine which half is sorted
      const leftSorted = nums[left] <= nums[mid];

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Determine sorted half: nums[left] (${nums[left]}) ${leftSorted ? '<=' : '>'} nums[mid] (${nums[mid]}). ${leftSorted ? 'Left' : 'Right'} half is sorted.`,
        lineNumber: 12,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: leftSorted
                ? Array.from({ length: mid - left + 1 }, (_, i) => left + i)
                : Array.from({ length: right - mid + 1 }, (_, i) => mid + i),
              pointers: [
                { name: 'left', index: left, color: '#3b82f6' },
                { name: 'mid', index: mid, color: '#10b981' },
                { name: 'right', index: right, color: '#ef4444' },
              ],
            },
          ],
          custom: {
            target,
            left,
            mid,
            right,
            leftSorted,
            sortedHalf: leftSorted ? 'left' : 'right',
            searchSpace: right - left + 1,
          },
        },
        variables: { left, mid, right, leftSorted },
      });

      if (leftSorted) {
        // Left half is sorted
        const inLeftRange = nums[left] <= target && target < nums[mid];

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Left half sorted. Check if target ${target} is in range [${nums[left]}, ${nums[mid]}): ${inLeftRange ? 'Yes' : 'No'}. ${inLeftRange ? 'Search left' : 'Search right'}.`,
          lineNumber: inLeftRange ? 15 : 17,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: inLeftRange
                  ? Array.from({ length: mid - left }, (_, i) => left + i)
                  : Array.from({ length: right - mid }, (_, i) => mid + 1 + i),
                pointers: [
                  { name: 'left', index: left, color: '#3b82f6' },
                  { name: 'right', index: right, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              target,
              left: inLeftRange ? left : mid + 1,
              right: inLeftRange ? mid - 1 : right,
              decision: inLeftRange ? 'search left' : 'search right',
              searchSpace: inLeftRange ? mid - left : right - mid,
            },
          },
          variables: { left, right },
        });

        if (inLeftRange) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else {
        // Right half is sorted
        const inRightRange = nums[mid] < target && target <= nums[right];

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Right half sorted. Check if target ${target} is in range (${nums[mid]}, ${nums[right]}]: ${inRightRange ? 'Yes' : 'No'}. ${inRightRange ? 'Search right' : 'Search left'}.`,
          lineNumber: inRightRange ? 22 : 24,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: inRightRange
                  ? Array.from({ length: right - mid }, (_, i) => mid + 1 + i)
                  : Array.from({ length: mid - left }, (_, i) => left + i),
                pointers: [
                  { name: 'left', index: left, color: '#3b82f6' },
                  { name: 'right', index: right, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              target,
              left: inRightRange ? mid + 1 : left,
              right: inRightRange ? right : mid - 1,
              decision: inRightRange ? 'search right' : 'search left',
              searchSpace: inRightRange ? right - mid : mid - left,
            },
          },
          variables: { left, right },
        });

        if (inRightRange) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Search space exhausted. Target ${target} not found. Return -1.`,
      lineNumber: 29,
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
          target,
          result: -1,
          notFound: true,
        },
      },
      variables: { result: -1 },
    });

    return { steps, result: -1 };
  },
};
