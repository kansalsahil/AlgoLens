import { Solution, AnimationStep, SolutionExecution, TreeNode, StackFrame } from '../../../core/types';
import { MaximumDepthBinaryTreeInput } from '../types';

export const RecursiveDFSSolution: Solution<MaximumDepthBinaryTreeInput, number> = {
  id: 'recursive-dfs',
  name: 'Recursive DFS',
  description: 'Find maximum depth using recursive depth-first search. Depth = 1 + max(left depth, right depth)',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h)',

  code: `function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (root == null) return 0;                           // Line 2
                                                        // Line 3
  int leftDepth = maxDepth(root.left);                  // Line 4
  int rightDepth = maxDepth(root.right);                // Line 5
                                                        // Line 6
  return 1 + Math.max(leftDepth, rightDepth);           // Line 7
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (root == null) return 0;                           // Line 2
                                                        // Line 3
  int leftDepth = MaxDepth(root.left);                  // Line 4
  int rightDepth = MaxDepth(root.right);                // Line 5
                                                        // Line 6
  return 1 + Math.Max(leftDepth, rightDepth);           // Line 7
}`,
    },
  ],

  execute: (input: MaximumDepthBinaryTreeInput): SolutionExecution<number> => {
    const { root } = input;
    const steps: AnimationStep[] = [];
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

    // Call stack tracking
    const callStack: StackFrame[] = [];
    const nodeDepths: Map<string, number> = new Map();
    let maxDepthFound = 0;

    // Helper to create visualization data
    const createVisualizationData = (customData: any = {}) => ({
      trees: [{
        id: 'tree',
        name: 'Binary Tree',
        root: workingRoot,
        highlightedNodes: customData.highlightedNodes || [],
        traversalPath: customData.traversalPath || [],
      }],
      stack: [...callStack],
      custom: {
        depth: maxDepthFound,
        nodeDepths: Object.fromEntries(nodeDepths),
        ...customData,
      },
    });

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Starting recursive DFS to find maximum depth',
      lineNumber: 2,
      visualizationData: createVisualizationData(),
      variables: { depth: 0 },
    });

    const maxDepth = (node: TreeNode | null, depth: number): number => {
      // Push current call to stack
      callStack.push({
        functionName: 'maxDepth',
        parameters: { node: node === null ? 'null' : node.value },
        lineNumber: 2,
      });

      if (node === null) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: 'Base case: node is null, return depth 0',
          lineNumber: 2,
          visualizationData: createVisualizationData({
            highlightedNodes: [],
            returnValue: 0,
            isBaseCase: true,
          }),
          variables: { depth, returnValue: 0 },
        });
        callStack.pop();
        return 0;
      }

      // Visit current node
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Visit node ${node.value} at depth ${depth}`,
        lineNumber: 4,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          currentDepth: depth,
        }),
        variables: { node: node.value, depth },
      });

      // Traverse left
      let leftDepth = 0;
      if (node.left) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Explore left subtree of ${node.value}`,
          lineNumber: 4,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.left.id],
            currentNode: node.id,
            exploringLeft: true,
          }),
          variables: { node: node.value, depth },
        });
      }
      leftDepth = maxDepth(node.left || null, depth + 1);

      // Update depth info after left traversal
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Left subtree of ${node.value} has depth ${leftDepth}`,
        lineNumber: 4,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          leftDepth,
        }),
        variables: { node: node.value, leftDepth },
      });

      // Traverse right
      let rightDepth = 0;
      if (node.right) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Explore right subtree of ${node.value}`,
          lineNumber: 5,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.right.id],
            currentNode: node.id,
            exploringRight: true,
            leftDepth,
          }),
          variables: { node: node.value, leftDepth },
        });
      }
      rightDepth = maxDepth(node.right || null, depth + 1);

      // Update depth info after right traversal
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Right subtree of ${node.value} has depth ${rightDepth}`,
        lineNumber: 5,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          leftDepth,
          rightDepth,
        }),
        variables: { node: node.value, leftDepth, rightDepth },
      });

      // Calculate current node's depth
      const currentDepth = 1 + Math.max(leftDepth, rightDepth);
      nodeDepths.set(node.id, currentDepth);
      maxDepthFound = Math.max(maxDepthFound, currentDepth);

      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Node ${node.value}: depth = 1 + max(${leftDepth}, ${rightDepth}) = ${currentDepth}`,
        lineNumber: 7,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          leftDepth,
          rightDepth,
          currentDepth,
          calculating: true,
        }),
        variables: { node: node.value, leftDepth, rightDepth, currentDepth },
      });

      callStack.pop();
      return currentDepth;
    };

    const result = maxDepth(workingRoot, 1);

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Maximum depth of binary tree is ${result}`,
      lineNumber: 7,
      visualizationData: {
        trees: [{
          id: 'tree',
          name: 'Binary Tree',
          root: workingRoot,
          highlightedNodes: [],
          traversalPath: [],
        }],
        stack: [],
        custom: {
          depth: result,
          nodeDepths: Object.fromEntries(nodeDepths),
          complete: true,
        },
        annotations: [
          {
            text: `✓ Max Depth: ${result}`,
            position: { x: 50, y: 10 },
            style: 'success',
          },
        ],
      },
      variables: { result },
    });

    return { steps, result };
  },
};
