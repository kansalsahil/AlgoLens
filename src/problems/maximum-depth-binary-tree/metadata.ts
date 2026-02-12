import { TreeNode, ProblemTag } from '../../core/types';

// Helper to create tree from array (level-order)
function createTree(values: (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null;

  const root: TreeNode = { id: 'node-0', value: values[0] };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < values.length) {
    const node = queue.shift()!;

    if (i < values.length && values[i] !== null) {
      node.left = { id: `node-${i}`, value: values[i] };
      queue.push(node.left);
    }
    i++;

    if (i < values.length && values[i] !== null) {
      node.right = { id: `node-${i}`, value: values[i] };
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

export const MAXIMUM_DEPTH_BINARY_TREE_METADATA = {
  id: 'maximum-depth-binary-tree',
  title: 'Maximum Depth of Binary Tree',
  leetcodeNumber: 104,
  difficulty: 'easy' as const,
  tags: ['Tree', 'DFS', 'BFS', 'Binary Tree', 'Depth-First Search', 'Breadth-First Search'] as ProblemTag[],
  category: 'Tree',
  description: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
  examples: [
    {
      input: { root: createTree([3, 9, 20, null, null, 15, 7]) },
      output: 3,
      explanation: 'The maximum depth is 3: path 3 → 20 → 15 (or 3 → 20 → 7)',
    },
    {
      input: { root: createTree([1, null, 2]) },
      output: 2,
      explanation: 'The maximum depth is 2: path 1 → 2',
    },
    {
      input: { root: createTree([1, 2, 3, 4, 5, null, 6, null, null, null, null, null, 7]) },
      output: 4,
      explanation: 'The maximum depth is 4: path 1 → 3 → 6 → 7',
    },
  ],
  constraints: [
    'The number of nodes in the tree is in the range [0, 10^4].',
    '-100 <= Node.val <= 100',
  ],
};
