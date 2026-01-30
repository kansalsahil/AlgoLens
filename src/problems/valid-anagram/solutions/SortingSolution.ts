import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ValidAnagramInput } from '../types';

export const SortingSolution: Solution<ValidAnagramInput, boolean> = {
  id: 'sorting',
  name: 'Sorting Approach',
  description: 'Sort both strings and compare them character by character.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(1) or O(n) depending on sorting algorithm',
  code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const sortedS = s.split('').sort().join('');
  const sortedT = t.split('').sort().join('');

  return sortedS === sortedT;
}`,
  execute: (input: ValidAnagramInput): SolutionExecution<boolean> => {
    const { s, t } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Start with strings: s = "${s}", t = "${t}"`,
      visualizationData: {
        arrays: [
          {
            id: 's',
            name: 's',
            values: s.split(''),
            highlights: [],
            pointers: [],
          },
          {
            id: 't',
            name: 't',
            values: t.split(''),
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          sLength: s.length,
          tLength: t.length,
        },
      },
      variables: {},
    });

    // Check lengths
    if (s.length !== t.length) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: `Strings have different lengths (${s.length} vs ${t.length}). Cannot be anagrams. Return false.`,
        visualizationData: {
          arrays: [
            {
              id: 's',
              name: 's',
              values: s.split(''),
              highlights: [],
              pointers: [],
            },
            {
              id: 't',
              name: 't',
              values: t.split(''),
              highlights: [],
              pointers: [],
            },
          ],
          custom: {
            sLength: s.length,
            tLength: t.length,
            lengthMismatch: true,
            result: false,
          },
        },
        variables: { result: false },
      });

      return { steps, result: false };
    }

    // Sort both strings
    const sortedS = s.split('').sort();
    const sortedT = t.split('').sort();

    steps.push({
      id: `step-${stepId++}`,
      type: 'iteration',
      description: `Sort both strings alphabetically.`,
      visualizationData: {
        arrays: [
          {
            id: 's',
            name: 's (sorted)',
            values: sortedS,
            highlights: [],
            pointers: [],
          },
          {
            id: 't',
            name: 't (sorted)',
            values: sortedT,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          sorted: true,
        },
      },
      variables: {},
    });

    // Compare character by character
    for (let i = 0; i < sortedS.length; i++) {
      const match = sortedS[i] === sortedT[i];

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Compare position ${i}: '${sortedS[i]}' vs '${sortedT[i]}' - ${match ? 'Match' : 'Mismatch'}`,
        visualizationData: {
          arrays: [
            {
              id: 's',
              name: 's (sorted)',
              values: sortedS,
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
            },
            {
              id: 't',
              name: 't (sorted)',
              values: sortedT,
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
            },
          ],
          custom: {
            comparing: true,
            position: i,
            charS: sortedS[i],
            charT: sortedT[i],
            match,
          },
        },
        variables: { i, match },
      });

      if (!match) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Mismatch found at position ${i}: '${sortedS[i]}' ≠ '${sortedT[i]}'. Not anagrams. Return false.`,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 's (sorted)',
                values: sortedS,
                highlights: [i],
                pointers: [{ name: 'i', index: i, color: '#ef4444' }],
              },
              {
                id: 't',
                name: 't (sorted)',
                values: sortedT,
                highlights: [i],
                pointers: [{ name: 'i', index: i, color: '#ef4444' }],
              },
            ],
            custom: {
              mismatch: true,
              position: i,
              result: false,
            },
          },
          variables: { result: false },
        });

        return { steps, result: false };
      }
    }

    // All characters match
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `All characters match after sorting. The strings are anagrams. Return true.`,
      visualizationData: {
        arrays: [
          {
            id: 's',
            name: 's (sorted)',
            values: sortedS,
            highlights: [],
            pointers: [],
          },
          {
            id: 't',
            name: 't (sorted)',
            values: sortedT,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          allMatch: true,
          result: true,
        },
      },
      variables: { result: true },
    });

    return { steps, result: true };
  },
};
