import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { NumberOfIslandsInput } from '../types';

interface CallStackFrame {
  row: number;
  col: number;
  depth: number;
}

const ISLAND_COLORS = [
  '#ff6b6b', // red-orange
  '#a855f7', // purple
  '#ec4899', // pink
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#06b6d4', // cyan
  '#8b5cf6', // violet
  '#ef4444', // red
  '#14b8a6', // teal
];

const DIRECTIONS = [
  { name: '↑ up', row: -1, col: 0 },
  { name: '→ right', row: 0, col: 1 },
  { name: '↓ down', row: 1, col: 0 },
  { name: '← left', row: 0, col: -1 },
];

export const DFSSolution: Solution<NumberOfIslandsInput, number> = {
  id: 'dfs',
  name: 'DFS with Recursive Flood Fill',
  description: 'Use depth-first search to explore each island. When we find unvisited land, increment the island counter and recursively mark all connected land cells as visited.',
  timeComplexity: 'O(m × n)',
  spaceComplexity: 'O(m × n)',
  code: `function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  function dfs(row: number, col: number): void {
    // Base case: out of bounds or water or visited
    if (row < 0 || row >= rows || col < 0 || col >= cols ||
        grid[row][col] === '0') {
      return;
    }

    // Mark as visited
    grid[row][col] = '0';

    // Explore all 4 directions
    dfs(row - 1, col); // up
    dfs(row, col + 1); // right
    dfs(row + 1, col); // down
    dfs(row, col - 1); // left
  }

  // Scan through the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        islands++;
        dfs(row, col);
      }
    }
  }

  return islands;
}`,

  codeLanguages: [
    {
      language: 'java',
      code: `class Solution {
  if (grid == null || grid.length == 0) return 0;      // Line 2
                                                        // Line 3
  int rows = grid.length;                               // Line 4
  int cols = grid[0].length;
  int islands = 0;
                                                        // Line 7
  void dfs(int row, int col) {                          // Line 8
    // Base case: out of bounds or water or visited    // Line 9
    if (row < 0 || row >= rows || col < 0 || col >= cols ||  // Line 10
        grid[row][col] == '0') {                        // Line 11
      return;
    }
                                                        // Line 14
    // Mark as visited
    grid[row][col] = '0';                               // Line 15
                                                        // Line 16
    // Explore all 4 directions                         // Line 17
    dfs(row - 1, col); // up                            // Line 18
    dfs(row, col + 1); // right                         // Line 19
    dfs(row + 1, col); // down                          // Line 20
    dfs(row, col - 1); // left                          // Line 21
  }                                                     // Line 22
                                                        // Line 23
  // Scan through the grid                             // Line 24
  for (int row = 0; row < rows; row++) {               // Line 25
    for (int col = 0; col < cols; col++) {             // Line 26
      if (grid[row][col] == '1') {                      // Line 27
        islands++;                                      // Line 28
        dfs(row, col);                                  // Line 29
      }                                                 // Line 30
    }                                                   // Line 31
  }                                                     // Line 32
                                                        // Line 33
  return islands;                                       // Line 34
}`,
    },
    {
      language: 'csharp',
      code: `public class Solution {
  if (grid == null || grid.Length == 0) return 0;      // Line 2
                                                        // Line 3
  int rows = grid.Length;                               // Line 4
  int cols = grid[0].Length;
  int islands = 0;
                                                        // Line 7
  void DFS(int row, int col) {                          // Line 8
    // Base case: out of bounds or water or visited    // Line 9
    if (row < 0 || row >= rows || col < 0 || col >= cols ||  // Line 10
        grid[row][col] == '0') {                        // Line 11
      return;
    }
                                                        // Line 14
    // Mark as visited
    grid[row][col] = '0';                               // Line 15
                                                        // Line 16
    // Explore all 4 directions                         // Line 17
    DFS(row - 1, col); // up                            // Line 18
    DFS(row, col + 1); // right                         // Line 19
    DFS(row + 1, col); // down                          // Line 20
    DFS(row, col - 1); // left                          // Line 21
  }                                                     // Line 22
                                                        // Line 23
  // Scan through the grid                             // Line 24
  for (int row = 0; row < rows; row++) {               // Line 25
    for (int col = 0; col < cols; col++) {             // Line 26
      if (grid[row][col] == '1') {                      // Line 27
        islands++;                                      // Line 28
        DFS(row, col);                                  // Line 29
      }                                                 // Line 30
    }                                                   // Line 31
  }                                                     // Line 32
                                                        // Line 33
  return islands;                                       // Line 34
}`,
    },
  ],
  execute: (input: NumberOfIslandsInput): SolutionExecution<number> => {
    const { grid: originalGrid } = input;
    const steps: AnimationStep[] = [];
    let stepId = 0;

    // Create a working copy of the grid
    const grid = originalGrid.map((row) => [...row]);
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;

    // Track which island each cell belongs to
    const islandMap: number[][] = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(-1));

    // Track cell states for visualization
    const cellStates: string[][] = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill('unvisited'));

    const callStack: CallStackFrame[] = [];
    let currentIsland = -1;
    let totalCellsExplored = 0;

    // Helper to create grid snapshot
    const createGridSnapshot = () => {
      return grid.map((row) => [...row]);
    };

    // Helper to create cell states snapshot
    const createStatesSnapshot = () => {
      return cellStates.map((row) => [...row]);
    };

    // Helper to create island map snapshot
    const createIslandMapSnapshot = () => {
      return islandMap.map((row) => [...row]);
    };

    // Initial state
    steps.push({
      id: `step-${stepId++}`,
      type: 'initialization',
      description: `Scanning ${rows}×${cols} grid to find islands. Land='1', Water='0'.`,
      lineNumber: 4,
      visualizationData: {
        custom: {
          grid: createGridSnapshot(),
          cellStates: createStatesSnapshot(),
          islandMap: createIslandMapSnapshot(),
          rows,
          cols,
          islands: 0,
          callStack: [],
          scanning: true,
          totalCellsExplored: 0,
        },
      },
      variables: { rows, cols, islands: 0 },
    });

    // DFS function
    function dfs(row: number, col: number, depth: number): void {
      // Check bounds
      if (row < 0 || row >= rows || col < 0 || col >= cols) {
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: `Position (${row},${col}) is out of bounds. Backtracking...`,
          lineNumber: 10,
          visualizationData: {
            custom: {
              grid: createGridSnapshot(),
              cellStates: createStatesSnapshot(),
              islandMap: createIslandMapSnapshot(),
              rows,
              cols,
              islands,
              currentRow: row,
              currentCol: col,
              currentIsland,
              callStack: [...callStack],
              outOfBounds: true,
              totalCellsExplored,
            },
          },
          variables: { row, col, depth },
        });
        return;
      }

      // Check if water or already visited
      if (grid[row][col] === '0') {
        const isWater = cellStates[row][col] === 'unvisited';
        steps.push({
          id: `step-${stepId++}`,
          type: 'comparison',
          description: isWater
            ? `Position (${row},${col}) is water. Skip and backtrack.`
            : `Position (${row},${col}) already visited. Skip and backtrack.`,
          lineNumber: 11,
          visualizationData: {
            custom: {
              grid: createGridSnapshot(),
              cellStates: createStatesSnapshot(),
              islandMap: createIslandMapSnapshot(),
              rows,
              cols,
              islands,
              currentRow: row,
              currentCol: col,
              currentIsland,
              callStack: [...callStack],
              isWater,
              alreadyVisited: !isWater,
              totalCellsExplored,
            },
          },
          variables: { row, col, depth },
        });
        return;
      }

      // Mark as visited
      callStack.push({ row, col, depth });
      grid[row][col] = '0';
      cellStates[row][col] = 'visiting';
      islandMap[row][col] = currentIsland;
      totalCellsExplored++;

      steps.push({
        id: `step-${stepId++}`,
        type: 'assignment',
        description: `Exploring island #${currentIsland + 1} from (${row},${col}). Marking as visited.`,
        lineNumber: 15,
        visualizationData: {
          custom: {
            grid: createGridSnapshot(),
            cellStates: createStatesSnapshot(),
            islandMap: createIslandMapSnapshot(),
            rows,
            cols,
            islands,
            currentRow: row,
            currentCol: col,
            currentIsland,
            callStack: [...callStack],
            marking: true,
            totalCellsExplored,
          },
        },
        variables: { row, col, depth, islands },
      });

      // Now mark as visited (not just visiting)
      cellStates[row][col] = 'visited';

      // Explore all 4 directions
      for (const dir of DIRECTIONS) {
        const newRow = row + dir.row;
        const newCol = col + dir.col;

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `From (${row},${col}), checking ${dir.name} → (${newRow},${newCol})`,
          lineNumber: 18 + DIRECTIONS.indexOf(dir),
          visualizationData: {
            custom: {
              grid: createGridSnapshot(),
              cellStates: createStatesSnapshot(),
              islandMap: createIslandMapSnapshot(),
              rows,
              cols,
              islands,
              currentRow: row,
              currentCol: col,
              nextRow: newRow,
              nextCol: newCol,
              currentIsland,
              direction: dir.name,
              callStack: [...callStack],
              exploring: true,
              totalCellsExplored,
            },
          },
          variables: { row, col, newRow, newCol, depth },
        });

        dfs(newRow, newCol, depth + 1);
      }

      // Backtrack
      callStack.pop();

      steps.push({
        id: `step-${stepId++}`,
        type: 'iteration',
        description: `Finished exploring all directions from (${row},${col}). Backtracking...`,
        lineNumber: 22,
        visualizationData: {
          custom: {
            grid: createGridSnapshot(),
            cellStates: createStatesSnapshot(),
            islandMap: createIslandMapSnapshot(),
            rows,
            cols,
            islands,
            currentRow: row,
            currentCol: col,
            currentIsland,
            callStack: [...callStack],
            backtracking: true,
            totalCellsExplored,
          },
        },
        variables: { row, col, depth },
      });
    }

    // Main scanning loop
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Scanning step
        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Scanning position (${row},${col})...`,
          lineNumber: 26,
          visualizationData: {
            custom: {
              grid: createGridSnapshot(),
              cellStates: createStatesSnapshot(),
              islandMap: createIslandMapSnapshot(),
              rows,
              cols,
              islands,
              scanRow: row,
              scanCol: col,
              scanning: true,
              callStack: [],
              totalCellsExplored,
            },
          },
          variables: { row, col, islands },
        });

        if (grid[row][col] === '1') {
          // Found new island!
          islands++;
          currentIsland++;
          const islandColor = ISLAND_COLORS[currentIsland % ISLAND_COLORS.length];

          steps.push({
            id: `step-${stepId++}`,
            type: 'initialization',
            description: `🎉 Found unvisited land at (${row},${col})! Starting island #${islands}.`,
            lineNumber: 28,
            visualizationData: {
              custom: {
                grid: createGridSnapshot(),
                cellStates: createStatesSnapshot(),
                islandMap: createIslandMapSnapshot(),
                rows,
                cols,
                islands,
                currentRow: row,
                currentCol: col,
                currentIsland,
                islandColor,
                newIslandFound: true,
                callStack: [],
                totalCellsExplored,
              },
            },
            variables: { row, col, islands },
          });

          // Start DFS
          dfs(row, col, 0);

          // Island complete
          const cellsInIsland = islandMap.flat().filter((id) => id === currentIsland).length;

          steps.push({
            id: `step-${stepId++}`,
            type: 'custom',
            description: `✓ Island #${islands} complete! Explored ${cellsInIsland} connected land cells.`,
            lineNumber: 29,
            visualizationData: {
              custom: {
                grid: createGridSnapshot(),
                cellStates: createStatesSnapshot(),
                islandMap: createIslandMapSnapshot(),
                rows,
                cols,
                islands,
                currentIsland,
                islandColor,
                islandComplete: true,
                cellsInIsland,
                callStack: [],
                totalCellsExplored,
              },
            },
            variables: { islands, cellsInIsland },
          });
        }
      }
    }

    // Final result
    steps.push({
      id: `step-${stepId++}`,
      type: 'return',
      description: `Scan complete! Found ${islands} island${islands !== 1 ? 's' : ''} in the grid.`,
      lineNumber: 34,
      visualizationData: {
        custom: {
          grid: createGridSnapshot(),
          cellStates: createStatesSnapshot(),
          islandMap: createIslandMapSnapshot(),
          rows,
          cols,
          islands,
          complete: true,
          totalCellsExplored,
        },
      },
      variables: { result: islands },
    });

    return { steps, result: islands };
  },
};
