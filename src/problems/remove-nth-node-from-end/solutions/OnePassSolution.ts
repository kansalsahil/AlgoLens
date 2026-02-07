import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { RemoveNthNodeFromEndInput } from '../types';

export const OnePassSolution: Solution<RemoveNthNodeFromEndInput, ListNode | null> = {
  id: 'one-pass',
  name: 'One Pass (Two Pointers with Gap)',
  description: 'Use two pointers with n gap to find the node to remove in one pass',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',

  code: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy: ListNode = { value: 0, next: head };
  let fast = dummy;
  let slow = dummy;

  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move both until fast reaches end
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Remove the node
  slow.next = slow.next?.next || null;

  return dummy.next;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  ListNode dummy = new ListNode(0, head);               // Line 2
  ListNode fast = dummy;
  ListNode slow = dummy;
                                                        // Line 5
  // Move fast n+1 steps ahead                          // Line 6
  for (int i = 0; i <= n; i++) {                        // Line 7
    fast = fast.next;
  }
                                                        // Line 10
  // Move both until fast reaches end                   // Line 11
  while (fast != null) {                                // Line 12
    fast = fast.next;
    slow = slow.next;
  }
                                                        // Line 16
  // Remove the node                                    // Line 17
  slow.next = slow.next.next;                           // Line 18
                                                        // Line 19
  return dummy.next;                                    // Line 20
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  ListNode dummy = new ListNode(0, head);               // Line 2
  ListNode fast = dummy;
  ListNode slow = dummy;
                                                        // Line 5
  // Move fast n+1 steps ahead                          // Line 6
  for (int i = 0; i <= n; i++) {                        // Line 7
    fast = fast.next;
  }
                                                        // Line 10
  // Move both until fast reaches end                   // Line 11
  while (fast != null) {                                // Line 12
    fast = fast.next;
    slow = slow.next;
  }
                                                        // Line 16
  // Remove the node                                    // Line 17
  slow.next = slow.next.next;                           // Line 18
                                                        // Line 19
  return dummy.next;                                    // Line 20
}`,
    },
  ],

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

    const dummy: ListNode = { id: 'dummy', value: 0, next: head };
    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

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

    // Step 1: Initialize
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize dummy node and two pointers (remove ${n}th from end)`,
      lineNumber: 2,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'List',
            head: getListSnapshot(),
            highlightedNodes: [],
            pointers: [
              { name: 'fast', nodeId: dummy.id, color: '#ef4444' },
              { name: 'slow', nodeId: dummy.id, color: '#3b82f6' },
            ],
          },
        ],
      },
      variables: {
        n: n,
        gap: 0,
      },
    });

    // Step 2: Move fast n+1 steps ahead
    for (let i = 0; i <= n; i++) {
      fast = fast!.next!;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Move fast pointer ahead (step ${i + 1} of ${n + 1})`,
        lineNumber: 7,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'List',
              head: getListSnapshot(),
              highlightedNodes: [fast?.id || ''],
              pointers: [
                ...(fast ? [{ name: 'fast', nodeId: fast.id, color: '#ef4444' }] : []),
                { name: 'slow', nodeId: slow!.id, color: '#3b82f6' },
              ],
            },
          ],
        },
        variables: {
          n: n,
          gap: i + 1,
        },
      });
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'comparison',
      description: `Fast pointer is ${n + 1} steps ahead, now move both until fast reaches end`,
      lineNumber: 11,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'List',
            head: getListSnapshot(),
            highlightedNodes: fast && slow ? [fast.id, slow.id] : slow ? [slow.id] : [],
            pointers: [
              ...(fast ? [{ name: 'fast', nodeId: fast.id, color: '#ef4444' }] : []),
              ...(slow ? [{ name: 'slow', nodeId: slow.id, color: '#3b82f6' }] : []),
            ],
          },
        ],
      },
      variables: {
        n: n,
        gap: n + 1,
      },
    });

    // Step 3: Move both pointers until fast reaches end
    while (fast !== null) {
      fast = fast.next || null;
      slow = slow!.next!;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: 'Move both pointers forward',
        lineNumber: 12,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'List',
              head: getListSnapshot(),
              highlightedNodes: fast && slow ? [fast.id, slow.id] : slow ? [slow.id] : [],
              pointers: [
                ...(fast ? [{ name: 'fast', nodeId: fast.id, color: '#ef4444' }] : []),
                ...(slow ? [{ name: 'slow', nodeId: slow.id, color: '#3b82f6' }] : []),
              ],
            },
          ],
        },
        variables: {
          slow: slow.value,
          fast: fast ? fast.value : 'null',
        },
      });
    }

    // Step 4: Remove the node
    const nodeToRemove = slow!.next;
    slow!.next = slow!.next?.next || null;

    steps.push({
      id: `step-${stepId++}`,
      type: 'assignment',
      description: `Remove node with value ${nodeToRemove?.value}`,
      lineNumber: 17,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'List',
            head: getListSnapshot(nodeToRemove?.id),
            highlightedNodes: [slow!.id],
            pointers: [{ name: 'slow', nodeId: slow!.id, color: '#10b981' }],
          },
        ],
      },
      variables: {
        removed: nodeToRemove?.value,
      },
    });

    const result = dummy.next;

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Return modified list (dummy.next)',
      lineNumber: 19,
      visualizationData: {
        linkedLists: [
          {
            id: 'result',
            name: 'Result',
            head: getListSnapshot(nodeToRemove?.id),
            highlightedNodes: result ? [result.id] : [],
            pointers: [],
          },
        ],
        annotations: [
          {
            text: '✓ Node removed in one pass',
            position: { x: 50, y: 10 },
            style: 'success',
          },
        ],
      },
      variables: {},
    });

    return { steps, result };
  },
};
