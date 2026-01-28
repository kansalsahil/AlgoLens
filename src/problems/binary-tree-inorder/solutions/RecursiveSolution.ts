import { Solution, AnimationStep, SolutionExecution, TreeNode, StackFrame } from '../../../core/types';
import { BinaryTreeInorderInput } from '../types';

export const RecursiveSolution: Solution<BinaryTreeInorderInput, number[]> = {
  id: 'recursive',
  name: 'Recursive',
  description: 'Perform inorder traversal recursively: left → root → right',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',

  code: `function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];

  function traverse(node: TreeNode | null) {
    if (node === null) return;

    traverse(node.left);
    result.push(node.value);
    traverse(node.right);
  }

  traverse(root);
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

    // Call stack tracking
    const callStack: StackFrame[] = [];

    // Helper to create visualization data with current stack
    const createVisualizationData = (treeData: any, customData: any = {}) => ({
      trees: [treeData],
      stack: [...callStack],
      custom: customData,
    });

    // Step 1: Initialization
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize empty result array',
      lineNumber: 2,
      visualizationData: createVisualizationData({
        id: 'tree',
        name: 'Binary Tree',
        root: workingRoot,
        highlightedNodes: [],
        traversalPath: [],
      }, { result: [] }),
      variables: { result: [] },
    });

    const traverse = (node: TreeNode | null, depth: number): void => {
      // Push current call to stack
      callStack.push({
        functionName: 'traverse',
        parameters: { node: node === null ? 'null' : node.value },
        lineNumber: 4,
      });

      if (node === null) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: 'Node is null, return',
          lineNumber: 5,
          visualizationData: createVisualizationData({
            id: 'tree',
            name: 'Binary Tree',
            root: workingRoot,
            highlightedNodes: [],
            traversalPath: [...traversalPath],
          }, { result: [...result] }),
          variables: { result: [...result], depth },
        });
        callStack.pop();
        return;
      }

      // Visit current node
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Visiting node ${node.value}`,
        lineNumber: 7,
        visualizationData: createVisualizationData({
          id: 'tree',
          name: 'Binary Tree',
          root: workingRoot,
          highlightedNodes: [node.id],
          traversalPath: [...traversalPath],
        }, { result: [...result] }),
        variables: { node: node.value, result: [...result], depth },
      });

      // Traverse left
      if (node.left) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Traverse left subtree of ${node.value}`,
          lineNumber: 7,
          visualizationData: createVisualizationData({
            id: 'tree',
            name: 'Binary Tree',
            root: workingRoot,
            highlightedNodes: [node.id, node.left.id],
            traversalPath: [...traversalPath],
          }, { result: [...result] }),
          variables: { node: node.value, result: [...result], depth },
        });
      }
      traverse(node.left || null, depth + 1);

      // Process current node
      result.push(node.value);
      traversalPath.push(node.id);
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Add ${node.value} to result`,
        lineNumber: 8,
        visualizationData: createVisualizationData({
          id: 'tree',
          name: 'Binary Tree',
          root: workingRoot,
          highlightedNodes: [node.id],
          traversalPath: [...traversalPath],
        }, { result: [...result] }),
        variables: { node: node.value, result: [...result], depth },
      });

      // Traverse right
      if (node.right) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'custom',
          description: `Traverse right subtree of ${node.value}`,
          lineNumber: 9,
          visualizationData: createVisualizationData({
            id: 'tree',
            name: 'Binary Tree',
            root: workingRoot,
            highlightedNodes: [node.id, node.right.id],
            traversalPath: [...traversalPath],
          }, { result: [...result] }),
          variables: { node: node.value, result: [...result], depth },
        });
      }
      traverse(node.right || null, depth + 1);

      // Pop current call from stack before returning
      callStack.pop();
    };

    traverse(workingRoot, 0);

    // Final step
    const finalVizData = createVisualizationData({
      id: 'tree',
      name: 'Binary Tree',
      root: workingRoot,
      highlightedNodes: [],
      traversalPath: [...traversalPath],
    }, { result: [...result] });
    finalVizData.annotations = [
      {
        text: `✓ Inorder: [${result.join(', ')}]`,
        position: { x: 50, y: 10 },
        style: 'success',
      },
    ];
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Return result array',
      lineNumber: 13,
      visualizationData: finalVizData,
      variables: { result: [...result] },
    });

    return { steps, result };
  },
};
