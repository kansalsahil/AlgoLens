# Algolens Claude Skills

This directory contains custom Claude Code skills for streamlining problem development in Algolens.

## Available Skills

### `/add-problem` - Problem Generator

Generate complete LeetCode-style problems with multiple solutions and educational visualizations.

**Usage**:
```bash
/add-problem [problem-identifier] [algo1] [algo2] [algo3]...
```

**Examples**:
```bash
# By LeetCode number
/add-problem 238 "Prefix-Suffix" "Brute Force"

# By problem name
/add-problem "Two Sum" "Hash Map" "Brute Force"

# Graph problem with multiple algorithms
/add-problem 200 DFS BFS "Union-Find"

# String problem
/add-problem "Valid Palindrome" "Two Pointers" "Clean and Reverse"
```

**What it generates**:
- ✅ Complete problem structure with all files
- ✅ Multiple solution implementations
- ✅ Multi-language code (TypeScript, Java, C#)
- ✅ Educational visualizations
- ✅ Step-by-step animations
- ✅ Problem registration
- ✅ Summary documentation

## Features

### Multi-Language Support

All generated solutions include code in multiple languages:
- **TypeScript/JavaScript**: Executable implementation
- **Java**: Display-only equivalent
- **C#**: Display-only equivalent
- More languages can be added (Python, C++, Go)

### Educational Visualizations

Visualizations are designed for teaching and self-learning:
- Clear, progressive step-by-step animations
- Color-coded states and elements
- Real-time variable tracking
- Informative annotations
- Algorithm complexity display

### Problem Types Supported

- Arrays (with indices, pointers, highlights)
- Strings (character-level operations)
- Trees (node traversal, hierarchy)
- Graphs (DFS/BFS exploration, 2D grids)
- Linked Lists (node connections, pointers)
- Stacks/Queues (push/pop operations)
- Dynamic Programming (table visualization)

## Architecture Integration

Skills follow the existing Algolens architecture:
```
src/problems/[problem-id]/
├── index.ts                    # Registration
├── metadata.ts                 # Problem details
├── types.ts                   # TypeScript types
├── solutions/                  # Algorithm implementations
│   ├── index.ts
│   └── [Algorithm]Solution.ts
└── visualizers/                # Visualization components
    ├── index.ts
    └── [Name]Visualizer.tsx
```

## Skill Development

To add new skills:

1. Create `[skill-name].md` - Documentation and usage
2. Create `[skill-name].prompt.md` - System prompt for the skill
3. Test the skill with various inputs
4. Update this README

## Best Practices

When using skills:
- ✅ Provide clear problem identifiers
- ✅ List algorithms in order of complexity (simple → complex)
- ✅ Review generated code before committing
- ✅ Test visualizations with different inputs
- ✅ Ensure multi-language code is equivalent

## Common Algorithm Names

### Arrays
- "Brute Force", "Two Pointers", "Sliding Window", "Prefix Sum", "Binary Search"

### Strings
- "Two Pointers", "Sliding Window", "Hash Map", "KMP", "Rabin-Karp"

### Trees
- "DFS", "BFS", "Recursive", "Iterative", "Morris Traversal", "Level Order"

### Graphs
- "DFS", "BFS", "Union-Find", "Dijkstra", "Topological Sort", "Bellman-Ford"

### Dynamic Programming
- "Top-Down", "Bottom-Up", "Space Optimized", "Tabulation", "Memoization"

### Linked Lists
- "Iterative", "Recursive", "Two Pointers", "Fast-Slow Pointers", "Dummy Node"

## Tips

1. **Start simple**: Generate with 1-2 algorithms first, then add more
2. **Review visualizations**: Ensure they're educational and clear
3. **Test edge cases**: Try different inputs to verify animations
4. **Customize**: Feel free to tweak generated code for your needs
5. **Iterate**: Skills improve as they learn from your codebase

## Contributing

To improve skills:
- Provide feedback on generated code quality
- Suggest new visualization patterns
- Report issues or edge cases
- Propose new skill ideas

---

**Note**: Skills are powered by Claude and follow the Algolens architecture patterns. They generate production-ready code but may need minor adjustments based on specific requirements.
