import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { BINARY_TREE_INORDER_METADATA } from './metadata';
import { RecursiveSolution, IterativeSolution } from './solutions';
import { TreeTraversalVisualizer } from './visualizers';
import { BinaryTreeInorderInput } from './types';

export const BinaryTreeInorderProblem: Problem<BinaryTreeInorderInput, number[]> = {
  ...BINARY_TREE_INORDER_METADATA,
  solutions: [RecursiveSolution, IterativeSolution],
  defaultVisualizerComponent: TreeTraversalVisualizer,
};

// Auto-register when module is imported
registerProblem(BinaryTreeInorderProblem);

export * from './types';
