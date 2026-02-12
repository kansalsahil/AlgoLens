# Product of Array Except Self - Implementation Summary

## Overview

Successfully added **Product of Array Except Self (LeetCode #238)** with two solution approaches and complete step-by-step visualizations.

---

## Problem Details

**LeetCode Number**: 238
**Difficulty**: Medium
**Category**: Arrays
**Tags**: Array

### Description
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

**Constraint**: Must write an algorithm that runs in O(n) time without using the division operator.

### Examples

**Example 1:**
```typescript
Input: nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
Explanation:
- index 0: 2*3*4 = 24
- index 1: 1*3*4 = 12
- index 2: 1*2*4 = 8
- index 3: 1*2*3 = 6
```

**Example 2:**
```typescript
Input: nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
Explanation: For index 2: (-1)*1*(-3)*3 = 9. All other positions include the 0, so the product is 0.
```

**Example 3:**
```typescript
Input: nums = [2, 3, 4, 5]
Output: [60, 40, 30, 24]
```

---

## Solutions Implemented

### 1. Brute Force (Nested Loops)

**Time Complexity**: O(n²)
**Space Complexity**: O(n) - for result array

**Approach**: For each position i, calculate the product of all elements except i using nested loops.

**Algorithm**:
```typescript
for each position i:
  product = 1
  for each position j:
    if i != j:
      product *= nums[j]
  result[i] = product
```

**Visualization Features**:
- Shows both loop pointers (i in red, j in blue)
- Highlights when skipping i === j
- Displays multiplication operations in real-time
- Shows current product value
- Result array builds up step by step

---

### 2. Prefix-Suffix Products (Optimal)

**Time Complexity**: O(n)
**Space Complexity**: O(n) - for prefix, suffix, and result arrays

**Approach**: Use prefix and suffix product arrays. For each position, multiply the prefix product (product of all elements to the left) with the suffix product (product of all elements to the right).

**Algorithm**:
```typescript
// Phase 1: Build prefix products
prefix[0] = 1
for i from 1 to n-1:
  prefix[i] = prefix[i-1] * nums[i-1]

// Phase 2: Build suffix products
suffix[n-1] = 1
for i from n-2 to 0:
  suffix[i] = suffix[i+1] * nums[i+1]

// Phase 3: Compute result
for i from 0 to n-1:
  result[i] = prefix[i] * suffix[i]
```

**Visualization Features**:
- Shows all 4 arrays simultaneously (nums, prefix, suffix, result)
- Clear phase indicators (Phase 1: Prefix, Phase 2: Suffix, Phase 3: Result)
- Displays multiplication operations for each phase
- Color-coded pointers for different phases
- Progressive array building with "?" placeholders

---

## Files Created

```
src/problems/product-of-array-except-self/
├── index.ts                           # Main export & registration
├── metadata.ts                        # Problem metadata
├── types.ts                          # TypeScript interfaces
├── solutions/
│   ├── index.ts                      # Solution exports
│   ├── BruteForceSolution.ts        # O(n²) nested loops
│   └── PrefixSuffixSolution.ts      # O(n) optimal solution
└── visualizers/
    ├── index.ts                      # Visualizer export
    └── ProductArrayVisualizer.tsx   # React visualization component
```

---

## Visualization Details

### Brute Force Visualizer

**Displays**:
- **nums array**: Shows current element being processed
- **result array**: Builds up progressively with computed values
- **Algorithm info**: "Brute Force (O(n²))"
- **Loop pointers**:
  - i pointer (red): Computing product for this index
  - j pointer (blue): Current multiplication position
  - Gray pointer: When skipping (i === j)
- **Current product**: Live product calculation
- **Multiplication details**: Shows "oldProduct × currentValue = newProduct"
- **Skip indicator**: When i === j, shows "Skipping index"
- **Storage confirmation**: "✓ Stored result[i] = product"

### Prefix-Suffix Visualizer

**Displays**:
- **4 arrays side-by-side**:
  - nums (original input)
  - prefix (prefix products)
  - suffix (suffix products)
  - result (final answer)
- **Phase indicator**: Large, color-coded phase banner
  - Phase 1: Building Prefix Products (blue)
  - Phase 2: Building Suffix Products (blue)
  - Phase 3: Computing Result (green)
  - Complete (green)
- **Calculation details**: Shows exact multiplication for current step
  - Phase 1: "prefix[i] = prefix[i-1] × nums[i-1] = value"
  - Phase 2: "suffix[i] = suffix[i+1] × nums[i+1] = value"
  - Phase 3: "result[i] = prefix[i] × suffix[i] = value"
- **Progressive arrays**: Uses "?" to show unfilled positions
- **Color-coded highlights**:
  - Blue pointers during prefix/suffix building
  - Green pointers during result computation

---

## Animation Steps Structure

### Brute Force Steps

Each outer loop iteration includes:
1. **Initialization**: Start calculating for position i
2. **Comparisons**: For each j position
   - If i !== j: Show multiplication step
   - If i === j: Show skip step
3. **Assignment**: Store computed product in result
4. **Final return**: Complete result array

**Total Steps**: ~n + n² (depends on array size)

### Prefix-Suffix Steps

**Phase 1: Prefix Products** (~n steps)
1. Initialize prefix[0] = 1
2. For each i from 1 to n-1: Calculate prefix[i]

**Phase 2: Suffix Products** (~n steps)
1. Initialize suffix[n-1] = 1
2. For each i from n-2 to 0: Calculate suffix[i]

**Phase 3: Result** (~n steps)
1. For each i from 0 to n-1: Multiply prefix[i] × suffix[i]

**Total Steps**: ~3n + 4 (linear in array size)

---

## Custom Visualization Data

### Brute Force Custom Data
```typescript
{
  currentI: number,           // Outer loop index
  currentJ: number,           // Inner loop index
  product: number,            // Current product value
  oldProduct: number,         // Product before multiplication
  currentValue: number,       // nums[j] being multiplied
  multiplying: boolean,       // Currently multiplying
  skipping: boolean,          // Currently skipping (i===j)
  skipIndex: number,          // Index being skipped
  stored: boolean,            // Just stored result
  storedIndex: number,        // Index where result was stored
  calculating: boolean,       // Calculating for current i
  complete: boolean,          // All calculations done
  result: number[]           // Final result array
}
```

### Prefix-Suffix Custom Data
```typescript
{
  phase: 'init' | 'prefix' | 'suffix' | 'result' | 'complete',
  currentIndex: number,       // Current position

  // Prefix phase
  prevPrefix: number,         // prefix[i-1]
  numsValue: number,          // nums[i-1] or nums[i+1]
  newPrefix: number,          // Computed prefix[i]

  // Suffix phase
  nextSuffix: number,         // suffix[i+1]
  newSuffix: number,          // Computed suffix[i]

  // Result phase
  prefixValue: number,        // prefix[i]
  suffixValue: number,        // suffix[i]
  resultValue: number,        // result[i]

  result: number[]           // Final result array
}
```

---

## Integration

### Problem Registration

Added to `/src/problems/index.ts`:
```typescript
import './product-of-array-except-self';
```

The problem automatically registers with the ProblemRegistry on import.

### Type Safety

All types are properly defined:
- `ProductOfArrayExceptSelfInput`: `{ nums: number[] }`
- Output type: `number[]`
- Full TypeScript type checking throughout

---

## Comparison: Brute Force vs Optimal

| Aspect | Brute Force | Prefix-Suffix |
|--------|-------------|---------------|
| **Time Complexity** | O(n²) | O(n) |
| **Space Complexity** | O(n) | O(n) |
| **Passes** | n² comparisons | 3 passes (3n) |
| **Extra Space** | Result only | Prefix + Suffix + Result |
| **Steps Count** | ~n + n² | ~3n + 4 |
| **Best For** | Understanding concept | Production use |
| **Scalability** | Poor (n=100 → 10,000 ops) | Excellent (n=100 → 300 ops) |

**Example with n = 1000**:
- Brute Force: ~1,000,000 operations
- Prefix-Suffix: ~3,000 operations
- **333x faster!**

---

## Key Implementation Details

### Array Visualization
Uses the `ArrayAdapter` component from `/src/core/adapters/`:
```tsx
<ArrayAdapter array={array} transitionDuration={transitionDuration} />
```

### Multi-Array Display
For prefix-suffix solution, renders 4 arrays with labels:
```tsx
{arrays.map((array) => (
  <div key={array.id}>
    <div className="label">{array.name}</div>
    <ArrayAdapter array={array} transitionDuration={transitionDuration} />
  </div>
))}
```

### Theme Integration
Uses the theme system for consistent styling:
```tsx
const { theme } = useTheme();
// Access colors: theme.colors.primary, theme.colors.success, etc.
```

---

## Testing

### Suggested Test Cases

1. **Basic case**: `[1, 2, 3, 4]` → `[24, 12, 8, 6]`
2. **With zero**: `[-1, 1, 0, -3, 3]` → `[0, 0, 9, 0, 0]`
3. **All same**: `[2, 2, 2, 2]` → `[8, 8, 8, 8]`
4. **Two elements**: `[3, 4]` → `[4, 3]`
5. **Negative numbers**: `[-2, -3, 4]` → `[-12, -8, 6]`
6. **Large numbers**: `[10, 20, 30, 40]` → `[24000, 12000, 8000, 6000]`

### How to Test
1. Start dev server: `npm run dev`
2. Navigate to problem list
3. Select "Product of Array Except Self"
4. Choose a solution (Brute Force or Prefix-Suffix)
5. Try default examples or custom input
6. Watch step-by-step visualization
7. Compare performance differences

---

## Architecture Highlights

### Modular Design
Each problem is self-contained:
- Metadata defines the problem
- Solutions implement algorithms
- Visualizers render the UI
- Auto-registration on import

### Reusable Components
- `ArrayAdapter`: Generic array visualization
- `useTheme`: Consistent theming
- `AnimationStep`: Standard animation interface

### Type Safety
- Full TypeScript typing
- Generic `Problem<TInput, TOutput>`
- Generic `Solution<TInput, TOutput>`
- Type-safe visualization data

---

## Future Enhancements

Possible improvements:
1. **Space-Optimized Solution**: O(1) extra space using result array
2. **Interactive comparison**: Side-by-side Brute Force vs Optimal
3. **Performance metrics**: Show actual operation counts
4. **Custom input validator**: Ensure constraints are met
5. **Math explanation**: Visual representation of the math behind prefix/suffix approach

---

## Summary

✅ **Implemented LeetCode #238: Product of Array Except Self**
✅ **Two solutions**: Brute Force (O(n²)) and Optimal (O(n))
✅ **Complete visualizations**: Multi-array display with phase indicators
✅ **Step-by-step animations**: 3n+4 steps for optimal solution
✅ **Type-safe**: Full TypeScript implementation
✅ **Integrated**: Auto-registers with ProblemRegistry
✅ **Production-ready**: Follows existing architecture patterns

The problem is now available in the Algolens problem list! 🎉
