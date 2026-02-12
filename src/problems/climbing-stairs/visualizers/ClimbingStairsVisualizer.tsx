import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

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

      {/* Staircase Visualization */}
      <div className="space-y-3">
        <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
          Staircase (n = {n})
        </div>
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="flex items-end justify-center gap-1">
            {Array.from({ length: n }, (_, i) => i + 1).map((stair) => {
              const isTarget = stair === n;
              const isCurrent = stair === currentN || stair === currentIndex;
              const isInDP = dp && stair < dp.length && dp[stair] !== undefined && dp[stair] > 0;

              let stairColor = theme.colors.background;
              if (complete && isTarget) stairColor = '#10b981';
              else if (isCurrent) stairColor = '#fbbf24';
              else if (isInDP) stairColor = '#3b82f680';

              return (
                <div key={stair} className="flex flex-col items-center gap-2">
                  <div
                    className="flex flex-col items-center justify-center transition-all duration-300"
                    style={{
                      width: '40px',
                      height: `${40 + stair * 8}px`,
                      backgroundColor: stairColor,
                      border: `2px solid ${theme.colors.border}`,
                      borderRadius: '4px 4px 0 0',
                    }}
                  >
                    {dp && stair < dp.length && dp[stair] > 0 && (
                      <div className="text-xs font-bold" style={{ color: theme.colors.text }}>
                        {dp[stair]}
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                    {stair}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mt-4 text-xs" style={{ color: theme.colors.textSecondary }}>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#fbbf24',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#3b82f680',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Computed</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#10b981',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Target</span>
            </div>
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
  );
}
