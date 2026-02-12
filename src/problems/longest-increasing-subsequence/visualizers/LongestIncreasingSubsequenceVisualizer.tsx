import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function LongestIncreasingSubsequenceVisualizer({
  step,
  transitionDuration,
}: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const numsArray = arrays?.[0];
  const tailsArray = arrays?.[1];

  if (!numsArray || !custom) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    nums,
    dp,
    maxLength,
    maxIndex,
    currentIndex,
    compareIndex,
    canExtend,
    updated,
    newMaxFound,
    phase,
    comparisons,
    lis,
    lisIndices,
    complete,
    // Binary search specific
    currentNum,
    binarySearch,
    insertPosition,
    appended,
    replaced,
    oldValue,
    lisLength,
  } = custom;

  // Reconstruct LIS indices for highlighting
  const getLisIndices = () => {
    if (lisIndices) return lisIndices;
    if (!lis || !nums) return [];

    const indices: number[] = [];
    let searchStart = 0;
    for (const val of lis) {
      const idx = nums.indexOf(val, searchStart);
      if (idx !== -1) {
        indices.push(idx);
        searchStart = idx + 1;
      }
    }
    return indices;
  };

  const lisHighlightIndices = getLisIndices();

  return (
    <div className="space-y-8">
      {/* Array Visualization */}
      <div className="space-y-2">
        <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
          Input Array
        </div>
        <ArrayAdapter array={numsArray} transitionDuration={transitionDuration} />
      </div>

      {/* Visual Subsequence with Arrows */}
      {nums && (
        <div className="space-y-3">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Subsequence Visualization
          </div>
          <div
            className="p-6 rounded-xl relative"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
            }}
          >
            <div className="flex items-center justify-around relative" style={{ minHeight: '120px' }}>
              {nums.map((value: number, idx: number) => {
                const isInLis = complete && lisHighlightIndices.includes(idx);
                const isCurrent = idx === currentIndex;
                const isComparing = idx === compareIndex;
                const isMax = idx === maxIndex && phase === 'new-max';

                let bgColor = theme.colors.background;
                let borderColor = theme.colors.border;
                let textColor = theme.colors.text;

                if (isInLis) {
                  bgColor = '#10b98120';
                  borderColor = '#10b981';
                  textColor = '#10b981';
                } else if (isCurrent) {
                  bgColor = '#8b5cf620';
                  borderColor = '#8b5cf6';
                  textColor = '#8b5cf6';
                } else if (isComparing) {
                  bgColor = '#f59e0b20';
                  borderColor = '#f59e0b';
                  textColor = '#f59e0b';
                } else if (isMax) {
                  bgColor = '#10b98120';
                  borderColor = '#10b981';
                }

                return (
                  <div key={idx} className="relative flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: bgColor,
                        border: `2px solid ${borderColor}`,
                        color: textColor,
                        transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      {value}
                    </div>
                    <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                      {idx}
                    </div>

                    {/* Arrow to next element in LIS */}
                    {complete &&
                      isInLis &&
                      idx < nums.length - 1 &&
                      lisHighlightIndices.includes(idx + 1) && (
                        <div
                          className="absolute"
                          style={{
                            left: '100%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '30px',
                            height: '2px',
                            backgroundColor: '#10b981',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              right: '-4px',
                              top: '-3px',
                              width: '0',
                              height: '0',
                              borderLeft: '8px solid #10b981',
                              borderTop: '4px solid transparent',
                              borderBottom: '4px solid transparent',
                            }}
                          />
                        </div>
                      )}

                    {/* Arrow for comparisons in DP */}
                    {phase === 'comparing' &&
                      canExtend &&
                      idx === compareIndex &&
                      currentIndex !== undefined && (
                        <div
                          className="absolute"
                          style={{
                            left: '50%',
                            top: '-40px',
                            width: '2px',
                            height: '30px',
                            backgroundColor: '#10b981',
                            opacity: 0.5,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: '-3px',
                              bottom: '-4px',
                              width: '0',
                              height: '0',
                              borderTop: '8px solid #10b981',
                              borderLeft: '4px solid transparent',
                              borderRight: '4px solid transparent',
                              opacity: 0.5,
                            }}
                          />
                        </div>
                      )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center mt-6 text-xs" style={{ color: theme.colors.textSecondary }}>
              <div className="flex items-center gap-2">
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#8b5cf620',
                    border: `2px solid #8b5cf6`,
                    borderRadius: '4px',
                  }}
                />
                <span>Current</span>
              </div>
              {compareIndex !== undefined && (
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#f59e0b20',
                      border: `2px solid #f59e0b`,
                      borderRadius: '4px',
                    }}
                  />
                  <span>Comparing</span>
                </div>
              )}
              {complete && (
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#10b98120',
                      border: `2px solid #10b981`,
                      borderRadius: '4px',
                    }}
                  />
                  <span>LIS Element</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DP Array (if using DP solution) */}
      {dp && (
        <div className="space-y-2">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            DP Array (LIS length ending at each index)
          </div>
          <ArrayAdapter array={arrays[1]} transitionDuration={transitionDuration} />
        </div>
      )}

      {/* Tails Array (if using Binary Search solution) */}
      {tailsArray && (
        <div className="space-y-2">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Tails Array (smallest ending value for each LIS length)
          </div>
          <ArrayAdapter array={tailsArray} transitionDuration={transitionDuration} />
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
        <div className="grid grid-cols-2 gap-4">
          {/* Current LIS Length */}
          {(maxLength !== undefined || lisLength !== undefined) && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                {complete ? 'Final LIS Length' : 'Current LIS Length'}
              </div>
              <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
                {maxLength !== undefined ? maxLength : lisLength}
              </div>
            </div>
          )}

          {/* Comparisons Table (DP Solution) */}
          {comparisons && comparisons.length > 0 && !complete && (
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Comparisons with Previous Elements
              </div>
              <div
                className="rounded-lg p-3 max-h-40 overflow-y-auto"
                style={{
                  backgroundColor: theme.colors.background,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ color: theme.colors.textSecondary }}>
                      <th className="text-left pb-2">Index j</th>
                      <th className="text-left pb-2">Value</th>
                      <th className="text-left pb-2">Can Extend?</th>
                      <th className="text-left pb-2">New Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map(
                      (
                        comp: { j: number; canExtend: boolean; newLength?: number },
                        idx: number
                      ) => (
                        <tr
                          key={idx}
                          style={{
                            color:
                              comp.j === compareIndex
                                ? '#f59e0b'
                                : theme.colors.text,
                          }}
                        >
                          <td className="py-1">{comp.j}</td>
                          <td className="py-1">{nums[comp.j]}</td>
                          <td className="py-1">
                            {comp.canExtend ? (
                              <span style={{ color: '#10b981' }}>✓ Yes</span>
                            ) : (
                              <span style={{ color: '#ef4444' }}>✗ No</span>
                            )}
                          </td>
                          <td className="py-1">
                            {comp.newLength !== undefined ? comp.newLength : '-'}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Binary Search Info */}
          {binarySearch && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: theme.colors.primary + '20',
                border: `2px solid ${theme.colors.primary}`,
              }}
            >
              <div className="text-sm font-medium mb-2" style={{ color: theme.colors.primary }}>
                Binary Search Progress
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span style={{ color: theme.colors.textSecondary }}>Left: </span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {binarySearch.left}
                  </span>
                </div>
                <div>
                  <span style={{ color: theme.colors.textSecondary }}>Mid: </span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {binarySearch.mid}
                  </span>
                </div>
                <div>
                  <span style={{ color: theme.colors.textSecondary }}>Right: </span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {binarySearch.right}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Can Extend Message */}
          {canExtend && phase === 'comparing' && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: '#10b981' + '20',
                border: `2px solid #10b981`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#10b981' }}>
                Can extend subsequence ending at index {compareIndex}
              </div>
            </div>
          )}

          {/* Updated Message */}
          {updated && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: '#8b5cf6' + '20',
                border: `2px solid #8b5cf6`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#8b5cf6' }}>
                Updated DP value at index {currentIndex}
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
                New maximum LIS length found: {maxLength}
              </div>
            </div>
          )}

          {/* Appended Message */}
          {appended && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: '#10b981' + '20',
                border: `2px solid #10b981`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#10b981' }}>
                Appended {currentNum} to tails array. LIS length increased to {lisLength}!
              </div>
            </div>
          )}

          {/* Replaced Message */}
          {replaced && oldValue !== undefined && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: '#f59e0b' + '20',
                border: `2px solid #f59e0b`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#f59e0b' }}>
                Replaced tails[{insertPosition}] = {oldValue} with {currentNum}
              </div>
            </div>
          )}

          {/* Final LIS */}
          {complete && lis && (
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Example Longest Increasing Subsequence
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg" style={{ color: '#10b981' }}>
                  [{lis.join(', ')}]
                </span>
                <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  (length: {lis.length})
                </span>
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
                Longest Increasing Subsequence Length: {maxLength !== undefined ? maxLength : lisLength}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
