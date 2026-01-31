import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry/ProblemRegistry';
import { FIND_MINIMUM_ROTATED_ARRAY_METADATA } from './metadata';
import { LinearSearchSolution, BinarySearchSolution } from './solutions';
import { FindMinimumVisualizer } from './visualizers';
import { FindMinimumRotatedArrayInput } from './types';

export const FindMinimumRotatedArrayProblem: Problem<FindMinimumRotatedArrayInput, number> = {
  ...FIND_MINIMUM_ROTATED_ARRAY_METADATA,
  solutions: [BinarySearchSolution, LinearSearchSolution],
  defaultVisualizerComponent: FindMinimumVisualizer,
};

// Auto-register the problem
registerProblem(FindMinimumRotatedArrayProblem);
