import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry/ProblemRegistry';
import { SEARCH_ROTATED_ARRAY_METADATA } from './metadata';
import { LinearSearchSolution, BinarySearchSolution } from './solutions';
import { SearchRotatedArrayVisualizer } from './visualizers';
import { SearchRotatedArrayInput } from './types';

export const SearchRotatedArrayProblem: Problem<SearchRotatedArrayInput, number> = {
  ...SEARCH_ROTATED_ARRAY_METADATA,
  solutions: [BinarySearchSolution, LinearSearchSolution],
  defaultVisualizerComponent: SearchRotatedArrayVisualizer,
};

// Auto-register the problem
registerProblem(SearchRotatedArrayProblem);
