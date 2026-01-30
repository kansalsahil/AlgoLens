import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry/ProblemRegistry';
import { VALID_PARENTHESES_METADATA } from './metadata';
import { ReplacementSolution, StackSolution } from './solutions';
import { ValidParenthesesVisualizer } from './visualizers';
import { ValidParenthesesInput } from './types';

export const ValidParenthesesProblem: Problem<ValidParenthesesInput, boolean> = {
  ...VALID_PARENTHESES_METADATA,
  solutions: [StackSolution, ReplacementSolution],
  defaultVisualizerComponent: ValidParenthesesVisualizer,
};

// Auto-register the problem
registerProblem(ValidParenthesesProblem);
