import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { GroupAnagramsInput } from '../types';

export const HashMapSolution: Solution<GroupAnagramsInput, string[][]> = {
  id: 'hash-map',
  name: 'Hash Map (Optimal)',
  description: 'Use sorted string as key in hash map to group anagrams in a single pass.',
  timeComplexity: 'O(n × k log k)',
  spaceComplexity: 'O(n × k)',
  code: `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    const sorted = str.split('').sort().join('');

    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted)!.push(str);
  }

  return Array.from(map.values());
}`,
  execute: (input: GroupAnagramsInput): SolutionExecution<string[][]> => {
    const { strs } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const map = new Map<string, string[]>();

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize empty hash map. Use sorted string as key to group anagrams.',
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
          map: {},
          mapKeys: [],
        },
      },
      variables: {},
    });

    for (let i = 0; i < strs.length; i++) {
      const str = strs[i];
      const sorted = str.split('').sort().join('');
      const exists = map.has(sorted);

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Process "${str}" → sorted key: "${sorted}"`,
        lineNumber: 5,
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
            map: Object.fromEntries(
              Array.from(map.entries()).map(([k, v]) => [k, [...v]])
            ),
            mapKeys: Array.from(map.keys()),
            currentString: str,
            sortedKey: sorted,
            exists,
          },
        },
        variables: { i, str, sorted },
      });

      if (!map.has(sorted)) {
        map.set(sorted, []);

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Key "${sorted}" not in map. Create new group.`,
          lineNumber: 7,
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
              map: Object.fromEntries(
                Array.from(map.entries()).map(([k, v]) => [k, [...v]])
              ),
              mapKeys: Array.from(map.keys()),
              currentString: str,
              sortedKey: sorted,
              newKey: true,
            },
          },
          variables: { i, sorted },
        });
      }

      map.get(sorted)!.push(str);

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Added "${str}" to group "${sorted}". Group now has ${map.get(sorted)!.length} string(s).`,
        lineNumber: 10,
        visualizationData: {
          arrays: [
            {
              id: 'strs',
              name: 'Input Strings',
              values: strs,
              highlights: [i],
              pointers: [{ name: 'i', index: i, color: '#10b981' }],
            },
          ],
          custom: {
            map: Object.fromEntries(
              Array.from(map.entries()).map(([k, v]) => [k, [...v]])
            ),
            mapKeys: Array.from(map.keys()),
            currentString: str,
            sortedKey: sorted,
            added: true,
            groupSize: map.get(sorted)!.length,
          },
        },
        variables: { i },
      });
    }

    const result = Array.from(map.values());

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Convert map to array of groups. Total: ${result.length} group(s).`,
      lineNumber: 13,
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
          map: Object.fromEntries(
            Array.from(map.entries()).map(([k, v]) => [k, [...v]])
          ),
          mapKeys: Array.from(map.keys()),
          result: result.map(g => [...g]),
          totalGroups: result.length,
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
