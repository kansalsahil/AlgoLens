import { ListNode, ProblemTag } from '../../core/types';

// Helper to create linked list with cycle
function createLinkedListWithCycle(values: number[], pos: number): { head: ListNode | null; pos: number } {
  if (values.length === 0) return { head: null, pos: -1 };

  const head: ListNode = { id: 'node-0', value: values[0], next: null };
  let current = head;
  const nodes: ListNode[] = [head];

  for (let i = 1; i < values.length; i++) {
    current.next = { id: `node-${i}`, value: values[i], next: null };
    current = current.next;
    nodes.push(current);
  }

  // Create cycle if pos is valid
  if (pos >= 0 && pos < values.length) {
    current.next = nodes[pos];
  }

  return { head, pos };
}

export const LINKED_LIST_CYCLE_METADATA = {
  id: 'linked-list-cycle',
  title: 'Linked List Cycle',
  leetcodeNumber: 141,
  difficulty: 'easy' as const,
  tags: ['Linked List', 'Two Pointers', 'Hash Map'] as ProblemTag[],
  category: 'Linked List',
  description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.`,
  examples: [
    {
      input: createLinkedListWithCycle([3, 2, 0, -4], 1),
      output: true,
      explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).',
    },
    {
      input: createLinkedListWithCycle([1, 2], 0),
      output: true,
      explanation: 'There is a cycle in the linked list, where the tail connects to the 0th node.',
    },
    {
      input: createLinkedListWithCycle([1], -1),
      output: false,
      explanation: 'There is no cycle in the linked list.',
    },
  ],
  constraints: [
    'The number of the nodes in the list is in the range [0, 10^4].',
    '-10^5 <= Node.val <= 10^5',
    'pos is -1 or a valid index in the linked-list.',
  ],
};
