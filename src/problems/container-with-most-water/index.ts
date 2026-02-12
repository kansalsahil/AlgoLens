import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { CONTAINER_WITH_MOST_WATER_METADATA } from './metadata';
import { BruteForceSolution, TwoPointerSolution } from './solutions';
import { ContainerWithMostWaterInput } from './types';
import { ContainerWithMostWaterVisualizer } from './visualizers';

export const ContainerWithMostWaterProblem: Problem<ContainerWithMostWaterInput, number> = {
  ...CONTAINER_WITH_MOST_WATER_METADATA,
  solutions: [BruteForceSolution, TwoPointerSolution],
  defaultVisualizerComponent: ContainerWithMostWaterVisualizer,
};

registerProblem(ContainerWithMostWaterProblem);
