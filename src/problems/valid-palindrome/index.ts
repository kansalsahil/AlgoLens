import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry/ProblemRegistry';
import { VALID_PALINDROME_METADATA } from './metadata';
import { CleanAndReverseSolution, TwoPointerSolution } from './solutions';
import { ValidPalindromeVisualizer } from './visualizers';
import { ValidPalindromeInput } from './types';

export const ValidPalindromeProblem: Problem<ValidPalindromeInput, boolean> = {
  ...VALID_PALINDROME_METADATA,
  solutions: [TwoPointerSolution, CleanAndReverseSolution],
  defaultVisualizerComponent: ValidPalindromeVisualizer,
};

// Auto-register the problem
registerProblem(ValidPalindromeProblem);
