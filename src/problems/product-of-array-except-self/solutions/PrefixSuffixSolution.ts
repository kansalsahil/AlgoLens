import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ProductOfArrayExceptSelfInput } from '../types';

export const PrefixSuffixSolution: Solution<ProductOfArrayExceptSelfInput, number[]> = {
  id: 'prefix-suffix',
  name: 'Prefix-Suffix Products (Optimal)',
  description: 'Use prefix and suffix product arrays. For each position, multiply the prefix product (product of all elements to the left) with the suffix product (product of all elements to the right).',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const prefix = new Array(n);
  const suffix = new Array(n);
  const result = new Array(n);

  // Build prefix products
  prefix[0] = 1;
  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }

  // Build suffix products
  suffix[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  // Compute result
  for (let i = 0; i < n; i++) {
    result[i] = prefix[i] * suffix[i];
  }

  return result;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  int n = nums.length;
  int[] prefix = new int[n];
  int[] suffix = new int[n];
  int[] result = new int[n];

  // Build prefix products
  prefix[0] = 1;
  for (int i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }

  // Build suffix products
  suffix[n - 1] = 1;
  for (int i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  // Compute result
  for (int i = 0; i < n; i++) {
    result[i] = prefix[i] * suffix[i];
  }

  return result;
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  int n = nums.Length;
  int[] prefix = new int[n];
  int[] suffix = new int[n];
  int[] result = new int[n];

  // Build prefix products
  prefix[0] = 1;
  for (int i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }

  // Build suffix products
  suffix[n - 1] = 1;
  for (int i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  // Compute result
  for (int i = 0; i < n; i++) {
    result[i] = prefix[i] * suffix[i];
  }

  return result;
}`,
    },
  ],
  execute: (input: ProductOfArrayExceptSelfInput): SolutionExecution<number[]> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    const n = nums.length;
    const prefix: number[] = new Array(n);
    const suffix: number[] = new Array(n);
    const result: number[] = new Array(n);
    let stepId = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize prefix, suffix, and result arrays. Prefix[i] = product of all elements before i. Suffix[i] = product of all elements after i.',
      lineNumber: 3,
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
            id: 'prefix',
            name: 'prefix',
            values: [],
            highlights: [],
            pointers: [],
          },
          {
            id: 'suffix',
            name: 'suffix',
            values: [],
            highlights: [],
            pointers: [],
          },
          {
            id: 'result',
            name: 'result',
            values: [],
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          phase: 'init',
        },
      },
      variables: {},
    });

    // Build prefix products
    prefix[0] = 1;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Phase 1: Build prefix products. Set prefix[0] = 1 (no elements before index 0).',
      lineNumber: 8,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [0],
            pointers: [],
          },
          {
            id: 'prefix',
            name: 'prefix',
            values: [1, ...new Array(n - 1).fill('?')],
            highlights: [0],
            pointers: [],
          },
          {
            id: 'suffix',
            name: 'suffix',
            values: new Array(n).fill('?'),
            highlights: [],
            pointers: [],
          },
          {
            id: 'result',
            name: 'result',
            values: new Array(n).fill('?'),
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          phase: 'prefix',
          currentIndex: 0,
        },
      },
      variables: { prefix: [1] },
    });

    for (let i = 1; i < n; i++) {
      prefix[i] = prefix[i - 1] * nums[i - 1];

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `prefix[${i}] = prefix[${i - 1}] × nums[${i - 1}] = ${prefix[i - 1]} × ${nums[i - 1]} = ${prefix[i]}`,
        lineNumber: 10,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [i - 1],
              pointers: [
                { name: 'i', index: i, color: '#3b82f6' },
              ],
            },
            {
              id: 'prefix',
              name: 'prefix',
              values: [...prefix.slice(0, i + 1), ...new Array(n - i - 1).fill('?')],
              highlights: [i],
              pointers: [],
            },
            {
              id: 'suffix',
              name: 'suffix',
              values: new Array(n).fill('?'),
              highlights: [],
              pointers: [],
            },
            {
              id: 'result',
              name: 'result',
              values: new Array(n).fill('?'),
              highlights: [],
              pointers: [],
            },
          ],
          custom: {
            phase: 'prefix',
            currentIndex: i,
            prevPrefix: prefix[i - 1],
            numsValue: nums[i - 1],
            newPrefix: prefix[i],
          },
        },
        variables: { i, prefix: [...prefix.slice(0, i + 1)] },
      });
    }

    // Build suffix products
    suffix[n - 1] = 1;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Phase 2: Build suffix products. Set suffix[${n - 1}] = 1 (no elements after index ${n - 1}).`,
      lineNumber: 14,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [n - 1],
            pointers: [],
          },
          {
            id: 'prefix',
            name: 'prefix',
            values: prefix,
            highlights: [],
            pointers: [],
          },
          {
            id: 'suffix',
            name: 'suffix',
            values: [...new Array(n - 1).fill('?'), 1],
            highlights: [n - 1],
            pointers: [],
          },
          {
            id: 'result',
            name: 'result',
            values: new Array(n).fill('?'),
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          phase: 'suffix',
          currentIndex: n - 1,
        },
      },
      variables: { suffix: [1] },
    });

    for (let i = n - 2; i >= 0; i--) {
      suffix[i] = suffix[i + 1] * nums[i + 1];

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `suffix[${i}] = suffix[${i + 1}] × nums[${i + 1}] = ${suffix[i + 1]} × ${nums[i + 1]} = ${suffix[i]}`,
        lineNumber: 16,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [i + 1],
              pointers: [
                { name: 'i', index: i, color: '#3b82f6' },
              ],
            },
            {
              id: 'prefix',
              name: 'prefix',
              values: prefix,
              highlights: [],
              pointers: [],
            },
            {
              id: 'suffix',
              name: 'suffix',
              values: [...new Array(i).fill('?'), ...suffix.slice(i)],
              highlights: [i],
              pointers: [],
            },
            {
              id: 'result',
              name: 'result',
              values: new Array(n).fill('?'),
              highlights: [],
              pointers: [],
            },
          ],
          custom: {
            phase: 'suffix',
            currentIndex: i,
            nextSuffix: suffix[i + 1],
            numsValue: nums[i + 1],
            newSuffix: suffix[i],
          },
        },
        variables: { i, suffix: [...suffix.slice(i)] },
      });
    }

    // Compute result
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Phase 3: Compute result by multiplying prefix and suffix products for each position.',
      lineNumber: 20,
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
            id: 'prefix',
            name: 'prefix',
            values: prefix,
            highlights: [],
            pointers: [],
          },
          {
            id: 'suffix',
            name: 'suffix',
            values: suffix,
            highlights: [],
            pointers: [],
          },
          {
            id: 'result',
            name: 'result',
            values: new Array(n).fill('?'),
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          phase: 'result',
        },
      },
      variables: {},
    });

    for (let i = 0; i < n; i++) {
      result[i] = prefix[i] * suffix[i];

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `result[${i}] = prefix[${i}] × suffix[${i}] = ${prefix[i]} × ${suffix[i]} = ${result[i]}`,
        lineNumber: 21,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'nums',
              values: nums,
              highlights: [i],
              pointers: [],
            },
            {
              id: 'prefix',
              name: 'prefix',
              values: prefix,
              highlights: [i],
              pointers: [],
            },
            {
              id: 'suffix',
              name: 'suffix',
              values: suffix,
              highlights: [i],
              pointers: [],
            },
            {
              id: 'result',
              name: 'result',
              values: [...result.slice(0, i + 1), ...new Array(n - i - 1).fill('?')],
              highlights: [i],
              pointers: [
                { name: 'i', index: i, color: '#10b981' },
              ],
            },
          ],
          custom: {
            phase: 'result',
            currentIndex: i,
            prefixValue: prefix[i],
            suffixValue: suffix[i],
            resultValue: result[i],
          },
        },
        variables: { i, result: [...result.slice(0, i + 1)] },
      });
    }

    // Return result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Computed result for all ${n} positions. Return result array.`,
      lineNumber: 24,
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
            id: 'prefix',
            name: 'prefix',
            values: prefix,
            highlights: [],
            pointers: [],
          },
          {
            id: 'suffix',
            name: 'suffix',
            values: suffix,
            highlights: [],
            pointers: [],
          },
          {
            id: 'result',
            name: 'result',
            values: result,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          phase: 'complete',
          result: [...result],
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
