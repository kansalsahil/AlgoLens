import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { FindMinimumRotatedArrayInput } from '../types';

export const BinarySearchSolution: Solution<FindMinimumRotatedArrayInput, number> = {
  id: 'binary-search',
  name: 'Binary Search (Optimal)',
  description: 'Use binary search to find the rotation point where minimum element exists.',
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  code: `function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      // Minimum is in right half
      left = mid + 1;
    } else {
      // Minimum is in left half (including mid)
      right = mid;
    }
  }

  return nums[left];
}`,
  execute: (input: FindMinimumRotatedArrayInput): SolutionExecution<number> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let left = 0;
    let right = nums.length - 1;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize left = 0, right = ${right}. Use binary search to find rotation point.`,
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
          left,
          right,
          searchSpace: right - left + 1,
        },
      },
      variables: { left, right },
    });

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Calculate mid = ${mid}. Compare nums[mid] (${nums[mid]}) with nums[right] (${nums[right]}).`,
        lineNumber: 6,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [mid, right],
              pointers: [
                { name: 'left', index: left, color: '#3b82f6' },
                { name: 'mid', index: mid, color: '#10b981' },
                { name: 'right', index: right, color: '#ef4444' },
              ],
            },
          ],
          custom: {
            left,
            mid,
            right,
            midValue: nums[mid],
            rightValue: nums[right],
            comparing: true,
            searchSpace: right - left + 1,
          },
        },
        variables: { left, mid, right },
      });

      if (nums[mid] > nums[right]) {
        // Minimum is in right half
        const oldLeft = left;
        left = mid + 1;

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `nums[mid] (${nums[mid]}) > nums[right] (${nums[right]}). Minimum must be in right half. Move left to ${left}.`,
          lineNumber: 9,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
                pointers: [
                  { name: 'left', index: left, color: '#3b82f6' },
                  { name: 'right', index: right, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              left,
              right,
              movedLeft: true,
              eliminatedRange: `[${oldLeft}, ${mid}]`,
              searchSpace: right - left + 1,
            },
          },
          variables: { left, right },
        });
      } else {
        // Minimum is in left half (including mid)
        const oldRight = right;
        right = mid;

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `nums[mid] (${nums[mid]}) <= nums[right] (${nums[oldRight]}). Minimum is in left half (including mid). Move right to ${right}.`,
          lineNumber: 12,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
                pointers: [
                  { name: 'left', index: left, color: '#3b82f6' },
                  { name: 'right', index: right, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              left,
              right,
              movedRight: true,
              eliminatedRange: `[${mid + 1}, ${oldRight}]`,
              searchSpace: right - left + 1,
            },
          },
          variables: { left, right },
        });
      }
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `left == right at index ${left}. Found minimum: ${nums[left]}`,
      lineNumber: 16,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [left],
            pointers: [
              { name: 'left/right', index: left, color: '#10b981' },
            ],
          },
        ],
        custom: {
          left,
          right,
          result: nums[left],
          found: true,
        },
      },
      variables: { result: nums[left] },
    });

    return { steps, result: nums[left] };
  },
};
