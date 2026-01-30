import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry/ProblemRegistry';
import { CONTAINS_DUPLICATE_METADATA } from './metadata';
import { BruteForceSolution, HashSetSolution } from './solutions';
import { ContainsDuplicateVisualizer } from './visualizers';
import { ContainsDuplicateInput } from './types';

export const ContainsDuplicateProblem: Problem<ContainsDuplicateInput, boolean> = {
  ...CONTAINS_DUPLICATE_METADATA,
  solutions: [HashSetSolution, BruteForceSolution],
  defaultVisualizerComponent: ContainsDuplicateVisualizer,
};

// Auto-register the problem
registerProblem(ContainsDuplicateProblem);
