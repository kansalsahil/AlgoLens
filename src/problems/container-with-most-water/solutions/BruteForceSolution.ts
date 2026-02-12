import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ContainerWithMostWaterInput } from '../types';

export const BruteForceSolution: Solution<ContainerWithMostWaterInput, number> = {
  id: 'brute-force',
  name: 'Brute Force',
  description: 'Try all possible pairs of lines and calculate the area for each pair. The area is determined by: width (difference in indices) * height (minimum of the two line heights).',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  code: `function maxArea(height: number[]): number {
  let maxArea = 0;

  // Try every possible pair of lines
  for (let left = 0; left < height.length - 1; left++) {
    for (let right = left + 1; right < height.length; right++) {
      // Calculate area: width * min(height)
      const width = right - left;
      const minHeight = Math.min(height[left], height[right]);
      const area = width * minHeight;
      maxArea = Math.max(maxArea, area);
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
                                                          // Line 5
  // Try every possible pair of lines                    // Line 6
  for (int left = 0; left < height.length - 1; left++) { // Line 7
    for (int right = left + 1; right < height.length; right++) {  // Line 8
      // Calculate area: width * min(height)             // Line 9
      int width = right - left;                           // Line 10
      int minHeight = Math.min(height[left], height[right]);  // Line 11
      int area = width * minHeight;                       // Line 12
      maxArea = Math.max(maxArea, area);                  // Line 13
    }
  }
                                                          // Line 16
  return maxArea;                                         // Line 17
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (height == null || height.Length < 2) return 0;     // Line 2
                                                          // Line 3
  int maxArea = 0;                                        // Line 4
                                                          // Line 5
  // Try every possible pair of lines                    // Line 6
  for (int left = 0; left < height.Length - 1; left++) { // Line 7
    for (int right = left + 1; right < height.Length; right++) {  // Line 8
      // Calculate area: width * min(height)             // Line 9
      int width = right - left;                           // Line 10
      int minHeight = Math.Min(height[left], height[right]);  // Line 11
      int area = width * minHeight;                       // Line 12
      maxArea = Math.Max(maxArea, area);                  // Line 13
    }
  }
                                                          // Line 16
  return maxArea;                                         // Line 17
}`,
    },
  ],

  execute: (input: ContainerWithMostWaterInput): SolutionExecution<number> => {
    const { height } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let maxArea = 0;
    let bestLeft = -1;
    let bestRight = -1;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize maxArea = 0. We'll try all possible pairs of vertical lines to find the maximum container area.`,
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
          currentLeft: -1,
          currentRight: -1,
          bestLeft: -1,
          bestRight: -1,
        },
      },
      variables: { maxArea: 0 },
    });

    // Try every possible pair of lines
    for (let left = 0; left < height.length - 1; left++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Set left pointer at index ${left} (height = ${height[left]})`,
        lineNumber: 7,
        visualizationData: {
          arrays: [
            {
              id: 'height',
              name: 'height',
              values: height,
              highlights: [left],
              pointers: [{ name: 'left', index: left, color: '#3b82f6' }],
            },
          ],
          custom: {
            height,
            maxArea,
            currentLeft: left,
            currentRight: -1,
            bestLeft,
            bestRight,
          },
        },
        variables: { left, leftHeight: height[left], maxArea },
      });

      for (let right = left + 1; right < height.length; right++) {
        // Calculate area
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const area = width * minHeight;

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Try container between indices ${left} and ${right}. Width = ${width}, Min Height = ${minHeight}, Area = ${area}`,
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
              currentLeft: left,
              currentRight: right,
              currentArea: area,
              currentWidth: width,
              currentMinHeight: minHeight,
              bestLeft,
              bestRight,
              comparing: true,
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
                currentLeft: left,
                currentRight: right,
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
      }
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Maximum container area: ${maxArea}. Container formed between indices ${bestLeft} and ${bestRight}.`,
      lineNumber: 17,
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
