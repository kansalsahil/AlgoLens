import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { HouseRobberInput } from '../types';

export const RecursiveSolution: Solution<HouseRobberInput, number> = {
  id: 'recursive',
  name: 'Recursive Solution',
  description: 'Naive recursive approach. For each house, we decide whether to rob it (and skip the previous) or skip it (and rob the previous). This creates a decision tree with overlapping subproblems.',
  timeComplexity: 'O(2^n)',
  spaceComplexity: 'O(n)',
  code: `function rob(nums: number[]): number {
  function robFrom(index: number): number {
    // Base case: no houses left
    if (index >= nums.length) return 0;

    // Decision: rob current house or skip it
    const robCurrent = nums[index] + robFrom(index + 2);
    const skipCurrent = robFrom(index + 1);

    return Math.max(robCurrent, skipCurrent);
  }

  return robFrom(0);
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  public int rob(int[] nums) {                               // Line 2
    return robFrom(nums, 0);                                 // Line 3
  }                                                          // Line 4
                                                             // Line 5
  private int robFrom(int[] nums, int index) {               // Line 6
    // Base case: no houses left                             // Line 7
    if (index >= nums.length) return 0;                      // Line 8
                                                             // Line 9
    // Decision: rob current house or skip it                // Line 10
    int robCurrent = nums[index] + robFrom(nums, index + 2); // Line 11
    int skipCurrent = robFrom(nums, index + 1);              // Line 12
                                                             // Line 13
    return Math.max(robCurrent, skipCurrent);                // Line 14
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  public int Rob(int[] nums) {                               // Line 2
    return RobFrom(nums, 0);                                 // Line 3
  }                                                          // Line 4
                                                             // Line 5
  private int RobFrom(int[] nums, int index) {               // Line 6
    // Base case: no houses left                             // Line 7
    if (index >= nums.Length) return 0;                      // Line 8
                                                             // Line 9
    // Decision: rob current house or skip it                // Line 10
    int robCurrent = nums[index] + RobFrom(nums, index + 2); // Line 11
    int skipCurrent = RobFrom(nums, index + 1);              // Line 12
                                                             // Line 13
    return Math.Max(robCurrent, skipCurrent);                // Line 14
  }
}`,
    },
  ],

  execute: (input: HouseRobberInput): SolutionExecution<number> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Initial step
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Starting recursive solution with ${nums.length} houses`,
      lineNumber: 2,
      visualizationData: {
        arrays: [],
        custom: { nums, phase: 'start' },
      },
      variables: { n: nums.length },
    });

    // Track recursion tree for visualization
    const treeNodes: any[] = [];
    const callStack: any[] = [];

    function robFrom(index: number, depth: number = 0): number {
      // Base case
      if (index >= nums.length) {
        treeNodes.push({ n: index, depth, result: 0 });
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Base case: index ${index} >= ${nums.length}, return 0`,
          lineNumber: 5,
          visualizationData: {
            arrays: [],
            custom: {
              nums,
              currentIndex: index,
              phase: 'base_case',
              treeNodes: [...treeNodes],
              callStack: [...callStack],
            },
          },
          variables: { index, returnValue: 0 },
        });
        return 0;
      }

      // Considering this house
      callStack.push({ n: index });
      treeNodes.push({ n: index, depth });

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `robFrom(${index}): Considering house ${index} with $${nums[index]}`,
        lineNumber: 7,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: index,
            phase: 'considering',
            treeNodes: [...treeNodes],
            callStack: [...callStack],
          },
        },
        variables: { index, houseValue: nums[index] },
      });

      // Explore rob branch
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Exploring rob branch: ${index} + robFrom(${index + 2})`,
        lineNumber: 8,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: index,
            phase: 'exploring_rob',
            treeNodes: [...treeNodes],
            callStack: [...callStack],
          },
        },
        variables: { index, nextIndex: index + 2 },
      });

      const robCurrent = nums[index] + robFrom(index + 2, depth + 1);

      // Explore skip branch
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Exploring skip branch: robFrom(${index + 1})`,
        lineNumber: 9,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: index,
            phase: 'exploring_skip',
            treeNodes: [...treeNodes],
            callStack: [...callStack],
          },
        },
        variables: { index, nextIndex: index + 1 },
      });

      const skipCurrent = robFrom(index + 1, depth + 1);

      // Make decision
      const result = Math.max(robCurrent, skipCurrent);
      const decision = robCurrent > skipCurrent ? 'rob' : 'skip';

      // Update tree node with result
      const nodeIndex = treeNodes.findIndex(node => node.n === index && node.depth === depth && node.result === undefined);
      if (nodeIndex >= 0) {
        treeNodes[nodeIndex].result = result;
      }

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `robFrom(${index}): ${decision}. max($${robCurrent}, $${skipCurrent}) = $${result}`,
        lineNumber: 10,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: index,
            robChoice: robCurrent,
            skipChoice: skipCurrent,
            decision,
            phase: 'decided',
            treeNodes: [...treeNodes],
            callStack: [...callStack],
          },
        },
        variables: { index, result },
      });

      callStack.pop();
      return result;
    }

    const result = robFrom(0);

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Maximum money that can be robbed: $${result}`,
      lineNumber: 14,
      visualizationData: {
        arrays: [],
        custom: { nums, result, complete: true },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
