import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { ValidParenthesesInput } from '../types';

export const ReplacementSolution: Solution<ValidParenthesesInput, boolean> = {
  id: 'replacement',
  name: 'String Replacement (Brute Force)',
  description: 'Repeatedly remove all valid pairs until string is empty or no more removals possible.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(n)',
  code: `function isValid(s: string): boolean {
  while (s.length > 0) {
    const prev = s;
    s = s.replace('()', '').replace('[]', '').replace('{}', '');

    if (s === prev) {
      // No replacements made
      return false;
    }
  }

  return true;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  while (s.length() > 0) {
    String prev = s;
    s = s.replace("()", "").replace("[]", "").replace("{}", "");

    if (s.equals(prev)) {
      // No replacements made
      return false;
    }
  }

  return true;
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  while (s.Length > 0) {
    string prev = s;
    s = s.Replace("()", "").Replace("[]", "").Replace("{}", "");

    if (s == prev) {
      // No replacements made
      return false;
    }
  }

  return true;
}`,
    },
  ],
  execute: (input: ValidParenthesesInput): SolutionExecution<boolean> => {
    const { s: original } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let s = original;
    let iterations = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Start with string: "${s}". Will repeatedly remove valid pairs.`,
      lineNumber: 2,
      visualizationData: {
        arrays: [
          {
            id: 's',
            name: 'Current String',
            values: s.split(''),
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          currentString: s,
          iterations: 0,
          pairs: ['()', '[]', '{}'],
        },
      },
      variables: {},
    });

    while (s.length > 0) {
      const prev = s;
      iterations++;

      // Try to find and remove valid pairs
      let removed = false;
      let pairFound = '';
      let pairIndex = -1;

      // Check for each type of pair
      const pairs = ['()', '[]', '{}'];
      for (const pair of pairs) {
        const index = s.indexOf(pair);
        if (index !== -1) {
          pairFound = pair;
          pairIndex = index;
          removed = true;
          break;
        }
      }

      if (removed) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Found pair "${pairFound}" at index ${pairIndex}. Remove it.`,
          lineNumber: 4,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'Current String',
                values: s.split(''),
                highlights: [pairIndex, pairIndex + 1],
                pointers: [],
              },
            ],
            custom: {
              currentString: s,
              iterations,
              pairFound,
              pairIndex,
              removing: true,
            },
          },
          variables: { iterations, pairFound, pairIndex },
        });

        s = s.replace(pairFound, '');

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `After removal: "${s.length > 0 ? s : '(empty)'}"${s.length > 0 ? '. Continue searching.' : ''}`,
          lineNumber: 4,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'Current String',
                values: s.length > 0 ? s.split('') : [],
                highlights: [],
                pointers: [],
              },
            ],
            custom: {
              currentString: s,
              iterations,
              removed: true,
              previousLength: prev.length,
              newLength: s.length,
            },
          },
          variables: { iterations },
        });
      } else {
        // No pair found - string is invalid
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `No valid pairs found in "${s}". String is invalid. Return false.`,
          lineNumber: 8,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'Current String',
                values: s.split(''),
                highlights: [],
                pointers: [],
              },
            ],
            custom: {
              currentString: s,
              iterations,
              noPairFound: true,
              result: false,
            },
          },
          variables: { result: false },
        });

        return { steps, result: false };
      }
    }

    // String is empty - valid
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `String is empty after ${iterations} iteration(s). All brackets matched. Return true.`,
      lineNumber: 12,
      visualizationData: {
        arrays: [
          {
            id: 's',
            name: 'Current String',
            values: [],
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          currentString: '',
          iterations,
          result: true,
          allMatched: true,
        },
      },
      variables: { result: true },
    });

    return { steps, result: true };
  },
};
