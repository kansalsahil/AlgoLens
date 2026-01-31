import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function FindMinimumVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    min,
    currentValue,
    isSmaller,
    checked,
    updated,
    left,
    mid,
    right,
    midValue,
    rightValue,
    comparing,
    movedLeft,
    movedRight,
    eliminatedRange,
    searchSpace,
    result,
    found,
  } = custom || {};

  const isLinear = min !== undefined;
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

          {/* Linear Search specific */}
          {isLinear && (
            <>
              {min !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Min
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.success }}>
                    {min}
                  </div>
                </div>
              )}

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

              {currentValue !== undefined && isSmaller !== undefined && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: isSmaller
                    ? theme.colors.success + '20'
                    : theme.colors.background,
                  border: `2px solid ${isSmaller ? theme.colors.success : theme.colors.border}`,
                  boxShadow: isSmaller ? `0 2px 8px ${theme.colors.success}30` : 'none',
                }}>
                  <div className="text-sm font-medium" style={{
                    color: isSmaller ? theme.colors.success : theme.colors.text
                  }}>
                    {isSmaller
                      ? `✓ Found new minimum: ${currentValue} < ${min}`
                      : `${currentValue} >= ${min} - not smaller`}
                  </div>
                </div>
              )}

              {updated && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ Updated minimum to {min}
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

              {comparing && midValue !== undefined && rightValue !== undefined && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.primary + '20',
                  border: `2px solid ${theme.colors.primary}`,
                  boxShadow: `0 2px 8px ${theme.colors.primary}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                    Comparing: nums[{mid}] = {midValue} vs nums[{right}] = {rightValue}
                  </div>
                </div>
              )}

              {movedLeft && eliminatedRange && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    → Minimum in right half. Eliminated range: {eliminatedRange}
                  </div>
                </div>
              )}

              {movedRight && eliminatedRange && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    ← Minimum in left half. Eliminated range: {eliminatedRange}
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
                    ✓ Converged! Found minimum at index {left}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Result */}
          {result !== undefined && (
            <div className="col-span-2 space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Minimum Value
              </div>
              <div
                className="text-3xl font-bold p-3 rounded-lg text-center"
                style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                  color: theme.colors.success,
                }}
              >
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
