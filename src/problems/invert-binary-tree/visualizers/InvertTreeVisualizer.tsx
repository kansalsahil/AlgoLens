import { VisualizationProps } from '../../../core/types';
import { TreeAdapter, StackAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function InvertTreeVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { trees, custom, stack } = visualizationData;
  const { theme } = useTheme();

  if (!trees || trees.length === 0) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    queue = [],
    queueSize = 0,
    invertedNodes = [],
    currentNode,
    preparingSwap,
    swapped,
    swapLeftValue,
    swapRightValue,
    newLeftValue,
    newRightValue,
    enqueuingNode,
    addingLeft,
    addingRight,
    dequeuing,
    complete,
    visiting,
    exploringLeft,
    exploringRight,
    isBaseCase,
  } = custom || {};

  const isRecursive = stack && stack.length > 0;
  const isBFS = queue !== undefined && queue.length !== undefined;

  // Swap animation styles
  const swapAnimationStyle = `
    @keyframes swapPulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.15);
        opacity: 0.8;
      }
    }
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }
    @keyframes slideIn {
      0% {
        transform: translateX(-20px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;

  return (
    <>
      <style>{swapAnimationStyle}</style>
      <div className="space-y-6">
        {/* Status Banner */}
        {preparingSwap && (
          <div
            className="text-lg font-bold px-4 py-3 rounded-lg text-center animate-pulse"
            style={{
              backgroundColor: theme.colors.warning + '20',
              border: `2px solid ${theme.colors.warning}`,
              color: theme.colors.warning,
            }}
          >
            ⇄ Swapping: Left ({swapLeftValue}) ↔ Right ({swapRightValue})
          </div>
        )}
        {swapped && (
          <div
            className="text-lg font-bold px-4 py-3 rounded-lg text-center"
            style={{
              backgroundColor: theme.colors.success + '20',
              border: `2px solid ${theme.colors.success}`,
              color: theme.colors.success,
              animation: 'slideIn 0.3s ease-out',
            }}
          >
            ✓ Swapped! Left is now {newLeftValue}, Right is now {newRightValue}
          </div>
        )}
        {complete && (
          <div
            className="text-xl font-bold px-4 py-3 rounded-lg text-center"
            style={{
              backgroundColor: theme.colors.success + '20',
              border: `2px solid ${theme.colors.success}`,
              color: theme.colors.success,
            }}
          >
            ✓ Tree Inversion Complete! ({invertedNodes.length} nodes inverted)
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {/* Trees: Side-by-Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trees.map((tree, index) => (
              <div key={tree.id} className="space-y-2">
                <div
                  className="text-center text-sm font-bold py-2 rounded-t-lg"
                  style={{
                    backgroundColor: index === 0 ? theme.colors.background : theme.colors.primary + '15',
                    border: `2px solid ${index === 0 ? theme.colors.border : theme.colors.primary}`,
                    borderBottom: 'none',
                    color: index === 0 ? theme.colors.textSecondary : theme.colors.primary,
                  }}
                >
                  {tree.name}
                </div>
                <div
                  style={{
                    border: `2px solid ${index === 0 ? theme.colors.border : theme.colors.primary}`,
                    borderTop: 'none',
                    borderRadius: '0 0 12px 12px',
                    padding: '16px',
                    backgroundColor: theme.colors.surface,
                    minHeight: '400px',
                  }}
                >
                  <TreeAdapter tree={tree} transitionDuration={transitionDuration} />
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          {invertedNodes.length > 0 && !complete && (
            <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: theme.colors.textSecondary, fontSize: '14px', fontWeight: 'bold' }}>
                  Inversion Progress
                </span>
                <span style={{ color: theme.colors.primary, fontSize: '14px', fontWeight: 'bold' }}>
                  {invertedNodes.length} node{invertedNodes.length !== 1 ? 's' : ''} inverted
                </span>
              </div>
              <div
                className="h-3 rounded-full overflow-hidden"
                style={{ backgroundColor: theme.colors.background }}
              >
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${(invertedNodes.length / (invertedNodes.length + queueSize)) * 100}%`,
                    backgroundColor: theme.colors.success,
                  }}
                />
              </div>
            </div>
          )}

          {/* Stack for Recursive or Queue for Iterative */}
          {isRecursive && stack && stack.length > 0 ? (
            <div>
              <StackAdapter
                stack={stack}
                transitionDuration={transitionDuration}
                config={{
                  title: 'Call Stack (Recursive)',
                }}
              />
            </div>
          ) : isBFS && queueSize > 0 ? (
            <div className="space-y-2">
              <div
                className="text-center text-sm font-medium"
                style={{ color: theme.colors.textSecondary }}
              >
                {queue.length > 0 ? `BFS Queue (${queue.length} node${queue.length > 1 ? 's' : ''})` : 'BFS Queue (empty)'}
              </div>
              {queue.length > 0 && (
                <div
                  className="p-4 rounded-xl space-y-3"
                  style={{
                    backgroundColor: theme.colors.surface,
                    border: `2px solid ${theme.colors.border}`,
                    minHeight: '200px',
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
                          {item.value}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="text-xs font-semibold text-center py-1"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    FRONT →
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Inverted Nodes Legend */}
          {invertedNodes.length > 0 && (
            <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
              <div style={{ color: theme.colors.textSecondary, fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                Inverted Nodes
              </div>
              <div className="flex flex-wrap gap-2">
                {invertedNodes.map((nodeId: string, index: number) => (
                  <div
                    key={nodeId}
                    className="px-3 py-1 rounded-full font-mono text-sm"
                    style={{
                      backgroundColor: theme.colors.success + '20',
                      border: `1px solid ${theme.colors.success}`,
                      color: theme.colors.success,
                    }}
                  >
                    ✓
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Swap Visual Indicator */}
          {(preparingSwap || swapped) && (
            <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: theme.colors.surface, border: `2px solid ${preparingSwap ? theme.colors.warning : theme.colors.success}` }}>
              <div className="grid grid-cols-3 gap-4 items-center">
                <div
                  className="text-center px-4 py-3 rounded-lg font-bold"
                  style={{
                    backgroundColor: theme.colors.background,
                    border: `2px solid ${theme.colors.border}`,
                    color: theme.colors.text,
                    animation: preparingSwap ? 'swapPulse 1s ease-in-out infinite' : 'none',
                  }}
                >
                  Left
                  <div className="text-xl mt-1" style={{ color: theme.colors.primary }}>
                    {preparingSwap ? swapLeftValue : newLeftValue}
                  </div>
                </div>
                <div
                  className="text-center text-3xl"
                  style={{
                    color: preparingSwap ? theme.colors.warning : theme.colors.success,
                    animation: preparingSwap ? 'swapPulse 1s ease-in-out infinite' : 'none',
                  }}
                >
                  ⇄
                </div>
                <div
                  className="text-center px-4 py-3 rounded-lg font-bold"
                  style={{
                    backgroundColor: theme.colors.background,
                    border: `2px solid ${theme.colors.border}`,
                    color: theme.colors.text,
                    animation: preparingSwap ? 'swapPulse 1s ease-in-out infinite' : 'none',
                  }}
                >
                  Right
                  <div className="text-xl mt-1" style={{ color: theme.colors.primary }}>
                    {preparingSwap ? swapRightValue : newRightValue}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
