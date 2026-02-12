import { ProblemTag } from '../../core/types';

export const MAXIMUM_SUBARRAY_METADATA = {
  id: 'maximum-subarray',
  title: 'Maximum Subarray (Kadane\'s Algorithm)',
  difficulty: 'medium' as const,
  category: 'Array',
  tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'] as ProblemTag[],
  description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.`,
  examples: [
    {
      input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
      output: 6,
      explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
    },
    {
      input: { nums: [1] },
      output: 1,
      explanation: 'The subarray [1] has the largest sum 1.',
    },
    {
      input: { nums: [5, 4, -1, 7, 8] },
      output: 23,
      explanation: 'The subarray [5,4,-1,7,8] has the largest sum 23.',
    },
  ],
  constraints: [
    '1 <= nums.length <= 10^5',
    '-10^4 <= nums[i] <= 10^4',
  ],
  followUp: 'If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.',
};
