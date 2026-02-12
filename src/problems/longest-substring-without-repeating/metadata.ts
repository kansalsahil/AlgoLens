import { ProblemTag } from '../../core/types';

export const LONGEST_SUBSTRING_METADATA = {
  id: 'longest-substring-without-repeating',
  title: 'Longest Substring Without Repeating Characters',
  difficulty: 'medium' as const,
  category: 'String',
  tags: ['String', 'Hash Table', 'Sliding Window', 'Two Pointers'] as ProblemTag[],
  description: `Given a string s, find the length of the longest substring without repeating characters.

A substring is a contiguous sequence of characters within a string.`,
  examples: [
    {
      input: { s: 'abcabcbb' },
      output: 3,
      explanation: 'The answer is "abc", with the length of 3.',
    },
    {
      input: { s: 'bbbbb' },
      output: 1,
      explanation: 'The answer is "b", with the length of 1.',
    },
    {
      input: { s: 'pwwkew' },
      output: 3,
      explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.',
    },
    {
      input: { s: 'abcdef' },
      output: 6,
      explanation: 'The entire string "abcdef" has no repeating characters, so the length is 6.',
    },
    {
      input: { s: '' },
      output: 0,
      explanation: 'Empty string has length 0.',
    },
  ],
  constraints: [
    '0 <= s.length <= 5 * 10^4',
    's consists of English letters, digits, symbols and spaces.',
  ],
  followUp: 'Can you solve this in O(n) time complexity?',
};
