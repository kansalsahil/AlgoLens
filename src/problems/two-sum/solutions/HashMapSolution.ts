import { Solution, AnimationStep, SolutionExecution } from '../../../core/types';
import { TwoSumInput } from '../types';

export const HashMapSolution: Solution<TwoSumInput, number[]> = {
  id: 'hash-map',
  name: 'Hash Map',
  description: 'Use a hash map to store complements for O(n) solution',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',

  code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  return [];
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  Map<Integer, Integer> map = new HashMap<>();

  for (int i = 0; i < nums.length; i++) {
    int complement = target - nums[i];

    if (map.containsKey(complement)) {
      return new int[] { map.get(complement), i };
    }

    map.put(nums[i], i);
  }

  return new int[] {};
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  var map = new Dictionary<int, int>();

  for (int i = 0; i < nums.Length; i++) {
    int complement = target - nums[i];

    if (map.ContainsKey(complement)) {
      return new int[] { map[complement], i };
    }

    map[nums[i]] = i;
  }

  return new int[] { };
}`,
    },
  ],

  execute: (input: TwoSumInput): SolutionExecution<number[]> => {
    const { nums, target } = input;
    const steps: AnimationStep[] = [];
    const map = new Map<number, number>();
    let stepId = 0;

    // Step 1: Initialization
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initializing hash map (target: ${target})`,
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
          map: Array.from(map.entries()),
          target,
          isBruteForce: false,
        },
      },
      variables: { i: null, complement: null, map: [] },
    });

    // Step 2+: Iteration
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      const hasComplement = map.has(complement);

      // Show current iteration start
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Checking nums[${i}] = ${nums[i]}, complement: ${complement}${hasComplement ? ' (found)' : ''}`,
        lineNumber: 4,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
            },
          ],
          custom: {
            map: Array.from(map.entries()),
            target,
            currentValue: nums[i],
            complement,
            hasComplement,
            isBruteForce: false,
          },
        },
        variables: { i, complement, map: Array.from(map.entries()) },
      });

      // Check if complement exists
      if (hasComplement) {
        const result = [map.get(complement)!, i];
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Solution found at indices [${result[0]}, ${result[1]}]`,
          lineNumber: 8,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: result,
                pointers: [],
              },
            ],
            custom: {
              map: Array.from(map.entries()),
              target,
              result,
              hasComplement: true,
              isBruteForce: false,
            },
          },
          variables: { i, complement, map: Array.from(map.entries()), result },
        });

        return { steps, result };
      }

      // Add to map
      map.set(nums[i], i);
      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Storing nums[${i}] = ${nums[i]} at index ${i}`,
        lineNumber: 11,
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
            map: Array.from(map.entries()),
            target,
            justAdded: [nums[i], i],
            isBruteForce: false,
          },
        },
        variables: { i, complement, map: Array.from(map.entries()) },
      });
    }

    return { steps, result: [] };
  },
};
