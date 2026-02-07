import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ThreeSumInput } from '../types';

export const TwoPointerSolution: Solution<ThreeSumInput, number[][]> = {
  id: 'two-pointer',
  name: 'Sort + Two Pointer (Optimal)',
  description: 'Sort array, then for each element, use two pointers to find pairs that complete the triplet.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  code: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for i
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for left
        while (left < right && nums[left] === nums[left + 1]) left++;
        // Skip duplicates for right
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  Arrays.sort(nums);                                      // Line 2
  List<List<Integer>> result = new ArrayList<>();        // Line 3
                                                          // Line 4
  for (int i = 0; i < nums.length - 2; i++) {            // Line 5
    // Skip duplicates for i                             // Line 6
    if (i > 0 && nums[i] == nums[i - 1]) continue;       // Line 7
                                                          // Line 8
    int left = i + 1;                                     // Line 9
    int right = nums.length - 1;                          // Line 10
                                                          // Line 11
    while (left < right) {                                // Line 12
      int sum = nums[i] + nums[left] + nums[right];      // Line 13
                                                          // Line 14
      if (sum == 0) {                                     // Line 15
        result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                                                          // Line 17
        // Skip duplicates for left                       // Line 18
        while (left < right && nums[left] == nums[left + 1]) left++;
        // Skip duplicates for right                      // Line 20
        while (left < right && nums[right] == nums[right - 1]) right--;
                                                          // Line 22
        left++;                                           // Line 23
        right--;                                          // Line 24
      } else if (sum < 0) {                               // Line 25
        left++;                                           // Line 26
      } else {                                            // Line 27
        right--;                                          // Line 28
      }
    }
  }
                                                          // Line 32
  return result;
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  Array.Sort(nums);                                       // Line 2
  var result = new List<IList<int>>();                    // Line 3
                                                          // Line 4
  for (int i = 0; i < nums.Length - 2; i++) {            // Line 5
    // Skip duplicates for i                             // Line 6
    if (i > 0 && nums[i] == nums[i - 1]) continue;       // Line 7
                                                          // Line 8
    int left = i + 1;                                     // Line 9
    int right = nums.Length - 1;                          // Line 10
                                                          // Line 11
    while (left < right) {                                // Line 12
      int sum = nums[i] + nums[left] + nums[right];      // Line 13
                                                          // Line 14
      if (sum == 0) {                                     // Line 15
        result.Add(new List<int> { nums[i], nums[left], nums[right] });
                                                          // Line 17
        // Skip duplicates for left                       // Line 18
        while (left < right && nums[left] == nums[left + 1]) left++;
        // Skip duplicates for right                      // Line 20
        while (left < right && nums[right] == nums[right - 1]) right--;
                                                          // Line 22
        left++;                                           // Line 23
        right--;                                          // Line 24
      } else if (sum < 0) {                               // Line 25
        left++;                                           // Line 26
      } else {                                            // Line 27
        right--;                                          // Line 28
      }
    }
  }
                                                          // Line 32
  return result;
}`,
    },
  ],
  execute: (input: ThreeSumInput): SolutionExecution<number[][]> => {
    const { nums: originalNums } = input;
    const nums = [...originalNums].sort((a, b) => a - b);
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const result: number[][] = [];

    // Initial state - show sorting
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Sort array: [${originalNums.join(', ')}] → [${nums.join(', ')}]`,
      lineNumber: 2,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'Sorted nums',
            values: nums,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          sorted: true,
          result: [],
        },
      },
      variables: { },
    });

    const maxSteps = 60;

    for (let i = 0; i < nums.length - 2 && stepId < maxSteps; i++) {
      // Skip duplicates for i
      if (i > 0 && nums[i] === nums[i - 1]) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Skip duplicate at i=${i}: nums[${i}] (${nums[i]}) = nums[${i-1}] (${nums[i-1]})`,
          lineNumber: 7,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'Sorted nums',
                values: nums,
                highlights: [i - 1, i],
                pointers: [
                  { name: 'i', index: i, color: '#3b82f6' },
                ],
              },
            ],
            custom: {
              i,
              skippedDuplicate: true,
              result: result.map(t => [...t]),
            },
          },
          variables: { i },
        });
        continue;
      }

      let left = i + 1;
      let right = nums.length - 1;

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Fix i=${i} (${nums[i]}). Search for pairs with left=${left}, right=${right}`,
        lineNumber: 9,
        visualizationData: {
          arrays: [
            {
              id: 'nums',
              name: 'Sorted nums',
              values: nums,
              highlights: [i],
              pointers: [
                { name: 'i', index: i, color: '#3b82f6' },
                { name: 'left', index: left, color: '#10b981' },
                { name: 'right', index: right, color: '#ef4444' },
              ],
            },
          ],
          custom: {
            i,
            left,
            right,
            fixed: nums[i],
            result: result.map(t => [...t]),
          },
        },
        variables: { i, left, right },
      });

      while (left < right && stepId < maxSteps) {
        const sum = nums[i] + nums[left] + nums[right];

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Sum: ${nums[i]} + ${nums[left]} + ${nums[right]} = ${sum} ${sum === 0 ? '✓' : sum < 0 ? '(too small)' : '(too large)'}`,
          lineNumber: 13,
          visualizationData: {
            arrays: [
              {
                id: 'nums',
                name: 'Sorted nums',
                values: nums,
                highlights: sum === 0 ? [i, left, right] : [],
                pointers: [
                  { name: 'i', index: i, color: '#3b82f6' },
                  { name: 'left', index: left, color: '#10b981' },
                  { name: 'right', index: right, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              i,
              left,
              right,
              sum,
              values: [nums[i], nums[left], nums[right]],
              comparing: true,
              result: result.map(t => [...t]),
            },
          },
          variables: { i, left, right, sum },
        });

        if (sum === 0) {
          result.push([nums[i], nums[left], nums[right]]);

          steps.push({
            id: `step-${stepId++}`,
            type: 'iteration',
            description: `Found triplet! Added [${nums[i]}, ${nums[left]}, ${nums[right]}]`,
            lineNumber: 15,
            visualizationData: {
              arrays: [
                {
                  id: 'nums',
                  name: 'Sorted nums',
                  values: nums,
                  highlights: [i, left, right],
                  pointers: [],
                },
              ],
              custom: {
                i,
                left,
                right,
                triplet: [nums[i], nums[left], nums[right]],
                found: true,
                result: result.map(t => [...t]),
              },
            },
            variables: { result: result.length },
          });

          // Skip duplicates for left
          while (left < right && nums[left] === nums[left + 1]) left++;
          // Skip duplicates for right
          while (left < right && nums[right] === nums[right - 1]) right--;

          left++;
          right--;
        } else if (sum < 0) {
          left++;

          steps.push({
            id: `step-${stepId++}`,
            type: 'iteration',
            description: `Sum too small. Move left pointer → ${left}`,
            lineNumber: 24,
            visualizationData: {
              arrays: [
                {
                  id: 'nums',
                  name: 'Sorted nums',
                  values: nums,
                  highlights: [],
                  pointers: [
                    { name: 'i', index: i, color: '#3b82f6' },
                    { name: 'left', index: left, color: '#10b981' },
                    { name: 'right', index: right, color: '#ef4444' },
                  ],
                },
              ],
              custom: {
                i,
                left,
                right,
                movedLeft: true,
                result: result.map(t => [...t]),
              },
            },
            variables: { left },
          });
        } else {
          right--;

          steps.push({
            id: `step-${stepId++}`,
            type: 'iteration',
            description: `Sum too large. Move right pointer ← ${right}`,
            lineNumber: 26,
            visualizationData: {
              arrays: [
                {
                  id: 'nums',
                  name: 'Sorted nums',
                  values: nums,
                  highlights: [],
                  pointers: [
                    { name: 'i', index: i, color: '#3b82f6' },
                    { name: 'left', index: left, color: '#10b981' },
                    { name: 'right', index: right, color: '#ef4444' },
                  ],
                },
              ],
              custom: {
                i,
                left,
                right,
                movedRight: true,
                result: result.map(t => [...t]),
              },
            },
            variables: { right },
          });
        }
      }
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Found ${result.length} unique triplet${result.length !== 1 ? 's' : ''} that sum to 0.`,
      lineNumber: 32,
      visualizationData: {
        arrays: [
          {
            id: 'nums',
            name: 'Sorted nums',
            values: nums,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          result: result.map(t => [...t]),
          complete: true,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
