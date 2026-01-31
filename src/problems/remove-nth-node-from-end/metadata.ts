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

export const REMOVE_NTH_NODE_FROM_END_METADATA = {
  id: 'remove-nth-node-from-end',
  title: 'Remove Nth Node From End of List',
  leetcodeNumber: 19,
  difficulty: 'medium' as const,
  tags: ['Linked List', 'Two Pointers'] as ProblemTag[],
  category: 'Linked List',
  description: `Given the head of a linked list, remove the nth node from the end of the list and return its head.`,
  examples: [
    {
      input: { head: createLinkedList([1, 2, 3, 4, 5]), n: 2 },
      output: createLinkedList([1, 2, 3, 5]),
      explanation: 'Remove the 2nd node from the end (node with value 4).',
    },
    {
      input: { head: createLinkedList([1]), n: 1 },
      output: createLinkedList([]),
      explanation: 'Remove the only node.',
    },
    {
      input: { head: createLinkedList([1, 2]), n: 1 },
      output: createLinkedList([1]),
      explanation: 'Remove the last node.',
    },
  ],
  constraints: [
    'The number of nodes in the list is sz.',
    '1 <= sz <= 30',
    '0 <= Node.val <= 100',
    '1 <= n <= sz',
  ],
};
