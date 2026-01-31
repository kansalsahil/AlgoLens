import { ProblemMetadata } from '../../core/types';

export const THREE_SUM_METADATA: ProblemMetadata = {
  id: 'three-sum',
  title: '3Sum',
  leetcodeNumber: 15,
  difficulty: 'medium',
  category: 'two-pointers',
  tags: ['Array', 'Two Pointers'],
  description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
  examples: [
    {
      input: { nums: [-1, 0, 1, 2, -1, -4] },
      output: [[-1, -1, 2], [-1, 0, 1]],
      explanation: 'The distinct triplets are [-1,0,1] and [-1,-1,2]. Notice that the order of the output and the order of the triplets does not matter.',
    },
    {
      input: { nums: [0, 1, 1] },
      output: [],
      explanation: 'The only possible triplet does not sum up to 0.',
    },
    {
      input: { nums: [0, 0, 0] },
      output: [[0, 0, 0]],
      explanation: 'The only possible triplet sums up to 0.',
    },
    {
      input: { nums: [-2, 0, 1, 1, 2] },
      output: [[-2, 0, 2], [-2, 1, 1]],
      explanation: 'Two distinct triplets sum to 0.',
    },
  ],
  constraints: [
    '3 <= nums.length <= 3000',
    '-10^5 <= nums[i] <= 10^5',
  ],
};
