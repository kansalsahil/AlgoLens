import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function MaximumSubarrayVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array || !custom) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    nums,
    maxSum,
    currentSum,
    currentIndex,
    start,
    end,
    currentStart,
    currentEnd,
    bestStart,
    bestEnd,
    extendSum,
    startNewSum,
    comparing,
    extended,
    startedNew,
    newMaxFound,
    complete,
  } = custom;

  // Calculate subarray values
  const currentSubarray = currentStart !== undefined && currentEnd !== undefined && currentEnd >= currentStart
    ? nums.slice(currentStart, currentEnd + 1)
    : [];

  const bestSubarray = bestStart !== undefined && bestEnd !== undefined && bestEnd >= bestStart
    ? nums.slice(bestStart, bestEnd + 1)
    : [];

  return (
    <div className="space-y-8">
      {/* Array Visualization */}
      <div className="space-y-2">
        <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
          Array Elements
        </div>
        <ArrayAdapter array={array} transitionDuration={transitionDuration} />
      </div>

      {/* Visual Bar Chart */}
      <div className="space-y-3">
        <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
          Subarray Visualization
        </div>
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="flex items-end justify-around gap-1 h-48">
            {nums.map((value: number, idx: number) => {
              const maxAbsValue = Math.max(...nums.map((n: number) => Math.abs(n)));
              const isNegative = value < 0;
              const height = (Math.abs(value) / maxAbsValue) * 80;

              let barColor = theme.colors.background;

              // Color logic
              if (complete) {
                if (idx >= bestStart && idx <= bestEnd) {
                  barColor = '#10b981';
                }
              } else if (currentStart !== undefined && currentEnd !== undefined && idx >= currentStart && idx <= currentEnd) {
                barColor = '#8b5cf680';
              } else if (start !== undefined && end !== undefined && idx >= start && idx <= end) {
                barColor = '#3b82f680';
              }

              if (idx === currentIndex && !complete) {
                barColor = '#fbbf24';
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                  <div className="text-xs font-semibold" style={{ color: theme.colors.text }}>
                    {value}
                  </div>
                  <div className="w-full flex flex-col justify-end items-center" style={{ height: '80%' }}>
                    {!isNegative ? (
                      <div
                        className="w-full rounded-t transition-all duration-300"
                        style={{
                          height: `${height}%`,
                          backgroundColor: barColor,
                          border: `2px solid ${theme.colors.border}`,
                          minHeight: '10px',
                        }}
                      />
                    ) : (
                      <div
                        className="w-full rounded-b transition-all duration-300"
                        style={{
                          height: `${height}%`,
                          backgroundColor: barColor,
                          border: `2px solid ${theme.colors.border}`,
                          minHeight: '10px',
                          marginTop: 'auto',
                        }}
                      />
                    )}
                  </div>
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    {idx}
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
                  backgroundColor: '#8b5cf680',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Current Subarray</span>
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
              <span>Best Subarray</span>
            </div>
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
              <span>Current Element</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div
        className="rounded-xl p-6 space-y-4"
        style={{
          backgroundColor: theme.colors.surface,
          border: `2px solid ${theme.colors.border}`,
          boxShadow: `0 4px 16px ${theme.colors.border}40`,
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Current Sum */}
          {currentSum !== undefined && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Current Sum
              </div>
              <div className="text-2xl font-bold" style={{ color: '#8b5cf6' }}>
                {currentSum}
              </div>
            </div>
          )}

          {/* Maximum Sum */}
          <div className="space-y-1">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Maximum Sum
            </div>
            <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
              {maxSum}
            </div>
          </div>

          {/* Current Subarray */}
          {currentSubarray.length > 0 && !complete && (
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Current Subarray
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg" style={{ color: theme.colors.text }}>
                  [{currentSubarray.join(', ')}]
                </span>
                <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  indices [{currentStart}..{currentEnd}]
                </span>
              </div>
            </div>
          )}

          {/* Best Subarray */}
          {bestSubarray.length > 0 && (
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                {complete ? 'Maximum Subarray' : 'Best Subarray So Far'}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg" style={{ color: '#10b981' }}>
                  [{bestSubarray.join(', ')}]
                </span>
                <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  indices [{bestStart}..{bestEnd}]
                </span>
              </div>
            </div>
          )}

          {/* Comparison (Kadane's specific) */}
          {comparing && extendSum !== undefined && startNewSum !== undefined && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: theme.colors.primary + '20',
                border: `2px solid ${theme.colors.primary}`,
              }}
            >
              <div className="text-sm font-medium mb-2" style={{ color: theme.colors.primary }}>
                Decision Point:
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span style={{ color: theme.colors.textSecondary }}>Extend: </span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {extendSum}
                  </span>
                </div>
                <div>
                  <span style={{ color: theme.colors.textSecondary }}>Start New: </span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {startNewSum}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Extended Message */}
          {extended && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: '#8b5cf6' + '20',
                border: `2px solid #8b5cf6`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#8b5cf6' }}>
                Extended existing subarray
              </div>
            </div>
          )}

          {/* Started New Message */}
          {startedNew && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: '#fbbf24' + '20',
                border: `2px solid #fbbf24`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#fbbf24' }}>
                Started new subarray
              </div>
            </div>
          )}

          {/* New Max Found */}
          {newMaxFound && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: '#10b981' + '20',
                border: `2px solid #10b981`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#10b981' }}>
                New maximum sum found: {maxSum}
              </div>
            </div>
          )}

          {/* Final Result */}
          {complete && (
            <div
              className="col-span-2 rounded-lg p-4 text-center"
              style={{
                backgroundColor: '#10b981' + '20',
                border: `2px solid #10b981`,
              }}
            >
              <div className="text-lg font-bold" style={{ color: '#10b981' }}>
                Maximum Subarray Sum: {maxSum}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
