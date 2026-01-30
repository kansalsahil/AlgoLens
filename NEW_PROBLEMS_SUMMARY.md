# New Problems Added: Contains Duplicate & Valid Anagram

## Summary

Successfully added two new LeetCode problems with both brute force and optimal solutions, complete with step-by-step visualizations.

---

## Problem 1: Contains Duplicate (LeetCode #217)

**Difficulty**: Easy
**Category**: Arrays
**Tags**: Array, Hash Map

### Description
Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

### Solutions Implemented

#### 1. Brute Force (Nested Loops)
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Approach**: Compare each element with every other element using nested loops
- **Visualization**: Shows both loop pointers (i, j) and comparison counts

#### 2. Hash Set (Optimal)
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)
- **Approach**: Use a Set to track seen values in a single pass
- **Visualization**: Shows the set contents and highlights when duplicates are found

### Files Created
```
src/problems/contains-duplicate/
├── index.ts
├── metadata.ts
├── types.ts
├── solutions/
│   ├── index.ts
│   ├── BruteForceSolution.ts
│   └── HashSetSolution.ts
└── visualizers/
    ├── index.ts
    └── ContainsDuplicateVisualizer.tsx
```

### Examples
```typescript
Input: nums = [1, 2, 3, 1]
Output: true
Explanation: The element 1 appears at indices 0 and 3.

Input: nums = [1, 2, 3, 4]
Output: false
Explanation: All elements are distinct.

Input: nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
Output: true
Explanation: Multiple elements appear more than once.
```

---

## Problem 2: Valid Anagram (LeetCode #242)

**Difficulty**: Easy
**Category**: Strings
**Tags**: String, Hash Map

### Description
Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Solutions Implemented

#### 1. Sorting Approach
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(1) or O(n) depending on sorting algorithm
- **Approach**: Sort both strings and compare character by character
- **Visualization**: Shows sorted strings and character-by-character comparison

#### 2. Hash Map (Optimal)
- **Time Complexity**: O(n)
- **Space Complexity**: O(1) - at most 26 characters for lowercase English letters
- **Approach**: Count character frequencies using a hash map
- **Visualization**: Shows the character frequency map in real-time with two phases:
  - Phase 1: Count characters in first string
  - Phase 2: Decrement counts using second string

### Files Created
```
src/problems/valid-anagram/
├── index.ts
├── metadata.ts
├── types.ts
├── solutions/
│   ├── index.ts
│   ├── SortingSolution.ts
│   └── HashMapSolution.ts
└── visualizers/
    ├── index.ts
    └── ValidAnagramVisualizer.tsx
```

### Examples
```typescript
Input: s = "anagram", t = "nagaram"
Output: true
Explanation: Both strings contain the same characters with same frequencies.

Input: s = "rat", t = "car"
Output: false
Explanation: The strings have different characters.

Input: s = "listen", t = "silent"
Output: true
Explanation: Both strings are anagrams of each other.
```

---

## Architecture Features

### LeetCode-Style Integration

All problems now include:
- **LeetCode Problem Number**: Added `leetcodeNumber` field to problem metadata
- **Standardized Format**: Consistent with LeetCode problem descriptions
- **Constraints**: LeetCode-style constraint specifications
- **Examples**: Multiple test cases with explanations

### Problem Numbering

| Problem | LeetCode # | Title |
|---------|------------|-------|
| Two Sum | 1 | Two Sum |
| Binary Tree Inorder Traversal | 94 | Binary Tree Inorder Traversal |
| Reverse Linked List | 206 | Reverse Linked List |
| **Contains Duplicate** | **217** | **Contains Duplicate** |
| **Valid Anagram** | **242** | **Valid Anagram** |

### Adapter Pattern Usage

Both new problems use the adapter pattern for decoupled visualizations:

**Contains Duplicate**:
```tsx
<ArrayAdapter array={array} transitionDuration={transitionDuration} />
```

**Valid Anagram**:
```tsx
{arrays.map((array) => (
  <ArrayAdapter key={array.id} array={array} transitionDuration={transitionDuration} />
))}
```

### Visualization Features

Both visualizers include:
- ✅ Algorithm type display (Brute Force vs Optimal)
- ✅ Real-time state visualization (sets, maps, comparisons)
- ✅ Step-by-step explanations
- ✅ Highlighted elements during processing
- ✅ Pointer indicators
- ✅ Color-coded status (success/error)
- ✅ Result display

---

## Key Implementation Details

### Animation Steps

All solutions now properly implement the `AnimationStep` interface:
```typescript
{
  id: `step-${stepId++}`,
  type: 'initialization' | 'iteration' | 'comparison' | 'return',
  description: 'Step description',
  visualizationData: { ... },
  variables: { ... }
}
```

