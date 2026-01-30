import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ValidAnagramInput } from '../types';

export const HashMapSolution: Solution<ValidAnagramInput, boolean> = {
  id: 'hash-map',
  name: 'Hash Map (Optimal)',
  description: 'Count character frequencies using a hash map and compare.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1) - at most 26 characters for lowercase English letters',
  code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const charCount = new Map<string, number>();

  // Count characters in s
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Decrement counts for characters in t
  for (const char of t) {
    if (!charCount.has(char)) return false;
    const count = charCount.get(char)! - 1;
    if (count === 0) {
      charCount.delete(char);
    } else {
      charCount.set(char, count);
    }
  }

  return charCount.size === 0;
}`,
  execute: (input: ValidAnagramInput): SolutionExecution<boolean> => {
    const { s, t } = input;
    const steps: AnimationStep[] = [];
    const charCount = new Map<string, number>();
    let stepId = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Start with strings: s = "${s}", t = "${t}". Initialize an empty character count map.`,
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
          map: {},
          phase: 'init',
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
            map: {},
            lengthMismatch: true,
            result: false,
          },
        },
        variables: { result: false },
      });

      return { steps, result: false };
    }

    // Phase 1: Count characters in s
    steps.push({
      id: `step-${stepId++}`,
      type: 'iteration',
      description: `Phase 1: Count frequency of each character in string s.`,
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
          map: {},
          phase: 'counting-s',
        },
      },
      variables: {},
    });

    for (let i = 0; i < s.length; i++) {
      const char = s[i];
      const currentCount = charCount.get(char) || 0;
      charCount.set(char, currentCount + 1);

      const mapObj: Record<string, number> = {};
      charCount.forEach((count, key) => {
        mapObj[key] = count;
      });

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Character '${char}' at index ${i}: increment count to ${charCount.get(char)}`,
        visualizationData: {
          arrays: [
            {
              id: 's',
              name: 's',
              values: s.split(''),
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
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
            map: mapObj,
            phase: 'counting-s',
            currentChar: char,
            currentCount: charCount.get(char),
          },
        },
        variables: { i, char },
      });
    }

    // Phase 2: Decrement counts using t
    steps.push({
      id: `step-${stepId++}`,
      type: 'iteration',
      description: `Phase 2: Decrement counts using characters from string t.`,
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
          map: Object.fromEntries(charCount),
          phase: 'decrementing-t',
        },
      },
      variables: {},
    });

    for (let i = 0; i < t.length; i++) {
      const char = t[i];

      if (!charCount.has(char)) {
        const mapObj: Record<string, number> = {};
        charCount.forEach((count, key) => {
          mapObj[key] = count;
        });

        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Character '${char}' at index ${i} not found in map. Strings are not anagrams. Return false.`,
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
                highlights: [i],
                pointers: [{ name: 'i', index: i, color: '#ef4444' }],
              },
            ],
            custom: {
              map: mapObj,
              phase: 'decrementing-t',
              currentChar: char,
              notFound: true,
              result: false,
            },
          },
          variables: { result: false },
        });

        return { steps, result: false };
      }

      const newCount = charCount.get(char)! - 1;
      if (newCount === 0) {
        charCount.delete(char);
      } else {
        charCount.set(char, newCount);
      }

      const mapObj: Record<string, number> = {};
      charCount.forEach((count, key) => {
        mapObj[key] = count;
      });

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Character '${char}' at index ${i}: ${newCount === 0 ? 'count reaches 0, remove from map' : `decrement count to ${newCount}`}`,
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
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
            },
          ],
          custom: {
            map: mapObj,
            phase: 'decrementing-t',
            currentChar: char,
            newCount: newCount === 0 ? 'removed' : newCount,
          },
        },
        variables: { i, char },
      });
    }

    // Final check
    const result = charCount.size === 0;
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `All characters processed. Map is ${result ? 'empty' : 'not empty'}. ${result ? 'Strings are anagrams' : 'Strings are not anagrams'}. Return ${result}.`,
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
          map: Object.fromEntries(charCount),
          phase: 'complete',
          mapSize: charCount.size,
          result,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
