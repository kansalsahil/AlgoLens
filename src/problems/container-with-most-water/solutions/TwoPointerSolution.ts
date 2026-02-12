import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ContainerWithMostWaterInput } from '../types';

export const TwoPointerSolution: Solution<ContainerWithMostWaterInput, number> = {
  id: 'two-pointer',
  name: 'Two Pointer (Optimal)',
  description: 'Start with the widest container (left=0, right=n-1) and move the pointer with the smaller height inward. The key insight: moving the taller line inward can only decrease the area since the width decreases and the height is limited by the shorter line.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `function maxArea(height: number[]): number {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    // Calculate current area
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;
    maxArea = Math.max(maxArea, area);

    // Move pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (height == null || height.length < 2) return 0;     // Line 2
                                                          // Line 3
  int maxArea = 0;                                        // Line 4
  int left = 0;                                           // Line 5
  int right = height.length - 1;                          // Line 6
                                                          // Line 7
  while (left < right) {                                  // Line 8
    // Calculate current area                            // Line 9
    int width = right - left;                             // Line 10
    int minHeight = Math.min(height[left], height[right]);  // Line 11
    int area = width * minHeight;                         // Line 12
    maxArea = Math.max(maxArea, area);                    // Line 13
                                                          // Line 14
    // Move pointer with smaller height                  // Line 15
    if (height[left] < height[right]) {                   // Line 16
      left++;                                             // Line 17
    } else {                                              // Line 18
      right--;                                            // Line 19
    }
  }
                                                          // Line 22
  return maxArea;                                         // Line 23
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (height == null || height.Length < 2) return 0;     // Line 2
                                                          // Line 3
  int maxArea = 0;                                        // Line 4
  int left = 0;                                           // Line 5
  int right = height.Length - 1;                          // Line 6
                                                          // Line 7
  while (left < right) {                                  // Line 8
    // Calculate current area                            // Line 9
    int width = right - left;                             // Line 10
    int minHeight = Math.Min(height[left], height[right]);  // Line 11
    int area = width * minHeight;                         // Line 12
    maxArea = Math.Max(maxArea, area);                    // Line 13
                                                          // Line 14
    // Move pointer with smaller height                  // Line 15
    if (height[left] < height[right]) {                   // Line 16
      left++;                                             // Line 17
    } else {                                              // Line 18
      right--;                                            // Line 19
    }
  }
                                                          // Line 22
  return maxArea;                                         // Line 23
}`,
    },
  ],

  execute: (input: ContainerWithMostWaterInput): SolutionExecution<number> => {
    const { height } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let maxArea = 0;
    let left = 0;
    let right = height.length - 1;
    let bestLeft = -1;
    let bestRight = -1;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize two pointers: left = 0, right = ${right}. We'll move pointers inward to find maximum area.`,
      lineNumber: 4,
      visualizationData: {
        arrays: [
          {
            id: 'height',
            name: 'height',
            values: height,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          height,
          maxArea: 0,
          left: -1,
          right: -1,
          bestLeft: -1,
          bestRight: -1,
        },
      },
      variables: { maxArea: 0, left, right },
    });

    steps.push({
      id: `step-${stepId++}`,
      type: 'iteration',
      description: `Start with widest possible container: left at index ${left}, right at index ${right}`,
      lineNumber: 8,
      visualizationData: {
        arrays: [
          {
            id: 'height',
            name: 'height',
            values: height,
            highlights: [left, right],
            pointers: [
              { name: 'left', index: left, color: '#3b82f6' },
              { name: 'right', index: right, color: '#10b981' },
            ],
          },
        ],
        custom: {
          height,
          maxArea,
          left,
          right,
          bestLeft,
          bestRight,
        },
      },
      variables: { left, right, maxArea },
    });

    while (left < right) {
      // Calculate current area
      const width = right - left;
      const minHeight = Math.min(height[left], height[right]);
      const area = width * minHeight;

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Calculate area: width = ${width}, min height = ${minHeight} (min of ${height[left]} and ${height[right]}), area = ${area}`,
        lineNumber: 10,
        visualizationData: {
          arrays: [
            {
              id: 'height',
              name: 'height',
              values: height,
              highlights: [left, right],
              pointers: [
                { name: 'left', index: left, color: '#3b82f6' },
                { name: 'right', index: right, color: '#10b981' },
              ],
            },
          ],
          custom: {
            height,
            maxArea,
            left,
            right,
            currentArea: area,
            currentWidth: width,
            currentMinHeight: minHeight,
            bestLeft,
            bestRight,
            calculating: true,
          },
        },
        variables: { left, right, width, minHeight, area, maxArea },
      });

      if (area > maxArea) {
        maxArea = area;
        bestLeft = left;
        bestRight = right;

        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `New maximum area found! ${area} > ${maxArea - area}. Update maxArea = ${area}`,
          lineNumber: 13,
          visualizationData: {
            arrays: [
              {
                id: 'height',
                name: 'height',
                values: height,
                highlights: [left, right],
                pointers: [
                  { name: 'left', index: left, color: '#3b82f6' },
                  { name: 'right', index: right, color: '#10b981' },
                ],
              },
            ],
            custom: {
              height,
              maxArea,
              left,
              right,
              currentArea: area,
              currentWidth: width,
              currentMinHeight: minHeight,
              bestLeft,
              bestRight,
              newMaxFound: true,
            },
          },
          variables: { maxArea, bestLeft, bestRight },
        });
      }

      // Move pointer with smaller height
      const moveLeft = height[left] < height[right];
      const oldLeft = left;
      const oldRight = right;

      if (moveLeft) {
        left++;
      } else {
        right--;
      }

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: moveLeft
          ? `height[${oldLeft}] (${height[oldLeft]}) < height[${oldRight}] (${height[oldRight]}), so move left pointer from ${oldLeft} to ${left}`
          : `height[${oldRight}] (${height[oldRight]}) <= height[${oldLeft}] (${height[oldLeft]}), so move right pointer from ${oldRight} to ${right}`,
        lineNumber: moveLeft ? 17 : 19,
        visualizationData: {
          arrays: [
            {
              id: 'height',
              name: 'height',
              values: height,
              highlights: left < right ? [left, right] : [],
              pointers:
                left < right
                  ? [
                      { name: 'left', index: left, color: '#3b82f6' },
                      { name: 'right', index: right, color: '#10b981' },
                    ]
                  : [],
            },
          ],
          custom: {
            height,
            maxArea,
            left,
            right,
            bestLeft,
            bestRight,
            movedPointer: moveLeft ? 'left' : 'right',
            previousLeft: oldLeft,
            previousRight: oldRight,
          },
        },
        variables: { left, right, maxArea },
      });
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Pointers have met. Maximum container area: ${maxArea}. Container formed between indices ${bestLeft} and ${bestRight}.`,
      lineNumber: 23,
      visualizationData: {
        arrays: [
          {
            id: 'height',
            name: 'height',
            values: height,
            highlights: [bestLeft, bestRight],
            pointers: [
              { name: 'left', index: bestLeft, color: '#3b82f6' },
              { name: 'right', index: bestRight, color: '#10b981' },
            ],
          },
        ],
        custom: {
          height,
          maxArea,
          bestLeft,
          bestRight,
          complete: true,
        },
      },
      variables: { result: maxArea },
    });

    return { steps, result: maxArea };
  },
};
