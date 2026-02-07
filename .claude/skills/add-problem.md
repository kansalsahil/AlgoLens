# Add Problem Skill

Generate a complete LeetCode-style problem with multiple solutions and educational visualizations.

## Usage

```bash
/add-problem [problem-name-or-number] [algo1] [algo2] [algo3]...
```

## Examples

```bash
/add-problem "Product of Array Except Self" "Prefix-Suffix" "Brute Force"
/add-problem 200 DFS BFS "Union-Find"
/add-problem "Two Sum" "Hash Map" "Brute Force"
```

## What This Skill Does

1. **Generates complete problem structure**:
   - `metadata.ts` - Problem description, examples, constraints
   - `types.ts` - TypeScript interfaces for input/output
   - `solutions/` - One solution file per algorithm
   - `visualizers/` - Educational visualization component
   - `index.ts` - Problem registration

2. **Creates multi-language solution code**:
   - TypeScript/JavaScript (executable)
   - Java (display only)
   - C# (display only)
   - Each solution shows code in all languages

3. **Builds pedagogical visualizations**:
   - Step-by-step algorithm execution
   - Visual data structure representations
   - Real-time state changes
   - Color-coded elements for clarity
   - Annotations and explanations
   - Great for teaching and self-learning

4. **Generates comprehensive animation steps**:
   - Initialization steps
   - Loop iterations
   - Comparisons and conditions
   - Assignments and updates
   - Return values
   - Custom educational steps

## Arguments

- **problem-name-or-number**: LeetCode problem number (e.g., "238") or full name (e.g., "Product of Array Except Self")
- **algo1, algo2, ...**: List of algorithm names/approaches to implement

## Common Algorithm Types

### Array Problems
- "Brute Force", "Two Pointers", "Sliding Window", "Prefix Sum", "Hash Map", "Binary Search"

### String Problems
- "Two Pointers", "Sliding Window", "Hash Map", "Dynamic Programming", "KMP"

### Graph Problems
- "DFS", "BFS", "Union-Find", "Dijkstra", "Topological Sort", "Bellman-Ford"

### Tree Problems
- "DFS", "BFS", "Recursive", "Iterative", "Morris Traversal"

### Dynamic Programming
- "Top-Down", "Bottom-Up", "Space Optimized"

### Linked List
- "Iterative", "Recursive", "Two Pointers", "Fast-Slow Pointers"

## Multi-Language Support

Each solution will include:

1. **TypeScript** (executable):
   ```typescript
   function solution(input: InputType): OutputType {
     // Actual implementation that runs
   }
   ```

2. **Java** (display):
   ```java
   class Solution {
     public OutputType solution(InputType input) {
       // Equivalent Java code
     }
   }
   ```

3. **C#** (display):
   ```csharp
   public class Solution {
     public OutputType Solution(InputType input) {
       // Equivalent C# code
     }
   }
   ```

## Visualization Principles

The skill generates visualizations that are:

✅ **Clear**: Easy to understand at a glance
✅ **Progressive**: Shows step-by-step changes
✅ **Informative**: Displays relevant variables and state
✅ **Interactive**: Uses color, animation, and highlights
✅ **Educational**: Explains the "why" not just the "what"
✅ **Self-contained**: Can be understood without external docs

### Visualization Components

- **Data Structure Display**: Arrays, trees, graphs, linked lists
- **Pointers/Indices**: Visual indicators of current position
- **State Panel**: Shows algorithm variables and statistics
- **Progress Indicators**: Current step, phase, or iteration
- **Annotations**: Text explanations of current action
- **Color Coding**: Consistent colors for different states
- **Call Stack**: For recursive algorithms (DFS, recursive solutions)
- **Queue Display**: For BFS and queue-based algorithms
- **Stack Display**: For iterative stack-based algorithms
- **Directional Arrows**: For graph/grid traversal showing exploration direction
- **Complexity Info**: Shows time/space complexity

