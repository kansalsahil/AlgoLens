import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { CLIMBING_STAIRS_METADATA } from './metadata';
import {
  RecursiveSolution,
  MemoizationSolution,
  TabulationSolution,
  SpaceOptimizedSolution,
} from './solutions';
import { ClimbingStairsInput } from './types';
import { ClimbingStairsVisualizer } from './visualizers';

export const ClimbingStairsProblem: Problem<ClimbingStairsInput, number> = {
  ...CLIMBING_STAIRS_METADATA,
  solutions: [
    RecursiveSolution,
    MemoizationSolution,
    TabulationSolution,
    SpaceOptimizedSolution,
  ],
  defaultVisualizerComponent: ClimbingStairsVisualizer,
};

registerProblem(ClimbingStairsProblem);
