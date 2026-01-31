import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry/ProblemRegistry';
import { THREE_SUM_METADATA } from './metadata';
import { BruteForceSolution, TwoPointerSolution } from './solutions';
import { ThreeSumVisualizer } from './visualizers';
import { ThreeSumInput } from './types';

export const ThreeSumProblem: Problem<ThreeSumInput, number[][]> = {
  ...THREE_SUM_METADATA,
  solutions: [TwoPointerSolution, BruteForceSolution],
  defaultVisualizerComponent: ThreeSumVisualizer,
};

// Auto-register the problem
registerProblem(ThreeSumProblem);
