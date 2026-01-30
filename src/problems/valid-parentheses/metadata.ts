import { ProblemMetadata } from '../../core/types';

export const VALID_PARENTHESES_METADATA: ProblemMetadata = {
  id: 'valid-parentheses',
  title: 'Valid Parentheses',
  leetcodeNumber: 20,
  difficulty: 'easy',
  category: 'stack',
  tags: ['String', 'Stack'],
  description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
  examples: [
    {
      input: { s: '{[()()]}' },
      output: true,
      explanation: 'Complex nesting with multiple pairs at same level - shows stack building and unwinding.',
    },
    {
      input: { s: '([{}])' },
      output: true,
      explanation: 'Multiple levels of nesting with proper closure.',
    },
    {
      input: { s: '{[()({{}})]()}' },
      output: true,
      explanation: 'Very complex deeply nested brackets with multiple types.',
    },
    {
      input: { s: '()[]{}' },
      output: true,
      explanation: 'All types of brackets properly matched in sequence.',
    },
    {
      input: { s: '([)]' },
      output: false,
      explanation: 'Brackets are not closed in correct order - ( opens, [ opens, ) closes, ] closes is wrong.',
    },
    {
      input: { s: '(]' },
      output: false,
      explanation: 'Mismatched bracket types.',
    },
    {
      input: { s: '(((' },
      output: false,
      explanation: 'Unmatched opening brackets - stack will not be empty.',
    },
    {
      input: { s: '()' },
      output: true,
      explanation: 'Simple matching parentheses.',
    },
  ],
  constraints: [
    '1 <= s.length <= 10^4',
    's consists of parentheses only \'()[]{}\'',
  ],
};
