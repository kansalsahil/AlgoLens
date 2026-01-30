import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function ContainsDuplicateVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    comparisons,
    currentValue,
    valueI,
    valueJ,
    comparing,
    isMatch,
    result,
    duplicateIndices,
    duplicateValue,
    set,
    inSet,
    adding,
    lastAdded,
  } = custom || {};

  const isBruteForce = comparisons !== undefined;

  return (
    <div className="space-y-8">
      {/* Array Visualization */}
      <ArrayAdapter array={array} transitionDuration={transitionDuration} />

      {/* Info Panel */}
      <div
        className="rounded-md shadow-md p-6 space-y-4 max-w-2xl mx-auto"
        style={{
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Algorithm info */}
          <div className="col-span-2 space-y-1">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Algorithm
            </div>
            <div className="text-lg font-bold" style={{ color: theme.colors.primary }}>
              {isBruteForce ? 'Brute Force (O(n²))' : 'Hash Set (O(n))'}
            </div>
          </div>

          {/* Brute Force specific */}
          {isBruteForce && (
            <>
              {comparisons !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Comparisons
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {comparisons}
                  </div>
                </div>
              )}

              {comparing && valueI !== undefined && valueJ !== undefined && (
                <>
                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Comparing
                    </div>
                    <div
                      className="text-xl font-semibold"
                      style={{ color: isMatch ? theme.colors.success : theme.colors.text }}
                    >
                      {valueI} vs {valueJ}
                    </div>
                  </div>

                  <div className="col-span-2 space-y-1">
                    <div
                      className="rounded-md p-3"
                      style={{
                        backgroundColor: isMatch
                          ? theme.colors.success + '20'
                          : theme.colors.error + '20',
                        border: `1px solid ${isMatch ? theme.colors.success : theme.colors.error}`,
                      }}
                    >
                      <div
                        className="text-sm font-medium"
                        style={{ color: isMatch ? theme.colors.success : theme.colors.error }}
                      >
                        {isMatch ? '✓ Match found!' : '✗ No match'}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Hash Set specific */}
          {!isBruteForce && set !== undefined && (
            <>
              <div className="col-span-2 space-y-2">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Seen Set
                </div>
                <div
                  className="rounded-md p-3 min-h-[60px] flex flex-wrap gap-2 items-center"
                  style={{
                    backgroundColor: theme.colors.background,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  {set.length === 0 ? (
                    <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                      (empty)
                    </span>
                  ) : (
                    set.map((val: number, idx: number) => (
                      <div
                        key={idx}
                        className="px-3 py-1 rounded font-mono text-sm font-semibold"
                        style={{
                          backgroundColor:
                            val === lastAdded
                              ? theme.colors.success + '30'
                              : theme.colors.surface,
                          border: `1px solid ${theme.colors.border}`,
                          color: theme.colors.text,
                        }}
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {currentValue !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Value
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                    {currentValue}
                  </div>
                </div>
              )}

              {inSet !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Status
                  </div>
                  <div
                    className="text-lg font-semibold"
                    style={{ color: inSet ? theme.colors.success : theme.colors.text }}
                  >
                    {inSet ? 'In Set (Duplicate!)' : adding ? 'Adding to Set' : 'Not in Set'}
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
                className="text-2xl font-bold"
                style={{ color: result ? theme.colors.success : theme.colors.error }}
              >
                {result ? 'true (Duplicate Found)' : 'false (No Duplicates)'}
              </div>
              {duplicateValue !== undefined && (
                <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  Duplicate value: {duplicateValue} at indices {duplicateIndices?.join(', ')}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
