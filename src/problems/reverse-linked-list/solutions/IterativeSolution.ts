import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { ReverseLinkedListInput } from '../types';

export const IterativeSolution: Solution<ReverseLinkedListInput, ListNode | null> = {
  id: 'iterative',
  name: 'Iterative',
  description: 'Reverse the linked list iteratively using three pointers',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',

  code: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  let next: ListNode | null = null;

  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  ListNode prev = null;                     // Line 2
  ListNode curr = head;
  ListNode next = null;
                                            // Line 5
  while (curr != null) {                    // Line 6
    next = curr.next;                       // Line 7
    curr.next = prev;                       // Line 8
    prev = curr;                            // Line 9
    curr = next;                            // Line 10
  }
                                            // Line 12
  return prev;                              // Line 13
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  ListNode prev = null;                     // Line 2
  ListNode curr = head;
  ListNode next = null;
                                            // Line 5
  while (curr != null) {                    // Line 6
    next = curr.next;                       // Line 7
    curr.next = prev;                       // Line 8
    prev = curr;                            // Line 9
    curr = next;                            // Line 10
  }
                                            // Line 12
  return prev;                              // Line 13
}`,
    },
  ],

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
        },
        variables: { prev: 'null', curr: 'null', next: 'null' },
      });
      return { steps, result: null };
    }

    // Track next pointers for each node (using node index)
    const nextPointers: (number | null)[] = allNodes.map((_, i) => i < allNodes.length - 1 ? i + 1 : null);

    // Helper to create visualization with current pointer state
    const createVisualization = (
      prevIdx: number | null,
      currIdx: number | null,
      nextIdx: number | null,
      highlightedIndices: number[] = []
    ) => {
      const pointers = [];
      if (prevIdx !== null) {
        pointers.push({ name: 'prev', nodeId: allNodes[prevIdx].id, color: '#f59e0b' });
      }
      if (currIdx !== null) {
        pointers.push({ name: 'curr', nodeId: allNodes[currIdx].id, color: '#ef4444' });
      }
      if (nextIdx !== null) {
        pointers.push({ name: 'next', nodeId: allNodes[nextIdx].id, color: '#10b981' });
      }

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
        custom: {
          allNodes: allNodes.map((node, i) => ({
            ...node,
            next: nextPointers[i] !== null ? allNodes[nextPointers[i]!] : null,
          })),
          nextPointers: [...nextPointers],
        },
      };
    };

    let prevIdx: number | null = null;
    let currIdx: number | null = 0;
    let nextIdx: number | null = null;

    // Step 1: Initialization
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize prev = null, curr = head, next = null',
      lineNumber: 2,
      visualizationData: createVisualization(prevIdx, currIdx, nextIdx, [0]),
      variables: { 
        prev: 'null', 
        curr: allNodes[0].value, 
        next: 'null' 
      },
    });

    // Iteration steps
    while (currIdx !== null) {
      const currNode = allNodes[currIdx];
      
      // Step: Save next node
      nextIdx = nextPointers[currIdx];
      
      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Save next node: next = curr.next${nextIdx !== null ? ` (${allNodes[nextIdx].value})` : ' (null)'}`,
        lineNumber: 7,
        visualizationData: createVisualization(
          prevIdx, 
          currIdx, 
          nextIdx, 
          [currIdx, ...(nextIdx !== null ? [nextIdx] : [])]
        ),
        variables: { 
          prev: prevIdx !== null ? allNodes[prevIdx].value : 'null', 
          curr: currNode.value, 
          next: nextIdx !== null ? allNodes[nextIdx].value : 'null' 
        },
      });

      // Step: Reverse the pointer
      nextPointers[currIdx] = prevIdx;
      
      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Reverse pointer: curr.next = prev${prevIdx !== null ? ` (${currNode.value} → ${allNodes[prevIdx].value})` : ` (${currNode.value} → null)`}`,
        lineNumber: 8,
        visualizationData: createVisualization(prevIdx, currIdx, nextIdx, [currIdx]),
        variables: { 
          prev: prevIdx !== null ? allNodes[prevIdx].value : 'null', 
          curr: currNode.value, 
          next: nextIdx !== null ? allNodes[nextIdx].value : 'null' 
        },
      });

      // Step: Move prev forward
      prevIdx = currIdx;
      
      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Move prev forward: prev = curr (${allNodes[prevIdx].value})`,
        lineNumber: 9,
        visualizationData: createVisualization(prevIdx, currIdx, nextIdx, [prevIdx]),
        variables: { 
          prev: allNodes[prevIdx].value, 
          curr: currNode.value, 
          next: nextIdx !== null ? allNodes[nextIdx].value : 'null' 
        },
      });

      // Step: Move curr forward
      currIdx = nextIdx;
      
      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Move curr forward: curr = next${currIdx !== null ? ` (${allNodes[currIdx].value})` : ' (null)'}`,
        lineNumber: 10,
        visualizationData: createVisualization(
          prevIdx, 
          currIdx, 
          nextIdx, 
          currIdx !== null ? [currIdx] : []
        ),
        variables: { 
          prev: allNodes[prevIdx].value, 
          curr: currIdx !== null ? allNodes[currIdx].value : 'null', 
          next: nextIdx !== null ? allNodes[nextIdx].value : 'null' 
        },
      });
    }

    // Final step: Return prev (new head)
    const finalHead = prevIdx !== null ? allNodes[prevIdx] : null;
    
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Reversal complete, returning new head',
      lineNumber: 13,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'Reversed Linked List',
            head: finalHead,
            highlightedNodes: finalHead ? [finalHead.id] : [],
            pointers: finalHead ? [{ name: 'new head', nodeId: finalHead.id, color: '#10b981' }] : [],
          },
        ],
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
      variables: { 
        prev: prevIdx !== null ? allNodes[prevIdx].value : 'null', 
        curr: 'null', 
        next: 'null' 
      },
    });

    return { steps, result: finalHead };
  },
};
