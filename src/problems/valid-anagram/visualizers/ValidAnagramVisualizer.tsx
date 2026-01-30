import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function ValidAnagramVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  if (!arrays || arrays.length === 0) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    sLength,
    tLength,
    lengthMismatch,
    sorted,
    comparing,
    position,
    charS,
    charT,
    match,
    map,
    phase,
    currentChar,
    currentCount,
    newCount,
    notFound,
    mapSize,
    result,
  } = custom || {};

  const isSorting = sorted !== undefined || comparing !== undefined;
  const isHashMap = map !== undefined;

  return (
    <div className="space-y-8">
      {/* String Visualizations */}
      <div className="space-y-4">
        {arrays.map((array) => (
          <ArrayAdapter key={array.id} array={array} transitionDuration={transitionDuration} />
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
              {isSorting ? 'Sorting (O(n log n))' : 'Hash Map (O(n))'}
            </div>
          </div>

          {/* String lengths */}
          {sLength !== undefined && tLength !== undefined && (
            <>
              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Length of s
                </div>
                <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                  {sLength}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Length of t
                </div>
                <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                  {tLength}
                </div>
              </div>
            </>
          )}

          {lengthMismatch && (
            <div className="col-span-2 rounded-lg p-3" style={{
              backgroundColor: theme.colors.error + '20',
              border: `2px solid ${theme.colors.error}`,
              boxShadow: `0 2px 8px ${theme.colors.error}30`,
            }}>
              <div className="text-sm font-medium" style={{ color: theme.colors.error }}>
                ✗ Length mismatch - cannot be anagrams
              </div>
            </div>
          )}

          {/* Sorting comparison */}
          {comparing && charS !== undefined && charT !== undefined && (
            <>
              <div className="col-span-2 space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Comparing at position {position}
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: match ? theme.colors.success : theme.colors.error }}
                >
                  '{charS}' vs '{charT}' {match ? '✓' : '✗'}
                </div>
              </div>
            </>
          )}

          {/* Hash map */}
          {isHashMap && (
            <>
              <div className="col-span-2 space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Phase
                </div>
                <div className="text-lg font-semibold" style={{ color: theme.colors.text }}>
                  {phase === 'init' && 'Initialize'}
                  {phase === 'counting-s' && 'Counting characters in s'}
                  {phase === 'decrementing-t' && 'Decrementing using t'}
                  {phase === 'complete' && 'Complete'}
                </div>
              </div>

              {currentChar !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Character
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                    '{currentChar}'
                  </div>
                </div>
              )}

              {currentCount !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Count
                  </div>
                  <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                    {currentCount}
                  </div>
                </div>
              )}

              {newCount !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    New Count
                  </div>
                  <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                    {newCount}
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
                    ✗ Character '{currentChar}' not found in map
                  </div>
                </div>
              )}

              {/* Character frequency map */}
              <div className="col-span-2 space-y-2">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Character Frequency Map
                </div>
                <div
                  className="rounded-lg p-3 min-h-[80px]"
                  style={{
                    backgroundColor: theme.colors.background,
                    border: `2px solid ${theme.colors.border}`,
                  }}
                >
                  {Object.keys(map).length === 0 ? (
                    <div className="text-center text-sm" style={{ color: theme.colors.textSecondary }}>
                      (empty)
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(map).map(([char, count]) => (
                        <div
                          key={char}
                          className="flex items-center justify-between px-3 py-2 rounded"
                          style={{
                            backgroundColor: char === currentChar
                              ? theme.colors.primary + '20'
                              : theme.colors.surface,
                            border: `1px solid ${theme.colors.border}`,
                          }}
                        >
                          <span className="font-mono font-bold" style={{ color: theme.colors.text }}>
                            '{char}'
                          </span>
                          <span className="font-mono text-sm" style={{ color: theme.colors.textSecondary }}>
                            : {String(count)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {mapSize !== undefined && (
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Map Size
                  </div>
                  <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                    {mapSize} {mapSize === 0 ? '(empty - all characters matched!)' : ''}
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
                {result ? 'true (Valid Anagram)' : 'false (Not an Anagram)'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
