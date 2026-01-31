import { ListNode, ProblemTag } from '../../core/types';

// Helper to create linked list from array
function createLinkedList(values: number[]): ListNode | null {
  if (values.length === 0) return null;

  const head: ListNode = { id: 'node-0', value: values[0], next: null };
  let current = head;

  for (let i = 1; i < values.length; i++) {
    current.next = { id: `node-${i}`, value: values[i], next: null };
    current = current.next;
  }

  return head;
}

export const REORDER_LIST_METADATA = {
  id: 'reorder-list',
  title: 'Reorder List',
  leetcodeNumber: 143,
  difficulty: 'medium' as const,
  tags: ['Linked List', 'Two Pointers', 'Recursion'] as ProblemTag[],
  category: 'Linked List',
  description: `You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln

Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
  examples: [
    {
      input: { head: createLinkedList([1, 2, 3, 4]) },
      output: createLinkedList([1, 4, 2, 3]),
      explanation: 'The list is reordered from [1,2,3,4] to [1,4,2,3].',
    },
    {
      input: { head: createLinkedList([1, 2, 3, 4, 5]) },
      output: createLinkedList([1, 5, 2, 4, 3]),
      explanation: 'The list is reordered from [1,2,3,4,5] to [1,5,2,4,3].',
    },
  ],
  constraints: [
    'The number of nodes in the list is in the range [1, 5 * 10^4].',
    '1 <= Node.val <= 1000',
  ],
};
