import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ThreeSumInput } from '../types';

export const BruteForceSolution: Solution<ThreeSumInput, number[][]> = {
  id: 'brute-force',
  name: 'Brute Force (Three Nested Loops)',
  description: 'Check all possible triplets using three nested loops.',
  timeComplexity: 'O(n³)',
  spaceComplexity: 'O(1)',
  code: `function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  const n = nums.length;

  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);

          // Check for duplicates
          if (!result.some(t => t[0] === triplet[0] && t[1] === triplet[1] && t[2] === triplet[2])) {
            result.push(triplet);
          }
        }
      }
    }
  }

  return result;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  List<List<Integer>> result = new ArrayList<>();      // Line 2
  int n = nums.length;
                                                        // Line 4
  for (int i = 0; i < n - 2; i++) {                    // Line 5
    for (int j = i + 1; j < n - 1; j++) {              // Line 6
      for (int k = j + 1; k < n; k++) {                // Line 7
        if (nums[i] + nums[j] + nums[k] == 0) {        // Line 8
          List<Integer> triplet = Arrays.asList(nums[i], nums[j], nums[k]);
          Collections.sort(triplet);
                                                        // Line 11
          // Check for duplicates
          boolean exists = false;
          for (List<Integer> t : result) {
            if (t.get(0).equals(triplet.get(0)) &&
                t.get(1).equals(triplet.get(1)) &&
                t.get(2).equals(triplet.get(2))) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            result.add(triplet);                        // Line 12
          }
        }
      }
    }
  }
                                                        // Line 19
  return result;
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  var result = new List<IList<int>>();                 // Line 2
  int n = nums.Length;
                                                        // Line 4
  for (int i = 0; i < n - 2; i++) {                    // Line 5
    for (int j = i + 1; j < n - 1; j++) {              // Line 6
      for (int k = j + 1; k < n; k++) {                // Line 7
        if (nums[i] + nums[j] + nums[k] == 0) {        // Line 8
          var triplet = new List<int> { nums[i], nums[j], nums[k] };
          triplet.Sort();
                                                        // Line 11
          // Check for duplicates
          bool exists = false;
          foreach (var t in result) {
            if (t[0] == triplet[0] &&
                t[1] == triplet[1] &&
                t[2] == triplet[2]) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            result.Add(triplet);                        // Line 12
          }
        }
      }
    }
  }
                                                        // Line 19
  return result;
}`,
    },
  ],

  execute: (input: ThreeSumInput): SolutionExecution<number[][]> => {
    const { nums } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const result: number[][] = [];
    const n = nums.length;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Start with array of ${n} elements. Will check all triplet combinations.`,
      lineNumber: 2,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          triplets: 0,
          found: 0,
          result: [],
        },
      },
      variables: { n },
    });

    let triplets = 0;
    const maxSteps = 50; // Limit steps for visualization

    outer: for (let i = 0; i < n - 2 && stepId < maxSteps; i++) {
      for (let j = i + 1; j < n - 1 && stepId < maxSteps; j++) {
        for (let k = j + 1; k < n && stepId < maxSteps; k++) {
          triplets++;
          const sum = nums[i] + nums[j] + nums[k];
          const isZero = sum === 0;

          steps.push({
            id: `step-${stepId++}`,
            type: 'comparison',
            description: `Check triplet [${nums[i]}, ${nums[j]}, ${nums[k]}]: sum = ${sum} ${isZero ? '✓' : '✗'}`,
            lineNumber: 8,
            visualizationData: {
              arrays: [
                {
                  id: 'nums',
                  name: 'nums',
                  values: nums,
                  highlights: isZero ? [i, j, k] : [],
                  pointers: [
                    { name: 'i', index: i, color: '#3b82f6' },
                    { name: 'j', index: j, color: '#10b981' },
                    { name: 'k', index: k, color: '#ef4444' },
                  ],
                },
              ],
              custom: {
                i,
                j,
                k,
                values: [nums[i], nums[j], nums[k]],
                sum,
                isZero,
                triplets,
                found: result.length,
                result: result.map(t => [...t]),
              },
            },
            variables: { i, j, k, sum },
          });

          if (isZero) {
            const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
            const isDuplicate = result.some(t =>
              t[0] === triplet[0] && t[1] === triplet[1] && t[2] === triplet[2]
            );

            if (!isDuplicate) {
              result.push(triplet);

              steps.push({
                id: `step-${stepId++}`,
                type: 'iteration',
                description: `Found valid triplet! Added [${triplet.join(', ')}] to result.`,
                lineNumber: 13,
                visualizationData: {
                  arrays: [
                    {
                      id: 'nums',
                      name: 'nums',
                      values: nums,
                      highlights: [i, j, k],
                      pointers: [],
                    },
                  ],
                  custom: {
                    triplet,
                    added: true,
                    triplets,
                    found: result.length,
                    result: result.map(t => [...t]),
                  },
                },
                variables: { result: result.length },
              });
            } else {
              steps.push({
                id: `step-${stepId++}`,
                type: 'iteration',
                description: `Triplet [${triplet.join(', ')}] is a duplicate. Skipping.`,
                lineNumber: 12,
                visualizationData: {
                  arrays: [
                    {
                      id: 'nums',
                      name: 'nums',
                      values: nums,
                      highlights: [],
                      pointers: [],
                    },
                  ],
                  custom: {
                    triplet,
                    duplicate: true,
                    triplets,
                    found: result.length,
                    result: result.map(t => [...t]),
                  },
                },
                variables: { },
              });
            }
          }

          if (stepId >= maxSteps) {
            break outer;
          }
        }
      }
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Checked ${triplets} triplet${triplets > 1 ? 's' : ''}. Found ${result.length} unique triplet${result.length !== 1 ? 's' : ''} that sum to 0.`,
      lineNumber: 20,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'nums',
            values: nums,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          triplets,
          found: result.length,
          result: result.map(t => [...t]),
          complete: true,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
