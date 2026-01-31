import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { REORDER_LIST_METADATA } from './metadata';
import { ArraySolution } from './solutions/ArraySolution';
import { InPlaceSolution } from './solutions/InPlaceSolution';
import { ReorderListVisualizer } from './visualizers/ReorderListVisualizer';
import { ReorderListInput } from './types';

export const ReorderListProblem: Problem<ReorderListInput, void> = {
  ...REORDER_LIST_METADATA,
  solutions: [ArraySolution, InPlaceSolution],
  defaultVisualizerComponent: ReorderListVisualizer,
};

// Auto-register when module is imported
registerProblem(ReorderListProblem);

export * from './types';
