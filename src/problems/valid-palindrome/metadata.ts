import { ProblemMetadata } from '../../core/types';

export const VALID_PALINDROME_METADATA: ProblemMetadata = {
  id: 'valid-palindrome',
  title: 'Valid Palindrome',
  leetcodeNumber: 125,
  difficulty: 'easy',
  category: 'two-pointers',
  tags: ['Two Pointers', 'String'],
  description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
  examples: [
    {
      input: { s: 'A man, a plan, a canal: Panama' },
      output: true,
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    {
      input: { s: 'race a car' },
      output: false,
      explanation: '"raceacar" is not a palindrome.',
    },
    {
      input: { s: ' ' },
      output: true,
      explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
    },
    {
      input: { s: '0P' },
      output: false,
      explanation: '"0p" is not a palindrome.',
    },
    {
      input: { s: 'ab_a' },
      output: true,
      explanation: '"aba" is a palindrome after removing non-alphanumeric characters.',
    },
  ],
  constraints: [
    '1 <= s.length <= 2 * 10^5',
    's consists only of printable ASCII characters',
  ],
};
