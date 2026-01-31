import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { MERGE_TWO_SORTED_LISTS_METADATA } from './metadata';
import { IterativeSolution } from './solutions/IterativeSolution';
import { RecursiveSolution } from './solutions/RecursiveSolution';
import { MergeTwoSortedListsVisualizer } from './visualizers/MergeTwoSortedListsVisualizer';
import { MergeTwoSortedListsInput } from './types';

export const MergeTwoSortedListsProblem: Problem<MergeTwoSortedListsInput, any> = {
  ...MERGE_TWO_SORTED_LISTS_METADATA,
  solutions: [IterativeSolution, RecursiveSolution],
  defaultVisualizerComponent: MergeTwoSortedListsVisualizer,
};

// Auto-register when module is imported
registerProblem(MergeTwoSortedListsProblem);

export * from './types';
