import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { GroupAnagramsInput } from '../types';

export const BruteForceSolution: Solution<GroupAnagramsInput, string[][]> = {
  id: 'brute-force',
  name: 'Brute Force (Compare All Pairs)',
  description: 'Compare each string with all others by sorting to find anagrams. Group them together.',
  timeComplexity: 'O(n² × k log k)',
  spaceComplexity: 'O(n × k)',
  code: `function groupAnagrams(strs: string[]): string[][] {
  const used = new Array(strs.length).fill(false);
  const result: string[][] = [];

  for (let i = 0; i < strs.length; i++) {
    if (used[i]) continue;

    const group: string[] = [strs[i]];
    used[i] = true;
    const sortedI = strs[i].split('').sort().join('');

    for (let j = i + 1; j < strs.length; j++) {
      if (used[j]) continue;

      const sortedJ = strs[j].split('').sort().join('');
      if (sortedI === sortedJ) {
        group.push(strs[j]);
        used[j] = true;
      }
    }

    result.push(group);
  }

  return result;
}`,
  execute: (input: GroupAnagramsInput): SolutionExecution<string[][]> => {
    const { strs } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const used = new Array(strs.length).fill(false);
    const result: string[][] = [];
    let comparisons = 0;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Start with array of strings. We will compare each string with all others to find anagrams.',
      visualizationData: {
        arrays: [
          {
            id: 'strs',
            name: 'Input Strings',
            values: strs,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          used: [...used],
          groups: [],
          comparisons: 0,
        },
      },
      variables: {},
    });

    for (let i = 0; i < strs.length; i++) {
      if (used[i]) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `String at index ${i} "${strs[i]}" already grouped. Skip.`,
          visualizationData: {
            arrays: [
              {
                id: 'strs',
                name: 'Input Strings',
                values: strs,
                highlights: [],
                pointers: [{ name: 'i', index: i, color: '#9ca3af' }],
              },
            ],
            custom: {
              used: [...used],
              groups: result.map(g => [...g]),
              comparisons,
              skipped: true,
            },
          },
          variables: { i },
        });
        continue;
      }

      const group: string[] = [strs[i]];
      used[i] = true;
      const sortedI = strs[i].split('').sort().join('');

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Start new group with "${strs[i]}" (sorted: "${sortedI}"). Look for anagrams.`,
        visualizationData: {
          arrays: [
            {
              id: 'strs',
              name: 'Input Strings',
              values: strs,
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
            },
          ],
          custom: {
            used: [...used],
            groups: result.map(g => [...g]),
            currentGroup: [...group],
            sortedI,
            comparisons,
          },
        },
        variables: { i, sortedI },
      });

      for (let j = i + 1; j < strs.length; j++) {
        if (used[j]) continue;

        comparisons++;
        const sortedJ = strs[j].split('').sort().join('');
        const isAnagram = sortedI === sortedJ;

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Compare "${strs[i]}" (${sortedI}) with "${strs[j]}" (${sortedJ}): ${isAnagram ? 'Match! Add to group' : 'Not a match'}`,
          visualizationData: {
            arrays: [
              {
                id: 'strs',
                name: 'Input Strings',
                values: strs,
                highlights: isAnagram ? [i, j] : [j],
                pointers: [
                  { name: 'i', index: i, color: '#3b82f6' },
                  { name: 'j', index: j, color: '#ef4444' },
                ],
              },
            ],
            custom: {
              used: [...used],
              groups: result.map(g => [...g]),
              currentGroup: [...group],
              sortedI,
              sortedJ,
              comparing: true,
              isAnagram,
              comparisons,
            },
          },
          variables: { i, j, isAnagram },
        });

        if (isAnagram) {
          group.push(strs[j]);
          used[j] = true;

          steps.push({
            id: `step-${stepId++}`,
            type: 'iteration',
            description: `Added "${strs[j]}" to current group.`,
            visualizationData: {
              arrays: [
                {
                  id: 'strs',
                  name: 'Input Strings',
                  values: strs,
                  highlights: [i, j],
                  pointers: [
                    { name: 'i', index: i, color: '#3b82f6' },
                    { name: 'j', index: j, color: '#10b981' },
                  ],
                },
              ],
              custom: {
                used: [...used],
                groups: result.map(g => [...g]),
                currentGroup: [...group],
                comparisons,
                added: true,
              },
            },
            variables: { i, j },
          });
        }
      }

      result.push(group);

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Completed group with ${group.length} string(s): [${group.map(s => `"${s}"`).join(', ')}]`,
        visualizationData: {
          arrays: [
            {
              id: 'strs',
              name: 'Input Strings',
              values: strs,
              highlights: [],
              pointers: [],
            },
          ],
          custom: {
            used: [...used],
            groups: result.map(g => [...g]),
            groupCompleted: true,
            completedGroup: [...group],
            comparisons,
          },
        },
        variables: { i },
      });
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Grouped all strings into ${result.length} group(s) after ${comparisons} comparisons.`,
      visualizationData: {
        arrays: [
          {
            id: 'strs',
            name: 'Input Strings',
            values: strs,
            highlights: [],
            pointers: [],
          },
        ],
        custom: {
          used: [...used],
          groups: result.map(g => [...g]),
          comparisons,
          result: result.map(g => [...g]),
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
