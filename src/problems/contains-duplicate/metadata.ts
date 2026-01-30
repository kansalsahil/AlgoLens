import { ProblemMetadata } from '../../core/types';

export const CONTAINS_DUPLICATE_METADATA: ProblemMetadata = {
  id: 'contains-duplicate',
  title: 'Contains Duplicate',
  leetcodeNumber: 217,
  difficulty: 'easy',
  category: 'arrays',
  tags: ['Array', 'Hash Map'],
  description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
  examples: [
    {
      input: { nums: [1, 2, 3, 1] },
      output: true,
      explanation: 'The element 1 appears at indices 0 and 3.',
    },
    {
      input: { nums: [1, 2, 3, 4] },
      output: false,
      explanation: 'All elements are distinct.',
    },
    {
      input: { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] },
      output: true,
      explanation: 'Multiple elements appear more than once.',
    },
  ],
  constraints: [
    '1 <= nums.length <= 10^5',
    '-10^9 <= nums[i] <= 10^9',
  ],
};
