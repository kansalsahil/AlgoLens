import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { RemoveNthNodeFromEndInput } from '../types';

export const TwoPassSolution: Solution<RemoveNthNodeFromEndInput, ListNode | null> = {
  id: 'two-pass',
  name: 'Two Pass (Count Length)',
  description: 'First pass to count length, second pass to remove node',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',

  code: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // First pass: count length
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }

  // Calculate position from start
  const target = length - n;

  // Handle removing head
  if (target === 0) {
    return head?.next || null;
  }

  // Second pass: find and remove
  current = head;
  for (let i = 0; i < target - 1; i++) {
    current = current.next;
  }

  current.next = current.next?.next || null;

  return head;
}`,

  execute: (input: RemoveNthNodeFromEndInput): SolutionExecution<ListNode | null> => {
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
    const { n } = input;

    // Create immutable snapshot of all nodes for visualization
    const allNodes: ListNode[] = [];
    let temp = head;
    while (temp) {
      allNodes.push({ id: temp.id, value: temp.value, next: temp.next });
      temp = temp.next;
    }

    // Helper to reconstruct list from snapshot
    const getListSnapshot = (removedNodeId?: string): ListNode | null => {
      if (allNodes.length === 0) return null;
      const filteredNodes = removedNodeId
        ? allNodes.filter(n => n.id !== removedNodeId)
        : [...allNodes];

      if (filteredNodes.length === 0) return null;

      const newHead: ListNode = { id: filteredNodes[0].id, value: filteredNodes[0].value, next: null };
      let current = newHead;

      for (let i = 1; i < filteredNodes.length; i++) {
        current.next = { id: filteredNodes[i].id, value: filteredNodes[i].value, next: null };
        current = current.next;
      }

      return newHead;
    };

    // First pass: count length
    let length = 0;
    let current: ListNode | null = head;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Phase 1: Count list length (remove ${n}th node from end)`,
      lineNumber: 2,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'List',
            head: getListSnapshot(),
            highlightedNodes: [],
            pointers: current ? [{ name: 'current', nodeId: current.id, color: '#3b82f6' }] : [],
          },
        ],
      },
      variables: {
        length: length,
        n: n,
      },
    });

    while (current) {
      length++;
      const prevCurrent = current;
      current = current.next || null;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Count: length = ${length}`,
        lineNumber: 5,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'List',
              head: getListSnapshot(),
              highlightedNodes: [prevCurrent.id],
              pointers: current ? [{ name: 'current', nodeId: current.id, color: '#3b82f6' }] : [],
            },
          ],
        },
        variables: {
          length: length,
          n: n,
        },
      });
    }

    // Calculate target position from start
    const target = length - n;

    steps.push({
      id: `step-${stepId++}`,
      type: 'assignment',
      description: `Phase 2: Calculate target position from start: ${length} - ${n} = ${target}`,
      lineNumber: 10,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'List',
            head: getListSnapshot(),
            highlightedNodes: [],
            pointers: [],
          },
        ],
      },
      variables: {
        length: length,
        n: n,
        target: target,
      },
    });

    // Handle removing head
    if (target === 0) {
      const newHead = head?.next || null;
      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: 'Target is 0, remove head node',
        lineNumber: 14,
        visualizationData: {
          linkedLists: [
            {
              id: 'result',
              name: 'Result',
              head: getListSnapshot(head?.id),
              highlightedNodes: newHead ? [newHead.id] : [],
              pointers: [],
            },
          ],
          annotations: [
            {
              text: '✓ Node removed',
              position: { x: 50, y: 10 },
              style: 'success',
            },
          ],
        },
        variables: {},
      });
      return { steps, result: newHead };
    }

    // Second pass: find node before target
    current = head;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Phase 3: Find node at position ${target - 1}`,
      lineNumber: 18,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'List',
            head: getListSnapshot(),
            highlightedNodes: current ? [current.id] : [],
            pointers: current ? [{ name: 'current', nodeId: current.id, color: '#3b82f6' }] : [],
          },
        ],
      },
      variables: {
        target: target,
        position: 0,
      },
    });

    for (let i = 0; i < target - 1; i++) {
      current = current!.next!;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Move to position ${i + 1}`,
        lineNumber: 19,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'List',
              head: getListSnapshot(),
              highlightedNodes: [current.id],
              pointers: [{ name: 'current', nodeId: current.id, color: '#3b82f6' }],
            },
          ],
        },
        variables: {
          target: target,
          position: i + 1,
        },
      });
    }

    // Remove the target node
    const nodeToRemove = current!.next;
    current!.next = current!.next?.next || null;

    steps.push({
      id: `step-${stepId++}`,
      type: 'assignment',
      description: `Remove node with value ${nodeToRemove?.value}`,
      lineNumber: 22,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'List',
            head: getListSnapshot(nodeToRemove?.id),
            highlightedNodes: [current!.id],
            pointers: [{ name: 'current', nodeId: current!.id, color: '#10b981' }],
          },
        ],
      },
      variables: {
        removed: nodeToRemove?.value,
      },
    });

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Return modified list',
      lineNumber: 24,
      visualizationData: {
        linkedLists: [
          {
            id: 'result',
            name: 'Result',
            head: getListSnapshot(nodeToRemove?.id),
            highlightedNodes: [],
            pointers: [],
          },
        ],
        annotations: [
          {
            text: '✓ Node removed successfully',
            position: { x: 50, y: 10 },
            style: 'success',
          },
        ],
      },
      variables: {},
    });

    return { steps, result: head };
  },
};
