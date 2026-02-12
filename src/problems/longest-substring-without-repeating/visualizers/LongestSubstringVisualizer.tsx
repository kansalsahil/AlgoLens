import { VisualizationProps } from '../../../core/types';
import { useTheme } from '../../../hooks';

export function LongestSubstringVisualizer({ step }: VisualizationProps) {
  const { visualizationData } = step;
  const { custom } = visualizationData;
  const { theme } = useTheme();

  if (!custom) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    string,
    chars,
    left,
    right,
    currentStart,
    currentEnd,
    maxLength,
    currentLength,
    currentSubstring,
    charMap,
    charSet,
    bestStart,
    bestEnd,
    bestLeft,
    bestRight,
    bestSubstring,
    duplicateFound,
    duplicateChar,
    duplicateIndex,
    oldLeft,
    hasDuplicate,
    newMaxFound,
    complete,
    highlightStart,
    checking,
    addedChar,
  } = custom;

  // Determine which indices to use based on solution type
  const leftIdx = left !== undefined ? left : currentStart;
  const rightIdx = right !== undefined ? right : currentEnd;
  const bestLeftIdx = bestLeft !== undefined ? bestLeft : bestStart;
  const bestRightIdx = bestRight !== undefined ? bestRight : bestEnd;

  return (
    <div className="space-y-8">
      {/* Character Array Visualization */}
      <div className="space-y-3">
        <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
          String as Character Array
        </div>
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="flex justify-center gap-2 flex-wrap">
            {chars.map((char: string, idx: number) => {
              let bgColor = theme.colors.background;
              let borderColor = theme.colors.border;
              let textColor = theme.colors.text;
              let label = '';

              // Determine styling based on current state
              if (complete && bestLeftIdx >= 0 && idx >= bestLeftIdx && idx <= bestRightIdx) {
                bgColor = '#10b98120';
                borderColor = '#10b981';
                textColor = '#10b981';
              } else if (leftIdx >= 0 && rightIdx >= 0 && idx >= leftIdx && idx <= rightIdx) {
                // Current window
                bgColor = '#3b82f620';
                borderColor = '#3b82f6';
                textColor = theme.colors.text;

                if (duplicateFound && idx === duplicateIndex) {
                  bgColor = '#ef444420';
                  borderColor = '#ef4444';
                  textColor = '#ef4444';
                  label = 'dup';
                } else if (addedChar && idx === rightIdx) {
                  bgColor = '#10b98120';
                  borderColor = '#10b981';
                }
              } else if (checking && idx >= currentStart && idx <= currentEnd) {
                // Checking substring in brute force
                bgColor = '#3b82f620';
                borderColor = '#3b82f6';
              } else if (hasDuplicate && idx === currentEnd) {
                bgColor = '#ef444420';
                borderColor = '#ef4444';
                textColor = '#ef4444';
                label = 'dup';
              }

              // Pointer labels
              if (leftIdx >= 0 && idx === leftIdx && rightIdx >= 0) {
                label = 'L';
              }
              if (rightIdx >= 0 && idx === rightIdx) {
                label = label ? label + ',R' : 'R';
              }
              if (oldLeft !== undefined && idx === oldLeft && duplicateFound) {
                label = 'oldL';
              }
              if (highlightStart && idx === currentStart) {
                label = 'start';
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  {label && (
                    <div
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{
                        color: theme.colors.primary,
                        backgroundColor: theme.colors.primary + '20',
                      }}
                    >
                      {label}
                    </div>
                  )}
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-lg font-mono font-bold text-lg transition-all duration-300"
                    style={{
                      backgroundColor: bgColor,
                      border: `2px solid ${borderColor}`,
                      color: textColor,
                    }}
                  >
                    {char === ' ' ? '␣' : char}
                  </div>
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    {idx}
                  </div>
                </div>
              );
            })}
          </div>

          {string.length === 0 && (
            <div className="text-center py-8" style={{ color: theme.colors.textSecondary }}>
              Empty string
            </div>
          )}
        </div>
      </div>

      {/* Sliding Window Info (for sliding window solution) */}
      {left !== undefined && right !== undefined && right >= 0 && (
        <div
          className="rounded-xl p-6 space-y-4"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Sliding Window Pointers
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Left Pointer
              </div>
              <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>
                {left}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Right Pointer
              </div>
              <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
                {right}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Substring / Window */}
      {currentSubstring && (
        <div
          className="rounded-xl p-6 space-y-3"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Current Window
          </div>
          <div className="text-center">
            <div
              className="inline-block px-6 py-3 rounded-lg font-mono text-xl font-bold"
              style={{
                backgroundColor: hasDuplicate ? '#ef444420' : '#3b82f620',
                border: `2px solid ${hasDuplicate ? '#ef4444' : '#3b82f6'}`,
                color: hasDuplicate ? '#ef4444' : theme.colors.text,
              }}
            >
              "{currentSubstring || '(empty)'}"
            </div>
          </div>
          <div className="text-center text-sm" style={{ color: theme.colors.textSecondary }}>
            Length: {currentSubstring.length}
          </div>
        </div>
      )}

      {/* Character Set/Map */}
      {charSet && charSet.length > 0 && (
        <div
          className="rounded-xl p-6 space-y-3"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Characters in Current Window
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {charSet.map((char: string, idx: number) => {
              const isDuplicate = duplicateChar && char === duplicateChar;
              const isAdded = addedChar && char === addedChar;

              return (
                <div
                  key={`${char}-${idx}`}
                  className="px-4 py-2 rounded-lg font-mono font-bold transition-all duration-300"
                  style={{
                    backgroundColor: isDuplicate
                      ? '#ef444420'
                      : isAdded
                      ? '#10b98120'
                      : theme.colors.primary + '20',
                    border: `2px solid ${isDuplicate ? '#ef4444' : isAdded ? '#10b981' : theme.colors.primary}`,
                    color: isDuplicate ? '#ef4444' : isAdded ? '#10b981' : theme.colors.text,
                  }}
                >
                  {char === ' ' ? '␣' : char}
                  {charMap && charMap[char] !== undefined && (
                    <span className="text-xs ml-1" style={{ color: theme.colors.textSecondary }}>
                      @{charMap[char]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Length Tracker */}
      <div
        className="rounded-xl p-6 space-y-4"
        style={{
          backgroundColor: theme.colors.surface,
          border: `2px solid ${theme.colors.border}`,
          boxShadow: `0 4px 16px ${theme.colors.border}40`,
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Current Length */}
          {currentLength !== undefined && currentLength >= 0 && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Current Length
              </div>
              <div className="text-2xl font-bold" style={{ color: '#fbbf24' }}>
                {currentLength}
              </div>
            </div>
          )}

          {/* Max Length */}
          <div className="space-y-1">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Max Length
            </div>
            <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
              {maxLength}
            </div>
          </div>
        </div>

        {/* Duplicate Alert */}
        {duplicateFound && (
          <div
            className="rounded-lg p-3"
            style={{
              backgroundColor: '#ef444420',
              border: `2px solid #ef4444`,
            }}
          >
            <div className="text-sm font-medium" style={{ color: '#ef4444' }}>
              Duplicate '{duplicateChar}' found at index {duplicateIndex}. Moving left pointer from {oldLeft} to {left}.
            </div>
          </div>
        )}

        {/* New Max Alert */}
        {newMaxFound && (
          <div
            className="rounded-lg p-3"
            style={{
              backgroundColor: '#10b98120',
              border: `2px solid #10b981`,
            }}
          >
            <div className="text-sm font-medium" style={{ color: '#10b981' }}>
              New maximum length found: {maxLength}
            </div>
          </div>
        )}

        {/* Best Substring */}
        {bestSubstring && !complete && (
          <div className="space-y-2">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Longest Substring So Far
            </div>
            <div
              className="px-4 py-2 rounded-lg font-mono text-lg font-bold text-center"
              style={{
                backgroundColor: '#10b98120',
                border: `2px solid #10b981`,
                color: '#10b981',
              }}
            >
              "{bestSubstring}"
            </div>
          </div>
        )}

        {/* Final Result */}
        {complete && (
          <div
            className="rounded-lg p-4 text-center"
            style={{
              backgroundColor: maxLength > 0 ? '#10b98120' : theme.colors.background,
              border: `2px solid ${maxLength > 0 ? '#10b981' : theme.colors.border}`,
            }}
          >
            <div className="text-lg font-bold" style={{ color: maxLength > 0 ? '#10b981' : theme.colors.text }}>
              {maxLength > 0
                ? `✓ Longest Substring: "${bestSubstring}" (Length: ${maxLength})`
                : '✓ Empty String (Length: 0)'}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: theme.colors.surface,
          border: `2px solid ${theme.colors.border}`,
        }}
      >
        <div className="flex flex-wrap gap-4 justify-center text-xs" style={{ color: theme.colors.textSecondary }}>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#3b82f620',
                border: `2px solid #3b82f6`,
                borderRadius: '3px',
              }}
            />
            <span>Current Window</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#10b98120',
                border: `2px solid #10b981`,
                borderRadius: '3px',
              }}
            />
            <span>Best/Added</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#ef444420',
                border: `2px solid #ef4444`,
                borderRadius: '3px',
              }}
            />
            <span>Duplicate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
