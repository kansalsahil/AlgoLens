import { ProblemTag } from '../../core/types';

export const COIN_CHANGE_METADATA = {
  id: 'coin-change',
  title: 'Coin Change',
  difficulty: 'medium' as const,
  category: 'Dynamic Programming',
  tags: ['Dynamic Programming', 'Array', 'Breadth-First Search'] as ProblemTag[],
  description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.`,
  examples: [
    {
      input: { coins: [1, 2, 5], amount: 11 },
      output: 3,
      explanation: '11 = 5 + 5 + 1 (3 coins is the minimum)',
    },
    {
      input: { coins: [2], amount: 3 },
      output: -1,
      explanation: 'The amount of 3 cannot be made up with coins of 2.',
    },
    {
      input: { coins: [1], amount: 0 },
      output: 0,
      explanation: 'Zero amount requires zero coins.',
    },
    {
      input: { coins: [1, 2, 5], amount: 7 },
      output: 2,
      explanation: '7 = 5 + 2 (2 coins is the minimum)',
    },
  ],
  constraints: [
    '1 <= coins.length <= 12',
    '1 <= coins[i] <= 2^31 - 1',
    '0 <= amount <= 10^4',
  ],
  followUp: 'Can you solve it in O(amount × coins) time and O(amount) space?',
};
