import { ProblemMetadata } from '../../core/types';

export const GROUP_ANAGRAMS_METADATA: ProblemMetadata = {
  id: 'group-anagrams',
  title: 'Group Anagrams',
  leetcodeNumber: 49,
  difficulty: 'medium',
  category: 'strings',
  tags: ['String', 'Hash Map'],
  description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
  examples: [
    {
      input: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] },
      output: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']],
      explanation: 'The strings are grouped by their anagrams. Note that the order of groups and strings within groups does not matter.',
    },
    {
      input: { strs: [''] },
      output: [['']],
      explanation: 'Single empty string forms one group.',
    },
    {
      input: { strs: ['a'] },
      output: [['a']],
      explanation: 'Single character forms one group.',
    },
  ],
  constraints: [
    '1 <= strs.length <= 10^4',
    '0 <= strs[i].length <= 100',
    'strs[i] consists of lowercase English letters',
  ],
};
