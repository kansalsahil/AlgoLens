import { Solution, AnimationStep, SolutionExecution, TreeNode, StackFrame } from '../../../core/types';
import { BinaryTreeInorderInput } from '../types';

export const IterativeSolution: Solution<BinaryTreeInorderInput, number[]> = {
  id: 'iterative',
  name: 'Iterative',
  description: 'Perform inorder traversal iteratively using an explicit stack',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',

  code: `function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let curr: TreeNode | null = root;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop()!;
    result.push(curr.value);
    curr = curr.right;
  }

  return result;
}`,

  execute: (input: BinaryTreeInorderInput): SolutionExecution<number[]> => {
    const { root } = input;
    const steps: AnimationStep[] = [];
    const result: number[] = [];
    const traversalPath: string[] = [];
    let stepId = 0;

    // Deep clone tree
    const cloneTree = (node: TreeNode | null): TreeNode | null => {
      if (!node) return null;
      return {
        id: node.id,
        value: node.value,
        left: cloneTree(node.left || null),
        right: cloneTree(node.right || null),
      };
    };

    const workingRoot = cloneTree(root);
    const stack: TreeNode[] = [];
    let curr: TreeNode | null = workingRoot;

    // Helper to create stack frames
    const createStackFrames = (): StackFrame[] => {
      return stack.map(node => ({
        functionName: 'TreeNode',
        parameters: { value: node.value },
      }));
    };

    // Step 1: Initialization
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize result array, stack, and curr pointer',
      lineNumber: 2,
      visualizationData: {
        trees: [
          {
            id: 'tree',
            name: 'Binary Tree',
            root: workingRoot,
            highlightedNodes: curr ? [curr.id] : [],
            traversalPath: [],
          },
        ],
        stack: [],
        custom: { result: [], curr: curr?.value },
      },
      variables: { result: [], curr: curr?.value },
    });

    while (curr !== null || stack.length > 0) {
      // Go to leftmost node
      while (curr !== null) {
        stack.push(curr);
        
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Push ${curr.value} to stack and go left`,
          lineNumber: 8,
          visualizationData: {
            trees: [
              {
                id: 'tree',
                name: 'Binary Tree',
                root: workingRoot,
                highlightedNodes: [curr.id],
                traversalPath: [...traversalPath],
              },
            ],
            stack: createStackFrames(),
            custom: {
              result: [...result],
              curr: curr.value,
            },
          },
          variables: { result: [...result], curr: curr.value },
        });

        curr = curr.left || null;
      }

      // Pop from stack
      curr = stack.pop()!;
      
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Pop ${curr.value} from stack`,
        lineNumber: 12,
        visualizationData: {
          trees: [
            {
              id: 'tree',
              name: 'Binary Tree',
              root: workingRoot,
              highlightedNodes: [curr.id],
              traversalPath: [...traversalPath],
            },
          ],
          stack: createStackFrames(),
          custom: {
            result: [...result],
            curr: curr.value,
          },
        },
        variables: { result: [...result], curr: curr.value },
      });

      // Add to result
      result.push(curr.value);
      traversalPath.push(curr.id);
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Add ${curr.value} to result`,
        lineNumber: 13,
        visualizationData: {
          trees: [
            {
              id: 'tree',
              name: 'Binary Tree',
              root: workingRoot,
              highlightedNodes: [curr.id],
              traversalPath: [...traversalPath],
            },
          ],
          stack: createStackFrames(),
          custom: {
            result: [...result],
          },
        },
        variables: { result: [...result], curr: curr.value },
      });

      // Move to right
      curr = curr.right || null;
      if (curr) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Move to right child`,
          lineNumber: 14,
          visualizationData: {
            trees: [
              {
                id: 'tree',
                name: 'Binary Tree',
                root: workingRoot,
                highlightedNodes: [curr.id],
                traversalPath: [...traversalPath],
              },
            ],
            stack: createStackFrames(),
            custom: {
              result: [...result],
              curr: curr.value,
            },
          },
          variables: { result: [...result], curr: curr.value },
        });
      }
    }

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Return result array',
      lineNumber: 17,
      visualizationData: {
        trees: [
          {
            id: 'tree',
            name: 'Binary Tree',
            root: workingRoot,
            highlightedNodes: [],
            traversalPath: [...traversalPath],
          },
        ],
        stack: [],
        custom: { result: [...result] },
        annotations: [
          {
            text: `✓ Inorder: [${result.join(', ')}]`,
            position: { x: 50, y: 10 },
            style: 'success',
          },
        ],
      },
      variables: { result: [...result] },
    });

    return { steps, result };
  },
};
