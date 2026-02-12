import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { CoinChangeInput } from '../types';

export const MemoizationSolution: Solution<CoinChangeInput, number> = {
  id: 'memoization',
  name: 'Memoization (Top-Down DP)',
  description: 'Top-down dynamic programming with memoization. Cache the minimum coins needed for each amount to avoid redundant calculations. Each subproblem is computed only once.',
  timeComplexity: 'O(amount × coins.length)',
  spaceComplexity: 'O(amount)',
  code: `function coinChange(coins: number[], amount: number): number {
  const memo: Map<number, number> = new Map();

  function dp(remaining: number): number {
    // Base cases
    if (remaining === 0) return 0;
    if (remaining < 0) return -1;

    // Check memo
    if (memo.has(remaining)) {
      return memo.get(remaining)!;
    }

    let minCoins = Infinity;

    // Try each coin
    for (const coin of coins) {
      const result = dp(remaining - coin);
      if (result >= 0) {
        minCoins = Math.min(minCoins, result + 1);
      }
    }

    const finalResult = minCoins === Infinity ? -1 : minCoins;
    memo.set(remaining, finalResult);
    return finalResult;
  }

  return dp(amount);
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  private Map<Integer, Integer> memo = new HashMap<>();          // Line 2
  private int[] coins;                                            // Line 3
                                                                 // Line 4
  public int coinChange(int[] coins, int amount) {                // Line 5
    this.coins = coins;                                           // Line 6
    return dp(amount);                                            // Line 7
  }                                                              // Line 8
                                                                 // Line 9
  private int dp(int remaining) {                                 // Line 10
    // Base cases                                                 // Line 11
    if (remaining == 0) return 0;                                 // Line 12
    if (remaining < 0) return -1;                                 // Line 13
                                                                 // Line 14
    // Check memo                                                 // Line 15
    if (memo.containsKey(remaining)) {                            // Line 16
      return memo.get(remaining);                                 // Line 17
    }                                                            // Line 18
                                                                 // Line 19
    int minCoins = Integer.MAX_VALUE;                             // Line 20
                                                                 // Line 21
    // Try each coin                                              // Line 22
    for (int coin : coins) {                                      // Line 23
      int result = dp(remaining - coin);                          // Line 24
      if (result >= 0) {                                          // Line 25
        minCoins = Math.min(minCoins, result + 1);                // Line 26
      }                                                           // Line 27
    }                                                             // Line 28
                                                                 // Line 29
    int finalResult = minCoins == Integer.MAX_VALUE ? -1 : minCoins;  // Line 30
    memo.put(remaining, finalResult);                             // Line 31
    return finalResult;                                           // Line 32
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  private Dictionary<int, int> memo = new Dictionary<int, int>();  // Line 2
  private int[] coins;                                            // Line 3
                                                                 // Line 4
  public int CoinChange(int[] coins, int amount) {                // Line 5
    this.coins = coins;                                           // Line 6
    return Dp(amount);                                            // Line 7
  }                                                              // Line 8
                                                                 // Line 9
  private int Dp(int remaining) {                                 // Line 10
    // Base cases                                                 // Line 11
    if (remaining == 0) return 0;                                 // Line 12
    if (remaining < 0) return -1;                                 // Line 13
                                                                 // Line 14
    // Check memo                                                 // Line 15
    if (memo.ContainsKey(remaining)) {                            // Line 16
      return memo[remaining];                                     // Line 17
    }                                                            // Line 18
                                                                 // Line 19
    int minCoins = int.MaxValue;                                  // Line 20
                                                                 // Line 21
    // Try each coin                                              // Line 22
    foreach (int coin in coins) {                                 // Line 23
      int result = Dp(remaining - coin);                          // Line 24
      if (result >= 0) {                                          // Line 25
        minCoins = Math.Min(minCoins, result + 1);                // Line 26
      }                                                           // Line 27
    }                                                             // Line 28
                                                                 // Line 29
    int finalResult = minCoins == int.MaxValue ? -1 : minCoins;   // Line 30
    memo[remaining] = finalResult;                                // Line 31
    return finalResult;                                           // Line 32
  }
}`,
    },
  ],

  execute: (input: CoinChangeInput): SolutionExecution<number> => {
    const { coins, amount } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const memo = new Map<number, number>();

    // Helper function to track memoized recursive calls
    function dpMemo(remaining: number, depth: number): number {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Call dp(${remaining})`,
        lineNumber: 10,
        visualizationData: {
          arrays: [],
          custom: {
            coins,
            amount,
            currentAmount: remaining,
            depth,
            memo: Object.fromEntries(memo),
            memoArray: Array.from(memo.entries())
              .sort((a, b) => a[0] - b[0])
              .map(([k, v]) => ({ amount: k, minCoins: v })),
            phase: 'checking',
          },
        },
        variables: { remaining, depth },
      });

      // Base case: amount is 0
      if (remaining === 0) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Base case: amount = 0, return 0`,
          lineNumber: 12,
          visualizationData: {
            arrays: [],
            custom: {
              coins,
              amount,
              currentAmount: remaining,
              depth,
              memo: Object.fromEntries(memo),
              memoArray: Array.from(memo.entries())
                .sort((a, b) => a[0] - b[0])
                .map(([k, v]) => ({ amount: k, minCoins: v })),
              phase: 'base_case',
              result: 0,
            },
          },
          variables: { result: 0 },
        });
        return 0;
      }

      // Base case: amount is negative
      if (remaining < 0) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Base case: amount < 0, impossible (return -1)`,
          lineNumber: 13,
          visualizationData: {
            arrays: [],
            custom: {
              coins,
              amount,
              currentAmount: remaining,
              depth,
              memo: Object.fromEntries(memo),
              memoArray: Array.from(memo.entries())
                .sort((a, b) => a[0] - b[0])
                .map(([k, v]) => ({ amount: k, minCoins: v })),
              phase: 'impossible',
              result: -1,
            },
          },
          variables: { result: -1 },
        });
        return -1;
      }

      // Check memo
      if (memo.has(remaining)) {
        const cached = memo.get(remaining)!;
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Cache hit! dp(${remaining}) = ${cached} (retrieved from memo)`,
          lineNumber: 17,
          visualizationData: {
            arrays: [],
            custom: {
              coins,
              amount,
              currentAmount: remaining,
              depth,
              memo: Object.fromEntries(memo),
              memoArray: Array.from(memo.entries())
                .sort((a, b) => a[0] - b[0])
                .map(([k, v]) => ({ amount: k, minCoins: v, highlight: k === remaining })),
              phase: 'cache_hit',
              result: cached,
            },
          },
          variables: { result: cached },
        });
        return cached;
      }

      let minCoins = Infinity;

      // Try each coin
      for (const coin of coins) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Cache miss. Trying coin ${coin}: compute dp(${remaining - coin})`,
          lineNumber: 24,
          visualizationData: {
            arrays: [],
            custom: {
              coins,
              amount,
              currentAmount: remaining,
              depth,
              currentCoin: coin,
              nextAmount: remaining - coin,
              minCoins: minCoins === Infinity ? null : minCoins,
              memo: Object.fromEntries(memo),
              memoArray: Array.from(memo.entries())
                .sort((a, b) => a[0] - b[0])
                .map(([k, v]) => ({ amount: k, minCoins: v })),
              phase: 'computing',
            },
          },
          variables: { coin },
        });

        const result = dpMemo(remaining - coin, depth + 1);

        if (result >= 0) {
          const newCount = result + 1;
          if (newCount < minCoins) {
            minCoins = newCount;
            steps.push({
              id: `step-${stepId++}`,
              type: 'comparison',
              description: `Coin ${coin} gives ${result} + 1 = ${newCount} coins. New minimum!`,
              lineNumber: 26,
              visualizationData: {
                arrays: [],
                custom: {
                  coins,
                  amount,
                  currentAmount: remaining,
                  depth,
                  currentCoin: coin,
                  minCoins,
                  memo: Object.fromEntries(memo),
                  memoArray: Array.from(memo.entries())
                    .sort((a, b) => a[0] - b[0])
                    .map(([k, v]) => ({ amount: k, minCoins: v })),
                  phase: 'updating_min',
                },
              },
              variables: { coin, result, newCount, minCoins },
            });
          }
        }
      }

      const finalResult = minCoins === Infinity ? -1 : minCoins;

      // Store in memo
      memo.set(remaining, finalResult);

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Computed dp(${remaining}) = ${finalResult}. Storing in memo.`,
        lineNumber: 31,
        visualizationData: {
          arrays: [],
          custom: {
            coins,
            amount,
            currentAmount: remaining,
            depth,
            result: finalResult,
            memo: Object.fromEntries(memo),
            memoArray: Array.from(memo.entries())
              .sort((a, b) => a[0] - b[0])
              .map(([k, v]) => ({ amount: k, minCoins: v, highlight: k === remaining })),
            phase: 'storing',
          },
        },
        variables: { result: finalResult },
      });

      return finalResult;
    }

    // Initial step
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Starting memoization solution for coins=[${coins.join(', ')}], amount=${amount}. Initialize empty memo cache.`,
      lineNumber: 2,
      visualizationData: {
        arrays: [],
        custom: {
          coins,
          amount,
          memo: {},
          memoArray: [],
          phase: 'start',
        },
      },
      variables: { coins, amount },
    });

    const result = dpMemo(amount, 0);

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: result >= 0
        ? `Memoization complete! Minimum ${result} coins needed. Final memo cache has ${memo.size} entries.`
        : `No solution exists. Final memo cache has ${memo.size} entries.`,
      lineNumber: 32,
      visualizationData: {
        arrays: [],
        custom: {
          coins,
          amount,
          result,
          memo: Object.fromEntries(memo),
          memoArray: Array.from(memo.entries())
            .sort((a, b) => a[0] - b[0])
            .map(([k, v]) => ({ amount: k, minCoins: v })),
          complete: true,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
