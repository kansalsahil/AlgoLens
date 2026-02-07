import { Solution, SolutionExecution, AnimationStep } from '../../../core/types';
import { NumberOfIslandsInput } from '../types';

interface QueueItem {
  row: number;
  col: number;
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

export const BFSSolution: Solution<NumberOfIslandsInput, number> = {
  id: 'bfs',
  name: 'BFS with Queue',
  description: 'Use breadth-first search with a queue to explore each island level by level. When we find unvisited land, increment the island counter and use BFS to mark all connected land cells.',
  timeComplexity: 'O(m × n)',
  spaceComplexity: 'O(min(m, n))',
  code: `function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  function bfs(startRow: number, startCol: number): void {
    const queue: [number, number][] = [[startRow, startCol]];
    grid[startRow][startCol] = '0';

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;

      // Explore all 4 directions
      const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < cols &&
            grid[newRow][newCol] === '1') {
          grid[newRow][newCol] = '0';
          queue.push([newRow, newCol]);
        }
      }
    }
  }

  // Scan through the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        islands++;
        bfs(row, col);
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
  void bfs(int startRow, int startCol) {                // Line 8
    Queue<int[]> queue = new LinkedList<>();            // Line 9
    queue.offer(new int[]{startRow, startCol});        // Line 10
    grid[startRow][startCol] = '0';                     // Line 11
                                                        // Line 12
    while (!queue.isEmpty()) {                          // Line 13
      int[] cell = queue.poll();                        // Line 14
      int row = cell[0], col = cell[1];
                                                        // Line 16
      // Explore all 4 directions                       // Line 17
      int[][] directions = {{-1,0}, {0,1}, {1,0}, {0,-1}};  // Line 18
      for (int[] dir : directions) {                    // Line 19
        int newRow = row + dir[0];
        int newCol = col + dir[1];
                                                        // Line 22
        if (newRow >= 0 && newRow < rows &&            // Line 23
            newCol >= 0 && newCol < cols &&
            grid[newRow][newCol] == '1') {              // Line 25
          grid[newRow][newCol] = '0';
          queue.offer(new int[]{newRow, newCol});       // Line 27
        }
      }
    }                                                   // Line 30
  }
                                                        // Line 32
  // Scan through the grid                             // Line 33
  for (int row = 0; row < rows; row++) {               // Line 34
    for (int col = 0; col < cols; col++) {             // Line 35
      if (grid[row][col] == '1') {                      // Line 36
        islands++;                                      // Line 37
        bfs(row, col);                                  // Line 38
      }
    }
  }
                                                        // Line 42
  return islands;                                       // Line 43
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
  void BFS(int startRow, int startCol) {                // Line 8
    Queue<int[]> queue = new Queue<int[]>();            // Line 9
    queue.Enqueue(new int[]{startRow, startCol});      // Line 10
    grid[startRow][startCol] = '0';                     // Line 11
                                                        // Line 12
    while (queue.Count > 0) {                           // Line 13
      int[] cell = queue.Dequeue();                     // Line 14
      int row = cell[0], col = cell[1];
                                                        // Line 16
      // Explore all 4 directions                       // Line 17
      int[][] directions = {new[]{-1,0}, new[]{0,1}, new[]{1,0}, new[]{0,-1}};  // Line 18
      foreach (int[] dir in directions) {               // Line 19
        int newRow = row + dir[0];
        int newCol = col + dir[1];
                                                        // Line 22
        if (newRow >= 0 && newRow < rows &&            // Line 23
            newCol >= 0 && newCol < cols &&
            grid[newRow][newCol] == '1') {              // Line 25
          grid[newRow][newCol] = '0';
          queue.Enqueue(new int[]{newRow, newCol});     // Line 27
        }
      }
    }                                                   // Line 30
  }
                                                        // Line 32
  // Scan through the grid                             // Line 33
  for (int row = 0; row < rows; row++) {               // Line 34
    for (int col = 0; col < cols; col++) {             // Line 35
      if (grid[row][col] == '1') {                      // Line 36
        islands++;                                      // Line 37
        BFS(row, col);                                  // Line 38
      }
    }
  }
                                                        // Line 42
  return islands;                                       // Line 43
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
      description: `Scanning ${rows}×${cols} grid to find islands using BFS. Land='1', Water='0'.`,
      lineNumber: 4,
      visualizationData: {
        custom: {
          grid: createGridSnapshot(),
          cellStates: createStatesSnapshot(),
          islandMap: createIslandMapSnapshot(),
          rows,
          cols,
          islands: 0,
          queue: [],
          scanning: true,
          totalCellsExplored: 0,
        },
      },
      variables: { rows, cols, islands: 0 },
    });

    // BFS function
    function bfs(startRow: number, startCol: number): void {
      const queue: QueueItem[] = [{ row: startRow, col: startCol }];
      grid[startRow][startCol] = '0';
      cellStates[startRow][startCol] = 'visiting';
      islandMap[startRow][startCol] = currentIsland;
      totalCellsExplored++;

      steps.push({
        id: `step-${stepId++}`,
        type: 'initialization',
        description: `Initialize queue with start position (${startRow},${startCol}). Mark as visited.`,
        lineNumber: 10,
        visualizationData: {
          custom: {
            grid: createGridSnapshot(),
            cellStates: createStatesSnapshot(),
            islandMap: createIslandMapSnapshot(),
            rows,
            cols,
            islands,
            currentRow: startRow,
            currentCol: startCol,
            currentIsland,
            queue: [...queue],
            queueSize: queue.length,
            totalCellsExplored,
          },
        },
        variables: { startRow, startCol, queueSize: queue.length },
      });

      cellStates[startRow][startCol] = 'visited';

      while (queue.length > 0) {
        const { row, col } = queue.shift()!;

        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Dequeue (${row},${col}). Explore neighbors...`,
          lineNumber: 14,
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
              queue: [...queue],
              queueSize: queue.length,
              dequeuing: true,
              totalCellsExplored,
            },
          },
          variables: { row, col, queueSize: queue.length },
        });

        // Explore all 4 directions
        for (const dir of DIRECTIONS) {
          const newRow = row + dir.row;
          const newCol = col + dir.col;

          // Check bounds
          if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
            continue;
          }

          // Check if water or already visited
          if (grid[newRow][newCol] === '0') {
            continue;
          }

          // Valid neighbor - mark and enqueue
          grid[newRow][newCol] = '0';
          cellStates[newRow][newCol] = 'visiting';
          islandMap[newRow][newCol] = currentIsland;
          queue.push({ row: newRow, col: newCol });
          totalCellsExplored++;

          steps.push({
            id: `step-${stepId++}`,
            type: 'assignment',
            description: `Found land ${dir.name} at (${newRow},${newCol}). Mark visited and enqueue.`,
            lineNumber: 27,
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
                newRow,
                newCol,
                currentIsland,
                direction: dir.name,
                queue: [...queue],
                queueSize: queue.length,
                enqueuing: true,
                totalCellsExplored,
              },
            },
            variables: { row, col, newRow, newCol, queueSize: queue.length },
          });

          cellStates[newRow][newCol] = 'visited';
        }
      }
    }

    // Main scanning loop
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Scanning step
        steps.push({
          id: `step-${stepId++}`,
          type: 'iteration',
          description: `Scanning position (${row},${col})...`,
          lineNumber: 35,
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
              queue: [],
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
            description: `🎉 Found unvisited land at (${row},${col})! Starting island #${islands} with BFS.`,
            lineNumber: 37,
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
                queue: [],
                totalCellsExplored,
              },
            },
            variables: { row, col, islands },
          });

          // Start BFS
          bfs(row, col);

          // Island complete
          const cellsInIsland = islandMap.flat().filter((id) => id === currentIsland).length;

          steps.push({
            id: `step-${stepId++}`,
            type: 'custom',
            description: `✓ Island #${islands} complete! Explored ${cellsInIsland} connected land cells.`,
            lineNumber: 38,
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
                queue: [],
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
      description: `Scan complete! Found ${islands} island${islands !== 1 ? 's' : ''} in the grid using BFS.`,
      lineNumber: 43,
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
