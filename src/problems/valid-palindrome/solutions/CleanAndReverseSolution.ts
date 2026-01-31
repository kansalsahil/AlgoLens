import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ValidPalindromeInput } from '../types';

export const CleanAndReverseSolution: Solution<ValidPalindromeInput, boolean> = {
  id: 'clean-and-reverse',
  name: 'Clean and Reverse',
  description: 'Clean the string, then reverse and compare with original.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `function isPalindrome(s: string): boolean {
  // Clean: lowercase and keep only alphanumeric
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Reverse and compare
  const reversed = cleaned.split('').reverse().join('');

  return cleaned === reversed;
}`,
  execute: (input: ValidPalindromeInput): SolutionExecution<boolean> => {
    const { s } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Original string: "${s}". Will clean and reverse to check palindrome.`,
      lineNumber: 1,
      visualizationData: {
        arrays: [
          {
            id: 'original',
            name: 'Original',
            values: s.split(''),
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          original: s,
          phase: 'initial',
        },
      },
      variables: { s },
    });

    // Clean the string
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    steps.push({
      id: `step-${stepId++}`,
      type: 'iteration',
      description: `After cleaning (lowercase + alphanumeric only): "${cleaned}"`,
      lineNumber: 3,
      visualizationData: {
        arrays: [
          {
            id: 'cleaned',
            name: 'Cleaned',
            values: cleaned.split(''),
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          original: s,
          cleaned,
          phase: 'cleaned',
          removed: s.length - cleaned.length,
        },
      },
      variables: { cleaned },
    });

    // Reverse the string
    const reversed = cleaned.split('').reverse().join('');

    steps.push({
      id: `step-${stepId++}`,
      type: 'iteration',
      description: `Reversed string: "${reversed}"`,
      lineNumber: 6,
      visualizationData: {
        arrays: [
          {
            id: 'cleaned',
            name: 'Cleaned',
            values: cleaned.split(''),
            highlights: [],
            pointers: [],
          },
          {
            id: 'reversed',
            name: 'Reversed',
            values: reversed.split(''),
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          cleaned,
          reversed,
          phase: 'reversed',
        },
      },
      variables: { reversed },
    });

    // Compare
    const result = cleaned === reversed;

    // Highlight matching/mismatching positions
    const highlights: number[] = [];
    for (let i = 0; i < cleaned.length; i++) {
      if (cleaned[i] !== reversed[i]) {
        highlights.push(i);
      }
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: result
        ? `Strings match! "${cleaned}" is a palindrome.`
        : `Strings don't match. Not a palindrome.`,
      lineNumber: 8,
      visualizationData: {
        arrays: [
          {
            id: 'cleaned',
            name: 'Cleaned',
            values: cleaned.split(''),
            highlights: highlights,
            pointers: [],
          },
          {
            id: 'reversed',
            name: 'Reversed',
            values: reversed.split(''),
            highlights: highlights,
            pointers: [],
          },
        ],
        custom: {
          cleaned,
          reversed,
          result,
          phase: 'result',
          match: result,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
