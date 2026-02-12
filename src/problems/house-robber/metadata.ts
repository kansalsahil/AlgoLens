import { ProblemTag } from '../../core/types';

export const HOUSE_ROBBER_METADATA = {
  id: 'house-robber',
  title: 'House Robber',
  difficulty: 'medium' as const,
  category: 'Dynamic Programming',
  tags: ['Dynamic Programming', 'Array', 'Memoization'] as ProblemTag[],
  description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
  examples: [
    {
      input: { nums: [2, 7, 9, 3, 1] },
      output: 12,
      explanation: 'Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).\nTotal amount you can rob = 2 + 9 + 1 = 12.',
    },
    {
      input: { nums: [1, 2, 3, 1] },
      output: 4,
      explanation: 'Rob house 1 (money = 1) and rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4.',
    },
    {
      input: { nums: [2, 1, 1, 2] },
      output: 4,
      explanation: 'Rob house 1 (money = 2) and rob house 4 (money = 2).\nTotal amount you can rob = 2 + 2 = 4.',
    },
  ],
  constraints: [
    '1 <= nums.length <= 100',
    '0 <= nums[i] <= 400',
  ],
  followUp: 'Can you solve it in O(1) space complexity?',
};
