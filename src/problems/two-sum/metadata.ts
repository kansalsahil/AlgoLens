export const TWO_SUM_METADATA = {
  id: 'two-sum',
  title: '1. Two Sum',
  difficulty: 'easy' as const,
  tags: ['Array', 'Hash Map', 'Iterative'] as const,
  category: 'Array', // Deprecated, kept for backward compatibility
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: { nums: [3, 5, 2, 8, 11, 4, 7], target: 9 },
      output: [2, 3],
      explanation: 'Because nums[2] + nums[3] == 9 (2 + 7), we return [2, 3].',
    },
    {
      input: { nums: [1, 4, 6, 3, 9, 2], target: 10 },
      output: [1, 4],
      explanation: 'Because nums[1] + nums[4] == 10 (4 + 6), we return [1, 4].',
    },
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      output: [0, 1],
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.',
  ],
};
