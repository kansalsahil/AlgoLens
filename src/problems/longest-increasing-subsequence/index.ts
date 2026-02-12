import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { LONGEST_INCREASING_SUBSEQUENCE_METADATA } from './metadata';
import { DPSolution, BinarySearchSolution } from './solutions';
import { LongestIncreasingSubsequenceInput } from './types';
import { LongestIncreasingSubsequenceVisualizer } from './visualizers';

export const LongestIncreasingSubsequenceProblem: Problem<
  LongestIncreasingSubsequenceInput,
  number
> = {
  ...LONGEST_INCREASING_SUBSEQUENCE_METADATA,
  solutions: [DPSolution, BinarySearchSolution],
  defaultVisualizerComponent: LongestIncreasingSubsequenceVisualizer,
};

registerProblem(LongestIncreasingSubsequenceProblem);
