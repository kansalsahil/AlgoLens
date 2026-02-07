# Example: Using the /add-problem Skill

## Example 1: Array Problem (Two Sum)

```bash
/add-problem "Two Sum" "Hash Map" "Brute Force"
```

**What gets generated**:

### Metadata (metadata.ts)
- Problem: LeetCode #1 - Two Sum
- Difficulty: Easy
- Tags: Array, Hash Map
- 3 examples with explanations
- Constraints

### Solutions
1. **Hash Map Solution** - O(n) time, O(n) space
2. **Brute Force Solution** - O(n²) time, O(1) space

### Multi-Language Code
Each solution includes:
```typescript
// TypeScript (executable)
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

```java
// Java (display)
class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (map.containsKey(complement)) {
        return new int[] { map.get(complement), i };
      }
      map.put(nums[i], i);
    }
    return new int[] {};
  }
}
```

```csharp
// C# (display)
public class Solution {
  public int[] TwoSum(int[] nums, int target) {
    var map = new Dictionary<int, int>();
    for (int i = 0; i < nums.Length; i++) {
      int complement = target - nums[i];
      if (map.ContainsKey(complement)) {
        return new int[] { map[complement], i };
      }
      map[nums[i]] = i;
    }
    return new int[] { };
  }
}
```

### Visualizer
- Array display with highlighted elements
- Hash map visualization showing key-value pairs
- Current index pointer
- Complement calculation display
- Success indicator when pair found

---

## Example 2: Graph Problem (Number of Islands)

```bash
/add-problem 200 DFS BFS "Union-Find"
```

**What gets generated**:

### Solutions
1. **DFS Solution** - Recursive flood fill with call stack visualization
2. **BFS Solution** - Queue-based exploration with level tracking
3. **Union-Find Solution** - Disjoint set with parent tracking

### Visualizer
- 2D grid with color-coded islands
- Water vs land distinction
- Current cell highlighting
- For DFS: Call stack display
- For BFS: Queue visualization
- For Union-Find: Parent array and tree structure

### Animation Steps
Each algorithm shows:
- Grid scanning
- Island discovery celebrations
- Exploration process (direction-by-direction)
- State transitions (unvisited → visiting → visited)
- Final island count

---

## Example 3: Tree Problem (Binary Tree Traversal)

```bash
/add-problem "Binary Tree Inorder Traversal" "Recursive" "Iterative" "Morris"
```

**What gets generated**:

### Solutions
1. **Recursive DFS** - Classic recursive approach
2. **Iterative with Stack** - Using explicit stack
3. **Morris Traversal** - O(1) space, threaded tree

### Visualizer
- Tree node visualization
- Traversal path highlighting
- For Recursive: Call stack
- For Iterative: Stack contents
- For Morris: Thread connections
- Result array building in real-time

---

## Example 4: Dynamic Programming (Longest Common Subsequence)

```bash
/add-problem "Longest Common Subsequence" "Top-Down" "Bottom-Up"
```

**What gets generated**:

### Solutions
1. **Top-Down (Memoization)** - Recursive with cache
2. **Bottom-Up (Tabulation)** - Iterative table building

### Visualizer
- 2D DP table visualization
- Cell-by-cell computation
- Current cell highlighting
- For Top-Down: Recursion tree and memo table
- For Bottom-Up: Progressive table filling
- Arrow indicators showing dependencies
- Final result extraction path

---

## Example 5: String Problem (Valid Anagram)

```bash
/add-problem "Valid Anagram" "Sorting" "Hash Map"
```

**What gets generated**:

### Solutions
1. **Sorting Approach** - Sort both strings and compare
2. **Hash Map Approach** - Character frequency counting

### Multi-Language Support
TypeScript, Java, and C# versions for both algorithms

### Visualizer
- String character arrays side-by-side
- For Sorting: Show sorted strings and comparison
- For Hash Map: Show frequency map building
- Phase indicators (counting vs checking)
- Color-coded matches and mismatches

---

## Tips for Using the Skill

1. **Be specific with algorithm names**: Use standard names like "DFS", "BFS", "Two Pointers"
2. **Order matters**: List algorithms from simple to complex for better learning progression
3. **Review generated code**: Always check that logic matches your expectations
4. **Test visualizations**: Run with various inputs to ensure animations are clear
5. **Customize as needed**: Generated code is a starting point, feel free to enhance

## Common Patterns

### For Array Problems
```bash
/add-problem [name] "Brute Force" "Optimal"
```

### For Graph Problems
```bash
/add-problem [name] "DFS" "BFS"
```

### For DP Problems
```bash
/add-problem [name] "Top-Down" "Bottom-Up" "Space Optimized"
```

### For Tree Problems
```bash
/add-problem [name] "Recursive" "Iterative"
```

---

**Pro Tip**: Start with 1-2 core algorithms, test them, then use the skill again to add more solutions to the same problem!
