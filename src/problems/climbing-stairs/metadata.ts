import { ProblemTag } from '../../core/types';

export const CLIMBING_STAIRS_METADATA = {
  id: 'climbing-stairs',
  title: 'Climbing Stairs',
  difficulty: 'easy' as const,
  category: 'Dynamic Programming',
  tags: ['Dynamic Programming', 'Math', 'Memoization'] as ProblemTag[],
  description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
  examples: [
    {
      input: { n: 2 },
      output: 2,
      explanation: 'There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps',
    },
    {
      input: { n: 3 },
      output: 3,
      explanation: 'There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step',
    },
    {
      input: { n: 5 },
      output: 8,
      explanation: 'There are 8 distinct ways to climb 5 stairs using combinations of 1-step and 2-step moves.',
    },
  ],
  constraints: [
    '1 <= n <= 45',
  ],
  followUp: 'Can you solve it in O(1) space complexity?',
};
