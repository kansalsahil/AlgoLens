import { Solution, SolutionExecution, AnimationStep, StackFrame } from '../../../core/types';
import { ValidParenthesesInput } from '../types';

export const StackSolution: Solution<ValidParenthesesInput, boolean> = {
  id: 'stack',
  name: 'Stack (Optimal)',
  description: 'Use a stack to track opening brackets and match with closing brackets in O(n) time.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    if (char in map) {
      // Closing bracket
      if (stack.length === 0 || stack[stack.length - 1] !== map[char]) {
        return false;
      }
      stack.pop();
    } else {
      // Opening bracket
      stack.push(char);
    }
  }

  return stack.length === 0;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  Stack<Character> stack = new Stack<>();
  Map<Character, Character> map = new HashMap<>();
  map.put(')', '(');
  map.put(']', '[');
  map.put('}', '{');

  for (char c : s.toCharArray()) {
    if (map.containsKey(c)) {
      // Closing bracket
      if (stack.isEmpty() || stack.peek() != map.get(c)) {
        return false;
      }
      stack.pop();
    } else {
      // Opening bracket
      stack.push(c);
    }
  }

  return stack.isEmpty();
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  Stack<char> stack = new Stack<char>();
  Dictionary<char, char> map = new Dictionary<char, char> {
    {')', '('},
    {']', '['},
    {'}', '{'}
  };

  foreach (char c in s) {
    if (map.ContainsKey(c)) {
      // Closing bracket
      if (stack.Count == 0 || stack.Peek() != map[c]) {
        return false;
      }
      stack.Pop();
    } else {
      // Opening bracket
      stack.Push(c);
    }
  }

  return stack.Count == 0;
}`,
    },
  ],
  execute: (input: ValidParenthesesInput): SolutionExecution<boolean> => {
    const { s } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const stack: string[] = [];
    const map: Record<string, string> = {
      ')': '(',
      ']': '[',
      '}': '{'
    };

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: 'Initialize empty stack. Opening brackets will be pushed, closing brackets will pop.',
      lineNumber: 2,
      visualizationData: {
        arrays: [
          {
            id: 's',
            name: 'Input String',
            values: s.split(''),
            highlights: [],
            pointers: [],
          },
        ],
        stack: [],
        custom: {
          map: { ...map },
        },
      },
      variables: {},
    });

    for (let i = 0; i < s.length; i++) {
      const char = s[i];
      const isClosing = char in map;

      if (isClosing) {
        // Closing bracket
        const expected = map[char];
        const stackTop = stack.length > 0 ? stack[stack.length - 1] : null;
        const matches = stackTop === expected;

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Closing bracket '${char}' at index ${i}. ${matches ? `Matches top of stack '${stackTop}'.` : stackTop ? `Doesn't match top of stack '${stackTop}'.` : 'Stack is empty!'}`,
          lineNumber: 12,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'Input String',
                values: s.split(''),
                highlights: [i],
                pointers: [{ name: 'i', index: i, color: '#ef4444' }],
              },
            ],
            stack: stack.map((bracket) => ({
              functionName: bracket,
              parameters: { index: s.lastIndexOf(bracket, i) },
            })) as StackFrame[],
            custom: {
              map: { ...map },
              currentChar: char,
              currentIndex: i,
              isClosing: true,
              expected,
              stackTop,
              matches,
            },
          },
          variables: { i, char, matches },
        });

        if (!matches) {
          steps.push({
            id: `step-${stepId++}`,
            type: 'return',
            description: `Mismatch! Expected '${expected}' but ${stackTop ? `got '${stackTop}'` : 'stack is empty'}. Return false.`,
            lineNumber: 13,
            visualizationData: {
              arrays: [
                {
                  id: 's',
                  name: 'Input String',
                  values: s.split(''),
                  highlights: [i],
                  pointers: [{ name: 'i', index: i, color: '#ef4444' }],
                },
              ],
              stack: stack.map((bracket) => ({
                functionName: bracket,
                parameters: { index: s.lastIndexOf(bracket, i) },
              })) as StackFrame[],
              custom: {
                map: { ...map },
                currentChar: char,
                currentIndex: i,
                mismatch: true,
                result: false,
              },
            },
            variables: { result: false },
          });

          return { steps, result: false };
        }

        stack.pop();

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Pop '${expected}' from stack. Match successful.`,
          lineNumber: 15,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'Input String',
                values: s.split(''),
                highlights: [],
                pointers: [],
              },
            ],
            stack: stack.map((bracket) => ({
              functionName: bracket,
              parameters: { index: s.lastIndexOf(bracket, i) },
            })) as StackFrame[],
            custom: {
              map: { ...map },
              currentChar: char,
              currentIndex: i,
              popped: expected,
              stackSize: stack.length,
            },
          },
          variables: { i },
        });
      } else {
        // Opening bracket
        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Opening bracket '${char}' at index ${i}. Push to stack.`,
          lineNumber: 18,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'Input String',
                values: s.split(''),
                highlights: [i],
                pointers: [{ name: 'i', index: i, color: '#3b82f6' }],
              },
            ],
            stack: stack.map((bracket) => ({
              functionName: bracket,
              parameters: { index: s.lastIndexOf(bracket, i) },
            })) as StackFrame[],
            custom: {
              map: { ...map },
              currentChar: char,
              currentIndex: i,
              isOpening: true,
              pushing: true,
            },
          },
          variables: { i, char },
        });

        stack.push(char);

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Pushed '${char}' to stack. Stack size: ${stack.length}`,
          lineNumber: 18,
          visualizationData: {
            arrays: [
              {
                id: 's',
                name: 'Input String',
                values: s.split(''),
                highlights: [],
                pointers: [],
              },
            ],
            stack: stack.map((bracket) => ({
              functionName: bracket,
              parameters: { index: i },
            })) as StackFrame[],
            custom: {
              map: { ...map },
              currentChar: char,
              currentIndex: i,
              pushed: true,
              stackSize: stack.length,
            },
          },
          variables: { i },
        });
      }
    }

    // Check if stack is empty
    const result = stack.length === 0;

    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: result
        ? 'Processed all characters. Stack is empty. All brackets matched. Return true.'
        : `Processed all characters. Stack still has ${stack.length} unmatched bracket(s). Return false.`,
      lineNumber: 22,
      visualizationData: {
        arrays: [
          {
            id: 's',
            name: 'Input String',
            values: s.split(''),
            highlights: [],
            pointers: [],
          },
        ],
        stack: stack.map((bracket) => ({
          functionName: bracket,
          parameters: {},
        })) as StackFrame[],
        custom: {
          map: { ...map },
          result,
          stackSize: stack.length,
          unmatchedBrackets: result ? undefined : [...stack],
        },
      },
      variables: { result },
    });

    return { steps, result };
  },
};
