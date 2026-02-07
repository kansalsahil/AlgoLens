import { Solution, AnimationStep, SolutionExecution } from '../../../core/types';
import { TwoSumInput } from '../types';

export const BruteForceSolution: Solution<TwoSumInput, number[]> = {
  id: 'brute-force',
  name: 'Brute Force',
  description: 'Check every pair of numbers using nested loops',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',

  code: `function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return new int[] { i, j };
      }
    }
  }
  return new int[] {};
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  for (int i = 0; i < nums.Length; i++) {
    for (int j = i + 1; j < nums.Length; j++) {
      if (nums[i] + nums[j] == target) {
        return new int[] { i, j };
      }
    }
  }
  return new int[] { };
}`,
    },
  ],

  execute: (input: TwoSumInput): SolutionExecution<number[]> => {
    const { nums, target } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Step 1: Initialization
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initializing pair comparison (target: ${target})`,
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
          isBruteForce: true,
        },
      },
      variables: { i: null, j: null },
    });

    // Nested loop iterations
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const currentSum = nums[i] + nums[j];
        const isMatch = currentSum === target;

        // Show comparison
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Evaluating nums[${i}] + nums[${j}] = ${currentSum}${isMatch ? ' (match)' : ''}`,
          lineNumber: 4,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'nums',
                values: nums,
                highlights: [i, j],
                pointers: [
                  { name: 'i', index: i, color: '#3b82f6' },
                  { name: 'j', index: j, color: '#8b5cf6' },
                ],
              },
            ],
            custom: {
              target,
              currentSum,
              isBruteForce: true,
              isMatch,
              valueI: nums[i],
              valueJ: nums[j],
            },
          },
          variables: { i, j, sum: currentSum },
        });

        // Check if sum equals target
        if (isMatch) {
          const result = [i, j];
          steps.push({
            id: `step-${stepId++}`,
            type: 'return',
            description: `Solution found at indices [${i}, ${j}]`,
            lineNumber: 5,
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
                target,
                currentSum: target,
                isBruteForce: true,
                isMatch: true,
                result,
              },
            },
            variables: { i, j, result },
          });

          return { steps, result };
        }
      }
    }

    return { steps, result: [] };
  },
};
