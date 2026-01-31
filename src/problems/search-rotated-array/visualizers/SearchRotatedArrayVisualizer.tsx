import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function SearchRotatedArrayVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    target,
    currentValue,
    currentIndex,
    isMatch,
    checked,
    left,
    mid,
    right,
    midValue,
    checking,
    searchSpace,
    sortedHalf,
    decision,
    result,
    found,
    notFound,
  } = custom || {};

  const isLinear = checked !== undefined;
  const isBinary = left !== undefined;

  return (
    <div className="space-y-8">
      {/* Array Visualization */}
      <ArrayAdapter array={array} transitionDuration={transitionDuration} />

      {/* Info Panel */}
      <div
        className="rounded-xl p-6 space-y-4 max-w-2xl mx-auto"
        style={{
          backgroundColor: theme.colors.surface,
          border: `2px solid ${theme.colors.border}`,
          boxShadow: `0 4px 16px ${theme.colors.border}40, inset 0 1px 2px ${theme.colors.surface}`,
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Algorithm info */}
          <div className="col-span-2 space-y-1">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Algorithm
            </div>
            <div className="text-lg font-bold" style={{ color: theme.colors.primary }}>
              {isLinear ? 'Linear Search (O(n))' : 'Binary Search (O(log n))'}
            </div>
          </div>

          {/* Target */}
          {target !== undefined && (
            <div className="col-span-2 space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Target Value
              </div>
              <div className="text-3xl font-bold text-center p-2 rounded-lg" style={{
                color: theme.colors.accent,
                backgroundColor: theme.colors.accent + '20',
                border: `2px solid ${theme.colors.accent}`,
              }}>
                {target}
              </div>
            </div>
          )}

          {/* Linear Search specific */}
          {isLinear && (
            <>
              {checked !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Elements Checked
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {checked} / {array.values.length}
                  </div>
                </div>
              )}

              {currentValue !== undefined && isMatch !== undefined && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: isMatch
                    ? theme.colors.success + '20'
                    : theme.colors.background,
                  border: `2px solid ${isMatch ? theme.colors.success : theme.colors.border}`,
                  boxShadow: isMatch ? `0 2px 8px ${theme.colors.success}30` : 'none',
                }}>
                  <div className="text-sm font-medium" style={{
                    color: isMatch ? theme.colors.success : theme.colors.text
                  }}>
                    {isMatch
                      ? `✓ Match! nums[${currentIndex}] = ${currentValue}`
                      : `nums[${currentIndex}] = ${currentValue} ≠ ${target}`}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Binary Search specific */}
          {isBinary && (
            <>
              {left !== undefined && right !== undefined && (
                <>
                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Left Pointer
                    </div>
                    <div className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                      {left}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Right Pointer
                    </div>
                    <div className="text-2xl font-bold" style={{ color: theme.colors.error }}>
                      {right}
                    </div>
                  </div>
                </>
              )}

              {mid !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Mid Pointer
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.accent }}>
                    {mid}
                  </div>
                </div>
              )}

              {searchSpace !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Search Space
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {searchSpace}
                  </div>
                </div>
              )}

              {checking && midValue !== undefined && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.primary + '20',
                  border: `2px solid ${theme.colors.primary}`,
                  boxShadow: `0 2px 8px ${theme.colors.primary}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                    Checking: nums[{mid}] = {midValue} vs target = {target}
                  </div>
                </div>
              )}

              {sortedHalf && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    {sortedHalf === 'left' ? '← Left' : 'Right →'} half is sorted
                  </div>
                </div>
              )}

              {decision && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.primary + '20',
                  border: `2px solid ${theme.colors.primary}`,
                  boxShadow: `0 2px 8px ${theme.colors.primary}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                    Decision: {decision}
                  </div>
                </div>
              )}

              {found && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ Target found at index {result}!
                  </div>
                </div>
              )}

              {notFound && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.error + '20',
                  border: `2px solid ${theme.colors.error}`,
                  boxShadow: `0 2px 8px ${theme.colors.error}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.error }}>
                    ✗ Target not found in array
                  </div>
                </div>
              )}
            </>
          )}

          {/* Result */}
          {result !== undefined && (
            <div className="col-span-2 space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Result
              </div>
              <div
                className="text-3xl font-bold p-3 rounded-lg text-center"
                style={{
                  backgroundColor: result >= 0 ? theme.colors.success + '20' : theme.colors.error + '20',
                  border: `2px solid ${result >= 0 ? theme.colors.success : theme.colors.error}`,
                  boxShadow: `0 2px 8px ${result >= 0 ? theme.colors.success : theme.colors.error}30`,
                  color: result >= 0 ? theme.colors.success : theme.colors.error,
                }}
              >
                {result >= 0 ? `Index: ${result}` : 'Not Found (-1)'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
