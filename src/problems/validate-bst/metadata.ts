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

export const VALIDATE_BST_METADATA = {
  id: 'validate-bst',
  title: 'Validate Binary Search Tree',
  leetcodeNumber: 98,
  difficulty: 'medium' as const,
  tags: ['Tree', 'Binary Search Tree', 'DFS', 'Binary Tree', 'Depth-First Search'] as ProblemTag[],
  category: 'Tree',
  description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.`,
  examples: [
    {
      input: { root: createTree([2, 1, 3]) },
      output: true,
      explanation: 'This is a valid BST. Root is 2, left child is 1 (< 2), and right child is 3 (> 2).',
    },
    {
      input: { root: createTree([5, 1, 4, null, null, 3, 6]) },
      output: false,
      explanation: 'The root node\'s value is 5, but its right child\'s value is 4, which is less than 5. However, node 3 in the right subtree violates the BST property (3 < 5).',
    },
    {
      input: { root: createTree([5, 4, 6, null, null, 3, 7]) },
      output: false,
      explanation: 'Node 3 is in the right subtree of root 5, but 3 < 5 violates BST property.',
    },
    {
      input: { root: createTree([10, 5, 15, null, null, 6, 20]) },
      output: false,
      explanation: 'Node 6 is in the right subtree of 10, but 6 < 10 violates BST property.',
    },
    {
      input: { root: createTree([8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13]) },
      output: true,
      explanation: 'This is a valid BST. All nodes respect the BST property with their valid range constraints.',
    },
  ],
  constraints: [
    'The number of nodes in the tree is in the range [0, 10^4].',
    '-2^31 <= Node.val <= 2^31 - 1',
  ],
};
