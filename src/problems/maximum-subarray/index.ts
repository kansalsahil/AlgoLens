import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { MAXIMUM_SUBARRAY_METADATA } from './metadata';
import { BruteForceSolution, KadaneSolution } from './solutions';
import { MaximumSubarrayInput } from './types';
import { MaximumSubarrayVisualizer } from './visualizers';

export const MaximumSubarrayProblem: Problem<MaximumSubarrayInput, number> = {
  ...MAXIMUM_SUBARRAY_METADATA,
  solutions: [BruteForceSolution, KadaneSolution],
  defaultVisualizerComponent: MaximumSubarrayVisualizer,
};

registerProblem(MaximumSubarrayProblem);
