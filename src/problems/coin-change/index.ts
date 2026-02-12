import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { COIN_CHANGE_METADATA } from './metadata';
import {
  RecursiveSolution,
  MemoizationSolution,
  TabulationSolution,
} from './solutions';
import { CoinChangeInput } from './types';
import { CoinChangeVisualizer } from './visualizers';

export const CoinChangeProblem: Problem<CoinChangeInput, number> = {
  ...COIN_CHANGE_METADATA,
  solutions: [
    RecursiveSolution,
    MemoizationSolution,
    TabulationSolution,
  ],
  defaultVisualizerComponent: CoinChangeVisualizer,
};

registerProblem(CoinChangeProblem);
