import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ValidPalindromeInput } from '../types';

export const TwoPointerSolution: Solution<ValidPalindromeInput, boolean> = {
  id: 'two-pointer',
  name: 'Two Pointer (Optimal)',
  description: 'Use two pointers from both ends, skip non-alphanumeric characters, and compare in-place.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric from left
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }

    // Skip non-alphanumeric from right
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // Compare characters (case-insensitive)
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphanumeric(char: string): boolean {
  return /[a-z0-9]/i.test(char);
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  int left = 0;
  int right = s.length() - 1;

  while (left < right) {
    // Skip non-alphanumeric from left
    while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
      left++;
    }

    // Skip non-alphanumeric from right
    while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
      right--;
    }

    // Compare characters (case-insensitive)
    if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  int left = 0;
  int right = s.Length - 1;

  while (left < right) {
    // Skip non-alphanumeric from left
    while (left < right && !char.IsLetterOrDigit(s[left])) {
      left++;
    }

    // Skip non-alphanumeric from right
    while (left < right && !char.IsLetterOrDigit(s[right])) {
      right--;
    }

    // Compare characters (case-insensitive)
    if (char.ToLower(s[left]) != char.ToLower(s[right])) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}`,
    },
  ],
  execute: (input: ValidPalindromeInput): SolutionExecution<boolean> => {
    const { s } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let left = 0;
    let right = s.length - 1;

    const isAlphanumeric = (char: string): boolean => /[a-z0-9]/i.test(char);

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize two pointers: left = 0, right = ${right}. Will skip non-alphanumeric and compare.`,
      lineNumber: 2,
      visualizationData: {
        arrays: [
          {
            id: 's',
            name: 'String',
            values: s.split(''),
            highlights: [],
            pointers: [
              { name: 'left', index: left, color: '#3b82f6' },
              { name: 'right', index: right, color: '#ef4444' },
            ],
          },
        ],
        custom: {
          left,
          right,
          comparisons: 0,
        },
      },
      variables: { left, right },
    });

    let comparisons = 0;

    while (left < right) {
      // Skip non-alphanumeric from left
      let skippedLeft = false;
      while (left < right && !isAlphanumeric(s[left])) {
        skippedLeft = true;
        left++;
      }

      if (skippedLeft) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Skip non-alphanumeric from left. Now left = ${left} (${left < s.length ? `'${s[left]}'` : 'end'})`,
          lineNumber: 7,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'String',
                values: s.split(''),
                highlights: [],
                pointers: [
                  { name: 'left', index: left, color: '#3b82f6' },
                  { name: 'right', index: right, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              left,
              right,
              skippedLeft: true,
              comparisons,
            },
          },
          variables: { left, right },
        });
      }

      // Skip non-alphanumeric from right
      let skippedRight = false;
      while (left < right && !isAlphanumeric(s[right])) {
        skippedRight = true;
        right--;
      }

      if (skippedRight) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Skip non-alphanumeric from right. Now right = ${right} (${right >= 0 ? `'${s[right]}'` : 'start'})`,
          lineNumber: 12,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'String',
                values: s.split(''),
                highlights: [],
                pointers: [
                  { name: 'left', index: left, color: '#3b82f6' },
                  { name: 'right', index: right, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              left,
              right,
              skippedRight: true,
              comparisons,
            },
          },
          variables: { left, right },
        });
      }

      if (left >= right) break;

      // Compare characters
      const leftChar = s[left].toLowerCase();
      const rightChar = s[right].toLowerCase();
      const match = leftChar === rightChar;
      comparisons++;

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Compare '${s[left]}' (left) with '${s[right]}' (right): ${match ? 'Match!' : 'Mismatch!'}`,
        lineNumber: 16,
        visualizationData: {
          arrays: [
            {
              id: 's',
              name: 'String',
              values: s.split(''),
              highlights: [left, right],
              pointers: [
                { name: 'left', index: left, color: '#3b82f6' },
                { name: 'right', index: right, color: '#ef4444' },
              ],
            },
          ],
          custom: {
            left,
            right,
            leftChar: s[left],
            rightChar: s[right],
            match,
            comparisons,
            comparing: true,
          },
        },
        variables: { left, right, match },
      });

      if (!match) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Mismatch found! '${leftChar}' ≠ '${rightChar}'. Not a palindrome.`,
          lineNumber: 17,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'String',
                values: s.split(''),
                highlights: [left, right],
                pointers: [
                  { name: 'left', index: left, color: '#ef4444' },
                  { name: 'right', index: right, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              left,
              right,
              result: false,
              mismatch: true,
              comparisons,
            },
          },
          variables: { result: false },
        });

        return { steps, result: false };
      }

      left++;
      right--;

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Match! Move pointers: left = ${left}, right = ${right}`,
        lineNumber: 20,
        visualizationData: {
          arrays: [
            {
              id: 's',
              name: 'String',
              values: s.split(''),
              highlights: [],
              pointers: [
                { name: 'left', index: left, color: '#3b82f6' },
                { name: 'right', index: right, color: '#ef4444' },
              ],
            },
          ],
          custom: {
            left,
            right,
            moved: true,
            comparisons,
          },
        },
        variables: { left, right },
      });
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Pointers met! All characters matched. String is a palindrome.`,
      lineNumber: 24,
      visualizationData: {
        arrays: [
          {
            id: 's',
            name: 'String',
            values: s.split(''),
            highlights: [],
            pointers: left <= right ? [
              { name: 'left/right', index: left, color: '#10b981' },
            ] : [],
          },
        ],
        custom: {
          left,
          right,
          result: true,
          palindrome: true,
          comparisons,
        },
      },
      variables: { result: true },
    });

    return { steps, result: true };
  },
};
