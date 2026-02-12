import { ProblemTag } from '../../core/types';

export const BEST_TIME_TO_BUY_SELL_STOCK_METADATA = {
  id: 'best-time-to-buy-sell-stock',
  title: 'Best Time to Buy and Sell Stock',
  difficulty: 'easy' as const,
  category: 'Array',
  tags: ['Array', 'Dynamic Programming', 'Greedy'] as ProblemTag[],
  description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
  examples: [
    {
      input: { prices: [7, 1, 5, 3, 6, 4] },
      output: 5,
      explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.',
    },
    {
      input: { prices: [7, 6, 4, 3, 1] },
      output: 0,
      explanation: 'In this case, no transactions are done and the max profit = 0.',
    },
    {
      input: { prices: [2, 4, 1, 7, 5, 11] },
      output: 10,
      explanation: 'Buy on day 3 (price = 1) and sell on day 6 (price = 11), profit = 11-1 = 10.',
    },
  ],
  constraints: [
    '1 <= prices.length <= 10^5',
    '0 <= prices[i] <= 10^4',
  ],
  followUp: 'What if you could complete multiple transactions (buy and sell multiple times)?',
};
