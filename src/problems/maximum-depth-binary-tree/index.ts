import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { MAXIMUM_DEPTH_BINARY_TREE_METADATA } from './metadata';
import { RecursiveDFSSolution, IterativeBFSSolution } from './solutions';
import { MaxDepthVisualizer } from './visualizers';
import { MaximumDepthBinaryTreeInput } from './types';

export const MaximumDepthBinaryTreeProblem: Problem<MaximumDepthBinaryTreeInput, number> = {
  ...MAXIMUM_DEPTH_BINARY_TREE_METADATA,
  solutions: [RecursiveDFSSolution, IterativeBFSSolution],
  defaultVisualizerComponent: MaxDepthVisualizer,
};

// Auto-register when module is imported
registerProblem(MaximumDepthBinaryTreeProblem);

export * from './types';
