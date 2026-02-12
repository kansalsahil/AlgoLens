import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { BestTimeToBuySellStockInput } from '../types';

export const BruteForceSolution: Solution<BestTimeToBuySellStockInput, number> = {
  id: 'brute-force',
  name: 'Brute Force',
  description: 'Try all possible buy-sell pairs and find the maximum profit. For each day, consider it as a buy day and check all future days as potential sell days.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  code: `function maxProfit(prices: number[]): number {
  let maxProfit = 0;

  // Try every possible buy day
  for (let buy = 0; buy < prices.length - 1; buy++) {
    // Try every possible sell day after buy day
    for (let sell = buy + 1; sell < prices.length; sell++) {
      const profit = prices[sell] - prices[buy];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (prices == null || prices.length < 2) return 0;     // Line 2
                                                          // Line 3
  int maxProfit = 0;                                      // Line 4
                                                          // Line 5
  // Try every possible buy day                          // Line 6
  for (int buy = 0; buy < prices.length - 1; buy++) {    // Line 7
    // Try every possible sell day after buy day         // Line 8
    for (int sell = buy + 1; sell < prices.length; sell++) {  // Line 9
      int profit = prices[sell] - prices[buy];           // Line 10
      maxProfit = Math.max(maxProfit, profit);           // Line 11
    }
  }
                                                          // Line 14
  return maxProfit;                                       // Line 15
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (prices == null || prices.Length < 2) return 0;     // Line 2
                                                          // Line 3
  int maxProfit = 0;                                      // Line 4
                                                          // Line 5
  // Try every possible buy day                          // Line 6
  for (int buy = 0; buy < prices.Length - 1; buy++) {    // Line 7
    // Try every possible sell day after buy day         // Line 8
    for (int sell = buy + 1; sell < prices.Length; sell++) {  // Line 9
      int profit = prices[sell] - prices[buy];           // Line 10
      maxProfit = Math.Max(maxProfit, profit);           // Line 11
    }
  }
                                                          // Line 14
  return maxProfit;                                       // Line 15
}`,
    },
  ],

  execute: (input: BestTimeToBuySellStockInput): SolutionExecution<number> => {
    const { prices } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let maxProfit = 0;
    let bestBuyDay = -1;
    let bestSellDay = -1;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize maxProfit = 0. We'll try all possible buy-sell pairs.`,
      lineNumber: 4,
      visualizationData: {
        arrays: [
          {
            id: 'prices',
            name: 'prices',
            values: prices,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          prices,
          maxProfit: 0,
          currentBuy: -1,
          currentSell: -1,
          bestBuyDay: -1,
          bestSellDay: -1,
        },
      },
      variables: { maxProfit: 0 },
    });

    // Try every possible buy day
    for (let buy = 0; buy < prices.length - 1; buy++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Try buying on day ${buy + 1} at price $${prices[buy]}`,
        lineNumber: 7,
        visualizationData: {
          arrays: [
            {
              id: 'prices',
              name: 'prices',
              values: prices,
              highlights: [buy],
              pointers: [{ name: 'buy', index: buy, color: '#3b82f6' }],
            },
          ],
          custom: {
            prices,
            maxProfit,
            currentBuy: buy,
            currentSell: -1,
            bestBuyDay,
            bestSellDay,
            buyPrice: prices[buy],
          },
        },
        variables: { buy, buyPrice: prices[buy], maxProfit },
      });

      // Try every possible sell day after buy day
      for (let sell = buy + 1; sell < prices.length; sell++) {
        const profit = prices[sell] - prices[buy];

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Sell on day ${sell + 1} at $${prices[sell]}. Profit = $${prices[sell]} - $${prices[buy]} = $${profit}`,
          lineNumber: 10,
          visualizationData: {
            arrays: [
              {
                id: 'prices',
                name: 'prices',
                values: prices,
                highlights: [buy, sell],
                pointers: [
                  { name: 'buy', index: buy, color: '#3b82f6' },
                  { name: 'sell', index: sell, color: '#10b981' },
                ],
              },
            ],
            custom: {
              prices,
              maxProfit,
              currentBuy: buy,
              currentSell: sell,
              bestBuyDay,
              bestSellDay,
              buyPrice: prices[buy],
              sellPrice: prices[sell],
              currentProfit: profit,
              comparing: true,
            },
          },
          variables: { buy, sell, profit, maxProfit },
        });

        if (profit > maxProfit) {
          maxProfit = profit;
          bestBuyDay = buy;
          bestSellDay = sell;

          steps.push({
            id: `step-${stepId++}`,
            type: 'assignment',
            description: `New maximum profit found! $${profit} > $${maxProfit - profit}. Update maxProfit = $${profit}`,
            lineNumber: 11,
            visualizationData: {
              arrays: [
                {
                  id: 'prices',
                  name: 'prices',
                  values: prices,
                  highlights: [buy, sell],
                  pointers: [
                    { name: 'buy', index: buy, color: '#3b82f6' },
                    { name: 'sell', index: sell, color: '#10b981' },
                  ],
                },
              ],
              custom: {
                prices,
                maxProfit,
                currentBuy: buy,
                currentSell: sell,
                bestBuyDay,
                bestSellDay,
                buyPrice: prices[buy],
                sellPrice: prices[sell],
                currentProfit: profit,
                newMaxFound: true,
              },
            },
            variables: { maxProfit, bestBuyDay, bestSellDay },
          });
        }
      }
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: bestBuyDay >= 0
        ? `Maximum profit: $${maxProfit}. Buy on day ${bestBuyDay + 1} ($${prices[bestBuyDay]}), sell on day ${bestSellDay + 1} ($${prices[bestSellDay]})`
        : `No profitable transaction possible. Maximum profit: $0`,
      lineNumber: 15,
      visualizationData: {
        arrays: [
          {
            id: 'prices',
            name: 'prices',
            values: prices,
            highlights: bestBuyDay >= 0 ? [bestBuyDay, bestSellDay] : [],
            pointers: bestBuyDay >= 0
              ? [
                  { name: 'buy', index: bestBuyDay, color: '#3b82f6' },
                  { name: 'sell', index: bestSellDay, color: '#10b981' },
                ]
              : [],
          },
        ],
        custom: {
          prices,
          maxProfit,
          bestBuyDay,
          bestSellDay,
          complete: true,
        },
      },
      variables: { result: maxProfit },
    });

    return { steps, result: maxProfit };
  },
};
