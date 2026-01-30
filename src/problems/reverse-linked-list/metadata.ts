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

export const REVERSE_LINKED_LIST_METADATA = {
  id: 'reverse-linked-list',
  title: 'Reverse Linked List',
  leetcodeNumber: 206,
  difficulty: 'easy' as const,
  tags: ['Linked List', 'Recursive', 'Iterative'] as ProblemTag[],
  category: 'Linked List', // Deprecated, kept for backward compatibility
  description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
  examples: [
    {
      input: { head: createLinkedList([1, 2, 3, 4]) },
      output: createLinkedList([4, 3, 2, 1]),
      explanation: 'The list is reversed from [1,2,3,4] to [4,3,2,1].',
    },
    {
      input: { head: createLinkedList([1, 2]) },
      output: createLinkedList([2, 1]),
      explanation: 'The list is reversed from [1,2] to [2,1].',
    },
  ],
  constraints: [
    'The number of nodes in the list is the range [0, 5000].',
    '-5000 <= Node.val <= 5000',
  ],
};
