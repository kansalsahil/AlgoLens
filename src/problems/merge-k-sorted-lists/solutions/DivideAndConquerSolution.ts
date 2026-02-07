import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { MergeKSortedListsInput } from '../types';

export const DivideAndConquerSolution: Solution<MergeKSortedListsInput, ListNode | null> = {
  id: 'divide-and-conquer',
  name: 'Divide and Conquer',
  description: 'Merge lists in pairs recursively (like merge sort)',
  timeComplexity: 'O(N log k)',
  spaceComplexity: 'O(log k)',

  code: `function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];

  return mergeHelper(lists, 0, lists.length - 1);
}

function mergeHelper(lists: (ListNode | null)[], start: number, end: number): ListNode | null {
  if (start === end) return lists[start];

  const mid = Math.floor((start + end) / 2);
  const left = mergeHelper(lists, start, mid);
  const right = mergeHelper(lists, mid + 1, end);

  return mergeTwoLists(left, right);
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
  if (lists.length == 1) return lists[0];              // Line 3
                                                        // Line 4
  return mergeHelper(lists, 0, lists.length - 1);      // Line 5
}                                                       // Line 6
                                                        // Line 7
ListNode mergeHelper(ListNode[] lists, int start, int end) { // Line 8
  if (start == end) return lists[start];

  int mid = (start + end) / 2;
  ListNode left = mergeHelper(lists, start, mid);
  ListNode right = mergeHelper(lists, mid + 1, end);
                                                        // Line 14
  return mergeTwoLists(left, right);
}

ListNode mergeTwoLists(ListNode l1, ListNode l2) {
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
  if (lists.Length == 1) return lists[0];              // Line 3
                                                        // Line 4
  return MergeHelper(lists, 0, lists.Length - 1);      // Line 5
}                                                       // Line 6
                                                        // Line 7
ListNode MergeHelper(ListNode[] lists, int start, int end) { // Line 8
  if (start == end) return lists[start];

  int mid = (start + end) / 2;
  ListNode left = MergeHelper(lists, start, mid);
  ListNode right = MergeHelper(lists, mid + 1, end);
                                                        // Line 14
  return MergeTwoLists(left, right);
}

ListNode MergeTwoLists(ListNode l1, ListNode l2) {
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

    if (lists.length === 1) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: 'Only one list, return as is',
        lineNumber: 3,
        visualizationData: {
          linkedLists: [
            {
              id: 'list-0',
              name: 'List 0',
              head: lists[0],
              highlightedNodes: [],
              pointers: [],
            },
          ],
        },
        variables: {},
      });
      return { steps, result: lists[0] };
    }

    // Show initial lists
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Start with ${lists.length} sorted lists (using divide and conquer)`,
      lineNumber: 5,
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
        approach: 'Divide and Conquer',
      },
    });

    // Merge two lists helper
    const mergeTwoLists = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
      const dummy: ListNode = { id: `dummy-${Math.random()}`, value: 0, next: null };
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

    // Simulate divide and conquer merging
    let currentLists = [...lists];
    let level = 0;

    while (currentLists.length > 1) {
      level++;
      const nextLevel: (ListNode | null)[] = [];

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Level ${level}: Merge pairs of lists`,
        lineNumber: 10,
        visualizationData: {
          linkedLists: currentLists.map((list, idx) => ({
            id: `level-${level}-list-${idx}`,
            name: `List ${idx}`,
            head: list,
            highlightedNodes: [],
            pointers: [],
          })),
        },
        variables: {
          level: level,
          lists: currentLists.length,
        },
      });

      for (let i = 0; i < currentLists.length; i += 2) {
        if (i + 1 < currentLists.length) {
          // Merge pairs
          const merged = mergeTwoLists(currentLists[i], currentLists[i + 1]);
          nextLevel.push(merged);

          steps.push({
            id: `step-${stepId++}`,
            type: 'assignment',
            description: `Merge list ${i} and list ${i + 1}`,
            lineNumber: 14,
            visualizationData: {
              linkedLists: [
                {
                  id: `merged-${i}`,
                  name: `Merged ${i} & ${i + 1}`,
                  head: merged,
                  highlightedNodes: [],
                  pointers: [],
                },
              ],
            },
            variables: {
              level: level,
              merged: `${i} & ${i + 1}`,
            },
          });
        } else {
          // Odd one out, carry forward
          nextLevel.push(currentLists[i]);
        }
      }

      currentLists = nextLevel;
    }

    const result = currentLists[0];

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'All lists merged using divide and conquer',
      lineNumber: 36,
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
            text: '✓ All lists merged in O(N log k)',
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
