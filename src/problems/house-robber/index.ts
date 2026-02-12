import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { HOUSE_ROBBER_METADATA } from './metadata';
import {
  RecursiveSolution,
  MemoizationSolution,
  TabulationSolution,
  SpaceOptimizedSolution,
} from './solutions';
import { HouseRobberInput } from './types';
import { HouseRobberVisualizer } from './visualizers';

export const HouseRobberProblem: Problem<HouseRobberInput, number> = {
  ...HOUSE_ROBBER_METADATA,
  solutions: [
    RecursiveSolution,
    MemoizationSolution,
    TabulationSolution,
    SpaceOptimizedSolution,
  ],
  defaultVisualizerComponent: HouseRobberVisualizer,
};

registerProblem(HouseRobberProblem);
