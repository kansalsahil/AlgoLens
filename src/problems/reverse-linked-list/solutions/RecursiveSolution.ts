import { Solution, AnimationStep, SolutionExecution, ListNode, StackFrame } from '../../../core/types';
import { ReverseLinkedListInput } from '../types';

export const RecursiveSolution: Solution<ReverseLinkedListInput, ListNode | null> = {
  id: 'recursive',
  name: 'Recursive',
  description: 'Reverse the linked list recursively',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',

  code: `function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head;
  }

  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}`,

  execute: (input: ReverseLinkedListInput): SolutionExecution<ListNode | null> => {
    const { head } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Collect all nodes in array (fixed layout)
    const allNodes: ListNode[] = [];
    let temp = head;
    while (temp) {
      allNodes.push({
        id: temp.id,
        value: temp.value,
        next: temp.next || null,
      });
      temp = temp.next || null;
    }

    if (allNodes.length === 0) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: 'Empty list, return null',
        lineNumber: 2,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Linked List',
              head: null,
              highlightedNodes: [],
              pointers: [],
            },
          ],
          stack: [],
        },
        variables: { head: 'null' },
      });
      return { steps, result: null };
    }

    // Track next pointers for each node (using node index)
    const nextPointers: (number | null)[] = allNodes.map((_, i) => i < allNodes.length - 1 ? i + 1 : null);

    // Call stack tracking
    const callStack: StackFrame[] = [];

    // Helper to create visualization with current pointer state
    const createVisualization = (
      highlightedIndices: number[] = [],
      pointerLabels: { name: string; idx: number; color: string }[] = []
    ) => {
      const pointers = pointerLabels.map(p => ({
        name: p.name,
        nodeId: allNodes[p.idx].id,
        color: p.color,
      }));

      return {
        linkedLists: [
          {
            id: 'list',
            name: 'Linked List',
            head: allNodes[0],
            highlightedNodes: highlightedIndices.map(i => allNodes[i].id),
            pointers,
          },
        ],
        stack: [...callStack],
        custom: {
          allNodes: allNodes.map((node, i) => ({
            ...node,
            next: nextPointers[i] !== null ? allNodes[nextPointers[i]!] : null,
          })),
          nextPointers: [...nextPointers],
        },
      };
    };

    const reverseRecursive = (nodeIdx: number | null): number | null => {
      if (nodeIdx === null) {
        return null;
      }

      const node = allNodes[nodeIdx];
      const nextIdx = nextPointers[nodeIdx];

      // Push current call to stack
      callStack.push({
        functionName: 'reverseList',
        parameters: { head: node.value },
        lineNumber: 1,
      });

      // Base case: reached the tail
      if (nextIdx === null) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: `Base case: reached tail node (${node.value}), this becomes new head`,
          lineNumber: 2,
          visualizationData: createVisualization(
            [nodeIdx],
            [{ name: 'head', idx: nodeIdx, color: '#10b981' }]
          ),
          variables: { head: node.value, returning: node.value },
        });
        callStack.pop();
        return nodeIdx;
      }

      // Recursive call - going deeper
      steps.push({
        id: `step-${stepId++}`,
        type: 'custom',
        description: `Call reverseList(${allNodes[nextIdx].value}) - recursing deeper`,
        lineNumber: 6,
        visualizationData: createVisualization(
          [nodeIdx, nextIdx],
          [
            { name: 'head', idx: nodeIdx, color: '#ef4444' },
            { name: 'head.next', idx: nextIdx, color: '#8b5cf6' },
          ]
        ),
        variables: { head: node.value, 'head.next': allNodes[nextIdx].value },
      });

      const newHeadIdx = reverseRecursive(nextIdx);

      // Coming back from recursion - now reverse the pointer
      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Returned from recursion. Reverse: ${allNodes[nextIdx].value}.next = ${node.value}`,
        lineNumber: 7,
        visualizationData: createVisualization(
          [nodeIdx, nextIdx],
          [
            { name: 'head', idx: nodeIdx, color: '#ef4444' },
            { name: 'head.next', idx: nextIdx, color: '#8b5cf6' },
          ]
        ),
        variables: { head: node.value, newHead: newHeadIdx !== null ? allNodes[newHeadIdx].value : 'null' },
      });

      // Reverse the pointer
      nextPointers[nextIdx] = nodeIdx;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Pointer reversed! Now set ${node.value}.next = null`,
        lineNumber: 8,
        visualizationData: createVisualization(
          [nodeIdx],
          [
            { name: 'head', idx: nodeIdx, color: '#ef4444' },
          ]
        ),
        variables: { head: node.value, newHead: newHeadIdx !== null ? allNodes[newHeadIdx].value : 'null' },
      });

      // Set current node's next to null
      nextPointers[nodeIdx] = null;

      steps.push({
        id: `step-${stepId++}`,
        type: 'return',
        description: `Done with ${node.value}, returning newHead`,
        lineNumber: 10,
        visualizationData: createVisualization(
          [],
          []
        ),
        variables: { head: node.value, returning: newHeadIdx !== null ? allNodes[newHeadIdx].value : 'null' },
      });

      // Pop current call from stack before returning
      callStack.pop();
      return newHeadIdx;
    };

    const resultIdx = reverseRecursive(0);
    const result = resultIdx !== null ? allNodes[resultIdx] : null;

    // Final step
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Reversal complete! All pointers reversed.',
      lineNumber: 10,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'Reversed Linked List',
            head: result,
            highlightedNodes: result ? [result.id] : [],
            pointers: result ? [{ name: 'newHead', nodeId: result.id, color: '#10b981' }] : [],
          },
        ],
        stack: [],
        custom: {
          allNodes: allNodes.map((node, i) => ({
            ...node,
            next: nextPointers[i] !== null ? allNodes[nextPointers[i]!] : null,
          })),
          nextPointers: [...nextPointers],
        },
        annotations: [
          {
            text: '✓ List successfully reversed',
            position: { x: 50, y: 10 },
            style: 'success',
          },
        ],
      },
      variables: { result: result?.value ?? 'null' },
    });

    return { steps, result };
  },
};
