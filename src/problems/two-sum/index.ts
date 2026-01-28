import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { TWO_SUM_METADATA } from './metadata';
import { HashMapSolution, BruteForceSolution } from './solutions';
import { TwoSumVisualizer } from './visualizers';
import { TwoSumInput } from './types';

export const TwoSumProblem: Problem<TwoSumInput, number[]> = {
  ...TWO_SUM_METADATA,
  solutions: [HashMapSolution, BruteForceSolution],
  defaultVisualizerComponent: TwoSumVisualizer,
};

// Auto-register when module is imported
registerProblem(TwoSumProblem);

export * from './types';
