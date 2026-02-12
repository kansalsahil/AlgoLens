import { ProblemTag } from '../../core/types';

export const CONTAINER_WITH_MOST_WATER_METADATA = {
  id: 'container-with-most-water',
  title: 'Container With Most Water',
  difficulty: 'medium' as const,
  category: 'Two Pointers',
  tags: ['Array', 'Two Pointers', 'Greedy'] as ProblemTag[],
  description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
  examples: [
    {
      input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
      output: 49,
      explanation: 'The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. The max area of water (blue section) the container can contain is 49, between the lines at indices 1 and 8.',
    },
    {
      input: { height: [1, 1] },
      output: 1,
      explanation: 'The container with lines at indices 0 and 1 can hold 1 unit of water.',
    },
    {
      input: { height: [4, 3, 2, 1, 4] },
      output: 16,
      explanation: 'The container with lines at indices 0 and 4 can hold 16 units of water (min height 4 * width 4 = 16).',
    },
  ],
  constraints: [
    'n == height.length',
    '2 <= n <= 10^5',
    '0 <= height[i] <= 10^4',
  ],
  followUp: 'Can you solve this problem in O(n) time instead of O(n²)?',
};
