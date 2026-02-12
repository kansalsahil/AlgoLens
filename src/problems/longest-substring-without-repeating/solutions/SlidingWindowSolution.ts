import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { LongestSubstringInput } from '../types';

export const SlidingWindowSolution: Solution<LongestSubstringInput, number> = {
  id: 'sliding-window',
  name: 'Sliding Window (Optimal)',
  description: 'Use a sliding window with two pointers (left and right) and a Set/Map to track characters in the current window. When a duplicate is found, shrink the window from the left until the duplicate is removed. This achieves O(n) time complexity.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(min(n, m))',
  code: `function lengthOfLongestSubstring(s: string): number {
  const charMap = new Map<string, number>(); // char -> last seen index
  let maxLength = 0;
  let left = 0;

  // Expand window with right pointer
  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If char is in map and within current window, move left pointer
    if (charMap.has(char) && charMap.get(char)! >= left) {
      left = charMap.get(char)! + 1;
    }

    // Update char's last seen index
    charMap.set(char, right);

    // Update max length
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (s == null || s.length() == 0) return 0;            // Line 2
                                                          // Line 3
  Map<Character, Integer> charMap = new HashMap<>();     // Line 4
  int maxLength = 0;                                      // Line 5
  int left = 0;                                           // Line 6
                                                          // Line 7
  // Expand window with right pointer                    // Line 8
  for (int right = 0; right < s.length(); right++) {     // Line 9
    char c = s.charAt(right);                             // Line 10
                                                          // Line 11
    // If char is in map and within current window       // Line 12
    if (charMap.containsKey(c) && charMap.get(c) >= left) {  // Line 13
      left = charMap.get(c) + 1;                          // Line 14
    }
                                                          // Line 16
    // Update char's last seen index                     // Line 17
    charMap.put(c, right);                                // Line 18
                                                          // Line 19
    // Update max length                                 // Line 20
    maxLength = Math.max(maxLength, right - left + 1);   // Line 21
  }
                                                          // Line 23
  return maxLength;                                       // Line 24
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (s == null || s.Length == 0) return 0;              // Line 2
                                                          // Line 3
  Dictionary<char, int> charMap = new Dictionary<char, int>();  // Line 4
  int maxLength = 0;                                      // Line 5
  int left = 0;                                           // Line 6
                                                          // Line 7
  // Expand window with right pointer                    // Line 8
  for (int right = 0; right < s.Length; right++) {       // Line 9
    char c = s[right];                                    // Line 10
                                                          // Line 11
    // If char is in map and within current window       // Line 12
    if (charMap.ContainsKey(c) && charMap[c] >= left) {  // Line 13
      left = charMap[c] + 1;                              // Line 14
    }
                                                          // Line 16
    // Update char's last seen index                     // Line 17
    charMap[c] = right;                                   // Line 18
                                                          // Line 19
    // Update max length                                 // Line 20
    maxLength = Math.Max(maxLength, right - left + 1);   // Line 21
  }
                                                          // Line 23
  return maxLength;                                       // Line 24
}`,
    },
  ],

  execute: (input: LongestSubstringInput): SolutionExecution<number> => {
    const { s } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;
    const charMap = new Map<string, number>();
    let maxLength = 0;
    let left = 0;
    let bestLeft = -1;
    let bestRight = -1;

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Initialize sliding window: left = 0, maxLength = 0, and empty character map. We'll expand the window with the right pointer.`,
      lineNumber: 4,
      visualizationData: {
        arrays: [],
        custom: {
          string: s,
          chars: s.split(''),
          left: 0,
          right: -1,
          maxLength: 0,
          currentLength: 0,
          charMap: {},
          charSet: [],
          currentSubstring: '',
          bestLeft: -1,
          bestRight: -1,
          bestSubstring: '',
        },
      },
      variables: { left: 0, maxLength: 0 },
    });

    // Expand window with right pointer
    for (let right = 0; right < s.length; right++) {
      const char = s[right];
      const oldLeft = left;

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Move right pointer to index ${right}, character '${char}'`,
        lineNumber: 9,
        visualizationData: {
          arrays: [],
          custom: {
            string: s,
            chars: s.split(''),
            left,
            right,
            maxLength,
            currentLength: right - left,
            charMap: Object.fromEntries(charMap),
            charSet: Array.from(charMap.keys()),
            currentSubstring: s.substring(left, right),
            bestLeft,
            bestRight,
            bestSubstring: bestLeft >= 0 ? s.substring(bestLeft, bestRight + 1) : '',
            expandingRight: true,
          },
        },
        variables: { right, char, left, maxLength },
      });

      // Check if char is already in current window
      if (charMap.has(char) && charMap.get(char)! >= left) {
        const duplicateIndex = charMap.get(char)!;
        left = duplicateIndex + 1;

        steps.push({
          id: `step-${stepId++}`,
          type: 'assignment',
          description: `Duplicate '${char}' found! (previously at index ${duplicateIndex}). Move left pointer from ${oldLeft} to ${left} to exclude duplicate.`,
          lineNumber: 14,
          visualizationData: {
            arrays: [],
            custom: {
              string: s,
              chars: s.split(''),
              left,
              right,
              maxLength,
              currentLength: right - left,
              charMap: Object.fromEntries(charMap),
              charSet: Array.from(charMap.keys()).filter(c => {
                const idx = charMap.get(c)!;
                return idx >= left && idx <= right;
              }),
              currentSubstring: s.substring(left, right),
              bestLeft,
              bestRight,
              bestSubstring: bestLeft >= 0 ? s.substring(bestLeft, bestRight + 1) : '',
              duplicateFound: true,
              duplicateChar: char,
              duplicateIndex,
              oldLeft,
            },
          },
          variables: { left, duplicateIndex },
        });
      }

      // Update char's last seen index
      charMap.set(char, right);

      // Get current window characters (only those in current window range)
      const currentWindowChars = Array.from(charMap.entries())
        .filter(([, idx]) => idx >= left && idx <= right)
        .map(([c]) => c);

      const currentLength = right - left + 1;
      const currentSubstring = s.substring(left, right + 1);

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Add '${char}' to window at index ${right}. Current window: "${currentSubstring}" (length ${currentLength})`,
        lineNumber: 18,
        visualizationData: {
          arrays: [],
          custom: {
            string: s,
            chars: s.split(''),
            left,
            right,
            maxLength,
            currentLength,
            charMap: Object.fromEntries(charMap),
            charSet: currentWindowChars,
            currentSubstring,
            bestLeft,
            bestRight,
            bestSubstring: bestLeft >= 0 ? s.substring(bestLeft, bestRight + 1) : '',
            addedChar: char,
          },
        },
        variables: { charMap: Object.fromEntries(charMap), currentLength },
      });

      // Update max length
      const oldMaxLength = maxLength;
      maxLength = Math.max(maxLength, currentLength);

      if (maxLength > oldMaxLength) {
        bestLeft = left;
        bestRight = right;

        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `New longest substring found! "${currentSubstring}" has length ${maxLength}`,
          lineNumber: 21,
          visualizationData: {
            arrays: [],
            custom: {
              string: s,
              chars: s.split(''),
              left,
              right,
              maxLength,
              currentLength,
              charMap: Object.fromEntries(charMap),
              charSet: currentWindowChars,
              currentSubstring,
              bestLeft,
              bestRight,
              bestSubstring: currentSubstring,
              newMaxFound: true,
            },
          },
          variables: { maxLength, bestLeft, bestRight },
        });
      } else {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Current length ${currentLength} <= max length ${maxLength}. No update needed.`,
          lineNumber: 21,
          visualizationData: {
            arrays: [],
            custom: {
              string: s,
              chars: s.split(''),
              left,
              right,
              maxLength,
              currentLength,
              charMap: Object.fromEntries(charMap),
              charSet: currentWindowChars,
              currentSubstring,
              bestLeft,
              bestRight,
              bestSubstring: bestLeft >= 0 ? s.substring(bestLeft, bestRight + 1) : '',
            },
          },
          variables: { currentLength, maxLength },
        });
      }
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: bestLeft >= 0
        ? `Longest substring without repeating characters: "${s.substring(bestLeft, bestRight + 1)}" with length ${maxLength}`
        : `Empty string, length = 0`,
      lineNumber: 24,
      visualizationData: {
        arrays: [],
        custom: {
          string: s,
          chars: s.split(''),
          maxLength,
          bestLeft,
          bestRight,
          bestSubstring: bestLeft >= 0 ? s.substring(bestLeft, bestRight + 1) : '',
          complete: true,
        },
      },
      variables: { result: maxLength },
    });

    return { steps, result: maxLength };
  },
};
