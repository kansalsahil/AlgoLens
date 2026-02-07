import { ProblemMetadata } from '../../core/types';

export const PRODUCT_OF_ARRAY_EXCEPT_SELF_METADATA: ProblemMetadata = {
  id: 'product-of-array-except-self',
  title: 'Product of Array Except Self',
  leetcodeNumber: 238,
  difficulty: 'medium',
  category: 'arrays',
  tags: ['Array'],
  description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operator.`,
  examples: [
    {
      input: { nums: [1, 2, 3, 4] },
      output: [24, 12, 8, 6],
      explanation: 'For index 0: 2*3*4 = 24, index 1: 1*3*4 = 12, index 2: 1*2*4 = 8, index 3: 1*2*3 = 6',
    },
    {
      input: { nums: [-1, 1, 0, -3, 3] },
      output: [0, 0, 9, 0, 0],
      explanation: 'For index 2: (-1)*1*(-3)*3 = 9. All other positions include the 0, so the product is 0.',
    },
    {
      input: { nums: [2, 3, 4, 5] },
      output: [60, 40, 30, 24],
      explanation: 'For index 0: 3*4*5 = 60, index 1: 2*4*5 = 40, index 2: 2*3*5 = 30, index 3: 2*3*4 = 24',
    },
  ],
  constraints: [
    '2 <= nums.length <= 10^5',
    '-30 <= nums[i] <= 30',
    'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.',
  ],
};
