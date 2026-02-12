import { ProblemTag } from '../../core/types';

export const LONGEST_INCREASING_SUBSEQUENCE_METADATA = {
  id: 'longest-increasing-subsequence',
  title: 'Longest Increasing Subsequence',
  difficulty: 'medium' as const,
  category: 'Dynamic Programming',
  tags: ['Array', 'Dynamic Programming', 'Binary Search'] as ProblemTag[],
  description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.`,
  examples: [
    {
      input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] },
      output: 4,
      explanation: 'The longest increasing subsequence is [2,3,7,101] or [2,3,7,18], therefore the length is 4.',
    },
    {
      input: { nums: [0, 1, 0, 3, 2, 3] },
      output: 4,
      explanation: 'The longest increasing subsequence is [0,1,2,3], therefore the length is 4.',
    },
    {
      input: { nums: [7, 7, 7, 7, 7, 7, 7] },
      output: 1,
      explanation: 'Since all elements are equal, any single element forms the longest increasing subsequence.',
    },
  ],
  constraints: [
    '1 <= nums.length <= 2500',
    '-10^4 <= nums[i] <= 10^4',
  ],
  followUp: 'Can you come up with an algorithm that runs in O(n log n) time complexity?',
};
