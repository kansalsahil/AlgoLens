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

export const MERGE_TWO_SORTED_LISTS_METADATA = {
  id: 'merge-two-sorted-lists',
  title: 'Merge Two Sorted Lists',
  leetcodeNumber: 21,
  difficulty: 'easy' as const,
  tags: ['Linked List', 'Recursion'] as ProblemTag[],
  category: 'Linked List',
  description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
  examples: [
    {
      input: { list1: createLinkedList([1, 2, 4]), list2: createLinkedList([1, 3, 4]) },
      output: createLinkedList([1, 1, 2, 3, 4, 4]),
      explanation: 'The merged list is [1,1,2,3,4,4].',
    },
    {
      input: { list1: createLinkedList([]), list2: createLinkedList([]) },
      output: createLinkedList([]),
      explanation: 'Both lists are empty.',
    },
    {
      input: { list1: createLinkedList([]), list2: createLinkedList([0]) },
      output: createLinkedList([0]),
      explanation: 'list1 is empty, return list2.',
    },
  ],
  constraints: [
    'The number of nodes in both lists is in the range [0, 50].',
    '-100 <= Node.val <= 100',
    'Both list1 and list2 are sorted in non-decreasing order.',
  ],
};
