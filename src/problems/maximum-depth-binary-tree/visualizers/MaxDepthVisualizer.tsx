import { VisualizationProps } from '../../../core/types';
import { TreeAdapter, StackAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function MaxDepthVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { trees, custom, stack } = visualizationData;
  const { theme } = useTheme();

  const tree = trees?.[0];
  if (!tree) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    depth = 0,
    queue = [],
    queueSize = 0,
    currentNode,
    currentNodeValue,
    currentLevel,
    levelSize,
    levelProgress,
    leftDepth,
    rightDepth,
    currentDepth,
    exploringLeft,
    exploringRight,
    calculating,
    levelComplete,
    startingLevel,
    dequeuing,
    enqueuingNode,
    addingLeft,
    addingRight,
    isBaseCase,
    returnValue,
    complete,
  } = custom || {};

  const isRecursive = stack && stack.length > 0;
  const isBFS = queue !== undefined;

  // Bounce animation
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

  return (
    <>
      <style>{bounceStyle}</style>
      <div className="space-y-8">
        {/* Current Level Banner (BFS) */}
        {isBFS && currentLevel && !complete && (
          <div
            className="text-lg font-bold px-4 py-2 rounded-lg text-center animate-pulse"
            style={{
              backgroundColor: theme.colors.primary + '20',
              border: `2px solid ${theme.colors.primary}`,
              color: theme.colors.primary,
            }}
          >
            Level {currentLevel} {levelProgress && `(${levelProgress})`}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tree Visualization */}
          <div>
            <TreeAdapter tree={tree} transitionDuration={transitionDuration} />
          </div>

          {/* Stack for DFS or Queue for BFS */}
          {isRecursive && stack && stack.length > 0 ? (
            <div>
              <StackAdapter
                stack={stack}
                transitionDuration={transitionDuration}
                config={{
                  title: 'Call Stack (DFS)',
                }}
              />
            </div>
          ) : isBFS ? (
            <div className="space-y-2">
              <div
                className="text-center text-sm font-medium"
                style={{ color: theme.colors.textSecondary }}
              >
                {queue.length > 0 ? `BFS Queue (${queue.length} node${queue.length > 1 ? 's' : ''})` : 'BFS Queue (empty)'}
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
                    {queue.map((item: any, idx: number) => {
                      const isEnqueuing = item.nodeId === enqueuingNode;
                      const isDequeuing = idx === 0 && dequeuing;

                      return (
                        <div
                          key={idx}
                          className="px-4 py-3 rounded-lg font-mono font-bold text-center transition-all duration-300"
                          style={{
                            backgroundColor: isDequeuing
                              ? theme.colors.primary
                              : isEnqueuing
                              ? theme.colors.success
                              : theme.colors.background,
                            border: `2px solid ${
                              isDequeuing
                                ? theme.colors.primary
                                : isEnqueuing
                                ? theme.colors.success
                                : theme.colors.border
                            }`,
                            color: isDequeuing || isEnqueuing ? '#fff' : theme.colors.text,
                            transform: isDequeuing || isEnqueuing ? 'scale(1.05)' : 'scale(1)',
                            boxShadow:
                              isDequeuing || isEnqueuing ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                            animation: isEnqueuing ? 'bounce 0.5s ease-in-out' : 'none',
                          }}
                        >
                          <div>{item.value}</div>
                          <div className="text-xs opacity-75">depth: {item.depth}</div>
                        </div>
                      );
                    })}
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
                  <div className="text-sm mt-2">No more nodes to explore</div>
                </div>
              )}
            </div>
          ) : null}
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
            {/* Depth Counter */}
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                {isBFS ? 'Current Depth (Level)' : 'Maximum Depth'}
              </div>
              <div
                className="text-5xl font-bold"
                style={{
                  color: complete ? theme.colors.success : theme.colors.primary,
                }}
              >
                {depth}
              </div>
            </div>

            {/* Current Node Info (DFS) */}
            {isRecursive && currentNode && (
              <>
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Node
                  </div>
                  <div className="text-xl font-semibold" style={{ color: theme.colors.primary }}>
                    {currentNodeValue || 'null'}
                  </div>
                </div>

                {leftDepth !== undefined && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Left Depth
                    </div>
                    <div className="text-xl font-semibold" style={{ color: theme.colors.text }}>
                      {leftDepth}
                    </div>
                  </div>
                )}

                {rightDepth !== undefined && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Right Depth
                    </div>
                    <div className="text-xl font-semibold" style={{ color: theme.colors.text }}>
                      {rightDepth}
                    </div>
                  </div>
                )}

                {currentDepth !== undefined && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Node Depth
                    </div>
                    <div className="text-xl font-semibold" style={{ color: theme.colors.success }}>
                      {currentDepth}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Current Node Info (BFS) */}
            {isBFS && currentNodeValue !== undefined && (
              <>
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Node
                  </div>
                  <div className="text-xl font-semibold" style={{ color: theme.colors.primary }}>
                    {currentNodeValue}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Queue Size
                  </div>
                  <div className="text-xl font-semibold" style={{ color: theme.colors.text }}>
                    {queueSize}
                  </div>
                </div>
              </>
            )}

            {/* Calculation Info (DFS) */}
            {calculating && (
              <div
                className="col-span-2 p-4 rounded-lg"
                style={{
                  backgroundColor: theme.colors.primary + '20',
                  border: `2px solid ${theme.colors.primary}`,
                }}
              >
                <div className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                  Calculating Depth
                </div>
                <div className="text-sm font-mono" style={{ color: theme.colors.text }}>
                  depth = 1 + max({leftDepth}, {rightDepth}) = {currentDepth}
                </div>
              </div>
            )}

            {/* Base Case Info (DFS) */}
            {isBaseCase && (
              <div
                className="col-span-2 p-4 rounded-lg"
                style={{
                  backgroundColor: theme.colors.warning + '20',
                  border: `2px solid ${theme.colors.warning}`,
                }}
              >
                <div className="text-lg font-bold" style={{ color: theme.colors.warning }}>
                  Base Case
                </div>
                <div className="text-sm" style={{ color: theme.colors.text }}>
                  Node is null, returning {returnValue}
                </div>
              </div>
            )}

            {/* Level Info (BFS) */}
            {startingLevel && (
              <div
                className="col-span-2 p-4 rounded-lg"
                style={{
                  backgroundColor: theme.colors.primary + '20',
                  border: `2px solid ${theme.colors.primary}`,
                }}
              >
                <div className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                  Starting Level {currentLevel}
                </div>
                <div className="text-sm" style={{ color: theme.colors.text }}>
                  Processing {levelSize} node{levelSize > 1 ? 's' : ''} at this level
                </div>
              </div>
            )}

            {levelComplete && (
              <div
                className="col-span-2 p-4 rounded-lg"
                style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                }}
              >
                <div className="text-lg font-bold" style={{ color: theme.colors.success }}>
                  ✓ Level {currentLevel} Complete
                </div>
                <div className="text-sm" style={{ color: theme.colors.text }}>
                  Processed all nodes at this level
                </div>
              </div>
            )}

            {/* Direction Indicators (DFS) */}
            {exploringLeft && (
              <div
                className="col-span-2 p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.primary + '15',
                  border: `1px solid ${theme.colors.primary}`,
                }}
              >
                <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                  ← Exploring left subtree
                </div>
              </div>
            )}

            {exploringRight && (
              <div
                className="col-span-2 p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.primary + '15',
                  border: `1px solid ${theme.colors.primary}`,
                }}
              >
                <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                  → Exploring right subtree
                </div>
              </div>
            )}

            {/* Adding children indicators (BFS) */}
            {addingLeft && (
              <div
                className="col-span-2 p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.success + '15',
                  border: `1px solid ${theme.colors.success}`,
                }}
              >
                <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                  + Adding left child to queue
                </div>
              </div>
            )}

            {addingRight && (
              <div
                className="col-span-2 p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.success + '15',
                  border: `1px solid ${theme.colors.success}`,
                }}
              >
                <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                  + Adding right child to queue
                </div>
              </div>
            )}

            {/* Complete Status */}
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
                  Maximum depth of the binary tree is {depth}
                </div>
              </div>
            )}

            {/* Recursion Depth Info (DFS) */}
            {isRecursive && stack && stack.length > 0 && (
              <div className="col-span-2 space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Call Stack Depth
                </div>
                <div className="text-xl font-semibold" style={{ color: theme.colors.text }}>
                  {stack.length}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
