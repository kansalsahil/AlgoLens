import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { CoinChangeInput } from '../types';

export const RecursiveSolution: Solution<CoinChangeInput, number> = {
  id: 'recursive',
  name: 'Recursive Solution',
  description: 'Naive recursive approach trying all possible coin combinations. For each coin, we recursively try using it (if possible) and take the minimum result. This explores all paths in the decision tree.',
  timeComplexity: 'O(amount^coins)',
  spaceComplexity: 'O(amount)',
  code: `function coinChange(coins: number[], amount: number): number {
  // Base cases
  if (amount === 0) return 0;
  if (amount < 0) return -1;

  let minCoins = Infinity;

  // Try each coin
  for (const coin of coins) {
    const result = coinChange(coins, amount - coin);
    if (result >= 0) {
      minCoins = Math.min(minCoins, result + 1);
    }
  }

  return minCoins === Infinity ? -1 : minCoins;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  public int coinChange(int[] coins, int amount) {              // Line 2
    // Base cases                                                // Line 3
    if (amount == 0) return 0;                                   // Line 4
    if (amount < 0) return -1;                                   // Line 5
                                                                // Line 6
    int minCoins = Integer.MAX_VALUE;                            // Line 7
                                                                // Line 8
    // Try each coin                                             // Line 9
    for (int coin : coins) {                                     // Line 10
      int result = coinChange(coins, amount - coin);             // Line 11
      if (result >= 0) {                                         // Line 12
        minCoins = Math.min(minCoins, result + 1);               // Line 13
      }                                                          // Line 14
    }                                                            // Line 15
                                                                // Line 16
    return minCoins == Integer.MAX_VALUE ? -1 : minCoins;        // Line 17
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  public int CoinChange(int[] coins, int amount) {              // Line 2
    // Base cases                                                // Line 3
    if (amount == 0) return 0;                                   // Line 4
    if (amount < 0) return -1;                                   // Line 5
                                                                // Line 6
    int minCoins = int.MaxValue;                                 // Line 7
                                                                // Line 8
    // Try each coin                                             // Line 9
    foreach (int coin in coins) {                                // Line 10
      int result = CoinChange(coins, amount - coin);             // Line 11
      if (result >= 0) {                                         // Line 12
        minCoins = Math.Min(minCoins, result + 1);               // Line 13
      }                                                          // Line 14
    }                                                            // Line 15
                                                                // Line 16
    return minCoins == int.MaxValue ? -1 : minCoins;             // Line 17
  }
}`,
    },
  ],

  execute: (input: CoinChangeInput): SolutionExecution<number> => {
    const { coins, amount } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const treeNodes: Array<{ amount: number; depth: number; result?: number; coin?: number; parent?: number }> = [];
    let nodeIdCounter = 0;

    // Helper function to track recursive calls
    function coinChangeRecursive(remaining: number, depth: number, parentId?: number): number {
      const currentNodeId = nodeIdCounter++;
      const currentNode = { amount: remaining, depth, parent: parentId };
      treeNodes.push(currentNode);

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Recursive call: coinChange(amount=${remaining})${depth > 0 ? ` at depth ${depth}` : ''}`,
        lineNumber: 2,
        visualizationData: {
          arrays: [],
          custom: {
            coins,
            amount,
            currentAmount: remaining,
            depth,
            treeNodes: [...treeNodes],
            phase: 'exploring',
          },
        },
        variables: { remaining, depth },
      });

      // Base case: amount is 0
      if (remaining === 0) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Base case: amount = 0, return 0 coins`,
          lineNumber: 4,
          visualizationData: {
            arrays: [],
            custom: {
              coins,
              amount,
              currentAmount: remaining,
              depth,
              treeNodes: [...treeNodes.slice(0, -1), { ...currentNode, result: 0 }],
              phase: 'base_case',
              result: 0,
            },
          },
          variables: { result: 0 },
        });
        treeNodes[treeNodes.length - 1].result = 0;
        return 0;
      }

      // Base case: amount is negative
      if (remaining < 0) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Base case: amount < 0, impossible (return -1)`,
          lineNumber: 5,
          visualizationData: {
            arrays: [],
            custom: {
              coins,
              amount,
              currentAmount: remaining,
              depth,
              treeNodes: [...treeNodes.slice(0, -1), { ...currentNode, result: -1 }],
              phase: 'impossible',
              result: -1,
            },
          },
          variables: { result: -1 },
        });
        treeNodes[treeNodes.length - 1].result = -1;
        return -1;
      }

      let minCoins = Infinity;

      // Try each coin
      for (const coin of coins) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Trying coin ${coin}: compute coinChange(${remaining - coin})`,
          lineNumber: 10,
          visualizationData: {
            arrays: [],
            custom: {
              coins,
              amount,
              currentAmount: remaining,
              depth,
              currentCoin: coin,
              nextAmount: remaining - coin,
              treeNodes: [...treeNodes],
              phase: 'trying_coin',
            },
          },
          variables: { coin, nextAmount: remaining - coin },
        });

        const result = coinChangeRecursive(remaining - coin, depth + 1, currentNodeId);

        if (result >= 0) {
          const newCount = result + 1;
          if (newCount < minCoins) {
            minCoins = newCount;
            steps.push({
              id: `step-${stepId++}`,
              type: 'comparison',
              description: `Coin ${coin} gives ${result} + 1 = ${newCount} coins. New minimum!`,
              lineNumber: 13,
              visualizationData: {
                arrays: [],
                custom: {
                  coins,
                  amount,
                  currentAmount: remaining,
                  depth,
                  currentCoin: coin,
                  minCoins,
                  treeNodes: [...treeNodes],
                  phase: 'updating_min',
                },
              },
              variables: { coin, result, newCount, minCoins },
            });
          } else {
            steps.push({
              id: `step-${stepId++}`,
              type: 'comparison',
              description: `Coin ${coin} gives ${newCount} coins, not better than current min (${minCoins})`,
              lineNumber: 13,
              visualizationData: {
                arrays: [],
                custom: {
                  coins,
                  amount,
                  currentAmount: remaining,
                  depth,
                  currentCoin: coin,
                  minCoins,
                  treeNodes: [...treeNodes],
                  phase: 'checking',
                },
              },
              variables: { coin, result, newCount, minCoins },
            });
          }
        }
      }

      const finalResult = minCoins === Infinity ? -1 : minCoins;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Returning ${finalResult} for amount ${remaining}`,
        lineNumber: 17,
        visualizationData: {
          arrays: [],
          custom: {
            coins,
            amount,
            currentAmount: remaining,
            depth,
            result: finalResult,
            treeNodes: [...treeNodes.slice(0, -1), { ...currentNode, result: finalResult }],
            phase: 'returning',
          },
        },
        variables: { result: finalResult },
      });

      treeNodes[treeNodes.length - 1].result = finalResult;
      return finalResult;
    }

    // Initial step
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Starting recursive solution for coins=[${coins.join(', ')}], amount=${amount}`,
      lineNumber: 2,
      visualizationData: {
        arrays: [],
        custom: {
          coins,
          amount,
          treeNodes: [],
          phase: 'start',
        },
      },
      variables: { coins, amount },
    });

    const result = coinChangeRecursive(amount, 0);

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: result >= 0
        ? `Recursive solution complete! Minimum ${result} coins needed for amount ${amount}.`
        : `No solution exists for amount ${amount} with the given coins.`,
      lineNumber: 17,
      visualizationData: {
        arrays: [],
        custom: {
          coins,
          amount,
          result,
          complete: true,
          treeNodes,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
