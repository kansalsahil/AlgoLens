import { Problem, ListNode } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { REVERSE_LINKED_LIST_METADATA } from './metadata';
import { IterativeSolution, RecursiveSolution } from './solutions';
import { ReverseLinkedListVisualizer } from './visualizers';
import { ReverseLinkedListInput } from './types';

export const ReverseLinkedListProblem: Problem<ReverseLinkedListInput, ListNode | null> = {
  ...REVERSE_LINKED_LIST_METADATA,
  solutions: [IterativeSolution, RecursiveSolution],
  defaultVisualizerComponent: ReverseLinkedListVisualizer,
};

// Auto-register when module is imported
registerProblem(ReverseLinkedListProblem);

export * from './types';