### Step Types Used
- **initialization**: First step explaining algorithm setup
- **iteration**: Loop iterations and phase transitions
- **comparison**: Element comparisons and checks
- **return**: Final result steps

### Custom Visualization Data

**Contains Duplicate - Brute Force**:
```typescript
custom: {
  comparisons: number,
  currentI: number,
  currentJ: number,
  comparing: boolean,
  isMatch: boolean,
  valueI: number,
  valueJ: number,
  result: boolean,
  duplicateIndices: number[],
  duplicateValue: number
}
```

**Contains Duplicate - Hash Set**:
```typescript
custom: {
  set: number[],
  currentValue: number,
  currentIndex: number,
  inSet: boolean,
  adding: boolean,
  lastAdded: number,
  result: boolean
}
```

**Valid Anagram - Sorting**:
```typescript
custom: {
  sLength: number,
  tLength: number,
  lengthMismatch: boolean,
  sorted: boolean,
  comparing: boolean,
  position: number,
  charS: string,
  charT: string,
  match: boolean,
  result: boolean
}
```

**Valid Anagram - Hash Map**:
```typescript
custom: {
  map: Record<string, number>,
  phase: 'init' | 'counting-s' | 'decrementing-t' | 'complete',
  currentChar: string,
  currentCount: number,
  newCount: number | 'removed',
  notFound: boolean,
  mapSize: number,
  result: boolean
}
```

---

## Type System Updates

### Added ProblemMetadata Type
```typescript
export type ProblemMetadata = Omit<Problem, 'solutions' | 'defaultVisualizerComponent'>;
```

This allows metadata to be defined separately from solutions and visualizers.

### Updated Problem Interface
```typescript
export interface Problem<TInput = any, TOutput = any> {
  id: string;
  title: string;
  leetcodeNumber?: number;  // ← NEW
  difficulty: 'easy' | 'medium' | 'hard';
  tags: ProblemTag[];
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  solutions: Solution<TInput, TOutput>[];
  defaultVisualizerComponent: React.ComponentType<VisualizationProps>;
  category?: string;  // Deprecated
}
```

---

## Build Status

✅ **TypeScript Compilation**: Passed
✅ **Vite Build**: Successful
✅ **Bundle Size**: 430.78 kB (gzip: 128.04 kB)
✅ **No Breaking Changes**: All existing problems still work

---

## Testing the New Problems

### Development Server
The dev server is running at: http://localhost:5173/AlgoLens/

### Available Problems (Now 5 Total)
1. Two Sum (LeetCode #1)
2. Binary Tree Inorder Traversal (LeetCode #94)
3. Reverse Linked List (LeetCode #206)
4. **Contains Duplicate (LeetCode #217)** ← NEW
5. **Valid Anagram (LeetCode #242)** ← NEW

### How to Test
1. Navigate to the problem list
2. Select "Contains Duplicate" or "Valid Anagram"
3. Try different solutions (Brute Force vs Optimal)
4. Watch the step-by-step visualization
5. Compare time/space complexity differences

---

## Comparison: Brute Force vs Optimal

### Contains Duplicate

| Aspect | Brute Force | Hash Set |
|--------|-------------|----------|
| Time | O(n²) | O(n) |
| Space | O(1) | O(n) |
| Comparisons | n(n-1)/2 | At most n |
| Early Exit | Yes | Yes |
| Best for | Small arrays | Any size |

### Valid Anagram

| Aspect | Sorting | Hash Map |
|--------|---------|----------|
| Time | O(n log n) | O(n) |
| Space | O(1)-O(n) | O(1)* |
| Phases | 1 sort + n compares | 2 passes |
| Early Exit | On mismatch | On char not found |
| Best for | Simple impl | Optimal performance |

*O(1) because at most 26 lowercase English letters

---

## Future Enhancements

Potential improvements:
1. Add more array problems (e.g., Product of Array Except Self)
2. Add more string problems (e.g., Group Anagrams)
3. Add sorting visualizations for the sorting approach
4. Add time comparison charts
5. Add test case generator for custom inputs
6. Add problem difficulty filtering

---

## Summary

Successfully added two foundational LeetCode problems with:
- ✅ Multiple solution approaches (brute force + optimal)
- ✅ Complete step-by-step visualizations
- ✅ LeetCode-style problem descriptions
- ✅ Adapter pattern for decoupled visualizations
- ✅ Comprehensive examples and constraints
- ✅ Real-time state visualization (sets, maps, arrays)
- ✅ Color-coded UI for different states
- ✅ Full TypeScript type safety

The architecture is ready for scaling to many more problems! 🎉
