import { Solution } from './Solution';
import { VisualizationProps } from './Visualization';
import React from 'react';

export type ProblemTag = 
  | 'Array' 
  | 'Linked List' 
  | 'Tree' 
  | 'Recursive' 
  | 'Iterative' 
  | 'Two Pointers'
  | 'Hash Map'
  | 'Stack'
  | 'Queue'
  | 'Graph'
  | 'Dynamic Programming'
  | 'Greedy'
  | 'Backtracking'
  | 'Binary Search'
  | 'Sliding Window'
  | 'String';

export interface Problem<TInput = any, TOutput = any> {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: ProblemTag[];
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  solutions: Solution<TInput, TOutput>[];
  defaultVisualizerComponent: React.ComponentType<VisualizationProps>;
  // Deprecated: kept for backward compatibility, will be removed
  category?: string;
}

export interface ProblemExample {
  input: any;
  output: any;
  explanation?: string;
}
