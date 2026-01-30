import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry/ProblemRegistry';
import { GROUP_ANAGRAMS_METADATA } from './metadata';
import { BruteForceSolution, HashMapSolution } from './solutions';
import { GroupAnagramsVisualizer } from './visualizers';
import { GroupAnagramsInput } from './types';

export const GroupAnagramsProblem: Problem<GroupAnagramsInput, string[][]> = {
  ...GROUP_ANAGRAMS_METADATA,
  solutions: [HashMapSolution, BruteForceSolution],
  defaultVisualizerComponent: GroupAnagramsVisualizer,
};

// Auto-register the problem
registerProblem(GroupAnagramsProblem);
