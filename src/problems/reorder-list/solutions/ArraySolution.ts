import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { ReorderListInput } from '../types';

export const ArraySolution: Solution<ReorderListInput, void> = {
  id: 'array',
  name: 'Array Approach',
  description: 'Store all nodes in an array, then reorder using two pointers',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',

  code: `function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return;

  // Store all nodes in array
  const nodes: ListNode[] = [];
  let current = head;
  while (current) {
    nodes.push(current);
    current = current.next;
  }

  // Reorder using two pointers
  let left = 0;
  let right = nodes.length - 1;

  while (left < right) {
    nodes[left].next = nodes[right];
    left++;

    if (left >= right) break;

    nodes[right].next = nodes[left];
    right--;
  }

  nodes[left].next = null;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (head == null || head.next == null) return;       // Line 2
                                                        // Line 3
  // Store all nodes in array                          // Line 4
  List<ListNode> nodes = new ArrayList<>();            // Line 5
  ListNode current = head;                             // Line 6
  while (current != null) {                             // Line 7
    nodes.add(current);
    current = current.next;
  }
                                                        // Line 11
  // Reorder using two pointers                        // Line 12
  int left = 0;                                         // Line 13
  int right = nodes.size() - 1;
                                                        // Line 15
  while (left < right) {                                // Line 16
    nodes.get(left).next = nodes.get(right);
    left++;
                                                        // Line 19
    if (left >= right) break;                           // Line 20
                                                        // Line 21
    nodes.get(right).next = nodes.get(left);
    right--;
  }
                                                        // Line 25
  nodes.get(left).next = null;
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (head == null || head.next == null) return;       // Line 2
                                                        // Line 3
  // Store all nodes in array                          // Line 4
  List<ListNode> nodes = new List<ListNode>();         // Line 5
  ListNode current = head;                             // Line 6
  while (current != null) {                             // Line 7
    nodes.Add(current);
    current = current.next;
  }
                                                        // Line 11
  // Reorder using two pointers                        // Line 12
  int left = 0;                                         // Line 13
  int right = nodes.Count - 1;
                                                        // Line 15
  while (left < right) {                                // Line 16
    nodes[left].next = nodes[right];
    left++;
                                                        // Line 19
    if (left >= right) break;                           // Line 20
                                                        // Line 21
    nodes[right].next = nodes[left];
    right--;
  }
                                                        // Line 25
  nodes[left].next = null;
}`,
    },
  ],

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
        description: 'List is empty or has only one node, no reordering needed',
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

    // Collect nodes into array
    const nodes: ListNode[] = [];
    let current: ListNode | null = head;
    while (current) {
      nodes.push(current);
      current = current.next || null;
    }

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Store all ${nodes.length} nodes in array`,
      lineNumber: 4,
      visualizationData: {
        linkedLists: [
          {
            id: 'original',
            name: 'Original List',
            head: originalSnapshot,
            highlightedNodes: [],
            pointers: [],
          },
        ],
        custom: {
          nodes: nodes.map((n) => n.value),
        },
      },
      variables: {
        nodesCount: nodes.length,
      },
    });

    // Reorder using two pointers
    let left = 0;
    let right = nodes.length - 1;

    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize left and right pointers',
      lineNumber: 13,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'Reordering',
            head: originalSnapshot,
            highlightedNodes: [nodes[left].id, nodes[right].id],
            pointers: [
              { name: 'left', nodeId: nodes[left].id, color: '#3b82f6' },
              { name: 'right', nodeId: nodes[right].id, color: '#ec4899' },
            ],
          },
        ],
        custom: {
          nodes: nodes.map((n) => n.value),
        },
      },
      variables: {
        left: left,
        right: right,
      },
    });

    while (left < right) {
      // Link left to right
      nodes[left].next = nodes[right];

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Link nodes[${left}] (${nodes[left].value}) → nodes[${right}] (${nodes[right].value})`,
        lineNumber: 16,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Reordering',
              head: createSnapshot(head),
              highlightedNodes: [nodes[left].id, nodes[right].id],
              pointers: [
                { name: 'left', nodeId: nodes[left].id, color: '#3b82f6' },
                { name: 'right', nodeId: nodes[right].id, color: '#ec4899' },
              ],
            },
          ],
          custom: {
            nodes: nodes.map((n) => n.value),
          },
        },
        variables: {
          left: left,
          right: right,
        },
      });

      left++;

      if (left >= right) break;

      // Link right to next left
      nodes[right].next = nodes[left];

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Link nodes[${right}] (${nodes[right].value}) → nodes[${left}] (${nodes[left].value})`,
        lineNumber: 21,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Reordering',
              head: createSnapshot(head),
              highlightedNodes: [nodes[left].id, nodes[right].id],
              pointers: [
                { name: 'left', nodeId: nodes[left].id, color: '#3b82f6' },
                { name: 'right', nodeId: nodes[right].id, color: '#ec4899' },
              ],
            },
          ],
          custom: {
            nodes: nodes.map((n) => n.value),
          },
        },
        variables: {
          left: left,
          right: right,
        },
      });

      right--;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Move pointers: left=${left}, right=${right}`,
        lineNumber: 22,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Reordering',
              head: createSnapshot(head),
              highlightedNodes: left < right ? [nodes[left].id, nodes[right].id] : [nodes[left].id],
              pointers:
                left < right
                  ? [
                      { name: 'left', nodeId: nodes[left].id, color: '#3b82f6' },
                      { name: 'right', nodeId: nodes[right].id, color: '#ec4899' },
                    ]
                  : [{ name: 'left/right', nodeId: nodes[left].id, color: '#10b981' }],
            },
          ],
          custom: {
            nodes: nodes.map((n) => n.value),
          },
        },
        variables: {
          left: left,
          right: right,
        },
      });
    }

    // Set last node's next to null
    nodes[left].next = null;

    steps.push({
      id: `step-${stepId++}`,
      type: 'assignment',
      description: 'Set last node\'s next to null',
      lineNumber: 25,
      visualizationData: {
        linkedLists: [
          {
            id: 'reordered',
            name: 'Reordered List',
            head: head,
            highlightedNodes: [],
            pointers: [],
          },
        ],
        annotations: [
          {
            text: '✓ List reordered successfully',
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
