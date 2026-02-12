import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

// CSS animations for climbing
const climbingAnimations = `
@keyframes climb {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pathPulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes personWalk {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2px);
  }
}
`;

export function ClimbingStairsVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  if (!custom) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    n,
    currentN,
    callStack,
    treeNodes,
    memoArray,
    dp,
    currentIndex,
    phase,
    result,
    leftResult,
    rightResult,
    calculation,
    formula,
    variables,
    complete,
  } = custom;

  return (
    <>
      <style>{climbingAnimations}</style>
      <div className="space-y-8">
        {/* DP Array Visualization (for Tabulation) */}
        {arrays && arrays.length > 0 && (
          <div className="space-y-2">
            <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              DP Array
            </div>
            <ArrayAdapter array={arrays[0]} transitionDuration={transitionDuration} />
          </div>
        )}

        {/* Enhanced Staircase Visualization */}
        <div className="space-y-3">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Staircase (n = {n}) - Each stair shows number of ways to reach it
          </div>
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
            }}
          >
            <div className="relative flex items-end justify-center gap-3 min-h-[300px]">
              {/* Ground level (stair 0) */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex flex-col items-center justify-center transition-all duration-300"
                  style={{
                    width: '60px',
                    height: '50px',
                    backgroundColor: theme.colors.primary + '30',
                    border: `3px solid ${theme.colors.primary}`,
                    borderRadius: '6px 6px 0 0',
                  }}
                >
                  <div className="text-2xl">🏁</div>
                </div>
                <div className="text-sm font-bold" style={{ color: theme.colors.primary }}>
                  Start
                </div>
              </div>

              {Array.from({ length: n }, (_, i) => i + 1).map((stair) => {
                const isTarget = stair === n;
                const isCurrent = stair === currentN || stair === currentIndex;
                const isInDP = dp && stair < dp.length && dp[stair] !== undefined && dp[stair] > 0;

                let stairColor = theme.colors.background;
                let borderColor = theme.colors.border;
                if (complete && isTarget) {
                  stairColor = '#10b981';
                  borderColor = '#10b981';
                } else if (isCurrent) {
                  stairColor = '#fbbf24';
                  borderColor = '#fbbf24';
                } else if (isInDP) {
                  stairColor = '#3b82f680';
                  borderColor = '#3b82f6';
                }

                const waysToReach = dp && stair < dp.length ? dp[stair] : null;

                return (
                  <div key={stair} className="relative flex flex-col items-center gap-2">
                    {/* Show path arrows from previous stairs */}
                    {isCurrent && stair > 1 && (
                      <>
                        {/* 1-step arrow from (i-1) */}
                        <div
                          className="absolute"
                          style={{
                            bottom: '80px',
                            right: '65px',
                            fontSize: '24px',
                            animation: 'pathPulse 1.5s ease-in-out infinite',
                            color: '#3b82f6',
                          }}
                        >
                          ↗
                        </div>
                        {/* 2-step arrow from (i-2) */}
                        {stair > 1 && (
                          <div
                            className="absolute"
                            style={{
                              bottom: '100px',
                              right: '130px',
                              fontSize: '28px',
                              animation: 'pathPulse 1.5s ease-in-out infinite 0.3s',
                              color: '#10b981',
                            }}
                          >
                            ↗↗
                          </div>
                        )}
                      </>
                    )}

                    <div
                      className="flex flex-col items-center justify-center transition-all duration-300 relative"
                      style={{
                        width: '60px',
                        height: `${50 + stair * 20}px`,
                        backgroundColor: stairColor,
                        border: `3px solid ${borderColor}`,
                        borderRadius: '6px 6px 0 0',
                        animation: isCurrent ? 'bounce 0.6s ease-in-out' : 'none',
                      }}
                    >
                      {/* Person icon on current stair */}
                      {isCurrent && (
                        <div
                          className="absolute"
                          style={{
                            top: '-30px',
                            fontSize: '28px',
                            animation: 'personWalk 1s ease-in-out infinite',
                          }}
                        >
                          🚶
                        </div>
                      )}

                      {/* Number of ways to reach this stair */}
                      {waysToReach !== null && waysToReach > 0 && (
                        <div
                          className="text-2xl font-bold"
                          style={{
                            color: isTarget && complete ? '#fff' : theme.colors.text,
                          }}
                        >
                          {waysToReach}
                        </div>
                      )}

                      {/* Target flag */}
                      {isTarget && (
                        <div className="absolute" style={{ top: '-30px', fontSize: '24px' }}>
                          🏆
                        </div>
                      )}
                    </div>

                    {/* Stair number label */}
                    <div
                      className="text-sm font-bold px-2 py-1 rounded"
                      style={{
                        color: isCurrent ? '#fbbf24' : theme.colors.textSecondary,
                        backgroundColor: isCurrent ? '#fbbf2420' : 'transparent',
                      }}
                    >
                      Stair {stair}
                    </div>

                    {/* Show formula when computing */}
                    {isCurrent && stair > 2 && dp && dp[stair - 1] > 0 && dp[stair - 2] > 0 && (
                      <div
                        className="absolute -bottom-12 text-xs font-mono font-bold whitespace-nowrap px-2 py-1 rounded"
                        style={{
                          backgroundColor: theme.colors.primary + '20',
                          border: `1px solid ${theme.colors.primary}`,
                          color: theme.colors.primary,
                        }}
                      >
                        {dp[stair - 1]} + {dp[stair - 2]} = {waysToReach || '?'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 justify-center mt-8 text-sm" style={{ color: theme.colors.textSecondary }}>
              <div className="flex items-center gap-2">
                <div className="text-xl">🏁</div>
                <span>Start (Ground)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl">🚶</div>
                <span>Current Position</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl">🏆</div>
                <span>Target (Stair {n})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl" style={{ color: '#3b82f6' }}>↗</div>
                <span>1-step path</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl" style={{ color: '#10b981' }}>↗↗</div>
                <span>2-step path</span>
              </div>
            </div>

            {/* Explanation */}
            <div
              className="mt-6 p-4 rounded-lg text-sm text-center"
              style={{
                backgroundColor: theme.colors.background,
                border: `2px solid ${theme.colors.border}`,
                color: theme.colors.text,
              }}
            >
              💡 The number in each stair shows <strong>how many different ways</strong> you can reach that stair.
              <br />
              You can take either a 1-step (↗) or 2-step (↗↗) to reach each stair.
            </div>
          </div>
        </div>

      {/* Memoization Cache (for Memoization solution) */}
      {memoArray && memoArray.length > 0 && (
        <div className="space-y-3">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Memoization Cache
          </div>
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
            }}
          >
            <div className="grid grid-cols-4 gap-3">
              {memoArray.map((entry: any) => (
                <div
                  key={entry.index}
                  className="p-3 rounded-lg text-center transition-all duration-300"
                  style={{
                    backgroundColor: entry.highlight ? theme.colors.primary + '30' : theme.colors.background,
                    border: `2px solid ${entry.highlight ? theme.colors.primary : theme.colors.border}`,
                  }}
                >
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    dp[{entry.index}]
                  </div>
                  <div className="text-xl font-bold mt-1" style={{ color: theme.colors.text }}>
                    {entry.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recursion Tree (for Recursive solution) */}
      {treeNodes && treeNodes.length > 0 && phase !== 'start' && (
        <div className="space-y-3">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Recursion Tree
          </div>
          <div
            className="p-6 rounded-xl overflow-x-auto"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
            }}
          >
            <div className="space-y-4 min-w-max">
              {Array.from(new Set(treeNodes.map((node: any) => node.depth))).map((d) => {
                const nodesAtDepth = treeNodes.filter((node: any) => node.depth === d);
                return (
                  <div key={String(d)} className="flex gap-2 justify-center items-center">
                    {nodesAtDepth.map((node: any, idx: number) => (
                      <div
                        key={`${d}-${idx}`}
                        className="p-2 rounded-lg text-center min-w-[60px] transition-all duration-300"
                        style={{
                          backgroundColor: node.result !== undefined ? '#10b98140' : '#fbbf2440',
                          border: `2px solid ${node.result !== undefined ? '#10b981' : '#fbbf24'}`,
                        }}
                      >
                        <div className="text-xs font-semibold" style={{ color: theme.colors.text }}>
                          f({node.n})
                        </div>
                        {node.result !== undefined && (
                          <div className="text-lg font-bold mt-1" style={{ color: '#10b981' }}>
                            {node.result}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Call Stack (for Recursive/Memoization) */}
      {callStack && callStack.length > 0 && (
        <div className="space-y-3">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Call Stack
          </div>
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
            }}
          >
            <div className="flex flex-col gap-2 items-center">
              {callStack.slice().reverse().map((call: any, idx: number) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-lg font-mono text-sm"
                  style={{
                    backgroundColor: idx === 0 ? '#3b82f640' : theme.colors.background,
                    border: `2px solid ${idx === 0 ? '#3b82f6' : theme.colors.border}`,
                    color: theme.colors.text,
                  }}
                >
                  climbStairs({call.n})
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Space Optimized Variables */}
      {variables && variables.length > 0 && (
        <div className="space-y-3">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Variables (O(1) Space)
          </div>
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
            }}
          >
            <div className="grid grid-cols-3 gap-4">
              {variables.map((variable: any) => (
                <div
                  key={variable.name}
                  className="p-4 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: variable.updated ? theme.colors.primary + '30' : theme.colors.background,
                    border: `2px solid ${variable.updated ? theme.colors.primary : theme.colors.border}`,
                  }}
                >
                  <div className="text-xs font-mono" style={{ color: theme.colors.textSecondary }}>
                    {variable.name}
                  </div>
                  <div className="text-2xl font-bold mt-1" style={{ color: theme.colors.text }}>
                    {variable.value}
                  </div>
                  {variable.represents && (
                    <div className="text-xs mt-1" style={{ color: theme.colors.textSecondary }}>
                      {variable.represents}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div
        className="rounded-xl p-6 space-y-4"
        style={{
          backgroundColor: theme.colors.surface,
          border: `2px solid ${theme.colors.border}`,
          boxShadow: `0 4px 16px ${theme.colors.border}40`,
        }}
      >
        <div className="space-y-3">
          {/* Current State */}
          {currentN !== undefined && currentN >= 0 && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Current Computation
              </div>
              <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                climbStairs({currentN})
              </div>
            </div>
          )}

          {/* Formula Display */}
          {formula && (
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: theme.colors.primary + '20',
                border: `2px solid ${theme.colors.primary}`,
              }}
            >
              <div className="text-sm font-mono font-medium" style={{ color: theme.colors.primary }}>
                {formula}
              </div>
            </div>
          )}

          {/* Calculation Display */}
          {calculation && (
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: '#10b981' + '20',
                border: `2px solid #10b981`,
              }}
            >
              <div className="text-sm font-mono font-medium" style={{ color: '#10b981' }}>
                {calculation}
              </div>
            </div>
          )}

          {/* Phase Information */}
          {phase && !complete && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Phase
              </div>
              <div className="text-lg font-semibold capitalize" style={{ color: theme.colors.text }}>
                {phase.replace(/_/g, ' ')}
              </div>
            </div>
          )}

          {/* Result Display */}
          {(leftResult !== undefined || rightResult !== undefined) && (
            <div className="grid grid-cols-2 gap-4">
              {leftResult !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Left Subtree
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#3b82f6' }}>
                    {leftResult}
                  </div>
                </div>
              )}
              {rightResult !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Right Subtree
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#10b981' }}>
                    {rightResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Final Result */}
          {complete && result !== undefined && (
            <div
              className="rounded-lg p-6 text-center"
              style={{
                backgroundColor: '#10b981' + '20',
                border: `2px solid #10b981`,
              }}
            >
              <div className="text-sm font-medium mb-2" style={{ color: theme.colors.textSecondary }}>
                Final Answer
              </div>
              <div className="text-3xl font-bold" style={{ color: '#10b981' }}>
                {result} ways
              </div>
              <div className="text-sm mt-2" style={{ color: theme.colors.textSecondary }}>
                to climb {n} stairs
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DP Formula Explanation */}
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: theme.colors.surface,
          border: `2px solid ${theme.colors.border}`,
        }}
      >
        <div className="text-sm font-medium mb-3" style={{ color: theme.colors.textSecondary }}>
          Dynamic Programming Relation
        </div>
        <div
          className="p-4 rounded-lg font-mono text-center"
          style={{
            backgroundColor: theme.colors.background,
            border: `2px solid ${theme.colors.border}`,
            color: theme.colors.text,
          }}
        >
          dp[i] = dp[i-1] + dp[i-2]
        </div>
        <div className="text-xs mt-3 text-center" style={{ color: theme.colors.textSecondary }}>
          To reach stair i, you can come from stair (i-1) with a 1-step or from stair (i-2) with a 2-step
        </div>
      </div>
      </div>
    </>
  );
}
