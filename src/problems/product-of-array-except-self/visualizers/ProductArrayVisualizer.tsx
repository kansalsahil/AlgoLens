import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function ProductArrayVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  if (!arrays || arrays.length === 0) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    phase,
    currentI,
    currentJ,
    product,
    oldProduct,
    currentValue,
    multiplying,
    skipping,
    skipIndex,
    stored,
    storedIndex,
    calculating,
    complete,
    result,
    prevPrefix,
    numsValue,
    newPrefix,
    nextSuffix,
    newSuffix,
    currentIndex,
    prefixValue,
    suffixValue,
    resultValue,
  } = custom || {};

  const isBruteForce = currentI !== undefined || currentJ !== undefined;
  const isPrefixSuffix = phase !== undefined;

  // Get phase description
  const getPhaseDescription = () => {
    if (phase === 'init') return 'Initialization';
    if (phase === 'prefix') return 'Phase 1: Building Prefix Products';
    if (phase === 'suffix') return 'Phase 2: Building Suffix Products';
    if (phase === 'result') return 'Phase 3: Computing Result';
    if (phase === 'complete') return 'Complete';
    return '';
  };

  return (
    <div className="space-y-8">
      {/* Array Visualizations */}
      <div className="space-y-6">
        {arrays.map((array) => (
          <div key={array.id} className="space-y-2">
            <div
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: theme.colors.textSecondary }}
            >
              {array.name}
            </div>
            <ArrayAdapter array={array} transitionDuration={transitionDuration} />
          </div>
        ))}
      </div>

      {/* Info Panel */}
      <div
        className="rounded-xl shadow-md p-6 space-y-4 max-w-2xl mx-auto"
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
              {isBruteForce && !isPrefixSuffix && 'Brute Force (O(n²))'}
              {isPrefixSuffix && 'Prefix-Suffix Products (O(n))'}
            </div>
          </div>

          {/* Phase indicator for prefix-suffix */}
          {isPrefixSuffix && phase && (
            <div className="col-span-2 space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Current Phase
              </div>
              <div
                className="text-lg font-semibold rounded-lg p-2 text-center"
                style={{
                  backgroundColor:
                    phase === 'complete'
                      ? theme.colors.success + '20'
                      : theme.colors.primary + '20',
                  border: `2px solid ${phase === 'complete' ? theme.colors.success : theme.colors.primary}`,
                  color: phase === 'complete' ? theme.colors.success : theme.colors.primary,
                }}
              >
                {getPhaseDescription()}
              </div>
            </div>
          )}

          {/* Brute Force specific */}
          {isBruteForce && !isPrefixSuffix && (
            <>
              {currentI !== undefined && currentI >= 0 && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Computing Index
                  </div>
                  <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>
                    i = {currentI}
                  </div>
                </div>
              )}

              {currentJ !== undefined && currentJ >= 0 && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Position
                  </div>
                  <div className="text-2xl font-bold" style={{ color: skipping ? '#9ca3af' : '#3b82f6' }}>
                    j = {currentJ}
                  </div>
                </div>
              )}

              {product !== undefined && calculating && (
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Product
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {product}
                  </div>
                </div>
              )}

              {multiplying && oldProduct !== undefined && currentValue !== undefined && (
                <div className="col-span-2">
                  <div
                    className="rounded-lg p-3"
                    style={{
                      backgroundColor: theme.colors.primary + '20',
                      border: `2px solid ${theme.colors.primary}`,
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                      {oldProduct} × {currentValue} = {product}
                    </div>
                  </div>
                </div>
              )}

              {skipping && skipIndex !== undefined && (
                <div className="col-span-2">
                  <div
                    className="rounded-lg p-3"
                    style={{
                      backgroundColor: theme.colors.textSecondary + '20',
                      border: `2px solid ${theme.colors.textSecondary}`,
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Skipping index {skipIndex} (i === j)
                    </div>
                  </div>
                </div>
              )}

              {stored && storedIndex !== undefined && (
                <div className="col-span-2">
                  <div
                    className="rounded-lg p-3"
                    style={{
                      backgroundColor: theme.colors.success + '20',
                      border: `2px solid ${theme.colors.success}`,
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                      ✓ Stored result[{storedIndex}] = {product}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Prefix-Suffix specific */}
          {isPrefixSuffix && (
            <>
              {phase === 'prefix' && prevPrefix !== undefined && numsValue !== undefined && newPrefix !== undefined && (
                <div className="col-span-2">
                  <div
                    className="rounded-lg p-3"
                    style={{
                      backgroundColor: theme.colors.primary + '20',
                      border: `2px solid ${theme.colors.primary}`,
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                      prefix[{currentIndex}] = {prevPrefix} × {numsValue} = {newPrefix}
                    </div>
                  </div>
                </div>
              )}

              {phase === 'suffix' && nextSuffix !== undefined && numsValue !== undefined && newSuffix !== undefined && (
                <div className="col-span-2">
                  <div
                    className="rounded-lg p-3"
                    style={{
                      backgroundColor: theme.colors.primary + '20',
                      border: `2px solid ${theme.colors.primary}`,
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                      suffix[{currentIndex}] = {nextSuffix} × {numsValue} = {newSuffix}
                    </div>
                  </div>
                </div>
              )}

              {phase === 'result' && prefixValue !== undefined && suffixValue !== undefined && resultValue !== undefined && (
                <div className="col-span-2">
                  <div
                    className="rounded-lg p-3"
                    style={{
                      backgroundColor: theme.colors.success + '20',
                      border: `2px solid ${theme.colors.success}`,
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                      result[{currentIndex}] = {prefixValue} × {suffixValue} = {resultValue}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Result */}
          {complete && result !== undefined && (
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Final Result
              </div>
              <div
                className="rounded-lg p-3"
                style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                }}
              >
                <div className="text-lg font-mono font-semibold" style={{ color: theme.colors.success }}>
                  [{result.join(', ')}]
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
