import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ClimbingStairsInput } from '../types';

export const RecursiveSolution: Solution<ClimbingStairsInput, number> = {
  id: 'recursive',
  name: 'Recursive Solution',
  description: 'Naive recursive approach using the recurrence relation: climbStairs(n) = climbStairs(n-1) + climbStairs(n-2). Each call branches into two recursive calls, forming a decision tree.',
  timeComplexity: 'O(2^n)',
  spaceComplexity: 'O(n)',
  code: `function climbStairs(n: number): number {
  // Base cases
  if (n === 1) return 1;
  if (n === 2) return 2;

  // Recursive case: sum of ways from (n-1) and (n-2)
  return climbStairs(n - 1) + climbStairs(n - 2);
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  public int climbStairs(int n) {                        // Line 2
    // Base cases                                         // Line 3
    if (n == 1) return 1;                                 // Line 4
    if (n == 2) return 2;                                 // Line 5
                                                          // Line 6
    // Recursive case: sum of ways from (n-1) and (n-2)  // Line 7
    return climbStairs(n - 1) + climbStairs(n - 2);      // Line 8
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  public int ClimbStairs(int n) {                        // Line 2
    // Base cases                                         // Line 3
    if (n == 1) return 1;                                 // Line 4
    if (n == 2) return 2;                                 // Line 5
                                                          // Line 6
    // Recursive case: sum of ways from (n-1) and (n-2)  // Line 7
    return ClimbStairs(n - 1) + ClimbStairs(n - 2);      // Line 8
  }
}`,
    },
  ],

  execute: (input: ClimbingStairsInput): SolutionExecution<number> => {
    const { n } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const callStack: Array<{ n: number; depth: number }> = [];
    const treeNodes: Array<{ n: number; depth: number; result?: number }> = [];

    // Helper function to track recursive calls
    function climbStairsRecursive(current: number, depth: number): number {
      // Track call
      callStack.push({ n: current, depth });
      treeNodes.push({ n: current, depth });

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Recursive call: climbStairs(${current})${depth > 0 ? ` at depth ${depth}` : ''}`,
        lineNumber: 2,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            currentN: current,
            depth,
            callStack: [...callStack],
            treeNodes: [...treeNodes],
            phase: 'exploring',
          },
        },
        variables: { n: current, depth },
      });

      // Base cases
      if (current === 1) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Base case reached: n = 1, return 1`,
          lineNumber: 4,
          visualizationData: {
            arrays: [],
            custom: {
              n,
              currentN: current,
              depth,
              callStack: [...callStack],
              treeNodes: [...treeNodes.slice(0, -1), { n: current, depth, result: 1 }],
              phase: 'base_case',
              result: 1,
            },
          },
          variables: { result: 1 },
        });
        callStack.pop();
        treeNodes[treeNodes.length - 1].result = 1;
        return 1;
      }

      if (current === 2) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Base case reached: n = 2, return 2`,
          lineNumber: 5,
          visualizationData: {
            arrays: [],
            custom: {
              n,
              currentN: current,
              depth,
              callStack: [...callStack],
              treeNodes: [...treeNodes.slice(0, -1), { n: current, depth, result: 2 }],
              phase: 'base_case',
              result: 2,
            },
          },
          variables: { result: 2 },
        });
        callStack.pop();
        treeNodes[treeNodes.length - 1].result = 2;
        return 2;
      }

      // Recursive calls
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Making recursive call: climbStairs(${current - 1})`,
        lineNumber: 8,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            currentN: current,
            depth,
            callStack: [...callStack],
            treeNodes: [...treeNodes],
            phase: 'exploring',
            nextCall: current - 1,
          },
        },
        variables: { nextCall: current - 1 },
      });

      const left = climbStairsRecursive(current - 1, depth + 1);

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Making recursive call: climbStairs(${current - 2})`,
        lineNumber: 8,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            currentN: current,
            depth,
            callStack: [...callStack],
            treeNodes: [...treeNodes],
            phase: 'exploring',
            nextCall: current - 2,
            leftResult: left,
          },
        },
        variables: { nextCall: current - 2, leftResult: left },
      });

      const right = climbStairsRecursive(current - 2, depth + 1);

      const result = left + right;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Combining results: ${left} + ${right} = ${result}`,
        lineNumber: 8,
        visualizationData: {
          arrays: [],
          custom: {
            n,
            currentN: current,
            depth,
            callStack: [...callStack],
            treeNodes: [...treeNodes.slice(0, -1), { n: current, depth, result }],
            phase: 'combining',
            leftResult: left,
            rightResult: right,
            result,
          },
        },
        variables: { left, right, result },
      });

      callStack.pop();
      treeNodes[treeNodes.length - 1].result = result;
      return result;
    }

    // Initial step
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Starting recursive solution for n = ${n}. Building decision tree...`,
      lineNumber: 2,
      visualizationData: {
        arrays: [],
        custom: {
          n,
          callStack: [],
          treeNodes: [],
          phase: 'start',
        },
      },
      variables: { n },
    });

    const result = climbStairsRecursive(n, 0);

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Recursive solution complete! There are ${result} distinct ways to climb ${n} stairs.`,
      lineNumber: 8,
      visualizationData: {
        arrays: [],
        custom: {
          n,
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
