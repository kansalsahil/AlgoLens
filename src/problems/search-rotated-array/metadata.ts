import { ProblemMetadata } from '../../core/types';

export const SEARCH_ROTATED_ARRAY_METADATA: ProblemMetadata = {
  id: 'search-rotated-array',
  title: 'Search in Rotated Sorted Array',
  leetcodeNumber: 33,
  difficulty: 'medium',
  category: 'binary-search',
  tags: ['Array', 'Binary Search'],
  description: `There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.`,
  examples: [
    {
      input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
      output: 4,
      explanation: 'Target 0 is found at index 4.',
    },
    {
      input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 },
      output: -1,
      explanation: 'Target 3 is not in the array.',
    },
    {
      input: { nums: [1], target: 0 },
      output: -1,
      explanation: 'Single element array, target not found.',
    },
    {
      input: { nums: [1, 3, 5], target: 5 },
      output: 2,
      explanation: 'No rotation, standard binary search. Target at index 2.',
    },
    {
      input: { nums: [5, 1, 3], target: 3 },
      output: 2,
      explanation: 'Array rotated, target found at index 2.',
    },
  ],
  constraints: [
    '1 <= nums.length <= 5000',
    '-10^4 <= nums[i] <= 10^4',
    'All values of nums are unique',
    'nums is an ascending array that is possibly rotated',
    '-10^4 <= target <= 10^4',
  ],
};
