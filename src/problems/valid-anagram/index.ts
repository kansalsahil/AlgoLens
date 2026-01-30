import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry/ProblemRegistry';
import { VALID_ANAGRAM_METADATA } from './metadata';
import { SortingSolution, HashMapSolution } from './solutions';
import { ValidAnagramVisualizer } from './visualizers';
import { ValidAnagramInput } from './types';

export const ValidAnagramProblem: Problem<ValidAnagramInput, boolean> = {
  ...VALID_ANAGRAM_METADATA,
  solutions: [HashMapSolution, SortingSolution],
  defaultVisualizerComponent: ValidAnagramVisualizer,
};

// Auto-register the problem
registerProblem(ValidAnagramProblem);
