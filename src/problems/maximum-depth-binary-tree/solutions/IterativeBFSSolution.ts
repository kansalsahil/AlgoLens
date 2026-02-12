import { Solution, AnimationStep, SolutionExecution, TreeNode } from '../../../core/types';
import { MaximumDepthBinaryTreeInput } from '../types';

interface QueueItem {
  node: TreeNode;
  depth: number;
}

export const IterativeBFSSolution: Solution<MaximumDepthBinaryTreeInput, number> = {
  id: 'iterative-bfs',
  name: 'Iterative BFS',
  description: 'Find maximum depth using level-order traversal (BFS) with a queue. Track depth level by level',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(w)',

  code: `function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const queue: TreeNode[] = [root];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    depth++;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (root == null) return 0;                           // Line 2
                                                        // Line 3
  Queue<TreeNode> queue = new LinkedList<>();           // Line 4
  queue.offer(root);
  int depth = 0;
                                                        // Line 7
  while (!queue.isEmpty()) {                            // Line 8
    int levelSize = queue.size();                       // Line 9
    depth++;                                            // Line 10
                                                        // Line 11
    for (int i = 0; i < levelSize; i++) {               // Line 12
      TreeNode node = queue.poll();                     // Line 13
                                                        // Line 14
      if (node.left != null) queue.offer(node.left);    // Line 15
      if (node.right != null) queue.offer(node.right);  // Line 16
    }
  }                                                     // Line 18
                                                        // Line 19
  return depth;                                         // Line 20
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (root == null) return 0;                           // Line 2
                                                        // Line 3
  Queue<TreeNode> queue = new Queue<TreeNode>();        // Line 4
  queue.Enqueue(root);
  int depth = 0;
                                                        // Line 7
  while (queue.Count > 0) {                             // Line 8
    int levelSize = queue.Count;                        // Line 9
    depth++;                                            // Line 10
                                                        // Line 11
    for (int i = 0; i < levelSize; i++) {               // Line 12
      TreeNode node = queue.Dequeue();                  // Line 13
                                                        // Line 14
      if (node.left != null) queue.Enqueue(node.left);  // Line 15
      if (node.right != null) queue.Enqueue(node.right);// Line 16
    }
  }                                                     // Line 18
                                                        // Line 19
  return depth;                                         // Line 20
}`,
    },
  ],

  execute: (input: MaximumDepthBinaryTreeInput): SolutionExecution<number> => {
    const { root } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    if (!root) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'initialization',
        description: 'Tree is empty, return depth 0',
        lineNumber: 2,
        visualizationData: {
          trees: [{
            id: 'tree',
            name: 'Binary Tree',
            root: null,
            highlightedNodes: [],
          }],
          custom: { depth: 0, queue: [] },
        },
        variables: { depth: 0 },
      });
      return { steps, result: 0 };
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
    const queue: QueueItem[] = [{ node: workingRoot!, depth: 1 }];
    let depth = 0;
    const visitedNodes: string[] = [];
    const nodeDepths: Map<string, number> = new Map();
    const levelNodes: Map<number, string[]> = new Map();

    // Helper to create visualization data
    const createVisualizationData = (customData: any = {}) => ({
      trees: [{
        id: 'tree',
        name: 'Binary Tree',
        root: workingRoot,
        highlightedNodes: customData.highlightedNodes || [],
        traversalPath: visitedNodes,
      }],
      custom: {
        depth,
        queue: queue.map(item => ({ nodeId: item.node.id, value: item.node.value, depth: item.depth })),
        queueSize: queue.length,
        visitedNodes: [...visitedNodes],
        nodeDepths: Object.fromEntries(nodeDepths),
        levelNodes: Object.fromEntries(levelNodes),
        ...customData,
      },
    });

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize queue with root node, depth = 0',
      lineNumber: 4,
      visualizationData: createVisualizationData({
        highlightedNodes: [workingRoot!.id],
      }),
      variables: { depth: 0, queueSize: 1 },
    });

    while (queue.length > 0) {
      const levelSize = queue.length;
      depth++;

      // Start new level
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Level ${depth}: Process ${levelSize} node${levelSize > 1 ? 's' : ''} at this level`,
        lineNumber: 9,
        visualizationData: createVisualizationData({
          currentLevel: depth,
          levelSize,
          startingLevel: true,
        }),
        variables: { depth, levelSize, queueSize: queue.length },
      });

      const currentLevelNodes: string[] = [];

      for (let i = 0; i < levelSize; i++) {
        const { node, depth: nodeDepth } = queue.shift()!;
        visitedNodes.push(node.id);
        nodeDepths.set(node.id, nodeDepth);
        currentLevelNodes.push(node.id);

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Dequeue node ${node.value} (${i + 1}/${levelSize} at level ${depth})`,
          lineNumber: 13,
          visualizationData: createVisualizationData({
            highlightedNodes: [node.id],
            currentNode: node.id,
            currentNodeValue: node.value,
            currentLevel: depth,
            levelProgress: `${i + 1}/${levelSize}`,
            dequeuing: true,
          }),
          variables: { node: node.value, depth, i, levelSize, queueSize: queue.length },
        });

        // Add left child
        if (node.left) {
          queue.push({ node: node.left, depth: nodeDepth + 1 });
          steps.push({
            id: `step-${stepId++}`,
            type: 'assignment',
            description: `Enqueue left child ${node.left.value} to queue`,
            lineNumber: 15,
            visualizationData: createVisualizationData({
              highlightedNodes: [node.id, node.left.id],
              currentNode: node.id,
              enqueuingNode: node.left.id,
              currentLevel: depth,
              addingLeft: true,
            }),
            variables: { node: node.value, leftChild: node.left.value, queueSize: queue.length },
          });
        }

        // Add right child
        if (node.right) {
          queue.push({ node: node.right, depth: nodeDepth + 1 });
          steps.push({
            id: `step-${stepId++}`,
            type: 'assignment',
            description: `Enqueue right child ${node.right.value} to queue`,
            lineNumber: 16,
            visualizationData: createVisualizationData({
              highlightedNodes: [node.id, node.right.id],
              currentNode: node.id,
              enqueuingNode: node.right.id,
              currentLevel: depth,
              addingRight: true,
            }),
            variables: { node: node.value, rightChild: node.right.value, queueSize: queue.length },
          });
        }
      }

      levelNodes.set(depth, currentLevelNodes);

      // Level complete
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `✓ Level ${depth} complete (${currentLevelNodes.length} node${currentLevelNodes.length > 1 ? 's' : ''})`,
        lineNumber: 10,
        visualizationData: createVisualizationData({
          highlightedNodes: currentLevelNodes,
          currentLevel: depth,
          levelComplete: true,
        }),
        variables: { depth, nodesAtLevel: currentLevelNodes.length, queueSize: queue.length },
      });
    }

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Queue is empty. Maximum depth is ${depth}`,
      lineNumber: 20,
      visualizationData: {
        trees: [{
          id: 'tree',
          name: 'Binary Tree',
          root: workingRoot,
          highlightedNodes: [],
          traversalPath: visitedNodes,
        }],
        custom: {
          depth,
          queue: [],
          queueSize: 0,
          visitedNodes,
          nodeDepths: Object.fromEntries(nodeDepths),
          levelNodes: Object.fromEntries(levelNodes),
          complete: true,
        },
        annotations: [
          {
            text: `✓ Max Depth: ${depth}`,
            position: { x: 50, y: 10 },
            style: 'success',
          },
        ],
      },
      variables: { result: depth },
    });

    return { steps, result: depth };
  },
};
