import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { LINKED_LIST_CYCLE_METADATA } from './metadata';
import { HashSetSolution } from './solutions/HashSetSolution';
import { TwoPointerSolution } from './solutions/TwoPointerSolution';
import { LinkedListCycleVisualizer } from './visualizers/LinkedListCycleVisualizer';
import { LinkedListCycleInput } from './types';

export const LinkedListCycleProblem: Problem<LinkedListCycleInput, boolean> = {
  ...LINKED_LIST_CYCLE_METADATA,
  solutions: [HashSetSolution, TwoPointerSolution],
  defaultVisualizerComponent: LinkedListCycleVisualizer,
};

// Auto-register when module is imported
registerProblem(LinkedListCycleProblem);

export * from './types';
