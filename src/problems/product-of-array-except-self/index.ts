import { Problem } from '../../core/types';
import { registerProblem } from '../../core/registry';
import { PRODUCT_OF_ARRAY_EXCEPT_SELF_METADATA } from './metadata';
import { BruteForceSolution, PrefixSuffixSolution } from './solutions';
import { ProductArrayVisualizer } from './visualizers';
import { ProductOfArrayExceptSelfInput } from './types';

export const ProductOfArrayExceptSelfProblem: Problem<ProductOfArrayExceptSelfInput, number[]> = {
  ...PRODUCT_OF_ARRAY_EXCEPT_SELF_METADATA,
  solutions: [BruteForceSolution, PrefixSuffixSolution],
  defaultVisualizerComponent: ProductArrayVisualizer,
};

registerProblem(ProductOfArrayExceptSelfProblem);
