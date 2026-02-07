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

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  boolean[] used = new boolean[strs.length];
  List<List<String>> result = new ArrayList<>();

  for (int i = 0; i < strs.length; i++) {
    if (used[i]) continue;

    List<String> group = new ArrayList<>();
    group.add(strs[i]);
    used[i] = true;
    String sortedI = sortString(strs[i]);

    for (int j = i + 1; j < strs.length; j++) {
      if (used[j]) continue;

      String sortedJ = sortString(strs[j]);
      if (sortedI.equals(sortedJ)) {
        group.add(strs[j]);
        used[j] = true;
      }
    }

    result.add(group);
  }

  return result;
}

private String sortString(String s) {
  char[] chars = s.toCharArray();
  Arrays.sort(chars);
  return new String(chars);
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  bool[] used = new bool[strs.Length];
  var result = new List<IList<string>>();

  for (int i = 0; i < strs.Length; i++) {
    if (used[i]) continue;

    var group = new List<string> { strs[i] };
    used[i] = true;
    string sortedI = SortString(strs[i]);

    for (int j = i + 1; j < strs.Length; j++) {
      if (used[j]) continue;

      string sortedJ = SortString(strs[j]);
      if (sortedI == sortedJ) {
        group.Add(strs[j]);
        used[j] = true;
      }
    }

    result.Add(group);
  }

  return result;
}

private string SortString(string s) {
  char[] chars = s.ToCharArray();
  Array.Sort(chars);
  return new string(chars);
}`,
    },
  ],
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
      lineNumber: 2,
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
          lineNumber: 6,
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
        lineNumber: 8,
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
          lineNumber: 15,
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
            lineNumber: 17,
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
        lineNumber: 22,
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
      lineNumber: 25,
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
