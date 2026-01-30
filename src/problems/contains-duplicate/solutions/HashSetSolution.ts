import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ContainsDuplicateInput } from '../types';

export const HashSetSolution: Solution<ContainsDuplicateInput, boolean> = {
  id: 'hash-set',
  name: 'Hash Set (Optimal)',
  description: 'Use a hash set to track seen elements in a single pass.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();

  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) {
      return true;
    }
    seen.add(nums[i]);
  }

  return false;
}`,
  execute: (input: ContainsDuplicateInput): SolutionExecution<boolean> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    const seen = new Set<number>();
    let stepId = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize an empty set to track seen values. We will check each element once.',
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
          set: [],
          found: false,
        },
      },
      variables: {},
    });

    for (let i = 0; i < nums.length; i++) {
      const currentValue = nums[i];
      const alreadyExists = seen.has(currentValue);

      if (alreadyExists) {
        // Found duplicate
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Element ${currentValue} at index ${i} is already in the set. Duplicate found!`,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [i],
                pointers: [
                  { name: 'i', index: i, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              set: Array.from(seen),
              currentValue,
              currentIndex: i,
              inSet: true,
              found: true,
              result: true,
            },
          },
          variables: { i, currentValue, result: true },
        });

        return { steps, result: true };
      }

      // Add to set
      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Check element ${currentValue} at index ${i}. Not in set, so add it.`,
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
            set: Array.from(seen),
            currentValue,
            currentIndex: i,
            inSet: false,
            adding: true,
          },
        },
        variables: { i, currentValue },
      });

      seen.add(currentValue);

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Added ${currentValue} to the set. Continue to next element.`,
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
            set: Array.from(seen),
            lastAdded: currentValue,
          },
        },
        variables: { i },
      });
    }

    // No duplicates found
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Checked all ${nums.length} elements. No duplicates found. Return false.`,
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
          set: Array.from(seen),
          found: false,
          result: false,
        },
      },
      variables: { result: false },
    });

    return { steps, result: false };
  },
};
