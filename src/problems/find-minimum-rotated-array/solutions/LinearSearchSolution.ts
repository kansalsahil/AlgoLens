import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { FindMinimumRotatedArrayInput } from '../types';

export const LinearSearchSolution: Solution<FindMinimumRotatedArrayInput, number> = {
  id: 'linear-search',
  name: 'Linear Search',
  description: 'Scan through entire array to find minimum element.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `function findMin(nums: number[]): number {
  let min = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < min) {
      min = nums[i];
    }
  }

  return min;
}`,
  execute: (input: FindMinimumRotatedArrayInput): SolutionExecution<number> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let min = nums[0];

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize min = ${min}. Will scan entire array to find minimum.`,
      lineNumber: 2,
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
          min,
          minIndex: 0,
          checked: 1,
        },
      },
      variables: { min },
    });

    for (let i = 1; i < nums.length; i++) {
      const isSmaller = nums[i] < min;

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Compare nums[${i}] (${nums[i]}) with current min (${min}): ${isSmaller ? 'Found new minimum!' : 'Not smaller'}`,
        lineNumber: 4,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: isSmaller ? [i] : [],
              pointers: [
                { name: 'i', index: i, color: '#ef4444' },
              ],
            },
          ],
          custom: {
            min,
            currentValue: nums[i],
            currentIndex: i,
            isSmaller,
            checked: i + 1,
          },
        },
        variables: { i, min, isSmaller },
      });

      if (isSmaller) {
        min = nums[i];

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Update min = ${min}`,
          lineNumber: 5,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [i],
                pointers: [],
              },
            ],
            custom: {
              min,
              minIndex: i,
              updated: true,
              checked: i + 1,
            },
          },
          variables: { i, min },
        });
      }
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Scanned all ${nums.length} elements. Minimum found: ${min}`,
      lineNumber: 9,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [nums.indexOf(min)],
            pointers: [],
          },
        ],
        custom: {
          min,
          minIndex: nums.indexOf(min),
          result: min,
          checked: nums.length,
        },
      },
      variables: { result: min },
    });

    return { steps, result: min };
  },
};
