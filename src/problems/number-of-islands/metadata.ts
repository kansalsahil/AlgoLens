import { ProblemMetadata } from '../../core/types';

export const NUMBER_OF_ISLANDS_METADATA: ProblemMetadata = {
  id: 'number-of-islands',
  title: 'Number of Islands',
  leetcodeNumber: 200,
  difficulty: 'medium',
  tags: ['Array', 'Graph', 'Backtracking'],
  description: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
  examples: [
    {
      input: {
        grid: [
          ['1', '1', '0', '0', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '1', '0', '0'],
          ['0', '0', '0', '1', '1'],
        ],
      },
      output: 3,
      explanation: 'There are three separate islands: one at top-left (4 cells), one at middle-right (1 cell), and one at bottom-right (2 cells).',
    },
    {
      input: {
        grid: [
          ['1', '1', '1', '1', '0'],
          ['1', '1', '0', '1', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '0', '0', '0'],
        ],
      },
      output: 1,
      explanation: 'All the land cells are connected, forming one island.',
    },
    {
      input: {
        grid: [
          ['1', '0', '1', '0', '1'],
          ['0', '1', '0', '1', '0'],
          ['1', '0', '1', '0', '1'],
        ],
      },
      output: 13,
      explanation: 'Each land cell is its own island since they are not connected.',
    },
  ],
  constraints: [
    'm == grid.length',
    'n == grid[i].length',
    '1 <= m, n <= 300',
    "grid[i][j] is '0' or '1'",
  ],
};
