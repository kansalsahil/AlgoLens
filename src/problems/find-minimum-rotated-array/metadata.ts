import { ProblemMetadata } from '../../core/types';

export const FIND_MINIMUM_ROTATED_ARRAY_METADATA: ProblemMetadata = {
  id: 'find-minimum-rotated-array',
  title: 'Find Minimum in Rotated Sorted Array',
  leetcodeNumber: 153,
  difficulty: 'medium',
  category: 'binary-search',
  tags: ['Array', 'Binary Search'],
  description: `Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

- [4,5,6,7,0,1,2] if it was rotated 4 times.
- [0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.`,
  examples: [
    {
      input: { nums: [3, 4, 5, 1, 2] },
      output: 1,
      explanation: 'The original array was [1,2,3,4,5] rotated 3 times.',
    },
    {
      input: { nums: [4, 5, 6, 7, 0, 1, 2] },
      output: 0,
      explanation: 'The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.',
    },
    {
      input: { nums: [11, 13, 15, 17] },
      output: 11,
      explanation: 'The original array was [11,13,15,17] and it was rotated 4 times (no rotation effect).',
    },
    {
      input: { nums: [2, 1] },
      output: 1,
      explanation: 'Simple case with 2 elements.',
    },
    {
      input: { nums: [3, 1, 2] },
      output: 1,
      explanation: 'The minimum is at the rotation point.',
    },
  ],
  constraints: [
    'n == nums.length',
    '1 <= n <= 5000',
    '-5000 <= nums[i] <= 5000',
    'All the integers of nums are unique',
    'nums is sorted and rotated between 1 and n times',
  ],
};
