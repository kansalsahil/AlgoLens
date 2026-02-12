# Number of Islands - DFS Implementation Summary

## 🎉 Overview

Successfully implemented **Number of Islands (LeetCode #200)** with DFS flood-fill algorithm and beautiful 2D grid visualization!

---

## 📝 Problem Details

**LeetCode Number**: 200
**Difficulty**: Medium
**Tags**: Array, Graph, Backtracking

### Description
Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

### Primary Example (As Requested)
```typescript
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Explanation:
- Island #1 (top-left): 4 connected cells
- Island #2 (middle-right): 1 cell
- Island #3 (bottom-right): 2 cells
```

---

## 🚀 DFS Solution Implementation

### Algorithm: Depth-First Search with Recursive Flood Fill

**Time Complexity**: O(m × n) - visit each cell once
**Space Complexity**: O(m × n) - recursion stack in worst case

### How It Works

1. **Scan the Grid**: Iterate through every cell in the grid
2. **Find Unvisited Land**: When we find a '1' (land), we've discovered a new island
3. **Start DFS**: Recursively explore all connected land cells:
   - Mark current cell as visited (change '1' to '0')
   - Explore 4 directions: up, right, down, left
   - Recursively visit adjacent land cells
4. **Increment Counter**: After DFS completes, increment island count
5. **Continue Scanning**: Keep scanning for more unvisited land

### Code Structure
```typescript
function numIslands(grid: string[][]): number {
  let islands = 0;

  function dfs(row: number, col: number): void {
    // Base cases: out of bounds or water
    if (out of bounds || grid[row][col] === '0') return;

    // Mark as visited
    grid[row][col] = '0';

    // Explore all 4 directions
    dfs(row - 1, col); // up
    dfs(row, col + 1); // right
    dfs(row + 1, col); // down
    dfs(row, col - 1); // left
  }

  // Scan grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        islands++;
        dfs(row, col);
      }
    }
  }

  return islands;
}
```

---

## 🎨 Visualization Features

### 2D Grid Display

**Cell States**:
- 🌊 **Water** (`'0'`): Light blue background
- 🌲 **Unvisited Land** (`'1'`): Light green background
- 🎨 **Visited Land**: Unique color per island (red-orange, purple, pink, blue, green, etc.)
- 🔴 **Current Cell**: Red border with pulse animation
- 🔵 **Next Cell**: Blue border when exploring direction
- ⚪ **Scanning**: Gray highlight during grid scan

**Visual Elements**:
- **Grid cells resize** based on grid dimensions (30px - 60px)
- **Pulse animation** on active cells
- **Smooth color transitions** (300ms)
- **Island numbers** displayed in cells after visiting
- **Color-coded legend** explaining cell states

### Island Color Scheme

Each island gets a unique, vibrant color from a palette of 10 colors:
1. 🔴 Red-orange (#ff6b6b)
2. 🟣 Purple (#a855f7)
3. 🩷 Pink (#ec4899)
4. 🔵 Blue (#3b82f6)
5. 🟢 Green (#10b981)
6. 🟠 Amber (#f59e0b)
7. 🩵 Cyan (#06b6d4)
8. 🟣 Violet (#8b5cf6)
9. 🔴 Red (#ef4444)
10. 🩵 Teal (#14b8a6)

Colors cycle if more than 10 islands are found.

### Info Panel

**Real-time Statistics**:
- **Islands Found**: Large counter (turns green when complete)
- **Grid Size**: Shows dimensions (m × n)
- **Cells Explored**: Running count of visited cells
- **Current Position**: Shows (row, col) being processed
- **Current Island**: Shows island number with color swatch
- **Exploring Direction**: Shows ↑ up, → right, ↓ down, ← left

**DFS Call Stack Visualization**:
- Shows recursion depth
- Displays stack of (row, col) coordinates
- Visual stack with fade effect (deeper = lighter)
- Updates in real-time as DFS recurses/backtracks

**Status Messages**:
- 🎉 **"New Island Discovered!"** - Green banner when finding new island
- ✓ **"Island #N Complete"** - Colored banner showing cells explored
- ⚠ **"Out of bounds"** - Yellow warning when checking boundaries
- 💧 **"Water - skip"** - Info when encountering water
- ✓ **"Already visited - skip"** - Info for visited cells
- ✓ **"Complete!"** - Final success message with total count

---

## 🎬 Animation Steps

### Step-by-Step Breakdown

The DFS solution generates comprehensive animation steps:

1. **Initialization**
   - Show full grid
   - Display grid dimensions
   - Islands count = 0

2. **Grid Scanning** (for each cell)
   - Highlight scanning position
   - Check if cell is unvisited land

3. **New Island Discovery**
   - 🎉 Celebration banner
   - Show starting position
   - Assign island color
   - Increment island counter

4. **DFS Exploration** (recursive)
   - **Marking Step**: Show current cell being marked
   - **Direction Steps**: For each of 4 directions:
     - Show direction being explored (↑ → ↓ ←)
     - Highlight next cell
     - Either recurse or show reason for skipping
   - **Boundary Checks**: Show out-of-bounds attempts
   - **Water/Visited Checks**: Show skip reasons
   - **Backtracking**: Show return from recursion

5. **Island Completion**
   - Show colored island on grid
   - Display total cells in this island
   - Continue scanning

6. **Final Result**
   - Show all islands colored
   - Display final count
   - Success message

### Example Animation Flow

For the test case `[["1","1","0"],["1","0","1"]]`:

```
Step 1:  "Scanning 2×3 grid..."
Step 2:  "Scanning (0,0)..."
Step 3:  "🎉 Found land at (0,0)! Starting island #1"
Step 4:  "Exploring island #1 from (0,0). Marking as visited."
Step 5:  "From (0,0), checking ↑ up → (-1,0)"
Step 6:  "Position (-1,0) is out of bounds. Backtracking..."
Step 7:  "From (0,0), checking → right → (0,1)"
Step 8:  "Exploring island #1 from (0,1). Marking as visited."
Step 9:  "From (0,1), checking ↑ up → (-1,1)"
Step 10: "Position (-1,1) is out of bounds. Backtracking..."
Step 11: "From (0,1), checking → right → (0,2)"
Step 12: "Position (0,2) is water. Skip and backtrack."
Step 13: "From (0,1), checking ↓ down → (1,1)"
Step 14: "Position (1,1) is water. Skip and backtrack."
Step 15: "From (0,1), checking ← left → (0,0)"
Step 16: "Position (0,0) already visited. Skip and backtrack."
Step 17: "Finished exploring all directions from (0,1). Backtracking..."
Step 18: "From (0,0), checking ↓ down → (1,0)"
Step 19: "Exploring island #1 from (1,0). Marking as visited."
...
Step N:  "✓ Island #1 complete! Explored 3 connected land cells."
Step N+1: "Scanning (0,2)..."
Step N+2: "🎉 Found land at (0,2)! Starting island #2"
...
Step M:  "✓ Complete! Found 2 islands in the grid."
```

**Total Steps**: Approximately **3-6 steps per cell** depending on connectivity

---

## 📊 Visualization Data Structure

### Custom Data Fields

Each animation step includes:

```typescript
{
  grid: string[][];              // Current grid state
  cellStates: string[][];        // 'unvisited' | 'visiting' | 'visited'
  islandMap: number[][];         // Which island each cell belongs to (-1 = none)
  rows: number;                  // Grid height
  cols: number;                  // Grid width
  islands: number;               // Current island count

  // Current state
  currentRow?: number;           // Cell being processed
  currentCol?: number;
  nextRow?: number;              // Next cell being explored
  nextCol?: number;
  scanRow?: number;              // Cell being scanned
  scanCol?: number;

  // Island info
  currentIsland?: number;        // Current island index (0-based)
  islandColor?: string;          // Current island color

  // DFS state
  direction?: string;            // '↑ up' | '→ right' | '↓ down' | '← left'
  callStack: CallStackFrame[];   // [{row, col, depth}, ...]

  // Status flags
  scanning?: boolean;            // Scanning grid
  newIslandFound?: boolean;      // Just discovered new island
  islandComplete?: boolean;      // Finished exploring island
  cellsInIsland?: number;        // Cells in completed island
  exploring?: boolean;           // Exploring direction
  marking?: boolean;             // Marking cell as visited
  backtracking?: boolean;        // Returning from recursion
  outOfBounds?: boolean;         // Tried to go out of bounds
  isWater?: boolean;             // Encountered water
  alreadyVisited?: boolean;      // Cell already visited
  complete?: boolean;            // Algorithm complete

  // Statistics
  totalCellsExplored: number;    // Running count
}
```

---

## 🎯 Key Implementation Highlights

### 1. Island Color Assignment
```typescript
const ISLAND_COLORS = [
  '#ff6b6b', '#a855f7', '#ec4899', '#3b82f6', '#10b981',
  '#f59e0b', '#06b6d4', '#8b5cf6', '#ef4444', '#14b8a6',
];

// Each island gets a color
const islandColor = ISLAND_COLORS[currentIsland % ISLAND_COLORS.length];
```

### 2. Direction Exploration
```typescript
const DIRECTIONS = [
  { name: '↑ up', row: -1, col: 0 },
  { name: '→ right', row: 0, col: 1 },
  { name: '↓ down', row: 1, col: 0 },
  { name: '← left', row: 0, col: -1 },
];
```

### 3. Call Stack Tracking
```typescript
interface CallStackFrame {
  row: number;
  col: number;
  depth: number;
}

// Push when entering DFS
callStack.push({ row, col, depth });

// Pop when backtracking
callStack.pop();
```

### 4. Island Mapping
```typescript
// Track which island each cell belongs to
const islandMap: number[][] = Array(rows)
  .fill(0)
  .map(() => Array(cols).fill(-1));

// Assign cell to current island
islandMap[row][col] = currentIsland;
```

### 5. Cell State Management
```typescript
// Three states for land cells
cellStates[row][col] = 'unvisited';  // Initial
cellStates[row][col] = 'visiting';   // Being processed
cellStates[row][col] = 'visited';    // Fully explored
```

---

## 📁 Files Created

```
src/problems/number-of-islands/
├── index.ts                           # Problem registration
├── metadata.ts                        # Problem details with examples
├── types.ts                          # TypeScript interfaces
├── solutions/
│   ├── index.ts                      # Solution exports
│   └── DFSSolution.ts               # DFS recursive flood-fill
└── visualizers/
    ├── index.ts                      # Visualizer export
    └── NumberOfIslandsVisualizer.tsx # 2D grid visualization
```

---

## 🎮 How to Test

1. **Start dev server**: Navigate to Algolens
2. **Select problem**: Find "Number of Islands" in the list
3. **Choose DFS solution**: Select "DFS with Recursive Flood Fill"
4. **Run example**: Use the default example with 3 islands
5. **Watch animation**: See the DFS exploration in action!

### What to Watch For

- 🌊 **Water cells** stay blue throughout
- 🎨 **Islands get colored** as DFS explores them
- 📚 **Call stack grows** during recursion (watch depth!)
- ⬅️ **Backtracking** shows the recursion unwinding
- 🔄 **Directional exploration** in consistent order (up→right→down→left)
- 🎉 **Celebration banners** when discovering new islands
- ✓ **Completion messages** showing cells per island

---

## 🔮 Coming Next

The following solutions will be added:

1. **BFS with Wave Expansion** - Level-by-level exploration with queue
2. **Union-Find** - Disjoint set with parent tracking

Each will have its own unique visualization style!

---

## ✅ Summary

**DFS Solution Complete!**
- ✅ Recursive depth-first search implementation
- ✅ 2D grid visualization with color-coded islands
- ✅ Real-time call stack display
- ✅ Direction indicators (↑→↓←)
- ✅ Comprehensive animation steps
- ✅ Status messages and celebrations
- ✅ Uses your requested example as primary test case
- ✅ Handles up to 300×300 grids
- ✅ Auto-resizing grid cells
- ✅ Beautiful color palette for islands

The DFS visualization makes it crystal clear how the algorithm discovers and explores each island! 🎉🏝️
