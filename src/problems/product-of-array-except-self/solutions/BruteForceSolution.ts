import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ProductOfArrayExceptSelfInput } from '../types';

export const BruteForceSolution: Solution<ProductOfArrayExceptSelfInput, number[]> = {
  id: 'brute-force',
  name: 'Brute Force',
  description: 'For each position, calculate the product of all other elements using nested loops.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(n)',
  code: `function productExceptSelf(nums: number[]): number[] {
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) {
        product *= nums[j];
      }
    }
    result[i] = product;
  }

  return result;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  int[] result = new int[nums.length];

  for (int i = 0; i < nums.length; i++) {
    int product = 1;
    for (int j = 0; j < nums.length; j++) {
      if (i != j) {
        product *= nums[j];
      }
    }
    result[i] = product;
  }

  return result;
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  int[] result = new int[nums.Length];

  for (int i = 0; i < nums.Length; i++) {
    int product = 1;
    for (int j = 0; j < nums.Length; j++) {
      if (i != j) {
        product *= nums[j];
      }
    }
    result[i] = product;
  }

  return result;
}`,
    },
  ],
  execute: (input: ProductOfArrayExceptSelfInput): SolutionExecution<number[]> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    const result: number[] = [];
    let stepId = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize result array. For each position i, we will calculate the product of all elements except i.',
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
            id: 'result',
            name: 'result',
            values: [],
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          currentI: -1,
          currentJ: -1,
          product: 1,
          calculating: false,
        },
      },
      variables: {},
    });

    for (let i = 0; i < nums.length; i++) {
      let product = 1;

      // Start calculating product for position i
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Calculate product for index ${i}. Initialize product = 1.`,
        lineNumber: 5,
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
            {
              id: 'result',
              name: 'result',
              values: result.length > 0 ? result : new Array(nums.length).fill('?'),
              highlights: [i],
              pointers: [],
            },
          ],
          custom: {
            currentI: i,
            currentJ: -1,
            product: 1,
            calculating: true,
            skipIndex: i,
          },
        },
        variables: { i, product: 1 },
      });

      for (let j = 0; j < nums.length; j++) {
        if (i !== j) {
          const oldProduct = product;
          product *= nums[j];

          steps.push({
            id: `step-${stepId++}`,
            type: 'comparison',
            description: `Multiply product by nums[${j}] = ${nums[j]}. Product: ${oldProduct} × ${nums[j]} = ${product}`,
            lineNumber: 8,
            visualizationData: {
              arrays: [
                {
                  id: 'nums',
                  name: 'nums',
                  values: nums,
                  highlights: [i, j],
                  pointers: [
                    { name: 'i', index: i, color: '#ef4444' },
                    { name: 'j', index: j, color: '#3b82f6' },
                  ],
                },
                {
                  id: 'result',
                  name: 'result',
                  values: result.length > 0 ? result : new Array(nums.length).fill('?'),
                  highlights: [i],
                  pointers: [],
                },
              ],
              custom: {
                currentI: i,
                currentJ: j,
                product,
                oldProduct,
                currentValue: nums[j],
                multiplying: true,
                skipIndex: i,
              },
            },
            variables: { i, j, product, currentValue: nums[j] },
          });
        } else {
          // Skip when i === j
          steps.push({
            id: `step-${stepId++}`,
            type: 'comparison',
            description: `Skip index ${j} (i === j). Don't include nums[${i}] in the product.`,
            lineNumber: 7,
            visualizationData: {
              arrays: [
                {
                  id: 'nums',
                  name: 'nums',
                  values: nums,
                  highlights: [i],
                  pointers: [
                    { name: 'i', index: i, color: '#ef4444' },
                    { name: 'j', index: j, color: '#9ca3af' },
                  ],
                },
                {
                  id: 'result',
                  name: 'result',
                  values: result.length > 0 ? result : new Array(nums.length).fill('?'),
                  highlights: [i],
                  pointers: [],
                },
              ],
              custom: {
                currentI: i,
                currentJ: j,
                product,
                skipping: true,
                skipIndex: i,
              },
            },
            variables: { i, j, product },
          });
        }
      }

      // Store result
      result[i] = product;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Store product ${product} in result[${i}].`,
        lineNumber: 11,
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
              id: 'result',
              name: 'result',
              values: [...result],
              highlights: [i],
              pointers: [],
            },
          ],
          custom: {
            currentI: i,
            currentJ: -1,
            product,
            stored: true,
            storedIndex: i,
          },
        },
        variables: { i, product, result: [...result] },
      });
    }

    // Return result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Calculated product for all ${nums.length} positions. Return result array.`,
      lineNumber: 14,
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
            id: 'result',
            name: 'result',
            values: result,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          result: [...result],
          complete: true,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
