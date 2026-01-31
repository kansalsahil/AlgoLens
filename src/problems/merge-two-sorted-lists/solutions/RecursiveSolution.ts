import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { MergeTwoSortedListsInput } from '../types';

export const RecursiveSolution: Solution<MergeTwoSortedListsInput, ListNode | null> = {
  id: 'recursive',
  name: 'Recursive',
  description: 'Merge two sorted lists recursively',
  timeComplexity: 'O(n + m)',
  spaceComplexity: 'O(n + m)',

  code: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  if (list1.value <= list2.value) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
}`,

  execute: (input: MergeTwoSortedListsInput): SolutionExecution<ListNode | null> => {
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let callDepth = 0;

    // Clone inputs to avoid mutation
    const cloneList = (head: ListNode | null, prefix: string): ListNode | null => {
      if (!head) return null;
      const newHead: ListNode = { id: `${prefix}-${head.id}`, value: head.value, next: null };
      let current = newHead;
      let original = head.next;
      let idx = 1;
      while (original) {
        current.next = { id: `${prefix}-node-${idx}`, value: original.value, next: null };
        current = current.next;
        original = original.next;
        idx++;
      }
      return newHead;
    };

    const merge = (
      l1: ListNode | null,
      l2: ListNode | null,
      depth: number,
      stack: any[]
    ): ListNode | null => {
      // Base case: list1 is null
      if (l1 === null) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: 'Base case: list1 is null, return list2',
          lineNumber: 2,
          visualizationData: {
            linkedLists: [
              {
                id: 'list1',
                name: 'List 1',
                head: l1,
                highlightedNodes: [],
                pointers: [],
              },
              {
                id: 'list2',
                name: 'List 2',
                head: l2,
                highlightedNodes: l2 ? [l2.id] : [],
                pointers: l2 ? [{ name: 'return', nodeId: l2.id, color: '#10b981' }] : [],
              },
            ],
            stack: [...stack],
          },
          variables: {
            list1: 'null',
            list2: l2 ? l2.value : 'null',
          },
        });
        return l2;
      }

      // Base case: list2 is null
      if (l2 === null) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: 'Base case: list2 is null, return list1',
          lineNumber: 3,
          visualizationData: {
            linkedLists: [
              {
                id: 'list1',
                name: 'List 1',
                head: l1,
                highlightedNodes: l1 ? [l1.id] : [],
                pointers: l1 ? [{ name: 'return', nodeId: l1.id, color: '#10b981' }] : [],
              },
              {
                id: 'list2',
                name: 'List 2',
                head: l2,
                highlightedNodes: [],
                pointers: [],
              },
            ],
            stack: [...stack],
          },
          variables: {
            list1: l1 ? l1.value : 'null',
            list2: 'null',
          },
        });
        return l1;
      }

      // Recursive case
      const newStack = [
        ...stack,
        {
          functionName: 'mergeTwoLists',
          parameters: { list1: l1.value, list2: l2.value },
          lineNumber: 1,
        },
      ];

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Compare: list1.value (${l1.value}) <= list2.value (${l2.value})`,
        lineNumber: 5,
        visualizationData: {
          linkedLists: [
            {
              id: 'list1',
              name: 'List 1',
              head: l1,
              highlightedNodes: [l1.id],
              pointers: [{ name: 'list1', nodeId: l1.id, color: '#3b82f6' }],
            },
            {
              id: 'list2',
              name: 'List 2',
              head: l2,
              highlightedNodes: [l2.id],
              pointers: [{ name: 'list2', nodeId: l2.id, color: '#ec4899' }],
            },
          ],
          stack: newStack,
        },
        variables: {
          list1: l1.value,
          list2: l2.value,
        },
      });

      if (l1.value <= l2.value) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'recursion',
          description: `Choosing list1 node (${l1.value}), recurse with list1.next and list2`,
          lineNumber: 6,
          visualizationData: {
            linkedLists: [
              {
                id: 'list1',
                name: 'List 1',
                head: l1,
                highlightedNodes: [l1.id],
                pointers: [{ name: 'selected', nodeId: l1.id, color: '#10b981' }],
              },
              {
                id: 'list2',
                name: 'List 2',
                head: l2,
                highlightedNodes: [],
                pointers: [],
              },
            ],
            stack: newStack,
          },
          variables: {
            list1: l1.value,
            list2: l2.value,
          },
        });

        l1.next = merge(l1.next || null, l2, depth + 1, newStack);

        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Return list1 node (${l1.value})`,
          lineNumber: 7,
          visualizationData: {
            linkedLists: [
              {
                id: 'list1',
                name: 'List 1',
                head: l1,
                highlightedNodes: [l1.id],
                pointers: [{ name: 'return', nodeId: l1.id, color: '#10b981' }],
              },
              {
                id: 'list2',
                name: 'List 2',
                head: l2,
                highlightedNodes: [],
                pointers: [],
              },
            ],
            stack: [...stack],
          },
          variables: {
            list1: l1.value,
            list2: l2 ? l2.value : 'null',
          },
        });

        return l1;
      } else {
        steps.push({
          id: `step-${stepId++}`,
          type: 'recursion',
          description: `Choosing list2 node (${l2.value}), recurse with list1 and list2.next`,
          lineNumber: 9,
          visualizationData: {
            linkedLists: [
              {
                id: 'list1',
                name: 'List 1',
                head: l1,
                highlightedNodes: [],
                pointers: [],
              },
              {
                id: 'list2',
                name: 'List 2',
                head: l2,
                highlightedNodes: [l2.id],
                pointers: [{ name: 'selected', nodeId: l2.id, color: '#10b981' }],
              },
            ],
            stack: newStack,
          },
          variables: {
            list1: l1.value,
            list2: l2.value,
          },
        });

        l2.next = merge(l1, l2.next || null, depth + 1, newStack);

        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Return list2 node (${l2.value})`,
          lineNumber: 10,
          visualizationData: {
            linkedLists: [
              {
                id: 'list1',
                name: 'List 1',
                head: l1,
                highlightedNodes: [],
                pointers: [],
              },
              {
                id: 'list2',
                name: 'List 2',
                head: l2,
                highlightedNodes: [l2.id],
                pointers: [{ name: 'return', nodeId: l2.id, color: '#10b981' }],
              },
            ],
            stack: [...stack],
          },
          variables: {
            list1: l1 ? l1.value : 'null',
            list2: l2.value,
          },
        });

        return l2;
      }
    };

    const list1Clone = cloneList(input.list1, 'list1');
    const list2Clone = cloneList(input.list2, 'list2');

    const result = merge(list1Clone, list2Clone, 0, []);

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Merge complete, returning merged list',
      lineNumber: 11,
      visualizationData: {
        linkedLists: [
          {
            id: 'merged',
            name: 'Merged List',
            head: result,
            highlightedNodes: result ? [result.id] : [],
            pointers: result ? [{ name: 'head', nodeId: result.id, color: '#10b981' }] : [],
          },
        ],
        annotations: [
          {
            text: '✓ Lists merged successfully',
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
