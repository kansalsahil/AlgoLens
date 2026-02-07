import { VisualizationProps } from '../../../core/types';
import { useTheme } from '../../../hooks';

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

export function NumberOfIslandsVisualizer({ step }: VisualizationProps) {
  const { visualizationData } = step;
  const { custom } = visualizationData;
  const { theme } = useTheme();

  // Add bounce animation styles
  const bounceStyle = `
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }
  `;

  if (!custom) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    grid,
    cellStates,
    islandMap,
    rows,
    cols,
    islands,
    currentRow,
    currentCol,
    nextRow,
    nextCol,
    scanRow,
    scanCol,
    currentIsland,
    islandColor,
    direction,
    callStack,
    queue,
    queueSize,
    scanning,
    newIslandFound,
    islandComplete,
    cellsInIsland,
    exploring,
    marking,
    backtracking,
    outOfBounds,
    isWater,
    alreadyVisited,
    complete,
    totalCellsExplored,
  } = custom;

  // Calculate cell size based on grid dimensions
  const maxCellSize = 60;
  const minCellSize = 30;
  const cellSize = Math.max(minCellSize, Math.min(maxCellSize, Math.floor(500 / Math.max(rows, cols))));
  const gap = 2;

  const getCellColor = (r: number, c: number) => {
    const state = cellStates[r][c];
    const value = grid[r][c];
    const island = islandMap[r][c];

    // Current cell being processed
    if (r === currentRow && c === currentCol) {
      if (marking) return '#fbbf24'; // yellow
      if (backtracking) return '#fb923c'; // orange
      return '#ef4444'; // red
    }

    // Next cell being explored
    if (r === nextRow && c === nextCol && exploring) {
      return '#60a5fa'; // light blue
    }

    // Scanning cell
    if (r === scanRow && c === scanCol && scanning) {
      return '#9ca3af'; // gray
    }

    // Island colors for visited cells
    if (island >= 0 && state === 'visited') {
      return ISLAND_COLORS[island % ISLAND_COLORS.length];
    }

    // Visiting (currently being marked)
    if (state === 'visiting') {
      return ISLAND_COLORS[island % ISLAND_COLORS.length] + 'aa';
    }

    // Water
    if (value === '0' && state === 'unvisited') {
      return theme.colors.primary + '20'; // light blue water
    }

    // Unvisited land
    if (value === '1') {
      return theme.colors.success + '40'; // light green
    }

    return theme.colors.surface;
  };

  const getCellBorder = (r: number, c: number) => {
    if (r === currentRow && c === currentCol) {
      return `3px solid ${theme.colors.error}`;
    }
    if (r === nextRow && c === nextCol && exploring) {
      return `3px solid ${theme.colors.primary}`;
    }
    if (r === scanRow && c === scanCol && scanning) {
      return `2px solid ${theme.colors.textSecondary}`;
    }
    return `1px solid ${theme.colors.border}`;
  };

  return (
    <>
      <style>{bounceStyle}</style>
      <div className="space-y-8">
      {/* Direction Label */}
      {direction && (
        <div
          className="text-lg font-bold px-4 py-2 rounded-lg animate-pulse text-center"
          style={{
            backgroundColor: theme.colors.primary + '20',
            border: `2px solid ${theme.colors.primary}`,
            color: theme.colors.primary,
          }}
        >
          Exploring {direction}
        </div>
      )}

      {/* Grid and Queue Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grid Visualization */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="text-center text-sm font-medium"
            style={{ color: theme.colors.textSecondary }}
          >
            Island Grid ({rows}×{cols})
          </div>

          <div
            className="inline-flex flex-col"
            style={{
              gap: `${gap}px`,
              padding: '20px',
              backgroundColor: theme.colors.surface,
              borderRadius: '12px',
              border: `2px solid ${theme.colors.border}`,
              position: 'relative',
            }}
          >
            {grid.map((row: string[], r: number) => (
              <div key={r} className="flex" style={{ gap: `${gap}px` }}>
                {row.map((cell: string, c: number) => {
                  const island = islandMap[r][c];
                  const isPulsing =
                    (r === currentRow && c === currentCol) ||
                    (r === nextRow && c === nextCol && exploring);

                  // Determine if arrow should be shown
                  const showArrow =
                    r === currentRow && c === currentCol && exploring && nextRow !== undefined && nextCol !== undefined;
                  const arrowDirection = showArrow
                    ? nextRow < r
                      ? '↑'
                      : nextRow > r
                      ? '↓'
                      : nextCol > c
                      ? '→'
                      : '←'
                    : null;

                  return (
                    <div
                      key={`${r}-${c}`}
                      className="flex items-center justify-center font-mono font-bold transition-all duration-300"
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        backgroundColor: getCellColor(r, c),
                        border: getCellBorder(r, c),
                        borderRadius: '6px',
                        color: theme.colors.text,
                        fontSize: '14px',
                        position: 'relative',
                        animation: isPulsing ? 'pulse 1s infinite' : 'none',
                        transform: isPulsing ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      {island >= 0 ? (island + 1).toString() : cell}

                      {/* Directional Arrow Overlay */}
                      {showArrow && (
                        <div
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          style={{
                            fontSize: `${cellSize * 0.6}px`,
                            color: '#fff',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                            animation: 'bounce 0.5s ease-in-out infinite',
                            zIndex: 10,
                          }}
                        >
                          {arrowDirection}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            className="flex flex-wrap gap-3 justify-center text-xs"
            style={{ color: theme.colors.textSecondary }}
          >
            <div className="flex items-center gap-1">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: theme.colors.success + '40',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Unvisited</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: theme.colors.primary + '20',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Water</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: ISLAND_COLORS[0],
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Visited</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#ef4444',
                  border: `2px solid ${theme.colors.error}`,
                  borderRadius: '3px',
                }}
              />
              <span>Current</span>
            </div>
          </div>
        </div>

        {/* Queue Visualization (BFS) */}
        {queue !== undefined && (
          <div className="space-y-2">
            <div
              className="text-center text-sm font-medium"
              style={{ color: theme.colors.textSecondary }}
            >
              {queue.length > 0 ? `BFS Queue (${queue.length} cell${queue.length > 1 ? 's' : ''})` : 'BFS Queue (empty)'}
            </div>
            {queue.length > 0 ? (
              <div
                className="p-4 rounded-xl space-y-3"
                style={{
                  backgroundColor: theme.colors.surface,
                  border: `2px solid ${theme.colors.border}`,
                  minHeight: '400px',
                }}
              >
                <div
                  className="text-xs font-semibold text-center py-1"
                  style={{ color: theme.colors.textSecondary }}
                >
                  ← BACK
                </div>
                <div className="flex flex-col-reverse gap-2">
                  {queue.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="px-4 py-3 rounded-lg font-mono font-bold text-center transition-all duration-300"
                      style={{
                        backgroundColor: idx === 0 ? theme.colors.primary : theme.colors.background,
                        border: `2px solid ${idx === 0 ? theme.colors.primary : theme.colors.border}`,
                        color: idx === 0 ? '#fff' : theme.colors.text,
                        transform: idx === 0 ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: idx === 0 ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                      }}
                    >
                      ({item.row}, {item.col})
                    </div>
                  ))}
                </div>
                <div
                  className="text-xs font-semibold text-center py-1"
                  style={{ color: theme.colors.primary }}
                >
                  FRONT →
                </div>
              </div>
            ) : (
              <div
                className="text-center p-8 rounded-xl"
                style={{
                  backgroundColor: theme.colors.surface,
                  border: `3px dashed ${theme.colors.border}`,
                  color: theme.colors.textSecondary,
                  boxShadow: `inset 0 2px 8px ${theme.colors.border}20`,
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="text-lg font-semibold">Empty Queue</div>
                <div className="text-sm mt-2">No cells to explore</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div
        className="rounded-xl shadow-md p-6 space-y-4 max-w-3xl mx-auto"
        style={{
          backgroundColor: theme.colors.surface,
          border: `2px solid ${theme.colors.border}`,
        }}
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Island Counter */}
          <div className="col-span-2 space-y-2">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Islands Found
            </div>
            <div
              className="text-5xl font-bold"
              style={{
                color: complete ? theme.colors.success : theme.colors.primary,
              }}
            >
              {islands}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-1">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Grid Size
            </div>
            <div className="text-xl font-semibold" style={{ color: theme.colors.text }}>
              {rows} × {cols}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Cells Explored
            </div>
            <div className="text-xl font-semibold" style={{ color: theme.colors.text }}>
              {totalCellsExplored}
            </div>
          </div>

          {/* Current Position */}
          {currentRow !== undefined && currentCol !== undefined && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Current Position
              </div>
              <div className="text-xl font-semibold" style={{ color: theme.colors.primary }}>
                ({currentRow}, {currentCol})
              </div>
            </div>
          )}

          {/* Current Island */}
          {currentIsland >= 0 && !complete && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Current Island
              </div>
              <div
                className="text-xl font-semibold flex items-center gap-2"
                style={{ color: theme.colors.text }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: ISLAND_COLORS[currentIsland % ISLAND_COLORS.length],
                    borderRadius: '4px',
                  }}
                />
                #{currentIsland + 1}
              </div>
            </div>
          )}

          {/* Direction */}
          {direction && (
            <div className="col-span-2 space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Exploring Direction
              </div>
              <div className="text-lg font-semibold" style={{ color: theme.colors.primary }}>
                {direction}
              </div>
            </div>
          )}

          {/* Call Stack (DFS) */}
          {callStack && callStack.length > 0 && (
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                DFS Call Stack (Depth: {callStack.length})
              </div>
              <div
                className="flex flex-wrap gap-2 p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.background,
                  border: `1px solid ${theme.colors.border}`,
                  maxHeight: '120px',
                  overflowY: 'auto',
                }}
              >
                {callStack.map((frame: any, idx: number) => (
                  <div
                    key={idx}
                    className="px-3 py-1 rounded font-mono text-sm"
                    style={{
                      backgroundColor: theme.colors.surface,
                      border: `1px solid ${theme.colors.border}`,
                      color: theme.colors.text,
                      opacity: 1 - idx * 0.1,
                    }}
                  >
                    ({frame.row},{frame.col})
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Queue (BFS) */}
          {queue !== undefined && (
            <div className="col-span-2 space-y-2">
              <div
                className="text-sm font-bold px-3 py-2 rounded-lg"
                style={{
                  color: theme.colors.primary,
                  backgroundColor: theme.colors.primary + '15',
                  border: `2px solid ${theme.colors.primary}`,
                }}
              >
                BFS Queue - Size: {queueSize !== undefined ? queueSize : queue.length}
              </div>
              <div
                className="flex gap-2 p-4 rounded-lg overflow-x-auto min-h-[60px] items-center"
                style={{
                  backgroundColor: theme.colors.background,
                  border: `2px solid ${theme.colors.border}`,
                }}
              >
                <div className="text-sm font-semibold" style={{ color: theme.colors.textSecondary }}>
                  Front →
                </div>
                {queue.length === 0 ? (
                  <div
                    className="flex-1 text-center py-2 text-sm font-medium"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    (Empty Queue)
                  </div>
                ) : (
                  queue.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="px-4 py-2 rounded-lg font-mono font-bold text-sm flex-shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: idx === 0 ? theme.colors.primary : theme.colors.surface,
                        border: `2px solid ${idx === 0 ? theme.colors.primary : theme.colors.border}`,
                        color: idx === 0 ? '#fff' : theme.colors.text,
                        transform: idx === 0 ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: idx === 0 ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                      }}
                    >
                      ({item.row},{item.col})
                    </div>
                  ))
                )}
                <div className="text-sm font-semibold" style={{ color: theme.colors.textSecondary }}>
                  ← Back
                </div>
              </div>
            </div>
          )}

          {/* Status Messages */}
          {newIslandFound && (
            <div
              className="col-span-2 p-4 rounded-lg"
              style={{
                backgroundColor: theme.colors.success + '20',
                border: `2px solid ${theme.colors.success}`,
              }}
            >
              <div className="text-lg font-bold" style={{ color: theme.colors.success }}>
                🎉 New Island Discovered!
              </div>
              <div className="text-sm" style={{ color: theme.colors.text }}>
                Starting exploration...
              </div>
            </div>
          )}

          {islandComplete && (
            <div
              className="col-span-2 p-4 rounded-lg"
              style={{
                backgroundColor: islandColor + '20',
                border: `2px solid ${islandColor}`,
              }}
            >
              <div className="text-lg font-bold" style={{ color: islandColor }}>
                ✓ Island #{currentIsland + 1} Complete
              </div>
              <div className="text-sm" style={{ color: theme.colors.text }}>
                Explored {cellsInIsland} connected land cells
              </div>
            </div>
          )}

          {complete && (
            <div
              className="col-span-2 p-4 rounded-lg"
              style={{
                backgroundColor: theme.colors.success + '20',
                border: `2px solid ${theme.colors.success}`,
              }}
            >
              <div className="text-lg font-bold" style={{ color: theme.colors.success }}>
                ✓ Complete!
              </div>
              <div className="text-sm" style={{ color: theme.colors.text }}>
                Found {islands} island{islands !== 1 ? 's' : ''} in the grid
              </div>
            </div>
          )}

          {(outOfBounds || isWater || alreadyVisited) && (
            <div
              className="col-span-2 p-3 rounded-lg"
              style={{
                backgroundColor: theme.colors.warning + '20',
                border: `1px solid ${theme.colors.warning}`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: theme.colors.warning }}>
                {outOfBounds && '⚠ Out of bounds'}
                {isWater && '💧 Water - skip'}
                {alreadyVisited && '✓ Already visited - skip'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
