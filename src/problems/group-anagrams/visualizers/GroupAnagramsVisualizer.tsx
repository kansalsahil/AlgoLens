import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function GroupAnagramsVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    groups,
    currentGroup,
    sortedI,
    sortedJ,
    comparing,
    isAnagram,
    comparisons,
    added,
    skipped,
    groupCompleted,
    completedGroup,
    result,
    map,
    currentString,
    sortedKey,
    exists,
    newKey,
    groupSize,
    totalGroups,
  } = custom || {};

  const isBruteForce = comparisons !== undefined;
  const isHashMap = map !== undefined;

  return (
    <div className="space-y-8">
      {/* Array and Hash Map Visualization - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Array Visualization */}
        <div className="space-y-2">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Input Strings
          </div>
          <ArrayAdapter array={array} transitionDuration={transitionDuration} />
        </div>

        {/* Hash Map Display (for hash map solution) */}
        {isHashMap && map && Object.keys(map).length > 0 && (
          <div className="space-y-2">
            <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Anagram Groups Map ({Object.keys(map).length} key{Object.keys(map).length > 1 ? 's' : ''})
            </div>
            <div
              className="rounded-lg p-4 space-y-2 max-h-96 overflow-y-auto"
              style={{
                backgroundColor: theme.colors.surface,
                border: `2px solid ${theme.colors.border}`,
              }}
            >
              {Object.entries(map).map(([key, value]: [string, any]) => {
                const vals = Array.isArray(value) ? value : [];
                return (
                  <div
                    key={key}
                    className="p-3 rounded"
                    style={{
                      backgroundColor: key === sortedKey
                        ? theme.colors.primary + '20'
                        : theme.colors.background,
                      border: `1px solid ${key === sortedKey ? theme.colors.primary : theme.colors.border}`,
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div>
                        <div className="text-xs font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                          Key:
                        </div>
                        <div className="font-mono text-sm font-bold" style={{ color: theme.colors.text }}>
                          "{key}"
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                          Group ({vals.length}):
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {vals.map((str: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded font-mono text-sm"
                              style={{
                                backgroundColor: theme.colors.background,
                                border: `1px solid ${theme.colors.border}`,
                                color: theme.colors.text,
                              }}
                            >
                              "{str}"
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div
        className="rounded-xl shadow-md p-6 space-y-4 max-w-3xl mx-auto"
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
              {isBruteForce ? 'Brute Force (O(n² × k log k))' : 'Hash Map (O(n × k log k))'}
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

              {currentGroup && (
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Group
                  </div>
                  <div
                    className="text-lg font-semibold p-2 rounded"
                    style={{
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    }}
                  >
                    [{currentGroup.map((s: string) => `"${s}"`).join(', ')}]
                  </div>
                </div>
              )}

              {sortedI && sortedJ && comparing && (
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Comparing Sorted Strings
                  </div>
                  <div
                    className="text-lg font-semibold p-2 rounded-lg"
                    style={{
                      backgroundColor: isAnagram
                        ? theme.colors.success + '20'
                        : theme.colors.error + '20',
                      border: `2px solid ${isAnagram ? theme.colors.success : theme.colors.error}`,
                      boxShadow: `0 2px 8px ${isAnagram ? theme.colors.success : theme.colors.error}30`,
                      color: isAnagram ? theme.colors.success : theme.colors.error,
                    }}
                  >
                    "{sortedI}" {isAnagram ? '===' : '≠'} "{sortedJ}"
                  </div>
                </div>
              )}

              {skipped && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.textSecondary + '20',
                  border: `2px solid ${theme.colors.textSecondary}`,
                  boxShadow: `0 2px 8px ${theme.colors.textSecondary}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Already grouped - skipping
                  </div>
                </div>
              )}

              {groupCompleted && completedGroup && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ Group completed: [{completedGroup.map((s: string) => `"${s}"`).join(', ')}]
                  </div>
                </div>
              )}
            </>
          )}

          {/* Hash Map specific */}
          {isHashMap && (
            <>
              {currentString && sortedKey && (
                <>
                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Current String
                    </div>
                    <div className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                      "{currentString}"
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Sorted Key
                    </div>
                    <div className="text-2xl font-bold" style={{ color: theme.colors.accent }}>
                      "{sortedKey}"
                    </div>
                  </div>
                </>
              )}

              {exists !== undefined && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: exists
                    ? theme.colors.primary + '20'
                    : theme.colors.success + '20',
                  border: `2px solid ${exists ? theme.colors.primary : theme.colors.success}`,
                  boxShadow: `0 2px 8px ${exists ? theme.colors.primary : theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{
                    color: exists ? theme.colors.primary : theme.colors.success
                  }}>
                    {exists ? 'Key exists - adding to existing group' : 'New key - creating new group'}
                  </div>
                </div>
              )}

              {newKey && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ New group created for key "{sortedKey}"
                  </div>
                </div>
              )}

              {added && groupSize !== undefined && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ Added to group (size: {groupSize})
                  </div>
                </div>
              )}
            </>
          )}

          {/* Groups display */}
          {groups && groups.length > 0 && (
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Completed Groups ({groups.length})
              </div>
              <div
                className="rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto"
                style={{
                  backgroundColor: theme.colors.background,
                  border: `2px solid ${theme.colors.border}`,
                }}
              >
                {groups.map((group: string[], idx: number) => (
                  <div
                    key={idx}
                    className="p-2 rounded"
                    style={{
                      backgroundColor: theme.colors.surface,
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {group.map((str: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded font-mono text-sm"
                          style={{
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text,
                          }}
                        >
                          "{str}"
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="col-span-2 space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Result
              </div>
              <div
                className="text-lg font-bold p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                  color: theme.colors.success,
                }}
              >
                {totalGroups !== undefined ? `${totalGroups} group(s) formed` : 'Grouping complete'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
