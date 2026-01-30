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

export const BINARY_TREE_INORDER_METADATA = {
  id: 'binary-tree-inorder',
  title: 'Binary Tree Inorder Traversal',
  leetcodeNumber: 94,
  difficulty: 'easy' as const,
  tags: ['Tree', 'Recursive', 'Iterative'] as ProblemTag[],
  category: 'Tree', // Deprecated, kept for backward compatibility
  description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

Inorder traversal visits nodes in the order: Left → Root → Right`,
  examples: [
    {
      input: { root: createTree([5, 3, 7, 2, 4, 6, 8, 1]) },
      output: [1, 2, 3, 4, 5, 6, 7, 8],
      explanation: 'Inorder traversal of a more complete binary tree',
    },
    {
      input: { root: createTree([1, 2, 3, 4, 5, 6, 7]) },
      output: [4, 2, 5, 1, 6, 3, 7],
      explanation: 'Visit left subtree, root, then right subtree',
    },
    {
      input: { root: createTree([1, null, 2, 3]) },
      output: [1, 3, 2],
      explanation: 'Inorder traversal: left subtree, root, right subtree',
    },
  ],
  constraints: [
    'The number of nodes in the tree is in the range [0, 100].',
    '-100 <= Node.val <= 100',
  ],
};
