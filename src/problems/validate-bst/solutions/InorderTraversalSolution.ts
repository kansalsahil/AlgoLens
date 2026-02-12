import { Solution, AnimationStep, SolutionExecution, TreeNode, StackFrame } from '../../../core/types';
import { ValidateBSTInput } from '../types';

export const InorderTraversalSolution: Solution<ValidateBSTInput, boolean> = {
  id: 'inorder-traversal',
  name: 'Inorder Traversal',
  description: 'Perform inorder traversal and check if values are in strictly increasing order. Valid BST inorder is sorted.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h)',

  code: `function isValidBST(root: TreeNode | null): boolean {
  let prev: number | null = null;

  function inorder(node: TreeNode | null): boolean {
    if (node === null) return true;

    // Check left subtree
    if (!inorder(node.left)) return false;

    // Check current node
    if (prev !== null && node.val <= prev) return false;
    prev = node.val;

    // Check right subtree
    return inorder(node.right);
  }

  return inorder(root);
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  private Integer prev = null;                          // Line 2
                                                        // Line 3
  private boolean inorder(TreeNode node) {              // Line 4
    if (node == null) return true;                      // Line 5
                                                        // Line 6
    // Check left subtree                               // Line 7
    if (!inorder(node.left)) return false;              // Line 8
                                                        // Line 9
    // Check current node                               // Line 10
    if (prev != null && node.val <= prev) return false; // Line 11
    prev = node.val;                                    // Line 12
                                                        // Line 13
    // Check right subtree                              // Line 14
    return inorder(node.right);                         // Line 15
  }
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  private int? prev = null;                             // Line 2
                                                        // Line 3
  private bool Inorder(TreeNode node) {                 // Line 4
    if (node == null) return true;                      // Line 5
                                                        // Line 6
    // Check left subtree                               // Line 7
    if (!Inorder(node.left)) return false;              // Line 8
                                                        // Line 9
    // Check current node                               // Line 10
    if (prev != null && node.val <= prev) return false; // Line 11
    prev = node.val;                                    // Line 12
                                                        // Line 13
    // Check right subtree                              // Line 14
    return Inorder(node.right);                         // Line 15
  }
}`,
    },
  ],

  execute: (input: ValidateBSTInput): SolutionExecution<boolean> => {
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

    // Tracking state
    const callStack: StackFrame[] = [];
    const traversalOrder: number[] = [];
    const traversalNodes: string[] = [];
    let prev: number | null = null;
    let isValid = true;
    let violationNode: string | null = null;
    let violationMessage = '';

    // Helper to create visualization data
    const createVisualizationData = (customData: any = {}) => ({
      trees: [{
        id: 'tree',
        name: 'Binary Search Tree',
        root: workingRoot,
        highlightedNodes: customData.highlightedNodes || [],
        traversalPath: [...traversalNodes],
      }],
      stack: [...callStack],
      custom: {
        prev,
        traversalOrder: [...traversalOrder],
        isValid,
        violationNode,
        violationMessage,
        ...customData,
      },
    });

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Starting inorder traversal to validate BST (should be sorted)',
      lineNumber: 2,
      visualizationData: createVisualizationData(),
      variables: { prev: null, traversalOrder: [] },
    });

    const inorder = (node: TreeNode | null): boolean => {
      // Push current call to stack
      callStack.push({
        functionName: 'inorder',
        parameters: { node: node === null ? 'null' : node.value },
        lineNumber: 5,
      });

      if (node === null) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: 'Base case: null node, continue traversal',
          lineNumber: 5,
          visualizationData: createVisualizationData({
            isBaseCase: true,
            returnValue: true,
          }),
          variables: { prev, returnValue: true },
        });
        callStack.pop();
        return true;
      }

      // Traverse left subtree
      if (node.left) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Traverse left subtree of ${node.value}`,
          lineNumber: 8,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.left.id],
            currentNode: node.id,
            exploringLeft: true,
          }),
          variables: { currentNode: node.value, prev },
        });
      }

      const leftValid = inorder(node.left || null);

      if (!leftValid) {
        callStack.pop();
        return false;
      }

      // Visit current node
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Visit node ${node.value} in inorder`,
        lineNumber: 10,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          visiting: true,
        }),
        variables: { currentNode: node.value, prev },
      });

      // Check if current value is greater than previous
      if (prev !== null && node.value <= prev) {
        isValid = false;
        violationNode = node.id;
        violationMessage = `Node ${node.value} ≤ previous ${prev}: inorder not sorted`;

        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: violationMessage,
          lineNumber: 11,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id],
            violationNode: node.id,
            violation: true,
            violationMessage,
            currentValue: node.value,
            prevValue: prev,
          }),
          variables: {
            currentNode: node.value,
            prev,
            valid: false,
          },
        });

        callStack.pop();
        return false;
      }

      // Current node is valid
      traversalOrder.push(node.value);
      traversalNodes.push(node.id);

      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: prev === null
          ? `✓ First node: ${node.value}`
          : `✓ Valid: ${node.value} > ${prev}`,
        lineNumber: 11,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          validNode: true,
          currentValue: node.value,
          prevValue: prev,
          comparison: true,
        }),
        variables: {
          currentNode: node.value,
          prev,
          valid: true,
        },
      });

      // Update previous
      prev = node.value;

      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Update prev = ${node.value}`,
        lineNumber: 12,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          updatingPrev: true,
        }),
        variables: {
          currentNode: node.value,
          prev,
        },
      });

      // Traverse right subtree
      if (node.right) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Traverse right subtree of ${node.value}`,
          lineNumber: 15,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.right.id],
            currentNode: node.id,
            exploringRight: true,
          }),
          variables: { currentNode: node.value, prev },
        });
      }

      const rightValid = inorder(node.right || null);

      callStack.pop();
      return rightValid;
    };

    const result = inorder(workingRoot);

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: result
        ? `✓ Valid BST: Inorder traversal is sorted [${traversalOrder.join(', ')}]`
        : `✗ Invalid BST: ${violationMessage}`,
      lineNumber: 15,
      visualizationData: {
        trees: [{
          id: 'tree',
          name: 'Binary Search Tree',
          root: workingRoot,
          highlightedNodes: [],
          traversalPath: [...traversalNodes],
        }],
        stack: [],
        custom: {
          prev,
          traversalOrder: [...traversalOrder],
          isValid: result,
          complete: true,
          violationNode,
          violationMessage: result ? '' : violationMessage,
        },
        annotations: [
          {
            text: result ? '✓ Valid BST' : '✗ Invalid BST',
            position: { x: 50, y: 10 },
            style: result ? 'success' : 'error',
          },
        ],
      },
      variables: { result, traversalOrder: [...traversalOrder] },
    });

    return { steps, result };
  },
};
