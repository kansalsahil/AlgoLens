import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { BEST_TIME_TO_BUY_SELL_STOCK_METADATA } from './metadata';
import { BruteForceSolution, OnePassSolution } from './solutions';
import { BestTimeToBuySellStockInput } from './types';
import { BestTimeToBuySellStockVisualizer } from './visualizers';

export const BestTimeToBuySellStockProblem: Problem<BestTimeToBuySellStockInput, number> = {
  ...BEST_TIME_TO_BUY_SELL_STOCK_METADATA,
  solutions: [BruteForceSolution, OnePassSolution],
  defaultVisualizerComponent: BestTimeToBuySellStockVisualizer,
};

registerProblem(BestTimeToBuySellStockProblem);
