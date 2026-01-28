import { AnimationStep } from './Step';
import { VisualizationProps } from './Visualization';
import React from 'react';

export interface Solution<TInput = any, TOutput = any> {
  id: string;
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  execute: (input: TInput) => SolutionExecution<TOutput>;
  visualizerComponent?: React.ComponentType<VisualizationProps>;
}

export interface SolutionExecution<TOutput = any> {
  steps: AnimationStep[];
  result: TOutput;
  metadata?: Record<string, any>;
}