### Data Structure-Specific Visualizations

#### Stack Visualizations (DFS, Parentheses, Iterative Tree Traversal)
- **Visual Stack**: Vertical display showing top/bottom
- **Push/Pop Animations**: Highlighted operations when elements added/removed
- **Stack Size Counter**: Real-time count of elements
- **Call Stack Display**: For recursive DFS showing function call depth
- **Color Coding**: Different colors for different states

**Example Usage**:
```typescript
visualizationData: {
  stack: stack.map(item => ({
    functionName: 'dfs',
    parameters: { row, col }
  })),
  custom: {
    stackSize: stack.length,
    pushing: true,  // or popped: true
  }
}
```

#### Queue Visualizations (BFS, Level-Order Traversal)
- **Visual Queue**: Vertical display on RIGHT side (like stack), with FRONT/BACK labels
- **Enqueue/Dequeue Animations**: Highlighted operations
- **Queue Size Counter**: Real-time count in header
- **Front Element Highlight**: Bottom element highlighted (dequeue position)
- **Empty State**: Shows "Empty Queue" when no items
- **Flow Indicators**: "FRONT →" at bottom, "← BACK" at top
- **Layout**: Use `grid grid-cols-1 lg:grid-cols-2` to put main visualization on left, queue on right

**Example Usage**:
```typescript
visualizationData: {
  custom: {
    queue: queue.map(item => ({ row, col })),
    queueSize: queue.length,
    enqueuing: true,  // or dequeuing: true
  }
}
```

**Layout Pattern**:
```typescript
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Main visualization (grid/array) - LEFT SIDE */}
  <div className="space-y-2">
    <div className="text-center text-sm font-medium">Grid/Array</div>
    {/* visualization */}
  </div>

  {/* Queue - RIGHT SIDE (vertical) */}
  {queue !== undefined && (
    <div className="space-y-2">
      <div className="text-center text-sm font-medium">
        BFS Queue ({queue.length} items)
      </div>
      {/* Vertical queue with BACK at top, FRONT at bottom */}
    </div>
  )}
</div>
```

#### Grid/Graph Traversal Visualizations
- **Directional Arrows**: Animated arrows (↑ ↓ ← →) on cells
- **Direction Labels**: Large label showing "Exploring → right", etc.
- **Bounce Animations**: Arrows bounce to draw attention
- **Path Highlighting**: Shows cells being explored
- **Visited State**: Color-coded to show exploration progress

**Example Usage**:
```typescript
visualizationData: {
  custom: {
    currentRow: 2,
    currentCol: 3,
    nextRow: 2,
    nextCol: 4,
    direction: '→ right',
    exploring: true
  }
}
```

## Output Structure

```
src/problems/[problem-id]/
├── index.ts                    # Problem registration
├── metadata.ts                 # Problem details with examples
├── types.ts                   # TypeScript interfaces
├── solutions/
│   ├── index.ts               # Export all solutions
│   ├── [Algo1]Solution.ts     # First algorithm
│   ├── [Algo2]Solution.ts     # Second algorithm
│   └── ...
└── visualizers/
    ├── index.ts               # Export visualizer
    └── [ProblemName]Visualizer.tsx
```

## Implementation Details

The skill will:

1. **Fetch problem details** (if LeetCode number provided)
2. **Determine problem type** (array, string, tree, graph, etc.)
3. **Generate appropriate metadata** with examples and constraints
4. **Create solution files** for each algorithm with:
   - Multi-language code
   - Animation step generation
   - Execute function
5. **Build visualizer component** matching the problem type
6. **Register problem** in `src/problems/index.ts`
7. **Generate summary document** with implementation details

## Notes

- All generated code follows existing Algolens architecture
- Visualizations use the theme system for consistent styling
- Solutions include comprehensive animation steps
- Multi-language code is kept in sync manually (TypeScript is source of truth)
- Educational focus: prioritizes clarity over optimization
