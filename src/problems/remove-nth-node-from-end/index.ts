import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { REMOVE_NTH_NODE_FROM_END_METADATA } from './metadata';
import { TwoPassSolution } from './solutions/TwoPassSolution';
import { OnePassSolution } from './solutions/OnePassSolution';
import { RemoveNthNodeFromEndVisualizer } from './visualizers/RemoveNthNodeFromEndVisualizer';
import { RemoveNthNodeFromEndInput } from './types';

export const RemoveNthNodeFromEndProblem: Problem<RemoveNthNodeFromEndInput, any> = {
  ...REMOVE_NTH_NODE_FROM_END_METADATA,
  solutions: [TwoPassSolution, OnePassSolution],
  defaultVisualizerComponent: RemoveNthNodeFromEndVisualizer,
};

// Auto-register when module is imported
registerProblem(RemoveNthNodeFromEndProblem);

export * from './types';
