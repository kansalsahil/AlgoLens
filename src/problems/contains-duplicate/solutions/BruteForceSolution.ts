import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ContainsDuplicateInput } from '../types';

export const BruteForceSolution: Solution<ContainsDuplicateInput, boolean> = {
  id: 'brute-force',
  name: 'Brute Force (Nested Loops)',
  description: 'Compare each element with every other element to find duplicates.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  code: `function containsDuplicate(nums: number[]): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }
  return false;
}`,
  execute: (input: ContainsDuplicateInput): SolutionExecution<boolean> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Start with the array. We will compare each element with all elements after it.',
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
          comparisons: 0,
          found: false,
        },
      },
      variables: {},
    });

    let comparisons = 0;
    let found = false;

    // Brute force: nested loops
    for (let i = 0; i < nums.length && !found; i++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Outer loop: Checking element at index ${i} (value = ${nums[i]})`,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [i],
              pointers: [
                { name: 'i', index: i, color: '#3b82f6' },
              ],
            },
          ],
          custom: {
            comparisons,
            currentI: i,
            currentValue: nums[i],
          },
        },
        variables: { i, currentValue: nums[i] },
      });

      for (let j = i + 1; j < nums.length && !found; j++) {
        comparisons++;
        const isMatch = nums[i] === nums[j];

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Compare nums[${i}] (${nums[i]}) with nums[${j}] (${nums[j]}): ${isMatch ? 'Match found!' : 'No match'}`,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: isMatch ? [i, j] : [],
                pointers: [
                  { name: 'i', index: i, color: '#3b82f6' },
                  { name: 'j', index: j, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              comparisons,
              currentI: i,
              currentJ: j,
              comparing: true,
              isMatch,
              valueI: nums[i],
              valueJ: nums[j],
            },
          },
          variables: { i, j, isMatch },
        });

        if (isMatch) {
          found = true;
          steps.push({
            id: `step-${stepId++}`,
            type: 'return',
            description: `Duplicate found! nums[${i}] = nums[${j}] = ${nums[i]}. Return true.`,
            visualizationData: {
              arrays: [
                {
                  id: 'nums',
                  name: 'nums',
                  values: nums,
                  highlights: [i, j],
                  pointers: [
                    { name: 'i', index: i, color: '#3b82f6' },
                    { name: 'j', index: j, color: '#ef4444' },
                  ],
                },
              ],
              custom: {
                comparisons,
                found: true,
                result: true,
                duplicateIndices: [i, j],
                duplicateValue: nums[i],
              },
            },
            variables: { result: true },
          });
        }
      }
    }

    if (!found) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: `No duplicates found after ${comparisons} comparisons. Return false.`,
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
            comparisons,
            found: false,
            result: false,
          },
        },
        variables: { result: false },
      });
    }

    return { steps, result: found };
  },
};
