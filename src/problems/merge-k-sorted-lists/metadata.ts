import { ListNode, ProblemTag } from '../../core/types';

// Helper to create linked list from array
function createLinkedList(values: number[]): ListNode | null {
  if (values.length === 0) return null;

  const head: ListNode = { id: `list-node-${Math.random()}`, value: values[0], next: null };
  let current = head;

  for (let i = 1; i < values.length; i++) {
    current.next = { id: `list-node-${Math.random()}`, value: values[i], next: null };
    current = current.next;
  }

  return head;
}

export const MERGE_K_SORTED_LISTS_METADATA = {
  id: 'merge-k-sorted-lists',
  title: 'Merge K Sorted Lists',
  leetcodeNumber: 23,
  difficulty: 'hard' as const,
  tags: ['Linked List', 'Divide and Conquer', 'Heap'] as ProblemTag[],
  category: 'Linked List',
  description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
  examples: [
    {
      input: {
        lists: [
          createLinkedList([1, 4, 5]),
          createLinkedList([1, 3, 4]),
          createLinkedList([2, 6]),
          createLinkedList([0, 7, 8]),
        ],
      },
      output: createLinkedList([0, 1, 1, 2, 3, 4, 4, 5, 6, 7, 8]),
      explanation: 'The 4 linked-lists are merged into one sorted list.',
    },
    {
      input: { lists: [] },
      output: createLinkedList([]),
      explanation: 'No lists to merge.',
    },
    {
      input: { lists: [createLinkedList([])] },
      output: createLinkedList([]),
      explanation: 'Single empty list.',
    },
  ],
  constraints: [
    'k == lists.length',
    '0 <= k <= 10^4',
    '0 <= lists[i].length <= 500',
    '-10^4 <= lists[i][j] <= 10^4',
    'lists[i] is sorted in ascending order.',
    'The sum of lists[i].length will not exceed 10^4.',
  ],
};
