import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { NUMBER_OF_ISLANDS_METADATA } from './metadata';
import { DFSSolution, BFSSolution } from './solutions';
import { NumberOfIslandsVisualizer } from './visualizers';
import { NumberOfIslandsInput } from './types';

export const NumberOfIslandsProblem: Problem<NumberOfIslandsInput, number> = {
  ...NUMBER_OF_ISLANDS_METADATA,
  solutions: [DFSSolution, BFSSolution],
  defaultVisualizerComponent: NumberOfIslandsVisualizer,
};

registerProblem(NumberOfIslandsProblem);
