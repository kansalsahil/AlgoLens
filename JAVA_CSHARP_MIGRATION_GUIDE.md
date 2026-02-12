# Java/C# Migration Guide - Perfect Line Number Alignment

## ✅ Changes Implemented

### 1. **CodeDisplay Component Updated**
- Default language changed from TypeScript to Java
- TypeScript removed from language options
- Line highlighting enabled for both Java and C#
- Filter removes TypeScript/JavaScript from display

### 2. **Solutions Updated** (In Progress)

#### ✅ Completed
1. **Two Sum - HashMapSolution** ✓
   - Line 2: Map initialization
   - Line 4: For loop start
   - Line 8: Return statement
   - Line 11: Map.put/add

2. **Two Sum - BruteForceSolution** ✓
   - Line 2: Outer for loop
   - Line 4: Comparison if statement
   - Line 5: Return statement

3. **Contains Duplicate - HashSetSolution** ✓
   - Line 2: Set initialization
   - Line 5: Check if contains
   - Line 6: Return true
   - Line 8: Add to set
   - Line 11: Return false

## 📋 Pattern for All Solutions

### Code Structure Template

**Remove TypeScript**, keep only Java and C#:

```typescript
codeLanguages: [
  {
    language: 'java',
    code: `class Solution {
  // Line 2: First significant line
  // Line 3: ...
  // Line 4: Loop/condition (matches animation)
  // etc - MUST match C# exactly
}`
  },
  {
    language: 'csharp',
    code: `public class Solution {
  // Line 2: Same as Java line 2
  // Line 3: Same as Java line 3
  // Line 4: Same as Java line 4
  // etc - MUST match Java exactly
}`
  }
]
```

### Line Alignment Rules

1. **Remove method signatures** from display code (keep body only)
2. **Align variable declarations** on same lines
3. **Match loop structures** exactly
4. **Keep blank lines synchronized**
5. **Comments on same lines**

### Example: Perfect Alignment

**Java:**
```java
class Solution {
  Map<Integer, Integer> map = new HashMap<>();  // Line 2

  for (int i = 0; i < nums.length; i++) {        // Line 4
    int complement = target - nums[i];

    if (map.containsKey(complement)) {            // Line 8
      return new int[] { map.get(complement), i };
    }

    map.put(nums[i], i);                          // Line 11
  }

  return new int[] {};
}
```

**C#:**
```csharp
public class Solution {
  var map = new Dictionary<int, int>();           // Line 2

  for (int i = 0; i < nums.Length; i++) {         // Line 4
    int complement = target - nums[i];

    if (map.ContainsKey(complement)) {            // Line 8
      return new int[] { map[complement], i };
    }

    map[nums[i]] = i;                             // Line 11
  }

  return new int[] { };
}
```

## 🎯 Remaining Solutions to Update

### High Priority (Most Used)
- [ ] Contains Duplicate - BruteForceSolution
- [ ] Valid Anagram - HashMapSolution
- [ ] Valid Anagram - SortingSolution
- [ ] Product Array - PrefixSuffixSolution
- [ ] Product Array - BruteForceSolution

### Medium Priority
- [ ] Number of Islands - DFSSolution
- [ ] Valid Palindrome - TwoPointerSolution
- [ ] Valid Palindrome - CleanAndReverseSolution
- [ ] Valid Parentheses - StackSolution
- [ ] Valid Parentheses - ReplacementSolution

### Lower Priority
- [ ] Group Anagrams - HashMapSolution
- [ ] Group Anagrams - BruteForceSolution
- [ ] Three Sum - TwoPointerSolution

## 🔧 How to Update Each Solution

1. **Find animation line numbers**:
   ```bash
   grep "lineNumber:" src/problems/.../Solution.ts
   ```

2. **Identify what code is on those lines** in TypeScript

3. **Restructure Java and C#** to have the SAME code on those EXACT lines

4. **Remove class declaration and method signature** from line counting

5. **Test** by running animation and verifying highlights are correct

## ✅ Testing Checklist

For each updated solution:
- [ ] Both Java and C# are in codeLanguages array
- [ ] TypeScript is NOT in codeLanguages array
- [ ] Line numbers match between Java and C#
- [ ] Animation highlighting works correctly for both
- [ ] Code is syntactically correct
- [ ] Logic is equivalent

## 🚀 Quick Test

```bash
# Start dev server (if not running)
npm run dev

# Navigate to updated problem
# Switch between Java and C#
# Run animation
# Verify line highlights match the code being executed
```

## 📝 Status

**Completed**: 3/23 solutions (13%)
**Remaining**: 20 solutions
**Estimated time**: ~2 hours for remaining solutions

---

**Next Steps**: Continue updating remaining solutions following the pattern above.
