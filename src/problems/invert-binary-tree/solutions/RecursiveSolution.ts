import { Solution, AnimationStep, SolutionExecution, TreeNode, StackFrame } from '../../../core/types';
import { InvertBinaryTreeInput } from '../types';

export const RecursiveSolution: Solution<InvertBinaryTreeInput, TreeNode | null> = {
  id: 'recursive',
  name: 'Recursive Solution',
  description: 'Recursively invert the tree by swapping left and right children at each node. Post-order traversal: invert children first, then swap.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h)',

  code: `function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  // Recursively invert left and right subtrees
  const left = invertTree(root.left);
  const right = invertTree(root.right);

  // Swap the children
  root.left = right;
  root.right = left;

  return root;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (root == null) return null;                        // Line 2
                                                        // Line 3
  // Recursively invert left and right subtrees        // Line 4
  TreeNode left = invertTree(root.left);                // Line 5
  TreeNode right = invertTree(root.right);              // Line 6
                                                        // Line 7
  // Swap the children                                 // Line 8
  root.left = right;                                    // Line 9
  root.right = left;                                    // Line 10
                                                        // Line 11
  return root;                                          // Line 12
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (root == null) return null;                        // Line 2
                                                        // Line 3
  // Recursively invert left and right subtrees        // Line 4
  TreeNode left = InvertTree(root.left);                // Line 5
  TreeNode right = InvertTree(root.right);              // Line 6
                                                        // Line 7
  // Swap the children                                 // Line 8
  root.left = right;                                    // Line 9
  root.right = left;                                    // Line 10
                                                        // Line 11
  return root;                                          // Line 12
}`,
    },
  ],

  execute: (input: InvertBinaryTreeInput): SolutionExecution<TreeNode | null> => {
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

    // Track original tree for comparison
    const originalRoot = cloneTree(root);

    // Call stack tracking
    const callStack: StackFrame[] = [];
    const invertedNodes: Set<string> = new Set();
    const swappingNodes: string[] = [];

    // Helper to create visualization data
    const createVisualizationData = (customData: any = {}) => ({
      trees: [
        {
          id: 'original',
          name: 'Original',
          root: originalRoot,
          highlightedNodes: [],
          traversalPath: [],
        },
        {
          id: 'inverted',
          name: 'Inverted',
          root: workingRoot,
          highlightedNodes: customData.highlightedNodes || [],
          traversalPath: customData.traversalPath || [],
        }
      ],
      stack: [...callStack],
      custom: {
        invertedNodes: Array.from(invertedNodes),
        swappingNodes: [...swappingNodes],
        ...customData,
      },
    });

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Starting recursive inversion. Will swap left and right children at each node.',
      lineNumber: 2,
      visualizationData: createVisualizationData(),
      variables: { invertedCount: 0 },
    });

    const invertTree = (node: TreeNode | null): TreeNode | null => {
      // Push current call to stack
      callStack.push({
        functionName: 'invertTree',
        parameters: { node: node === null ? 'null' : node.value },
        lineNumber: 2,
      });

      if (node === null) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: 'Base case: node is null, return null',
          lineNumber: 2,
          visualizationData: createVisualizationData({
            isBaseCase: true,
          }),
          variables: { node: 'null' },
        });
        callStack.pop();
        return null;
      }

      // Visit current node
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Visit node ${node.value}. Will invert its subtrees first.`,
        lineNumber: 5,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          visiting: true,
        }),
        variables: { node: node.value, invertedCount: invertedNodes.size },
      });

      // Traverse left
      if (node.left) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Recursively invert left subtree of node ${node.value}`,
          lineNumber: 5,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.left.id],
            currentNode: node.id,
            exploringLeft: true,
          }),
          variables: { node: node.value },
        });
      }
      const left = invertTree(node.left || null);

      // Traverse right
      if (node.right) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Recursively invert right subtree of node ${node.value}`,
          lineNumber: 6,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.right.id],
            currentNode: node.id,
            exploringRight: true,
          }),
          variables: { node: node.value },
        });
      }
      const right = invertTree(node.right || null);

      // Show the swap preparation
      swappingNodes.push(node.id);
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Swap children of node ${node.value}: left (${node.left?.value ?? 'null'}) ↔ right (${node.right?.value ?? 'null'})`,
        lineNumber: 9,
        visualizationData: createVisualizationData({
          highlightedNodes: [
            node.id,
            ...(node.left ? [node.left.id] : []),
            ...(node.right ? [node.right.id] : [])
          ],
          currentNode: node.id,
          preparingSwap: true,
          swapLeftValue: node.left?.value ?? 'null',
          swapRightValue: node.right?.value ?? 'null',
        }),
        variables: {
          node: node.value,
          leftChild: node.left?.value ?? 'null',
          rightChild: node.right?.value ?? 'null'
        },
      });

      // Perform the swap
      node.left = right;
      node.right = left;
      invertedNodes.add(node.id);

      // Show after swap
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `✓ Node ${node.value} inverted. Left is now ${node.left?.value ?? 'null'}, right is now ${node.right?.value ?? 'null'}`,
        lineNumber: 10,
        visualizationData: createVisualizationData({
          highlightedNodes: [
            node.id,
            ...(node.left ? [node.left.id] : []),
            ...(node.right ? [node.right.id] : [])
          ],
          currentNode: node.id,
          swapped: true,
          newLeftValue: node.left?.value ?? 'null',
          newRightValue: node.right?.value ?? 'null',
        }),
        variables: {
          node: node.value,
          newLeft: node.left?.value ?? 'null',
          newRight: node.right?.value ?? 'null',
          invertedCount: invertedNodes.size
        },
      });

      swappingNodes.pop();
      callStack.pop();
      return node;
    };

    const result = invertTree(workingRoot);

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Tree inversion complete! All ${invertedNodes.size} nodes have been inverted.`,
      lineNumber: 12,
      visualizationData: {
        trees: [
          {
            id: 'original',
            name: 'Original',
            root: originalRoot,
            highlightedNodes: [],
            traversalPath: [],
          },
          {
            id: 'inverted',
            name: 'Inverted',
            root: workingRoot,
            highlightedNodes: [],
            traversalPath: [],
          }
        ],
        stack: [],
        custom: {
          invertedNodes: Array.from(invertedNodes),
          complete: true,
        },
        annotations: [
          {
            text: `✓ ${invertedNodes.size} nodes inverted`,
            position: { x: 50, y: 10 },
            style: 'success',
          },
        ],
      },
      variables: { result: 'inverted tree', totalNodes: invertedNodes.size },
    });

    return { steps, result };
  },
};
