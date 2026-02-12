import { VisualizationProps } from '../../../core/types';
import { useTheme } from '../../../hooks';

// CSS animations for house robbing
const houseRobberAnimations = `
@keyframes robPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes moneyBag {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
  }
}
`;

export function HouseRobberVisualizer({ step }: VisualizationProps) {
  const { visualizationData } = step;
  const { custom } = visualizationData;
  const { theme } = useTheme();

  if (!custom) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    nums,
    currentIndex,
    phase,
    result,
    robChoice,
    skipChoice,
    memo,
    cacheHits,
    cacheMisses,
    dp,
    variables,
    formula,
    complete,
  } = custom;

  // Build houses array from nums
  const houses = nums ? nums.map((val: number, i: number) => ({
    value: val,
    highlight: i === currentIndex,
    label: i === currentIndex ? 'Current' : undefined,
  })) : [];

  return (
    <>
      <style>{houseRobberAnimations}</style>
      <div className="space-y-8">
        {/* Houses Visualization */}
        <div className="space-y-3">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Houses on the Street
          </div>
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
            }}
          >
            <div className="flex items-end justify-center gap-4 min-h-[200px]">
              {houses.map((house: any, i: number) => {
                const isHighlight = house.highlight || i === currentIndex;
                const isCurrent = i === currentIndex;
                const label = house.label;

                // Determine house status
                let houseColor = theme.colors.background;
                let borderColor = theme.colors.border;
                let animation = 'none';

                if (complete && label === 'Rob') {
                  houseColor = '#10b98140';
                  borderColor = '#10b981';
                  animation = 'glow 2s ease-in-out infinite';
                } else if (isCurrent && phase === 'rob_choice') {
                  houseColor = '#10b98140';
                  borderColor = '#10b981';
                  animation = 'robPulse 0.6s ease-in-out';
                } else if (isCurrent && phase === 'skip_choice') {
                  houseColor = '#ef444440';
                  borderColor = '#ef4444';
                  animation = 'shake 0.5s ease-in-out';
                } else if (isCurrent || isHighlight) {
                  houseColor = '#fbbf2440';
                  borderColor = '#fbbf24';
                }

                return (
                  <div key={i} className="relative flex flex-col items-center gap-2">
                    {/* House structure */}
                    <div
                      className="relative flex flex-col items-center justify-end transition-all duration-300"
                      style={{
                        width: '80px',
                        height: '100px',
                        animation,
                      }}
                    >
                      {/* Roof */}
                      <div
                        className="absolute"
                        style={{
                          top: '0',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '0',
                          height: '0',
                          borderLeft: '45px solid transparent',
                          borderRight: '45px solid transparent',
                          borderBottom: `35px solid ${borderColor}`,
                        }}
                      />

                      {/* House body */}
                      <div
                        className="relative flex flex-col items-center justify-center transition-all duration-300"
                        style={{
                          width: '80px',
                          height: '70px',
                          backgroundColor: houseColor,
                          border: `3px solid ${borderColor}`,
                          borderRadius: '4px',
                          marginTop: '30px',
                        }}
                      >
                        {/* House emoji and money */}
                        <div className="text-3xl">🏠</div>

                        {/* Money amount */}
                        <div
                          className="text-lg font-bold mt-1"
                          style={{
                            color: theme.colors.text,
                          }}
                        >
                          ${house.value}
                        </div>

                        {/* Money bag for robbed houses */}
                        {label === 'Rob' && (
                          <div
                            className="absolute"
                            style={{
                              top: '-25px',
                              fontSize: '28px',
                              animation: 'moneyBag 0.5s ease-out',
                            }}
                          >
                            💰
                          </div>
                        )}

                        {/* Skip indicator */}
                        {label === 'Skip' && (
                          <div
                            className="absolute"
                            style={{
                              top: '-25px',
                              fontSize: '28px',
                            }}
                          >
                            ⛔
                          </div>
                        )}

                        {/* Decision labels */}
                        {label && !['Rob', 'Skip'].includes(label) && (
                          <div
                            className="absolute -top-8 text-xs font-bold px-2 py-1 rounded whitespace-nowrap"
                            style={{
                              backgroundColor: theme.colors.primary + '40',
                              border: `1px solid ${theme.colors.primary}`,
                              color: theme.colors.primary,
                            }}
                          >
                            {label}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* House index */}
                    <div
                      className="text-sm font-bold px-2 py-1 rounded"
                      style={{
                        color: isCurrent ? '#fbbf24' : theme.colors.textSecondary,
                        backgroundColor: isCurrent ? '#fbbf2420' : 'transparent',
                      }}
                    >
                      House {i}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Constraint explanation */}
            <div
              className="mt-8 p-4 rounded-lg text-sm text-center"
              style={{
                backgroundColor: theme.colors.background,
                border: `2px solid ${theme.colors.border}`,
                color: theme.colors.text,
              }}
            >
              🚫 <strong>Constraint:</strong> Cannot rob two adjacent houses (security systems are connected)
              <br />
              💰 <strong>Goal:</strong> Maximize total money robbed
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 justify-center mt-6 text-sm" style={{ color: theme.colors.textSecondary }}>
              <div className="flex items-center gap-2">
                <div className="text-xl">💰</div>
                <span>Robbed House</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl">⛔</div>
                <span>Skipped House</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{
                    backgroundColor: '#10b98140',
                    border: `2px solid #10b981`,
                  }}
                />
                <span>Rob Choice</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{
                    backgroundColor: '#ef444440',
                    border: `2px solid #ef4444`,
                  }}
                />
                <span>Skip Choice</span>
              </div>
            </div>
          </div>
        </div>

        {/* DP Array values */}
        {dp && (
          <div className="space-y-3">
            <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              DP Array - Maximum Money Up To Each House
            </div>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: theme.colors.surface,
                border: `2px solid ${theme.colors.border}`,
              }}
            >
              <div className="flex gap-3 justify-center flex-wrap">
                {dp.map((val: number, i: number) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg text-center min-w-[80px] transition-all duration-300"
                    style={{
                      backgroundColor: i === currentIndex ? theme.colors.primary + '30' : theme.colors.background,
                      border: `2px solid ${i === currentIndex ? theme.colors.primary : theme.colors.border}`,
                    }}
                  >
                    <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                      dp[{i}]
                    </div>
                    <div className="text-2xl font-bold mt-1" style={{ color: theme.colors.text }}>
                      ${val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Memoization Cache */}
        {memo && memo.length > 0 && (
          <div className="space-y-3">
            <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Memoization Cache
              {cacheHits !== undefined && (
                <span className="ml-2 text-xs">
                  (Hits: <span style={{ color: '#10b981' }}>{cacheHits}</span>,
                  Misses: <span style={{ color: '#ef4444' }}>{cacheMisses}</span>)
                </span>
              )}
            </div>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: theme.colors.surface,
                border: `2px solid ${theme.colors.border}`,
              }}
            >
              <div className="flex gap-3 justify-center flex-wrap">
                {memo.map((entry: any) => (
                  <div
                    key={entry.index}
                    className="p-4 rounded-lg text-center min-w-[80px] transition-all duration-300"
                    style={{
                      backgroundColor: entry.highlight ? '#10b98140' : theme.colors.background,
                      border: `2px solid ${entry.highlight ? '#10b981' : theme.colors.border}`,
                    }}
                  >
                    <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                      memo[{entry.index}]
                    </div>
                    <div className="text-2xl font-bold mt-1" style={{ color: theme.colors.text }}>
                      ${entry.value}
                    </div>
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
                      ${variable.value}
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
            {currentIndex !== undefined && currentIndex >= 0 && !complete && (
              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Current House
                </div>
                <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                  House {currentIndex} {houses[currentIndex] ? `($${typeof houses[currentIndex] === 'object' ? (houses[currentIndex] as any).value : houses[currentIndex]})` : ''}
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

            {/* Decision choices */}
            {(robChoice !== undefined || skipChoice !== undefined) && (
              <div className="grid grid-cols-2 gap-4">
                {robChoice !== undefined && (
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: '#10b981' + '20',
                      border: `2px solid #10b981`,
                    }}
                  >
                    <div className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                      Rob Current
                    </div>
                    <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
                      ${robChoice}
                    </div>
                  </div>
                )}
                {skipChoice !== undefined && (
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: '#ef4444' + '20',
                      border: `2px solid #ef4444`,
                    }}
                  >
                    <div className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                      Skip Current
                    </div>
                    <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>
                      ${skipChoice}
                    </div>
                  </div>
                )}
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
                <div className="text-sm font-mono font-medium text-center" style={{ color: theme.colors.primary }}>
                  {formula}
                </div>
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
                  Maximum Money Robbed
                </div>
                <div className="text-4xl font-bold" style={{ color: '#10b981' }}>
                  ${result}
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
            Dynamic Programming Recurrence
          </div>
          <div
            className="p-4 rounded-lg font-mono text-center"
            style={{
              backgroundColor: theme.colors.background,
              border: `2px solid ${theme.colors.border}`,
              color: theme.colors.text,
            }}
          >
            dp[i] = max(dp[i-1], dp[i-2] + nums[i])
          </div>
          <div className="text-xs mt-3 space-y-1" style={{ color: theme.colors.textSecondary }}>
            <div><strong>dp[i-1]:</strong> Skip current house, take max from previous houses</div>
            <div><strong>dp[i-2] + nums[i]:</strong> Rob current house, add to max from i-2 (can't rob adjacent)</div>
            <div className="pt-2 border-t mt-2" style={{ borderColor: theme.colors.border }}>
              💡 At each house, choose the option that gives more money!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
