import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { MERGE_K_SORTED_LISTS_METADATA } from './metadata';
import { BruteForceSolution } from './solutions/BruteForceSolution';
import { DivideAndConquerSolution } from './solutions/DivideAndConquerSolution';
import { MergeKSortedListsVisualizer } from './visualizers/MergeKSortedListsVisualizer';
import { MergeKSortedListsInput } from './types';

export const MergeKSortedListsProblem: Problem<MergeKSortedListsInput, any> = {
  ...MERGE_K_SORTED_LISTS_METADATA,
  solutions: [BruteForceSolution, DivideAndConquerSolution],
  defaultVisualizerComponent: MergeKSortedListsVisualizer,
};

// Auto-register when module is imported
registerProblem(MergeKSortedListsProblem);

export * from './types';
