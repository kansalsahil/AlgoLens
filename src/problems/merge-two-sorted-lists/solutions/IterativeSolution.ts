import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { MergeTwoSortedListsInput } from '../types';

export const IterativeSolution: Solution<MergeTwoSortedListsInput, ListNode | null> = {
  id: 'iterative',
  name: 'Iterative',
  description: 'Merge two sorted lists iteratively using a dummy node',
  timeComplexity: 'O(n + m)',
  spaceComplexity: 'O(1)',

  code: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy: ListNode = { value: 0, next: null };
  let current = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.value <= list2.value) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  current.next = list1 !== null ? list1 : list2;

  return dummy.next;
}`,

  execute: (input: MergeTwoSortedListsInput): SolutionExecution<ListNode | null> => {
    const steps: AnimationStep[] = [];
    let stepId = 0;

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

    let list1 = cloneList(input.list1, 'list1');
    let list2 = cloneList(input.list2, 'list2');

    const dummy: ListNode = { id: 'dummy', value: 0, next: null };
    let current = dummy;
    let mergedIdx = 0;

    // Collect nodes for visualization
    const collectNodes = (head: ListNode | null): ListNode[] => {
      const nodes: ListNode[] = [];
      let temp = head;
      while (temp) {
        nodes.push(temp);
        temp = temp.next || null;
      }
      return nodes;
    };

    // Step 1: Initialization
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize dummy node and current pointer',
      lineNumber: 2,
      visualizationData: {
        linkedLists: [
          {
            id: 'list1',
            name: 'List 1',
            head: list1,
            highlightedNodes: [],
            pointers: list1 ? [{ name: 'list1', nodeId: list1.id, color: '#3b82f6' }] : [],
          },
          {
            id: 'list2',
            name: 'List 2',
            head: list2,
            highlightedNodes: [],
            pointers: list2 ? [{ name: 'list2', nodeId: list2.id, color: '#ec4899' }] : [],
          },
          {
            id: 'merged',
            name: 'Merged List',
            head: dummy,
            highlightedNodes: [dummy.id],
            pointers: [{ name: 'current', nodeId: dummy.id, color: '#10b981' }],
          },
        ],
      },
      variables: {
        list1: list1 ? list1.value : 'null',
        list2: list2 ? list2.value : 'null',
        current: 'dummy',
      },
    });

    // Merge process
    while (list1 !== null && list2 !== null) {
      const compareStep: AnimationStep = {
        id: `step-${stepId++}`,
        type: 'comparison',
        description: `Compare: list1.value (${list1.value}) <= list2.value (${list2.value})`,
        lineNumber: 5,
        visualizationData: {
          linkedLists: [
            {
              id: 'list1',
              name: 'List 1',
              head: list1,
              highlightedNodes: [list1.id],
              pointers: [{ name: 'list1', nodeId: list1.id, color: '#3b82f6' }],
            },
            {
              id: 'list2',
              name: 'List 2',
              head: list2,
              highlightedNodes: [list2.id],
              pointers: [{ name: 'list2', nodeId: list2.id, color: '#ec4899' }],
            },
            {
              id: 'merged',
              name: 'Merged List',
              head: dummy,
              highlightedNodes: current ? [current.id] : [],
              pointers: current ? [{ name: 'current', nodeId: current.id, color: '#10b981' }] : [],
            },
          ],
        },
        variables: {
          list1: list1.value,
          list2: list2.value,
          current: current.value,
        },
      };
      steps.push(compareStep);

      if (list1.value <= list2.value) {
        // Add list1 node to merged list
        const nodeToAdd = list1;
        current.next = { id: `merged-${mergedIdx++}`, value: nodeToAdd.value, next: null };
        current = current.next;
        list1 = list1.next || null;

        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `Add node with value ${nodeToAdd.value} from list1 to merged list`,
          lineNumber: 6,
          visualizationData: {
            linkedLists: [
              {
                id: 'list1',
                name: 'List 1',
                head: list1,
                highlightedNodes: list1 ? [list1.id] : [],
                pointers: list1 ? [{ name: 'list1', nodeId: list1.id, color: '#3b82f6' }] : [],
              },
              {
                id: 'list2',
                name: 'List 2',
                head: list2,
                highlightedNodes: [],
                pointers: list2 ? [{ name: 'list2', nodeId: list2.id, color: '#ec4899' }] : [],
              },
              {
                id: 'merged',
                name: 'Merged List',
                head: dummy.next,
                highlightedNodes: [current.id],
                pointers: [{ name: 'current', nodeId: current.id, color: '#10b981' }],
              },
            ],
          },
          variables: {
            list1: list1 ? list1.value : 'null',
            list2: list2.value,
            current: current.value,
          },
        });
      } else {
        // Add list2 node to merged list
        const nodeToAdd = list2;
        current.next = { id: `merged-${mergedIdx++}`, value: nodeToAdd.value, next: null };
        current = current.next;
        list2 = list2.next || null;

        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `Add node with value ${nodeToAdd.value} from list2 to merged list`,
          lineNumber: 9,
          visualizationData: {
            linkedLists: [
              {
                id: 'list1',
                name: 'List 1',
                head: list1,
                highlightedNodes: [],
                pointers: list1 ? [{ name: 'list1', nodeId: list1.id, color: '#3b82f6' }] : [],
              },
              {
                id: 'list2',
                name: 'List 2',
                head: list2,
                highlightedNodes: list2 ? [list2.id] : [],
                pointers: list2 ? [{ name: 'list2', nodeId: list2.id, color: '#ec4899' }] : [],
              },
              {
                id: 'merged',
                name: 'Merged List',
                head: dummy.next,
                highlightedNodes: [current.id],
                pointers: [{ name: 'current', nodeId: current.id, color: '#10b981' }],
              },
            ],
          },
          variables: {
            list1: list1.value,
            list2: list2 ? list2.value : 'null',
            current: current.value,
          },
        });
      }
    }

    // Append remaining nodes
    const remaining = list1 !== null ? list1 : list2;
    if (remaining) {
      let temp = remaining;
      while (temp) {
        current.next = { id: `merged-${mergedIdx++}`, value: temp.value, next: null };
        current = current.next;
        temp = temp.next || null;
      }

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Append remaining nodes from ${list1 !== null ? 'list1' : 'list2'}`,
        lineNumber: 16,
        visualizationData: {
          linkedLists: [
            {
              id: 'list1',
              name: 'List 1',
              head: list1,
              highlightedNodes: [],
              pointers: [],
            },
            {
              id: 'list2',
              name: 'List 2',
              head: list2,
              highlightedNodes: [],
              pointers: [],
            },
            {
              id: 'merged',
              name: 'Merged List',
              head: dummy.next,
              highlightedNodes: [],
              pointers: [],
            },
          ],
        },
        variables: {
          list1: 'null',
          list2: 'null',
          current: current.value,
        },
      });
    }

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Return merged list (dummy.next)',
      lineNumber: 18,
      visualizationData: {
        linkedLists: [
          {
            id: 'merged',
            name: 'Merged List',
            head: dummy.next,
            highlightedNodes: dummy.next ? [dummy.next.id] : [],
            pointers: dummy.next ? [{ name: 'head', nodeId: dummy.next.id, color: '#10b981' }] : [],
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

    return { steps, result: dummy.next };
  },
};
