import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function ThreeSumVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    triplets,
    found,
    result,
    i,
    values,
    sum,
    isZero,
    triplet,
    added,
    duplicate,
    complete,
    sorted,
    skippedDuplicate,
    left,
    right,
    fixed,
    comparing,
    movedLeft,
    movedRight,
  } = custom || {};

  const isBruteForce = triplets !== undefined;
  const isTwoPointer = sorted !== undefined;

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
              {isBruteForce ? 'Brute Force (O(n³))' : 'Sort + Two Pointer (O(n²))'}
            </div>
          </div>

          {/* Brute Force specific */}
          {isBruteForce && (
            <>
              {triplets !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Triplets Checked
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {triplets}
                  </div>
                </div>
              )}

              {found !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Valid Found
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.success }}>
                    {found}
                  </div>
                </div>
              )}

              {values && sum !== undefined && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: isZero ? theme.colors.success + '20' : theme.colors.background,
                  border: `2px solid ${isZero ? theme.colors.success : theme.colors.border}`,
                  boxShadow: isZero ? `0 2px 8px ${theme.colors.success}30` : 'none',
                }}>
                  <div className="text-sm font-medium" style={{
                    color: isZero ? theme.colors.success : theme.colors.text
                  }}>
                    [{values.join(', ')}] → sum = {sum} {isZero ? '✓' : '✗'}
                  </div>
                </div>
              )}

              {added && triplet && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ Added triplet: [{triplet.join(', ')}]
                  </div>
                </div>
              )}

              {duplicate && triplet && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    Skipped duplicate: [{triplet.join(', ')}]
                  </div>
                </div>
              )}
            </>
          )}

          {/* Two Pointer specific */}
          {isTwoPointer && (
            <>
              {i !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Fixed Index (i)
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                    {i} {fixed !== undefined && `(${fixed})`}
                  </div>
                </div>
              )}

              {result && result.length > 0 && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Triplets Found
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.success }}>
                    {result.length}
                  </div>
                </div>
              )}

              {left !== undefined && right !== undefined && (
                <>
                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Left Pointer
                    </div>
                    <div className="text-2xl font-bold" style={{ color: theme.colors.accent }}>
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

              {skippedDuplicate && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    Skipped duplicate element at i
                  </div>
                </div>
              )}

              {comparing && sum !== undefined && values && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: sum === 0 ? theme.colors.success + '20' : theme.colors.primary + '20',
                  border: `2px solid ${sum === 0 ? theme.colors.success : theme.colors.primary}`,
                  boxShadow: `0 2px 8px ${sum === 0 ? theme.colors.success : theme.colors.primary}30`,
                }}>
                  <div className="text-sm font-medium" style={{
                    color: sum === 0 ? theme.colors.success : theme.colors.primary
                  }}>
                    Sum: [{values.join(', ')}] = {sum} {sum === 0 ? '✓' : sum < 0 ? '(too small)' : '(too large)'}
                  </div>
                </div>
              )}

              {triplet && found !== undefined && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ Found triplet: [{triplet.join(', ')}]
                  </div>
                </div>
              )}

              {movedLeft && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    → Moved left pointer (sum too small)
                  </div>
                </div>
              )}

              {movedRight && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    ← Moved right pointer (sum too large)
                  </div>
                </div>
              )}
            </>
          )}

          {/* Result Display */}
          {result && result.length > 0 && (
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Triplets Found ({result.length})
              </div>
              <div
                className="rounded-lg p-3 space-y-1 max-h-32 overflow-y-auto"
                style={{
                  backgroundColor: theme.colors.background,
                  border: `2px solid ${theme.colors.border}`,
                }}
              >
                {result.map((t: number[], idx: number) => (
                  <div
                    key={idx}
                    className="px-2 py-1 rounded text-sm font-mono"
                    style={{
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                    }}
                  >
                    [{t.join(', ')}]
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Result */}
          {complete && (
            <div className="col-span-2 space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Result
              </div>
              <div
                className="text-xl font-bold p-3 rounded-lg text-center"
                style={{
                  backgroundColor: result && result.length > 0 ? theme.colors.success + '20' : theme.colors.textSecondary + '20',
                  border: `2px solid ${result && result.length > 0 ? theme.colors.success : theme.colors.textSecondary}`,
                  boxShadow: `0 2px 8px ${result && result.length > 0 ? theme.colors.success : theme.colors.textSecondary}30`,
                  color: result && result.length > 0 ? theme.colors.success : theme.colors.textSecondary,
                }}
              >
                {result && result.length > 0
                  ? `Found ${result.length} triplet${result.length > 1 ? 's' : ''}`
                  : 'No triplets found'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
