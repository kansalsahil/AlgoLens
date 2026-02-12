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

export const INVERT_BINARY_TREE_METADATA = {
  id: 'invert-binary-tree',
  title: 'Invert Binary Tree',
  leetcodeNumber: 226,
  difficulty: 'easy' as const,
  tags: ['Tree', 'DFS', 'BFS', 'Binary Tree', 'Depth-First Search', 'Breadth-First Search'] as ProblemTag[],
  category: 'Tree',
  description: `Given the root of a binary tree, invert the tree, and return its root.

Inverting a binary tree means swapping the left and right children of all nodes in the tree.`,
  examples: [
    {
      input: { root: createTree([4, 2, 7, 1, 3, 6, 9]) },
      output: createTree([4, 7, 2, 9, 6, 3, 1]),
      explanation: 'Input tree: [4,2,7,1,3,6,9]. After inversion: [4,7,2,9,6,3,1]. All left and right children have been swapped.',
    },
    {
      input: { root: createTree([2, 1, 3]) },
      output: createTree([2, 3, 1]),
      explanation: 'Input tree: [2,1,3]. After inversion: [2,3,1]. Node 2\'s children (1 and 3) are swapped.',
    },
    {
      input: { root: createTree([1, 2, null, 3, null, null, null, 4]) },
      output: createTree([1, null, 2, null, 3, null, 4]),
      explanation: 'Input tree with left-skewed subtree becomes right-skewed after inversion.',
    },
  ],
  constraints: [
    'The number of nodes in the tree is in the range [0, 100].',
    '-100 <= Node.val <= 100',
  ],
};
