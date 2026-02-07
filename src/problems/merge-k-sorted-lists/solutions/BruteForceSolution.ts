import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { MergeKSortedListsInput } from '../types';

export const BruteForceSolution: Solution<MergeKSortedListsInput, ListNode | null> = {
  id: 'brute-force',
  name: 'Brute Force (Merge Pairs)',
  description: 'Merge lists one by one, merging each new list with the result',
  timeComplexity: 'O(k*N)',
  spaceComplexity: 'O(1)',

  code: `function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  if (lists.length === 0) return null;

  let result = lists[0];

  for (let i = 1; i < lists.length; i++) {
    result = mergeTwoLists(result, lists[i]);
  }

  return result;
}

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy: ListNode = { value: 0, next: null };
  let current = dummy;

  while (l1 && l2) {
    if (l1.value <= l2.value) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;
  return dummy.next;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (lists.length == 0) return null;                  // Line 2
                                                        // Line 3
  ListNode result = lists[0];                           // Line 4
                                                        // Line 5
  for (int i = 1; i < lists.length; i++) {             // Line 6
    result = mergeTwoLists(result, lists[i]);
  }
                                                        // Line 9
  return result;                                        // Line 10
}                                                       // Line 11
                                                        // Line 12
ListNode mergeTwoLists(ListNode l1, ListNode l2) {     // Line 13
  ListNode dummy = new ListNode(0);
  ListNode current = dummy;

  while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 != null ? l1 : l2;
  return dummy.next;
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (lists.Length == 0) return null;                  // Line 2
                                                        // Line 3
  ListNode result = lists[0];                           // Line 4
                                                        // Line 5
  for (int i = 1; i < lists.Length; i++) {             // Line 6
    result = MergeTwoLists(result, lists[i]);
  }
                                                        // Line 9
  return result;                                        // Line 10
}                                                       // Line 11
                                                        // Line 12
ListNode MergeTwoLists(ListNode l1, ListNode l2) {     // Line 13
  ListNode dummy = new ListNode(0);
  ListNode current = dummy;

  while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 != null ? l1 : l2;
  return dummy.next;
}`,
    },
  ],

  execute: (input: MergeKSortedListsInput): SolutionExecution<ListNode | null> => {
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Clone lists
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

    const lists = input.lists.map((list) => cloneList(list));

    if (lists.length === 0) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: 'No lists to merge',
        lineNumber: 2,
        visualizationData: {
          linkedLists: [],
        },
        variables: {},
      });
      return { steps, result: null };
    }

    // Show initial lists
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Start with ${lists.length} sorted lists`,
      lineNumber: 4,
      visualizationData: {
        linkedLists: lists.map((list, idx) => ({
          id: `list-${idx}`,
          name: `List ${idx}`,
          head: list,
          highlightedNodes: [],
          pointers: [],
        })),
      },
      variables: {
        k: lists.length,
      },
    });

    let result = lists[0];

    // Merge two lists helper
    const mergeTwoLists = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
      const dummy: ListNode = { id: 'dummy', value: 0, next: null };
      let current = dummy;

      while (l1 && l2) {
        if (l1.value <= l2.value) {
          current.next = { id: l1.id, value: l1.value, next: null };
          current = current.next;
          l1 = l1.next || null;
        } else {
          current.next = { id: l2.id, value: l2.value, next: null };
          current = current.next;
          l2 = l2.next || null;
        }
      }

      while (l1) {
        current.next = { id: l1.id, value: l1.value, next: null };
        current = current.next;
        l1 = l1.next || null;
      }

      while (l2) {
        current.next = { id: l2.id, value: l2.value, next: null };
        current = current.next;
        l2 = l2.next || null;
      }

      return dummy.next;
    };

    // Merge lists one by one
    for (let i = 1; i < lists.length; i++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Merging result with list ${i}`,
        lineNumber: 7,
        visualizationData: {
          linkedLists: [
            {
              id: 'result',
              name: 'Current Result',
              head: result,
              highlightedNodes: [],
              pointers: [],
            },
            {
              id: `list-${i}`,
              name: `List ${i}`,
              head: lists[i],
              highlightedNodes: [],
              pointers: [],
            },
          ],
        },
        variables: {
          merging: i,
          remaining: lists.length - i,
        },
      });

      result = mergeTwoLists(result, lists[i]);

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Merged list ${i} into result`,
        lineNumber: 7,
        visualizationData: {
          linkedLists: [
            {
              id: 'result',
              name: 'Current Result',
              head: result,
              highlightedNodes: [],
              pointers: [],
            },
          ],
        },
        variables: {
          merged: i,
          remaining: lists.length - i - 1,
        },
      });
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'All lists merged',
      lineNumber: 10,
      visualizationData: {
        linkedLists: [
          {
            id: 'final',
            name: 'Merged List',
            head: result,
            highlightedNodes: [],
            pointers: [],
          },
        ],
        annotations: [
          {
            text: '✓ All lists merged successfully',
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
