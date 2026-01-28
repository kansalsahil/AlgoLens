import { VisualizationData } from './Visualization';

export interface AnimationStep {
  id: string;
  type: StepType;
  description: string;
  lineNumber?: number;
  duration?: number;
  visualizationData: VisualizationData;
  variables?: Record<string, any>;
}

export type StepType =
  | 'initialization'
  | 'comparison'
  | 'assignment'
  | 'iteration'
  | 'return'
  | 'custom';

export interface Highlight {
  targetId: string;
  type: 'active' | 'compared' | 'selected' | 'completed' | 'error';
  color?: string;
}

export interface Annotation {
  text: string;
  position: { x: number; y: number };
  style?: 'info' | 'warning' | 'success' | 'error';
}
