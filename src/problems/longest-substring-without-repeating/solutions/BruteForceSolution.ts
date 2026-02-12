import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { LongestSubstringInput } from '../types';

export const BruteForceSolution: Solution<LongestSubstringInput, number> = {
  id: 'brute-force',
  name: 'Brute Force',
  description: 'Check all possible substrings and track the longest one without repeating characters. For each starting position, expand the substring until a duplicate is found.',
  timeComplexity: 'O(n³)',
  spaceComplexity: 'O(min(n, m))',
  code: `function lengthOfLongestSubstring(s: string): number {
  let maxLength = 0;

  // Try all possible starting positions
  for (let start = 0; start < s.length; start++) {
    // For each start, try all possible ending positions
    for (let end = start; end < s.length; end++) {
      // Check if substring from start to end has all unique characters
      const substring = s.substring(start, end + 1);
      if (hasUniqueCharacters(substring)) {
        maxLength = Math.max(maxLength, substring.length);
      } else {
        break; // No point checking longer substrings from this start
      }
    }
  }

  return maxLength;
}

function hasUniqueCharacters(str: string): boolean {
  const seen = new Set<string>();
  for (const char of str) {
    if (seen.has(char)) return false;
    seen.add(char);
  }
  return true;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (s == null || s.length() == 0) return 0;            // Line 2
                                                          // Line 3
  int maxLength = 0;                                      // Line 4
                                                          // Line 5
  // Try all possible starting positions                 // Line 6
  for (int start = 0; start < s.length(); start++) {     // Line 7
    // For each start, try all possible ending positions // Line 8
    for (int end = start; end < s.length(); end++) {     // Line 9
      // Check if substring has all unique characters    // Line 10
      String substring = s.substring(start, end + 1);    // Line 11
      if (hasUniqueCharacters(substring)) {              // Line 12
        maxLength = Math.max(maxLength, substring.length());  // Line 13
      } else {                                            // Line 14
        break; // No point checking longer substrings    // Line 15
      }
    }
  }
                                                          // Line 19
  return maxLength;                                       // Line 20
}                                                         // Line 21
                                                          // Line 22
private boolean hasUniqueCharacters(String str) {        // Line 23
  Set<Character> seen = new HashSet<>();                 // Line 24
  for (char c : str.toCharArray()) {                     // Line 25
    if (seen.contains(c)) return false;                  // Line 26
    seen.add(c);                                          // Line 27
  }
  return true;                                            // Line 29
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (s == null || s.Length == 0) return 0;              // Line 2
                                                          // Line 3
  int maxLength = 0;                                      // Line 4
                                                          // Line 5
  // Try all possible starting positions                 // Line 6
  for (int start = 0; start < s.Length; start++) {       // Line 7
    // For each start, try all possible ending positions // Line 8
    for (int end = start; end < s.Length; end++) {       // Line 9
      // Check if substring has all unique characters    // Line 10
      string substring = s.Substring(start, end - start + 1);  // Line 11
      if (HasUniqueCharacters(substring)) {              // Line 12
        maxLength = Math.Max(maxLength, substring.Length);     // Line 13
      } else {                                            // Line 14
        break; // No point checking longer substrings    // Line 15
      }
    }
  }
                                                          // Line 19
  return maxLength;                                       // Line 20
}                                                         // Line 21
                                                          // Line 22
private bool HasUniqueCharacters(string str) {           // Line 23
  HashSet<char> seen = new HashSet<char>();              // Line 24
  foreach (char c in str) {                              // Line 25
    if (seen.Contains(c)) return false;                  // Line 26
    seen.Add(c);                                          // Line 27
  }
  return true;                                            // Line 29
}`,
    },
  ],

  execute: (input: LongestSubstringInput): SolutionExecution<number> => {
    const { s } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    let maxLength = 0;
    let bestStart = -1;
    let bestEnd = -1;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize maxLength = 0. We'll check all possible substrings of "${s}".`,
      lineNumber: 4,
      visualizationData: {
        arrays: [],
        custom: {
          string: s,
          chars: s.split(''),
          maxLength: 0,
          currentStart: -1,
          currentEnd: -1,
          currentSubstring: '',
          charSet: [],
          bestStart: -1,
          bestEnd: -1,
          bestSubstring: '',
        },
      },
      variables: { maxLength: 0 },
    });

    // Try all possible starting positions
    for (let start = 0; start < s.length; start++) {
      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Start new substring search from index ${start} (character '${s[start]}')`,
        lineNumber: 7,
        visualizationData: {
          arrays: [],
          custom: {
            string: s,
            chars: s.split(''),
            maxLength,
            currentStart: start,
            currentEnd: start - 1,
            currentSubstring: '',
            charSet: [],
            bestStart,
            bestEnd,
            bestSubstring: bestStart >= 0 ? s.substring(bestStart, bestEnd + 1) : '',
            highlightStart: true,
          },
        },
        variables: { start, maxLength },
      });

      // For each start, try all possible ending positions
      for (let end = start; end < s.length; end++) {
        const substring = s.substring(start, end + 1);
        const charSet = new Set(substring);
        const hasUnique = charSet.size === substring.length;

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Check substring "${substring}" (indices ${start}..${end}). ${
            hasUnique
              ? `All characters unique! Length = ${substring.length}`
              : `Duplicate character '${s[end]}' found! Stop extending from this start.`
          }`,
          lineNumber: hasUnique ? 12 : 15,
          visualizationData: {
            arrays: [],
            custom: {
              string: s,
              chars: s.split(''),
              maxLength,
              currentStart: start,
              currentEnd: end,
              currentSubstring: substring,
              charSet: Array.from(charSet),
              bestStart,
              bestEnd,
              bestSubstring: bestStart >= 0 ? s.substring(bestStart, bestEnd + 1) : '',
              checking: true,
              hasDuplicate: !hasUnique,
              duplicateChar: !hasUnique ? s[end] : null,
            },
          },
          variables: { start, end, substring, hasUnique },
        });

        if (!hasUnique) {
          break; // No point checking longer substrings from this start
        }

        // Update maxLength if current substring is longer
        if (substring.length > maxLength) {
          maxLength = substring.length;
          bestStart = start;
          bestEnd = end;

          steps.push({
            id: `step-${stepId++}`,
            type: 'assignment',
            description: `New longest substring found! "${substring}" has length ${maxLength}`,
            lineNumber: 13,
            visualizationData: {
              arrays: [],
              custom: {
                string: s,
                chars: s.split(''),
                maxLength,
                currentStart: start,
                currentEnd: end,
                currentSubstring: substring,
                charSet: Array.from(charSet),
                bestStart,
                bestEnd,
                bestSubstring: substring,
                newMaxFound: true,
              },
            },
            variables: { maxLength, bestStart, bestEnd },
          });
        }
      }
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: bestStart >= 0
        ? `Longest substring: "${s.substring(bestStart, bestEnd + 1)}" with length ${maxLength}`
        : `Empty string, length = 0`,
      lineNumber: 20,
      visualizationData: {
        arrays: [],
        custom: {
          string: s,
          chars: s.split(''),
          maxLength,
          bestStart,
          bestEnd,
          bestSubstring: bestStart >= 0 ? s.substring(bestStart, bestEnd + 1) : '',
          complete: true,
        },
      },
      variables: { result: maxLength },
    });

    return { steps, result: maxLength };
  },
};
