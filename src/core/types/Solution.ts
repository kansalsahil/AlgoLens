import { AnimationStep } from './Step';
import { VisualizationProps } from './Visualization';
import React from 'react';

export type ProgrammingLanguage = 'typescript' | 'javascript' | 'java' | 'csharp' | 'python' | 'cpp' | 'go';

export interface CodeSnippet {
  language: ProgrammingLanguage;
  code: string;
}

export interface Solution<TInput = any, TOutput = any> {
  id: string;
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string; // Default/primary code (usually TypeScript for execution)
  codeLanguages?: CodeSnippet[]; // Multi-language support (optional)
  execute: (input: TInput) => SolutionExecution<TOutput>;
  visualizerComponent?: React.ComponentType<VisualizationProps>;
}

export interface SolutionExecution<TOutput = any> {
  steps: AnimationStep[];
  result: TOutput;
  metadata?: Record<string, any>;
}
