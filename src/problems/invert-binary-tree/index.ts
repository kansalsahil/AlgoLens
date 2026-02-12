import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { INVERT_BINARY_TREE_METADATA } from './metadata';
import { RecursiveSolution, IterativeSolution } from './solutions';
import { InvertTreeVisualizer } from './visualizers';
import { InvertBinaryTreeInput } from './types';
import { TreeNode } from '../../core/types';

export const InvertBinaryTreeProblem: Problem<InvertBinaryTreeInput, TreeNode | null> = {
  ...INVERT_BINARY_TREE_METADATA,
  solutions: [RecursiveSolution, IterativeSolution],
  defaultVisualizerComponent: InvertTreeVisualizer,
};

// Auto-register when module is imported
registerProblem(InvertBinaryTreeProblem);

export * from './types';
