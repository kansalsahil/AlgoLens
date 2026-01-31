import { Solution, AnimationStep, SolutionExecution, ListNode } from '../../../core/types';
import { LinkedListCycleInput } from '../types';

export const HashSetSolution: Solution<LinkedListCycleInput, boolean> = {
  id: 'hash-set',
  name: 'Hash Set',
  description: 'Detect cycle using a hash set to track visited nodes',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',

  code: `function hasCycle(head: ListNode | null): boolean {
  const visited = new Set<ListNode>();
  let current = head;

  while (current !== null) {
    if (visited.has(current)) {
      return true;
    }
    visited.add(current);
    current = current.next;
  }

  return false;
}`,

  execute: (input: LinkedListCycleInput): SolutionExecution<boolean> => {
    const steps: AnimationStep[] = [];
    let stepId = 0;

    const { head, pos } = input;
    const visited = new Set<string>();
    let current = head;
    let stepCount = 0;
    const maxSteps = 20; // Prevent infinite loops in visualization

    // Collect all nodes for visualization (handle cycles carefully)
    const allNodes: ListNode[] = [];
    const nodeIds = new Set<string>();
    let temp = head;
    let cycleDetected = false;

    while (temp && !nodeIds.has(temp.id)) {
      allNodes.push(temp);
      nodeIds.add(temp.id);
      temp = temp.next || null;
    }

    // Step 1: Initialization
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize visited set and current pointer',
      lineNumber: 2,
      visualizationData: {
        linkedLists: [
          {
            id: 'list',
            name: 'Linked List',
            head: head,
            highlightedNodes: current ? [current.id] : [],
            pointers: current ? [{ name: 'current', nodeId: current.id, color: '#3b82f6' }] : [],
          },
        ],
        custom: {
          visited: Array.from(visited),
          hasCycle: pos >= 0,
          cyclePos: pos,
        },
      },
      variables: {
        current: current ? current.value : 'null',
        visited: '{}',
      },
    });

    // Iteration
    while (current !== null && stepCount < maxSteps) {
      stepCount++;

      // Check if current node is in visited set
      const isVisited = visited.has(current.id);

      steps.push({
        id: `step-${stepId++}`,
        type: 'comparison',
        description: isVisited
          ? `Node ${current.value} already visited - cycle detected!`
          : `Check if node ${current.value} is visited`,
        lineNumber: 5,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Linked List',
              head: head,
              highlightedNodes: [current.id],
              pointers: [{ name: 'current', nodeId: current.id, color: isVisited ? '#ef4444' : '#3b82f6' }],
            },
          ],
          custom: {
            visited: Array.from(visited),
            hasCycle: pos >= 0,
            cyclePos: pos,
          },
        },
        variables: {
          current: current.value,
          visited: `{${Array.from(visited).join(', ')}}`,
        },
      });

      if (isVisited) {
        // Cycle detected
        steps.push({
          id: `step-${stepId++}`,
          type: 'return',
          description: 'Cycle detected! Return true',
          lineNumber: 6,
          visualizationData: {
            linkedLists: [
              {
                id: 'list',
                name: 'Linked List',
                head: head,
                highlightedNodes: [current.id],
                pointers: [{ name: 'cycle', nodeId: current.id, color: '#ef4444' }],
              },
            ],
            custom: {
              visited: Array.from(visited),
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
            current: current.value,
            visited: `{${Array.from(visited).join(', ')}}`,
            result: 'true',
          },
        });
        return { steps, result: true };
      }

      // Add current to visited set
      visited.add(current.id);

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Add node ${current.value} to visited set`,
        lineNumber: 8,
        visualizationData: {
          linkedLists: [
            {
              id: 'list',
              name: 'Linked List',
              head: head,
              highlightedNodes: [current.id],
              pointers: [{ name: 'current', nodeId: current.id, color: '#10b981' }],
            },
          ],
          custom: {
            visited: Array.from(visited),
            hasCycle: pos >= 0,
            cyclePos: pos,
          },
        },
        variables: {
          current: current.value,
          visited: `{${Array.from(visited).join(', ')}}`,
        },
      });

      // Move to next node
      const nextNode = current.next;
      current = nextNode || null;

      if (current) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `Move to next node (${current.value})`,
          lineNumber: 9,
          visualizationData: {
            linkedLists: [
              {
                id: 'list',
                name: 'Linked List',
                head: head,
                highlightedNodes: [current.id],
                pointers: [{ name: 'current', nodeId: current.id, color: '#3b82f6' }],
              },
            ],
            custom: {
              visited: Array.from(visited),
              hasCycle: pos >= 0,
              cyclePos: pos,
            },
          },
          variables: {
            current: current.value,
            visited: `{${Array.from(visited).join(', ')}}`,
          },
        });
      }
    }

    // No cycle found
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: 'Reached end of list, no cycle detected. Return false',
      lineNumber: 12,
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
          visited: Array.from(visited),
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
        current: 'null',
        visited: `{${Array.from(visited).join(', ')}}`,
        result: 'false',
      },
    });

    return { steps, result: false };
  },
};
