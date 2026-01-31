import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { ReorderListInput } from '../types';

export const InPlaceSolution: Solution<ReorderListInput, void> = {
  id: 'in-place',
  name: 'In-Place (Find Middle, Reverse, Merge)',
  description: 'Find middle, reverse second half, then merge two halves',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',

  code: `function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return;

  // Step 1: Find middle
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let second = slow.next;
  slow.next = null;
  let prev = null;

  while (second) {
    let temp = second.next;
    second.next = prev;
    prev = second;
    second = temp;
  }

  // Step 3: Merge two halves
  let first = head;
  second = prev;

  while (second) {
    let temp1 = first.next;
    let temp2 = second.next;

    first.next = second;
    second.next = temp1;

    first = temp1;
    second = temp2;
  }
}`,

  execute: (input: ReorderListInput): SolutionExecution<void> => {
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Clone the list
    const cloneList = (head: ListNode | null): ListNode | null => {
      if (!head) return null;
      const newHead: ListNode = { id: head.id, value: head.value, next: null };
      let current = newHead;
      let original = head.next;
      while (original) {
        current.next = { id: original.id, value: original.value, next: null };
        current = current.next;
        original = original.next;
      }
      return newHead;
    };

    const head = cloneList(input.head);

    // Create immutable snapshot for visualization - capture original state immediately
    const originalSnapshot = cloneList(head);

    // Create snapshot function for later states
    const createSnapshot = (node: ListNode | null): ListNode | null => {
      if (!node) return null;
      const newHead: ListNode = { id: node.id, value: node.value, next: null };
      let current = newHead;
      let original = node.next;
      const seen = new Set<string>([node.id]);

      while (original && !seen.has(original.id)) {
        seen.add(original.id);
        current.next = { id: original.id, value: original.value, next: null };
        current = current.next;
        original = original.next;
      }
      return newHead;
    };

    if (!head || !head.next) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: 'List is empty or has only one node',
        lineNumber: 2,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'List',
              head: originalSnapshot,
              highlightedNodes: [],
              pointers: [],
            },
          ],
        },
        variables: {},
      });
      return { steps, result: undefined };
    }

    // Step 1: Find middle using slow and fast pointers
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Phase 1: Find middle of list using slow and fast pointers',
      lineNumber: 5,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'Finding Middle',
            head: originalSnapshot,
            highlightedNodes: [slow.id, fast.id],
            pointers: [
              { name: 'slow', nodeId: slow.id, color: '#3b82f6' },
              { name: 'fast', nodeId: fast.id, color: '#ef4444' },
            ],
          },
        ],
      },
      variables: {
        phase: 'Find Middle',
      },
    });

    while (fast?.next && fast.next.next) {
      slow = slow!.next!;
      fast = fast.next.next;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Move slow one step, fast two steps`,
        lineNumber: 7,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Finding Middle',
              head: originalSnapshot,
              highlightedNodes: [slow.id, fast.id],
              pointers: [
                { name: 'slow', nodeId: slow.id, color: '#3b82f6' },
                { name: 'fast', nodeId: fast.id, color: '#ef4444' },
              ],
            },
          ],
        },
        variables: {
          slow: slow.value,
          fast: fast.value,
        },
      });
    }

    // Step 2: Reverse second half
    let second = slow!.next;
    slow!.next = null;

    steps.push({
      id: `step-${stepId++}`,
      type: 'assignment',
      description: 'Phase 2: Split list at middle and reverse second half',
      lineNumber: 13,
      visualizationData: {
        linkedLists: [
          {
            id: 'first-half',
            name: 'First Half',
            head: createSnapshot(head),
            highlightedNodes: [],
            pointers: [],
          },
          {
            id: 'second-half',
            name: 'Second Half (to be reversed)',
            head: createSnapshot(second),
            highlightedNodes: [],
            pointers: second ? [{ name: 'second', nodeId: second.id, color: '#ec4899' }] : [],
          },
        ],
      },
      variables: {
        phase: 'Reverse Second Half',
      },
    });

    let prev: ListNode | null = null;
    while (second) {
      const temp = second.next;
      second.next = prev;
      prev = second;
      second = temp || null;
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'assignment',
      description: 'Second half reversed',
      lineNumber: 21,
      visualizationData: {
        linkedLists: [
          {
            id: 'first-half',
            name: 'First Half',
            head: createSnapshot(head),
            highlightedNodes: [],
            pointers: [],
          },
          {
            id: 'second-half-reversed',
            name: 'Second Half (reversed)',
            head: createSnapshot(prev),
            highlightedNodes: [],
            pointers: prev ? [{ name: 'prev', nodeId: prev.id, color: '#ec4899' }] : [],
          },
        ],
      },
      variables: {
        phase: 'Reverse Complete',
      },
    });

    // Step 3: Merge two halves
    let first: ListNode | null = head;
    second = prev;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Phase 3: Merge first and reversed second half',
      lineNumber: 24,
      visualizationData: {
        linkedLists: [
          {
            id: 'first-half',
            name: 'First Half',
            head: first,
            highlightedNodes: first ? [first.id] : [],
            pointers: first ? [{ name: 'first', nodeId: first.id, color: '#3b82f6' }] : [],
          },
          {
            id: 'second-half',
            name: 'Second Half',
            head: createSnapshot(second),
            highlightedNodes: second ? [second.id] : [],
            pointers: second ? [{ name: 'second', nodeId: second.id, color: '#ec4899' }] : [],
          },
        ],
      },
      variables: {
        phase: 'Merge',
      },
    });

    while (second) {
      const temp1 = first!.next;
      const temp2 = second.next;

      first!.next = second;
      second.next = temp1;

      first = temp1;
      second = temp2 || null;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Merge nodes: interleave first and second half`,
        lineNumber: 28,
        visualizationData: {
          linkedLists: [
            {
              id: 'merged',
              name: 'Merging Progress',
              head: createSnapshot(head),
              highlightedNodes: first && second ? [first.id, second.id] : [],
              pointers: [
                ...(first ? [{ name: 'first', nodeId: first.id, color: '#3b82f6' }] : []),
                ...(second ? [{ name: 'second', nodeId: second.id, color: '#ec4899' }] : []),
              ],
            },
          ],
        },
        variables: {
          phase: 'Merging',
        },
      });
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'List reordered successfully',
      lineNumber: 36,
      visualizationData: {
        linkedLists: [
          {
            id: 'reordered',
            name: 'Reordered List',
            head: createSnapshot(head),
            highlightedNodes: [],
            pointers: [],
          },
        ],
        annotations: [
          {
            text: '✓ List reordered in-place',
            position: { x: 50, y: 10 },
            style: 'success',
          },
        ],
      },
      variables: {},
    });

    return { steps, result: undefined };
  },
};
