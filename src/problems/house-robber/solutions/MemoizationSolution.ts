import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { HouseRobberInput } from '../types';

export const MemoizationSolution: Solution<HouseRobberInput, number> = {
  id: 'memoization',
  name: 'Memoization Solution (Top-Down DP)',
  description: 'Top-down dynamic programming with memoization. Cache results of subproblems to avoid redundant calculations. Each unique subproblem is solved only once.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `function rob(nums: number[]): number {
  const memo = new Map<number, number>();

  function robFrom(index: number): number {
    // Base case
    if (index >= nums.length) return 0;

    // Check memo
    if (memo.has(index)) return memo.get(index)!;

    // Compute and cache
    const robCurrent = nums[index] + robFrom(index + 2);
    const skipCurrent = robFrom(index + 1);
    const result = Math.max(robCurrent, skipCurrent);

    memo.set(index, result);
    return result;
  }

  return robFrom(0);
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  private Map<Integer, Integer> memo = new HashMap<>();      // Line 2
                                                             // Line 3
  public int rob(int[] nums) {                               // Line 4
    return robFrom(nums, 0);                                 // Line 5
  }                                                          // Line 6
                                                             // Line 7
  private int robFrom(int[] nums, int index) {               // Line 8
    // Base case                                             // Line 9
    if (index >= nums.length) return 0;                      // Line 10
                                                             // Line 11
    // Check memo                                            // Line 12
    if (memo.containsKey(index)) return memo.get(index);     // Line 13
                                                             // Line 14
    // Compute and cache                                     // Line 15
    int robCurrent = nums[index] + robFrom(nums, index + 2); // Line 16
    int skipCurrent = robFrom(nums, index + 1);              // Line 17
    int result = Math.max(robCurrent, skipCurrent);          // Line 18
                                                             // Line 19
    memo.put(index, result);                                 // Line 20
    return result;                                           // Line 21
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  private Dictionary<int, int> memo = new Dictionary<int, int>(); // Line 2
                                                             // Line 3
  public int Rob(int[] nums) {                               // Line 4
    return RobFrom(nums, 0);                                 // Line 5
  }                                                          // Line 6
                                                             // Line 7
  private int RobFrom(int[] nums, int index) {               // Line 8
    // Base case                                             // Line 9
    if (index >= nums.Length) return 0;                      // Line 10
                                                             // Line 11
    // Check memo                                            // Line 12
    if (memo.ContainsKey(index)) return memo[index];         // Line 13
                                                             // Line 14
    // Compute and cache                                     // Line 15
    int robCurrent = nums[index] + RobFrom(nums, index + 2); // Line 16
    int skipCurrent = RobFrom(nums, index + 1);              // Line 17
    int result = Math.Max(robCurrent, skipCurrent);          // Line 18
                                                             // Line 19
    memo[index] = result;                                    // Line 20
    return result;                                           // Line 21
  }
}`,
    },
  ],

  execute: (input: HouseRobberInput): SolutionExecution<number> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const memo = new Map<number, number>();

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Starting memoization solution with ${nums.length} houses`,
      lineNumber: 2,
      visualizationData: {
        arrays: [],
        custom: { nums, memo: [], phase: 'start' },
      },
      variables: { n: nums.length },
    });

    function robFrom(index: number): number {
      // Base case
      if (index >= nums.length) {
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
              memo: Array.from(memo.entries()).map(([idx, val]) => ({ index: idx, value: val })),
            },
          },
          variables: { index, returnValue: 0 },
        });
        return 0;
      }

      // Check memo
      if (memo.has(index)) {
        const cached = memo.get(index)!;
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Cache hit! memo[${index}] = $${cached}`,
          lineNumber: 6,
          visualizationData: {
            arrays: [],
            custom: {
              nums,
              currentIndex: index,
              phase: 'cache_hit',
              cachedValue: cached,
              memo: Array.from(memo.entries()).map(([idx, val]) => ({ index: idx, value: val, highlight: idx === index })),
            },
          },
          variables: { index, cached },
        });
        return cached;
      }

      // Considering this house
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Considering house ${index}: $${nums[index]}`,
        lineNumber: 8,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: index,
            phase: 'considering',
            memo: Array.from(memo.entries()).map(([idx, val]) => ({ index: idx, value: val })),
          },
        },
        variables: { index, houseValue: nums[index] },
      });

      // Explore rob choice
      const robCurrent = nums[index] + robFrom(index + 2);

      // Explore skip choice
      const skipCurrent = robFrom(index + 1);

      // Make decision
      const result = Math.max(robCurrent, skipCurrent);
      const decision = robCurrent > skipCurrent ? 'rob' : 'skip';

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `House ${index}: ${decision}. max($${robCurrent}, $${skipCurrent}) = $${result}`,
        lineNumber: 11,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: index,
            robChoice: robCurrent,
            skipChoice: skipCurrent,
            decision,
            phase: 'decided',
            memo: Array.from(memo.entries()).map(([idx, val]) => ({ index: idx, value: val })),
          },
        },
        variables: { index, result },
      });

      memo.set(index, result);

      // Show memo update
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Cache memo[${index}] = $${result}`,
        lineNumber: 13,
        visualizationData: {
          arrays: [],
          custom: {
            nums,
            currentIndex: index,
            phase: 'cached',
            memo: Array.from(memo.entries()).map(([idx, val]) => ({ index: idx, value: val, highlight: idx === index })),
          },
        },
        variables: { index, result },
      });

      return result;
    }

    const result = robFrom(0);

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Maximum money: $${result}`,
      lineNumber: 21,
      visualizationData: {
        arrays: [],
        custom: {
          nums,
          result,
          complete: true,
          memo: Array.from(memo.entries()).map(([idx, val]) => ({ index: idx, value: val })),
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
