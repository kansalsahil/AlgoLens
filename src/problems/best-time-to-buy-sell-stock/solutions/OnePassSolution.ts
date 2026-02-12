import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { BestTimeToBuySellStockInput } from '../types';

export const OnePassSolution: Solution<BestTimeToBuySellStockInput, number> = {
  id: 'one-pass',
  name: 'One Pass (Optimal)',
  description: 'Track the minimum price seen so far and calculate potential profit at each step. The key insight: for maximum profit, buy at the lowest price before the current day and sell today.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    // Update minimum price if current price is lower
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }
    // Calculate profit if we sell today
    else {
      const profit = prices[i] - minPrice;
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
  int minPrice = Integer.MAX_VALUE;                       // Line 4
  int maxProfit = 0;                                      // Line 5
                                                          // Line 6
  for (int i = 0; i < prices.length; i++) {              // Line 7
    // Update minimum price if current price is lower    // Line 8
    if (prices[i] < minPrice) {                           // Line 9
      minPrice = prices[i];                               // Line 10
    }                                                     // Line 11
    // Calculate profit if we sell today                 // Line 12
    else {                                                // Line 13
      int profit = prices[i] - minPrice;                  // Line 14
      maxProfit = Math.max(maxProfit, profit);            // Line 15
    }
  }
                                                          // Line 18
  return maxProfit;                                       // Line 19
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (prices == null || prices.Length < 2) return 0;     // Line 2
                                                          // Line 3
  int minPrice = int.MaxValue;                            // Line 4
  int maxProfit = 0;                                      // Line 5
                                                          // Line 6
  for (int i = 0; i < prices.Length; i++) {              // Line 7
    // Update minimum price if current price is lower    // Line 8
    if (prices[i] < minPrice) {                           // Line 9
      minPrice = prices[i];                               // Line 10
    }                                                     // Line 11
    // Calculate profit if we sell today                 // Line 12
    else {                                                // Line 13
      int profit = prices[i] - minPrice;                  // Line 14
      maxProfit = Math.Max(maxProfit, profit);            // Line 15
    }
  }
                                                          // Line 18
  return maxProfit;                                       // Line 19
}`,
    },
  ],

  execute: (input: BestTimeToBuySellStockInput): SolutionExecution<number> => {
    const { prices } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let minPrice = Infinity;
    let maxProfit = 0;
    let minPriceDay = -1;
    let bestBuyDay = -1;
    let bestSellDay = -1;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize minPrice = ∞ and maxProfit = 0. Track the lowest price and maximum profit in one pass.`,
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
          minPrice: Infinity,
          maxProfit: 0,
          currentDay: -1,
          minPriceDay: -1,
          bestBuyDay: -1,
          bestSellDay: -1,
        },
      },
      variables: { minPrice: Infinity, maxProfit: 0 },
    });

    // Process each day
    for (let i = 0; i < prices.length; i++) {
      const currentPrice = prices[i];

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Day ${i + 1}: Current price = $${currentPrice}, minPrice = ${minPrice === Infinity ? '∞' : '$' + minPrice}`,
        lineNumber: 7,
        visualizationData: {
          arrays: [
            {
              id: 'prices',
              name: 'prices',
              values: prices,
              highlights: minPriceDay >= 0 ? [i, minPriceDay] : [i],
              pointers: [
                { name: 'i', index: i, color: '#fbbf24' },
                ...(minPriceDay >= 0 ? [{ name: 'min', index: minPriceDay, color: '#3b82f6' }] : []),
              ],
            },
          ],
          custom: {
            prices,
            minPrice: minPrice === Infinity ? Infinity : minPrice,
            maxProfit,
            currentDay: i,
            currentPrice,
            minPriceDay,
            bestBuyDay,
            bestSellDay,
          },
        },
        variables: { i, currentPrice, minPrice: minPrice === Infinity ? Infinity : minPrice, maxProfit },
      });

      // Check if current price is new minimum
      if (currentPrice < minPrice) {
        minPrice = currentPrice;
        minPriceDay = i;

        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `New minimum price found! Update minPrice = $${minPrice} (day ${i + 1})`,
          lineNumber: 10,
          visualizationData: {
            arrays: [
              {
                id: 'prices',
                name: 'prices',
                values: prices,
                highlights: [i],
                pointers: [{ name: 'min', index: i, color: '#3b82f6' }],
              },
            ],
            custom: {
              prices,
              minPrice,
              maxProfit,
              currentDay: i,
              currentPrice,
              minPriceDay,
              bestBuyDay,
              bestSellDay,
              newMinFound: true,
            },
          },
          variables: { minPrice, minPriceDay },
        });
      } else {
        // Calculate profit if we sell today
        const profit = currentPrice - minPrice;

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `If we sell today: profit = $${currentPrice} - $${minPrice} = $${profit}`,
          lineNumber: 14,
          visualizationData: {
            arrays: [
              {
                id: 'prices',
                name: 'prices',
                values: prices,
                highlights: [minPriceDay, i],
                pointers: [
                  { name: 'buy', index: minPriceDay, color: '#3b82f6' },
                  { name: 'sell', index: i, color: '#10b981' },
                ],
              },
            ],
            custom: {
              prices,
              minPrice,
              maxProfit,
              currentDay: i,
              currentPrice,
              minPriceDay,
              bestBuyDay,
              bestSellDay,
              currentProfit: profit,
              calculating: true,
            },
          },
          variables: { profit, currentPrice, minPrice },
        });

        if (profit > maxProfit) {
          maxProfit = profit;
          bestBuyDay = minPriceDay;
          bestSellDay = i;

          steps.push({
            id: `step-${stepId++}`,
            type: 'assignment',
            description: `New maximum profit! $${profit} > $${maxProfit - profit}. Update maxProfit = $${profit}`,
            lineNumber: 15,
            visualizationData: {
              arrays: [
                {
                  id: 'prices',
                  name: 'prices',
                  values: prices,
                  highlights: [bestBuyDay, bestSellDay],
                  pointers: [
                    { name: 'buy', index: bestBuyDay, color: '#3b82f6' },
                    { name: 'sell', index: bestSellDay, color: '#10b981' },
                  ],
                },
              ],
              custom: {
                prices,
                minPrice,
                maxProfit,
                currentDay: i,
                currentPrice,
                minPriceDay,
                bestBuyDay,
                bestSellDay,
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
      lineNumber: 19,
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
          minPrice,
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
