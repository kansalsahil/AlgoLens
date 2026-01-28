import { Highlight, Annotation } from './Step';

export interface VisualizationData {
  arrays?: ArrayVisualization[];
  trees?: TreeVisualization[];
  linkedLists?: LinkedListVisualization[];
  stack?: StackFrame[];
  highlights?: Highlight[];
  annotations?: Annotation[];
  custom?: Record<string, any>;
}

export interface StackFrame {
  functionName: string;
  parameters: Record<string, any>;
  lineNumber?: number;
}

export interface ArrayVisualization {
  id: string;
  name: string;
  values: (number | string)[];
  highlights?: number[];
  pointers?: ArrayPointer[];
}

export interface ArrayPointer {
  name: string;
  index: number;
  color?: string;
}

export interface TreeVisualization {
  id: string;
  name: string;
  root: TreeNode | null;
  highlightedNodes?: string[];
  traversalPath?: string[];
}

export interface TreeNode {
  id: string;
  value: any;
  left?: TreeNode | null;
  right?: TreeNode | null;
  meta?: Record<string, any>;
}

export interface LinkedListVisualization {
  id: string;
  name: string;
  head: ListNode | null;
  highlightedNodes?: string[];
  pointers?: ListPointer[];
}

export interface ListNode {
  id: string;
  value: any;
  next?: ListNode | null;
  meta?: Record<string, any>;
}

export interface ListPointer {
  name: string;
  nodeId: string;
  color?: string;
}

export interface VisualizationProps {
  step: import('./Step').AnimationStep;
  isAnimating: boolean;
  transitionDuration: number;
}
