import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { LinkedListCycleInput } from '../types';

export const TwoPointerSolution: Solution<LinkedListCycleInput, boolean> = {
  id: 'two-pointer',
  name: 'Two Pointer (Floyd\'s Cycle Detection)',
  description: 'Detect cycle using Floyd\'s cycle detection algorithm with slow and fast pointers',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',

  code: `function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  ListNode slow = head;                                 // Line 2
  ListNode fast = head;
                                                        // Line 4
  while (fast != null && fast.next != null) {          // Line 5
    slow = slow.next;                                   // Line 6
    fast = fast.next.next;                              // Line 7
                                                        // Line 8
    if (slow == fast) {                                 // Line 9
      return true;
    }
  }
                                                        // Line 13
  return false;                                         // Line 14
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  ListNode slow = head;                                 // Line 2
  ListNode fast = head;
                                                        // Line 4
  while (fast != null && fast.next != null) {          // Line 5
    slow = slow.next;                                   // Line 6
    fast = fast.next.next;                              // Line 7
                                                        // Line 8
    if (slow == fast) {                                 // Line 9
      return true;
    }
  }
                                                        // Line 13
  return false;                                         // Line 14
}`,
    },
  ],

  execute: (input: LinkedListCycleInput): SolutionExecution<boolean> => {
    const steps: AnimationStep[] = [];
    let stepId = 0;

    const { head, pos } = input;
    let slow = head;
    let fast = head;
    let stepCount = 0;
    const maxSteps = 20; // Prevent infinite loops in visualization

    // Step 1: Initialization
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize slow and fast pointers to head',
      lineNumber: 2,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'Linked List',
            head: head,
            highlightedNodes: head ? [head.id] : [],
            pointers: head
              ? [
                  { name: 'slow', nodeId: head.id, color: '#3b82f6' },
                  { name: 'fast', nodeId: head.id, color: '#ef4444' },
                ]
              : [],
          },
        ],
        custom: {
          hasCycle: pos >= 0,
          cyclePos: pos,
        },
      },
      variables: {
        slow: slow ? slow.value : 'null',
        fast: fast ? fast.value : 'null',
      },
    });

    // Iteration
    while (fast !== null && fast.next !== null && stepCount < maxSteps) {
      stepCount++;

      // Move slow pointer one step
      slow = slow!.next || null;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Move slow pointer one step${slow ? ` to ${slow.value}` : ' (null)'}`,
        lineNumber: 6,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Linked List',
              head: head,
              highlightedNodes: slow ? [slow.id] : [],
              pointers: [
                ...(slow ? [{ name: 'slow', nodeId: slow.id, color: '#3b82f6' }] : []),
                ...(fast ? [{ name: 'fast', nodeId: fast.id, color: '#ef4444' }] : []),
              ],
            },
          ],
          custom: {
            hasCycle: pos >= 0,
            cyclePos: pos,
          },
        },
        variables: {
          slow: slow ? slow.value : 'null',
          fast: fast ? fast.value : 'null',
        },
      });

      // Move fast pointer two steps
      fast = fast.next?.next || null;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Move fast pointer two steps${fast ? ` to ${fast.value}` : ' (null)'}`,
        lineNumber: 7,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Linked List',
              head: head,
              highlightedNodes: [...(slow ? [slow.id] : []), ...(fast ? [fast.id] : [])],
              pointers: [
                ...(slow ? [{ name: 'slow', nodeId: slow.id, color: '#3b82f6' }] : []),
                ...(fast ? [{ name: 'fast', nodeId: fast.id, color: '#ef4444' }] : []),
              ],
            },
          ],
          custom: {
            hasCycle: pos >= 0,
            cyclePos: pos,
          },
        },
        variables: {
          slow: slow ? slow.value : 'null',
          fast: fast ? fast.value : 'null',
        },
      });

      // Check if pointers meet
      if (slow && fast && slow.id === fast.id) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: 'Slow and fast pointers meet - cycle detected!',
          lineNumber: 9,
          visualizationData: {
            linkedLists: [
              {
                id: 'list',
                name: 'Linked List',
                head: head,
                highlightedNodes: [slow.id],
                pointers: [
                  { name: 'slow/fast', nodeId: slow.id, color: '#10b981' },
                ],
              },
            ],
            custom: {
              hasCycle: true,
              cyclePos: pos,
            },
            annotations: [
              {
                text: '✓ Cycle found',
                position: { x: 50, y: 10 },
                style: 'success',
              },
            ],
          },
          variables: {
            slow: slow.value,
            fast: fast.value,
            result: 'true',
          },
        });

        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: 'Return true',
          lineNumber: 10,
          visualizationData: {
            linkedLists: [
              {
                id: 'list',
                name: 'Linked List',
                head: head,
                highlightedNodes: [slow.id],
                pointers: [
                  { name: 'cycle', nodeId: slow.id, color: '#10b981' },
                ],
              },
            ],
            custom: {
              hasCycle: true,
              cyclePos: pos,
            },
            annotations: [
              {
                text: '✓ Cycle found',
                position: { x: 50, y: 10 },
                style: 'success',
              },
            ],
          },
          variables: {
            result: 'true',
          },
        });

        return { steps, result: true };
      }

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: 'Pointers not equal, continue',
        lineNumber: 9,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Linked List',
              head: head,
              highlightedNodes: [],
              pointers: [
                ...(slow ? [{ name: 'slow', nodeId: slow.id, color: '#3b82f6' }] : []),
                ...(fast ? [{ name: 'fast', nodeId: fast.id, color: '#ef4444' }] : []),
              ],
            },
          ],
          custom: {
            hasCycle: pos >= 0,
            cyclePos: pos,
          },
        },
        variables: {
          slow: slow ? slow.value : 'null',
          fast: fast ? fast.value : 'null',
        },
      });
    }

    // No cycle found
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Fast pointer reached end, no cycle detected. Return false',
      lineNumber: 14,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'Linked List',
            head: head,
            highlightedNodes: [],
            pointers: [],
          },
        ],
        custom: {
          hasCycle: false,
          cyclePos: -1,
        },
        annotations: [
          {
            text: '✓ No cycle found',
            position: { x: 50, y: 10 },
            style: 'success',
          },
        ],
      },
      variables: {
        slow: slow ? slow.value : 'null',
        fast: 'null',
        result: 'false',
      },
    });

    return { steps, result: false };
  },
};
