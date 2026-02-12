import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { VALIDATE_BST_METADATA } from './metadata';
import { RecursiveRangeSolution, InorderTraversalSolution } from './solutions';
import { ValidateBSTVisualizer } from './visualizers';
import { ValidateBSTInput } from './types';

export const ValidateBSTProblem: Problem<ValidateBSTInput, boolean> = {
  ...VALIDATE_BST_METADATA,
  solutions: [RecursiveRangeSolution, InorderTraversalSolution],
  defaultVisualizerComponent: ValidateBSTVisualizer,
};

// Auto-register when module is imported
registerProblem(ValidateBSTProblem);

export * from './types';
