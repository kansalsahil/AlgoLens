import { VisualizationProps } from '../../../core/types';
import { ArrayVisualizer } from '../../../components/primitives';
import { useTheme } from '../../../hooks';

export function TwoSumVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    target,
    map,
    currentValue,
    complement,
    result,
    currentSum,
    isBruteForce,
    isMatch,
    valueI,
    valueJ,
  } = custom || {};

  return (
    <div className="space-y-8">
      {/* Array Visualization */}
      <ArrayVisualizer array={array} transitionDuration={transitionDuration} />

      {/* Info Panel */}
      <div
        className="rounded-md shadow-md p-6 space-y-4 max-w-2xl mx-auto"
        style={{
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>Target</div>
            <div className="text-2xl font-bold" style={{ color: theme.colors.primary }}>{target}</div>
          </div>

          {/* Brute Force: Show current sum */}
          {isBruteForce && currentSum !== undefined && (
            <>
              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>Current Sum</div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: isMatch ? theme.colors.success : theme.colors.error }}
                >
                  {currentSum}
                </div>
              </div>

              {valueI !== undefined && valueJ !== undefined && (
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>Calculation</div>
                  <div
                    className="text-xl font-semibold"
                    style={{ color: isMatch ? theme.colors.success : theme.colors.text }}
                  >
                    {valueI} + {valueJ} = {currentSum} {isMatch ? '✓' : '✗'}
                  </div>
                </div>
              )}

              {!isMatch && currentSum !== undefined && (
                <div
                  className="col-span-2 rounded-md p-3"
                  style={{
                    backgroundColor: theme.colors.error + '20',
                    border: `1px solid ${theme.colors.error}`,
                  }}
                >
                  <div className="text-sm font-medium" style={{ color: theme.colors.error }}>
                    No match ({currentSum} ≠ {target})
                  </div>
                </div>
              )}

              {isMatch && (
                <div
                  className="col-span-2 rounded-md p-3"
                  style={{
                    backgroundColor: theme.colors.success + '20',
                    border: `1px solid ${theme.colors.success}`,
                  }}
                >
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    Match found
                  </div>
                </div>
              )}
            </>
          )}

          {/* Hash Map: Show current value and complement */}
          {!isBruteForce && currentValue !== undefined && (
            <>
              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>Current Value</div>
                <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>{currentValue}</div>
              </div>

              {complement !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>Looking for Complement</div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: custom?.hasComplement ? theme.colors.success : theme.colors.accent }}
                  >
                    {complement}
                  </div>
                </div>
              )}

              {complement !== undefined && custom?.hasComplement === false && (
                <div
                  className="col-span-2 rounded-md p-3"
                  style={{
                    backgroundColor: theme.colors.error + '20',
                    border: `1px solid ${theme.colors.error}`,
                  }}
                >
                  <div className="text-sm font-medium" style={{ color: theme.colors.error }}>
                    Complement not found
                  </div>
                </div>
              )}

              {complement !== undefined && custom?.hasComplement === true && (
                <div
                  className="col-span-2 rounded-md p-3"
                  style={{
                    backgroundColor: theme.colors.success + '20',
                    border: `1px solid ${theme.colors.success}`,
                  }}
                >
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    Complement found
                  </div>
                </div>
              )}
            </>
          )}

          {result && (
            <div className="col-span-2 space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>Result</div>
              <div className="text-2xl font-bold" style={{ color: theme.colors.success }}>[{result.join(', ')}]</div>
            </div>
          )}
        </div>

        {/* Hash Map Display */}
        {map && map.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>Hash Map</div>
            <div
              className="rounded-md p-3"
              style={{
                backgroundColor: theme.colors.background,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                    <th className="text-left py-1 px-2 font-medium" style={{ color: theme.colors.text }}>Value</th>
                    <th className="text-left py-1 px-2 font-medium" style={{ color: theme.colors.text }}>Index</th>
                  </tr>
                </thead>
                <tbody>
                  {map.map(([value, index]: [number, number], i: number) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                      <td className="py-1 px-2" style={{ color: theme.colors.text }}>{value}</td>
                      <td className="py-1 px-2" style={{ color: theme.colors.text }}>{index}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
