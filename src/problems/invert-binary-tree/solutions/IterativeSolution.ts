import { Solution, AnimationStep, SolutionExecution, TreeNode } from '../../../core/types';
import { InvertBinaryTreeInput } from '../types';

export const IterativeSolution: Solution<InvertBinaryTreeInput, TreeNode | null> = {
  id: 'iterative-bfs',
  name: 'Iterative BFS Solution',
  description: 'Use BFS with a queue to iteratively visit nodes level by level, swapping left and right children at each node.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(w)',

  code: `function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;

    // Swap the children
    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    // Add children to queue for processing
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return root;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (root == null) return null;                        // Line 2
                                                        // Line 3
  Queue<TreeNode> queue = new LinkedList<>();           // Line 4
  queue.offer(root);
                                                        // Line 6
  while (!queue.isEmpty()) {                            // Line 7
    TreeNode node = queue.poll();                       // Line 8
                                                        // Line 9
    // Swap the children                               // Line 10
    TreeNode temp = node.left;                          // Line 11
    node.left = node.right;                             // Line 12
    node.right = temp;                                  // Line 13
                                                        // Line 14
    // Add children to queue for processing            // Line 15
    if (node.left != null) queue.offer(node.left);      // Line 16
    if (node.right != null) queue.offer(node.right);    // Line 17
  }                                                     // Line 18
                                                        // Line 19
  return root;                                          // Line 20
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (root == null) return null;                        // Line 2
                                                        // Line 3
  Queue<TreeNode> queue = new Queue<TreeNode>();        // Line 4
  queue.Enqueue(root);
                                                        // Line 6
  while (queue.Count > 0) {                             // Line 7
    TreeNode node = queue.Dequeue();                    // Line 8
                                                        // Line 9
    // Swap the children                               // Line 10
    TreeNode temp = node.left;                          // Line 11
    node.left = node.right;                             // Line 12
    node.right = temp;                                  // Line 13
                                                        // Line 14
    // Add children to queue for processing            // Line 15
    if (node.left != null) queue.Enqueue(node.left);    // Line 16
    if (node.right != null) queue.Enqueue(node.right);  // Line 17
  }                                                     // Line 18
                                                        // Line 19
  return root;                                          // Line 20
}`,
    },
  ],

  execute: (input: InvertBinaryTreeInput): SolutionExecution<TreeNode | null> => {
    const { root } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    if (!root) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'initialization',
        description: 'Tree is empty, return null',
        lineNumber: 2,
        visualizationData: {
          trees: [{
            id: 'tree',
            name: 'Binary Tree',
            root: null,
            highlightedNodes: [],
          }],
          custom: { queue: [] },
        },
        variables: { root: 'null' },
      });
      return { steps, result: null };
    }

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

    const queue: TreeNode[] = [workingRoot!];
    const invertedNodes: Set<string> = new Set();
    const visitedNodes: string[] = [];

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
          name: 'Inverted (In Progress)',
          root: workingRoot,
          highlightedNodes: customData.highlightedNodes || [],
          traversalPath: visitedNodes,
        }
      ],
      custom: {
        queue: queue.map(n => ({ nodeId: n.id, value: n.value })),
        queueSize: queue.length,
        visitedNodes: [...visitedNodes],
        invertedNodes: Array.from(invertedNodes),
        ...customData,
      },
    });

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize BFS queue with root node. Will process nodes level by level.',
      lineNumber: 4,
      visualizationData: createVisualizationData({
        highlightedNodes: [workingRoot!.id],
      }),
      variables: { queueSize: 1, invertedCount: 0 },
    });

    let processedCount = 0;

    while (queue.length > 0) {
      const node = queue.shift()!;
      visitedNodes.push(node.id);
      processedCount++;

      // Dequeue step
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Dequeue node ${node.value} (${processedCount} of ${visitedNodes.length + queue.length})`,
        lineNumber: 8,
        visualizationData: createVisualizationData({
          highlightedNodes: [node.id],
          currentNode: node.id,
          dequeuing: true,
        }),
        variables: { node: node.value, queueSize: queue.length, processedCount },
      });

      // Show before swap
      const leftValue = node.left?.value ?? 'null';
      const rightValue = node.right?.value ?? 'null';

      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Swap children of node ${node.value}: left (${leftValue}) ↔ right (${rightValue})`,
        lineNumber: 11,
        visualizationData: createVisualizationData({
          highlightedNodes: [
            node.id,
            ...(node.left ? [node.left.id] : []),
            ...(node.right ? [node.right.id] : [])
          ],
          currentNode: node.id,
          preparingSwap: true,
          swapLeftValue: leftValue,
          swapRightValue: rightValue,
        }),
        variables: {
          node: node.value,
          leftChild: leftValue,
          rightChild: rightValue,
        },
      });

      // Perform swap
      const temp = node.left;
      node.left = node.right;
      node.right = temp;
      invertedNodes.add(node.id);

      // Show after swap
      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `✓ Node ${node.value} inverted. Left is now ${node.left?.value ?? 'null'}, right is now ${node.right?.value ?? 'null'}`,
        lineNumber: 13,
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
          invertedCount: invertedNodes.size,
        },
      });

      // Add left child
      if (node.left) {
        queue.push(node.left);
        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `Enqueue left child ${node.left.value} to queue`,
          lineNumber: 16,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.left.id],
            currentNode: node.id,
            enqueuingNode: node.left.id,
            addingLeft: true,
          }),
          variables: { node: node.value, leftChild: node.left.value, queueSize: queue.length },
        });
      }

      // Add right child
      if (node.right) {
        queue.push(node.right);
        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `Enqueue right child ${node.right.value} to queue`,
          lineNumber: 17,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id, node.right.id],
            currentNode: node.id,
            enqueuingNode: node.right.id,
            addingRight: true,
          }),
          variables: { node: node.value, rightChild: node.right.value, queueSize: queue.length },
        });
      }
    }

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Queue is empty. Tree inversion complete! All ${invertedNodes.size} nodes have been inverted.`,
      lineNumber: 20,
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
            traversalPath: visitedNodes,
          }
        ],
        custom: {
          queue: [],
          queueSize: 0,
          visitedNodes,
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

    return { steps, result: workingRoot };
  },
};
