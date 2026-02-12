import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { LONGEST_SUBSTRING_METADATA } from './metadata';
import { BruteForceSolution, SlidingWindowSolution } from './solutions';
import { LongestSubstringInput } from './types';
import { LongestSubstringVisualizer } from './visualizers';

export const LongestSubstringProblem: Problem<LongestSubstringInput, number> = {
  ...LONGEST_SUBSTRING_METADATA,
  solutions: [BruteForceSolution, SlidingWindowSolution],
  defaultVisualizerComponent: LongestSubstringVisualizer,
};

registerProblem(LongestSubstringProblem);
