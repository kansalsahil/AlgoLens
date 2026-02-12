import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { CoinChangeInput } from '../types';

export const TabulationSolution: Solution<CoinChangeInput, number> = {
  id: 'tabulation',
  name: 'Tabulation (Bottom-Up DP)',
  description: 'Bottom-up dynamic programming using a DP array. Build solutions from base case (amount=0) up to target amount. dp[i] represents the minimum coins needed to make amount i.',
  timeComplexity: 'O(amount × coins.length)',
  spaceComplexity: 'O(amount)',
  code: `function coinChange(coins: number[], amount: number): number {
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // Base case: 0 coins needed for amount 0

  // For each amount from 1 to target
  for (let i = 1; i <= amount; i++) {
    // Try each coin
    for (const coin of coins) {
      if (i >= coin && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  public int coinChange(int[] coins, int amount) {               // Line 2
    int[] dp = new int[amount + 1];                               // Line 3
    Arrays.fill(dp, amount + 1);                                  // Line 4
    dp[0] = 0; // Base case: 0 coins needed for amount 0         // Line 5
                                                                 // Line 6
    // For each amount from 1 to target                          // Line 7
    for (int i = 1; i <= amount; i++) {                           // Line 8
      // Try each coin                                            // Line 9
      for (int coin : coins) {                                    // Line 10
        if (i >= coin && dp[i - coin] != amount + 1) {            // Line 11
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);             // Line 12
        }                                                         // Line 13
      }                                                           // Line 14
    }                                                             // Line 15
                                                                 // Line 16
    return dp[amount] > amount ? -1 : dp[amount];                 // Line 17
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  public int CoinChange(int[] coins, int amount) {               // Line 2
    int[] dp = new int[amount + 1];                               // Line 3
    Array.Fill(dp, amount + 1);                                   // Line 4
    dp[0] = 0; // Base case: 0 coins needed for amount 0         // Line 5
                                                                 // Line 6
    // For each amount from 1 to target                          // Line 7
    for (int i = 1; i <= amount; i++) {                           // Line 8
      // Try each coin                                            // Line 9
      foreach (int coin in coins) {                               // Line 10
        if (i >= coin && dp[i - coin] != amount + 1) {            // Line 11
          dp[i] = Math.Min(dp[i], dp[i - coin] + 1);             // Line 12
        }                                                         // Line 13
      }                                                           // Line 14
    }                                                             // Line 15
                                                                 // Line 16
    return dp[amount] > amount ? -1 : dp[amount];                 // Line 17
  }
}`,
    },
  ],

  execute: (input: CoinChangeInput): SolutionExecution<number> => {
    const { coins, amount } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Initialize DP array
    const dp: number[] = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize DP array of size ${amount + 1}. Set dp[0] = 0 (base case: 0 coins for amount 0)`,
      lineNumber: 3,
      visualizationData: {
        arrays: [
          {
            id: 'dp',
            name: 'dp',
            values: dp.map(v => (v === Infinity ? '∞' : v)),
            highlights: [0],
            pointers: [],
          },
        ],
        custom: {
          coins,
          amount,
          dp: [...dp],
          dpTable: Array.from({ length: amount + 1 }, (_, amt) => ({
            amount: amt,
            minCoins: amt === 0 ? 0 : null,
          })),
          currentAmount: -1,
          phase: 'initialization',
        },
      },
      variables: { amount },
    });

    // Build DP table
    for (let i = 1; i <= amount; i++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Computing dp[${i}]: finding minimum coins for amount ${i}`,
        lineNumber: 8,
        visualizationData: {
          arrays: [
            {
              id: 'dp',
              name: 'dp',
              values: dp.map(v => (v === Infinity ? '∞' : v)),
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
            },
          ],
          custom: {
            coins,
            amount,
            dp: [...dp],
            dpTable: Array.from({ length: amount + 1 }, (_, amt) => ({
              amount: amt,
              minCoins: dp[amt] === Infinity ? null : dp[amt],
              current: amt === i,
            })),
            currentAmount: i,
            phase: 'computing',
          },
        },
        variables: { i },
      });

      // Try each coin
      for (const coin of coins) {
        if (i >= coin) {
          const prevAmount = i - coin;
          const prevCoins = dp[prevAmount];

          if (prevCoins !== Infinity) {
            const newCoins = prevCoins + 1;
            const oldCoins = dp[i];

            steps.push({
              id: `step-${stepId++}`,
              type: 'comparison',
              description: `Try coin ${coin}: dp[${i}] = min(${oldCoins === Infinity ? '∞' : oldCoins}, dp[${prevAmount}] + 1) = min(${oldCoins === Infinity ? '∞' : oldCoins}, ${prevCoins} + 1)`,
              lineNumber: 11,
              visualizationData: {
                arrays: [
                  {
                    id: 'dp',
                    name: 'dp',
                    values: dp.map(v => (v === Infinity ? '∞' : v)),
                    highlights: [prevAmount, i],
                    pointers: [
                      { name: 'i', index: i, color: '#3b82f6' },
                      { name: `i-${coin}`, index: prevAmount, color: '#10b981' },
                    ],
                  },
                ],
                custom: {
                  coins,
                  amount,
                  dp: [...dp],
                  dpTable: Array.from({ length: amount + 1 }, (_, amt) => ({
                    amount: amt,
                    minCoins: dp[amt] === Infinity ? null : dp[amt],
                    current: amt === i,
                    considering: amt === prevAmount,
                  })),
                  currentAmount: i,
                  currentCoin: coin,
                  prevAmount,
                  prevCoins,
                  newCoins,
                  phase: 'trying_coin',
                  formula: `dp[${i}] = min(dp[${i}], dp[${prevAmount}] + 1)`,
                },
              },
              variables: { i, coin, prevAmount, prevCoins, newCoins },
            });

            if (newCoins < dp[i]) {
              dp[i] = newCoins;

              steps.push({
                id: `step-${stepId++}`,
                type: 'assignment',
                description: `Updated! dp[${i}] = ${newCoins} (using coin ${coin})`,
                lineNumber: 12,
                visualizationData: {
                  arrays: [
                    {
                      id: 'dp',
                      name: 'dp',
                      values: dp.map(v => (v === Infinity ? '∞' : v)),
                      highlights: [i],
                      pointers: [{ name: 'i', index: i, color: '#10b981' }],
                    },
                  ],
                  custom: {
                    coins,
                    amount,
                    dp: [...dp],
                    dpTable: Array.from({ length: amount + 1 }, (_, amt) => ({
                      amount: amt,
                      minCoins: dp[amt] === Infinity ? null : dp[amt],
                      current: amt === i,
                      updated: amt === i,
                    })),
                    currentAmount: i,
                    currentCoin: coin,
                    result: newCoins,
                    phase: 'updated',
                  },
                },
                variables: { i, coin, result: newCoins },
              });
            } else {
              steps.push({
                id: `step-${stepId++}`,
                type: 'comparison',
                description: `No update. ${newCoins} is not better than current ${dp[i]}`,
                lineNumber: 12,
                visualizationData: {
                  arrays: [
                    {
                      id: 'dp',
                      name: 'dp',
                      values: dp.map(v => (v === Infinity ? '∞' : v)),
                      highlights: [i],
                      pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
                    },
                  ],
                  custom: {
                    coins,
                    amount,
                    dp: [...dp],
                    dpTable: Array.from({ length: amount + 1 }, (_, amt) => ({
                      amount: amt,
                      minCoins: dp[amt] === Infinity ? null : dp[amt],
                      current: amt === i,
                    })),
                    currentAmount: i,
                    currentCoin: coin,
                    phase: 'no_update',
                  },
                },
                variables: { i, coin },
              });
            }
          } else {
            steps.push({
              id: `step-${stepId++}`,
              type: 'comparison',
              description: `Skip coin ${coin}: dp[${prevAmount}] is impossible (∞)`,
              lineNumber: 11,
              visualizationData: {
                arrays: [
                  {
                    id: 'dp',
                    name: 'dp',
                    values: dp.map(v => (v === Infinity ? '∞' : v)),
                    highlights: [prevAmount, i],
                    pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
                  },
                ],
                custom: {
                  coins,
                  amount,
                  dp: [...dp],
                  dpTable: Array.from({ length: amount + 1 }, (_, amt) => ({
                    amount: amt,
                    minCoins: dp[amt] === Infinity ? null : dp[amt],
                    current: amt === i,
                  })),
                  currentAmount: i,
                  currentCoin: coin,
                  prevAmount,
                  phase: 'skip_coin',
                },
              },
              variables: { i, coin, prevAmount },
            });
          }
        } else {
          steps.push({
            id: `step-${stepId++}`,
            type: 'comparison',
            description: `Skip coin ${coin}: coin value (${coin}) > current amount (${i})`,
            lineNumber: 11,
            visualizationData: {
              arrays: [
                {
                  id: 'dp',
                  name: 'dp',
                  values: dp.map(v => (v === Infinity ? '∞' : v)),
                  highlights: [i],
                  pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
                },
              ],
              custom: {
                coins,
                amount,
                dp: [...dp],
                dpTable: Array.from({ length: amount + 1 }, (_, amt) => ({
                  amount: amt,
                  minCoins: dp[amt] === Infinity ? null : dp[amt],
                  current: amt === i,
                })),
                currentAmount: i,
                currentCoin: coin,
                phase: 'skip_coin',
              },
            },
            variables: { i, coin },
          });
        }
      }
    }

    const result = dp[amount] === Infinity ? -1 : dp[amount];

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: result >= 0
        ? `DP table complete! dp[${amount}] = ${result}. Minimum ${result} coins needed.`
        : `DP table complete! dp[${amount}] = ∞. No solution exists.`,
      lineNumber: 17,
      visualizationData: {
        arrays: [
          {
            id: 'dp',
            name: 'dp',
            values: dp.map(v => (v === Infinity ? '∞' : v)),
            highlights: [amount],
            pointers: [],
          },
        ],
        custom: {
          coins,
          amount,
          dp: [...dp],
          dpTable: Array.from({ length: amount + 1 }, (_, amt) => ({
            amount: amt,
            minCoins: dp[amt] === Infinity ? null : dp[amt],
            target: amt === amount,
          })),
          result,
          complete: true,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
