import { ProblemMetadata } from '../../core/types';

export const VALID_ANAGRAM_METADATA: ProblemMetadata = {
  id: 'valid-anagram',
  title: 'Valid Anagram',
  leetcodeNumber: 242,
  difficulty: 'easy',
  category: 'strings',
  tags: ['String', 'Hash Map'],
  description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
  examples: [
    {
      input: { s: 'anagram', t: 'nagaram' },
      output: true,
      explanation: 'Both strings contain the same characters with the same frequencies.',
    },
    {
      input: { s: 'rat', t: 'car' },
      output: false,
      explanation: 'The strings have different characters.',
    },
    {
      input: { s: 'listen', t: 'silent' },
      output: true,
      explanation: 'Both strings are anagrams of each other.',
    },
  ],
  constraints: [
    '1 <= s.length, t.length <= 5 * 10^4',
    's and t consist of lowercase English letters',
  ],
};
