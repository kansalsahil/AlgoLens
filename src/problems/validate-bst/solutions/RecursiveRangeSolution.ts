import { Solution, AnimationStep, SolutionExecution, TreeNode, StackFrame } from '../../../core/types';
import { ValidateBSTInput } from '../types';

export const RecursiveRangeSolution: Solution<ValidateBSTInput, boolean> = {
  id: 'recursive-range',
  name: 'Recursive Range Validation',
  description: 'Validate BST by tracking min/max bounds for each node. Each node must be within its valid range [min, max].',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h)',

  code: `function isValidBST(root: TreeNode | null): boolean {
  return validate(root, -Infinity, Infinity);
}

function validate(node: TreeNode | null, min: number, max: number): boolean {
  if (node === null) return true;

  // Current node must be within range
  if (node.val <= min || node.val >= max) return false;

  // Recursively validate left and right subtrees
  return validate(node.left, min, node.val) &&
         validate(node.right, node.val, max);
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (node == null) return true;                        // Line 5
                                                        // Line 6
  // Current node must be within range                 // Line 7
  if (node.val <= min || node.val >= max) return false;// Line 8
                                                        // Line 9
  // Recursively validate left and right subtrees      // Line 10
  return validate(node.left, min, node.val) &&         // Line 11
         validate(node.right, node.val, max);          // Line 12
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (node == null) return true;                        // Line 5
                                                        // Line 6
  // Current node must be within range                 // Line 7
  if (node.val <= min || node.val >= max) return false;// Line 8
                                                        // Line 9
  // Recursively validate left and right subtrees      // Line 10
  return Validate(node.left, min, node.val) &&         // Line 11
         Validate(node.right, node.val, max);          // Line 12
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

    // Call stack and node metadata tracking
    const callStack: StackFrame[] = [];
    const nodeRanges: Map<string, { min: number | string; max: number | string }> = new Map();
    const violationNode: string | null = null;
    let isValid = true;
    let violationMessage = '';

    // Helper to format bound values
    const formatBound = (val: number): string => {
      if (val === -Infinity) return '-∞';
      if (val === Infinity) return '∞';
      return val.toString();
    };

    // Helper to create visualization data
    const createVisualizationData = (customData: any = {}) => ({
      trees: [{
        id: 'tree',
        name: 'Binary Search Tree',
        root: workingRoot,
        highlightedNodes: customData.highlightedNodes || [],
        traversalPath: customData.traversalPath || [],
      }],
      stack: [...callStack],
      custom: {
        nodeRanges: Object.fromEntries(
          Array.from(nodeRanges.entries()).map(([id, range]) => [
            id,
            { min: formatBound(range.min as number), max: formatBound(range.max as number) }
          ])
        ),
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
      description: 'Starting BST validation with range [-∞, ∞]',
      lineNumber: 2,
      visualizationData: createVisualizationData(),
      variables: { isValid: true },
    });

    const validate = (node: TreeNode | null, min: number, max: number, depth: number): boolean => {
      // Push current call to stack
      callStack.push({
        functionName: 'validate',
        parameters: {
          node: node === null ? 'null' : node.value,
          min: formatBound(min),
          max: formatBound(max),
        },
        lineNumber: 5,
      });

      if (node === null) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: 'Base case: null node is valid',
          lineNumber: 5,
          visualizationData: createVisualizationData({
            isBaseCase: true,
            returnValue: true,
          }),
          variables: { min: formatBound(min), max: formatBound(max), returnValue: true },
        });
        callStack.pop();
        return true;
      }

      // Store range for this node
      nodeRanges.set(node.id, { min: formatBound(min), max: formatBound(max) });

      // Visit current node - show range
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Check node ${node.value}: must be in range (${formatBound(min)}, ${formatBound(max)})`,
        lineNumber: 7,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          currentValue: node.value,
          currentMin: formatBound(min),
          currentMax: formatBound(max),
          checking: true,
        }),
        variables: {
          node: node.value,
          min: formatBound(min),
          max: formatBound(max),
        },
      });

      // Check if node value is within range
      if (node.value <= min || node.value >= max) {
        isValid = false;
        violationMessage = `Node ${node.value} violates BST property: not in range (${formatBound(min)}, ${formatBound(max)})`;

        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: violationMessage,
          lineNumber: 8,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id],
            violationNode: node.id,
            violation: true,
            violationMessage,
            currentNode: node.id,
            currentValue: node.value,
            currentMin: formatBound(min),
            currentMax: formatBound(max),
          }),
          variables: {
            node: node.value,
            min: formatBound(min),
            max: formatBound(max),
            valid: false,
          },
        });

        callStack.pop();
        return false;
      }

      // Node is valid, show success
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `✓ Node ${node.value} is valid: ${formatBound(min)} < ${node.value} < ${formatBound(max)}`,
        lineNumber: 8,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          currentValue: node.value,
          currentMin: formatBound(min),
          currentMax: formatBound(max),
          validNode: true,
        }),
        variables: {
          node: node.value,
          min: formatBound(min),
          max: formatBound(max),
          valid: true,
        },
      });

      // Validate left subtree
      if (node.left) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Validate left subtree of ${node.value}: range (${formatBound(min)}, ${node.value})`,
          lineNumber: 11,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.left.id],
            currentNode: node.id,
            exploringLeft: true,
            nextRange: { min: formatBound(min), max: node.value },
          }),
          variables: {
            node: node.value,
            direction: 'left',
            newMax: node.value,
          },
        });
      }

      const leftValid = validate(node.left || null, min, node.value, depth + 1);

      if (!leftValid) {
        callStack.pop();
        return false;
      }

      // Validate right subtree
      if (node.right) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Validate right subtree of ${node.value}: range (${node.value}, ${formatBound(max)})`,
          lineNumber: 12,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.right.id],
            currentNode: node.id,
            exploringRight: true,
            nextRange: { min: node.value, max: formatBound(max) },
          }),
          variables: {
            node: node.value,
            direction: 'right',
            newMin: node.value,
          },
        });
      }

      const rightValid = validate(node.right || null, node.value, max, depth + 1);

      if (!rightValid) {
        callStack.pop();
        return false;
      }

      // Both subtrees valid
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `✓ Node ${node.value} and its subtrees are valid`,
        lineNumber: 12,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          subtreeValid: true,
        }),
        variables: {
          node: node.value,
          leftValid,
          rightValid,
        },
      });

      callStack.pop();
      return true;
    };

    const result = validate(workingRoot, -Infinity, Infinity, 0);

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: result
        ? '✓ Valid BST: All nodes satisfy BST property'
        : `✗ Invalid BST: ${violationMessage}`,
      lineNumber: 12,
      visualizationData: {
        trees: [{
          id: 'tree',
          name: 'Binary Search Tree',
          root: workingRoot,
          highlightedNodes: [],
          traversalPath: [],
        }],
        stack: [],
        custom: {
          nodeRanges: Object.fromEntries(
            Array.from(nodeRanges.entries()).map(([id, range]) => [
              id,
              { min: formatBound(range.min as number), max: formatBound(range.max as number) }
            ])
          ),
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
      variables: { result },
    });

    return { steps, result };
  },
};
