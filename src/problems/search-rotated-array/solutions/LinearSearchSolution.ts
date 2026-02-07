import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { SearchRotatedArrayInput } from '../types';

export const LinearSearchSolution: Solution<SearchRotatedArrayInput, number> = {
  id: 'linear-search',
  name: 'Linear Search',
  description: 'Scan through entire array to find target element.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `function search(nums: number[], target: number): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
  return -1;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  for (int i = 0; i < nums.length; i++) {  // Line 2
    if (nums[i] == target) {                // Line 3
      return i;                             // Line 4
    }
  }
  return -1;                                // Line 7
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  for (int i = 0; i < nums.Length; i++) {  // Line 2
    if (nums[i] == target) {                // Line 3
      return i;                             // Line 4
    }
  }
  return -1;                                // Line 7
}`,
    },
  ],
  execute: (input: SearchRotatedArrayInput): SolutionExecution<number> => {
    const { nums, target } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Search for target = ${target} using linear search.`,
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
        ],
        custom: {
          target,
          checked: 0,
        },
      },
      variables: { target },
    });

    for (let i = 0; i < nums.length; i++) {
      const isMatch = nums[i] === target;

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Check nums[${i}] = ${nums[i]}: ${isMatch ? 'Match found!' : 'Not a match'}`,
        lineNumber: 3,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: isMatch ? [i] : [],
              pointers: [
                { name: 'i', index: i, color: isMatch ? '#10b981' : '#3b82f6' },
              ],
            },
          ],
          custom: {
            target,
            currentValue: nums[i],
            currentIndex: i,
            isMatch,
            checked: i + 1,
          },
        },
        variables: { i, isMatch },
      });

      if (isMatch) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Target ${target} found at index ${i}!`,
          lineNumber: 4,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [i],
                pointers: [
                  { name: 'found', index: i, color: '#10b981' },
                ],
              },
            ],
            custom: {
              target,
              result: i,
              found: true,
              checked: i + 1,
            },
          },
          variables: { result: i },
        });

        return { steps, result: i };
      }
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Target ${target} not found in array. Return -1.`,
      lineNumber: 7,
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
          checked: nums.length,
        },
      },
      variables: { result: -1 },
    });

    return { steps, result: -1 };
  },
};
