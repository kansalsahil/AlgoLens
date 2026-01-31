import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function ValidPalindromeVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const {
    original,
    cleaned,
    reversed,
    phase,
    removed,
    match,
    left,
    right,
    leftChar,
    rightChar,
    comparisons,
    comparing,
    skippedLeft,
    skippedRight,
    moved,
    mismatch,
    palindrome,
    result,
  } = custom || {};

  const isCleanAndReverse = phase !== undefined;
  const isTwoPointer = left !== undefined;

  return (
    <div className="space-y-8">
      {/* Array Visualization - Scaled to Fit */}
      {arrays && arrays.length > 0 && (
        <div className="space-y-4">
          {arrays.map((array) => {
            // Calculate element size based on array length to fit without scrolling
            // Account for left panel (problem statement) and right panel (solution code) taking up space
            // Assume ~800px for panels + margins, leaving ~600px for center content on typical screens
            const availableWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 800, 700) : 600;
            const defaultElementWidth = 64;
            const gap = 4;
            const arrayLength = array.values.length;

            // Calculate required width and scale down element size if needed
            const requiredWidth = (arrayLength * defaultElementWidth) + ((arrayLength - 1) * gap);
            let elementWidth = defaultElementWidth;
            let elementHeight = defaultElementWidth;

            if (requiredWidth > availableWidth) {
              // Scale down elements to fit
              elementWidth = Math.max(20, Math.floor((availableWidth - (arrayLength - 1) * gap) / arrayLength));
              elementHeight = elementWidth;
            }

            return (
              <div key={array.id} className="space-y-2">
                <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  {array.name} {elementWidth < defaultElementWidth && (
                    <span className="text-xs opacity-60">({array.values.length} chars)</span>
                  )}
                </div>
                <div className="w-full flex justify-center">
                  <ArrayAdapter
                    array={array}
                    transitionDuration={transitionDuration}
                    config={{
                      layout: {
                        elementSize: { width: elementWidth, height: elementHeight },
                        gap,
                      },
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

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
              {isCleanAndReverse ? 'Clean & Reverse (O(n) space)' : 'Two Pointer (O(1) space)'}
            </div>
          </div>

          {/* Clean and Reverse specific */}
          {isCleanAndReverse && (
            <>
              {original && (
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Original String
                  </div>
                  <div
                    className="text-lg font-mono p-2 rounded"
                    style={{
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    }}
                  >
                    "{original}"
                  </div>
                </div>
              )}

              {cleaned && (
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Cleaned String
                  </div>
                  <div
                    className="text-lg font-mono p-2 rounded"
                    style={{
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    }}
                  >
                    "{cleaned}"
                  </div>
                </div>
              )}

              {removed !== undefined && removed > 0 && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    Removed {removed} non-alphanumeric character{removed > 1 ? 's' : ''}
                  </div>
                </div>
              )}

              {reversed && (
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Reversed String
                  </div>
                  <div
                    className="text-lg font-mono p-2 rounded"
                    style={{
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    }}
                  >
                    "{reversed}"
                  </div>
                </div>
              )}

              {match !== undefined && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: match ? theme.colors.success + '20' : theme.colors.error + '20',
                  border: `2px solid ${match ? theme.colors.success : theme.colors.error}`,
                  boxShadow: `0 2px 8px ${match ? theme.colors.success : theme.colors.error}30`,
                }}>
                  <div className="text-sm font-medium" style={{
                    color: match ? theme.colors.success : theme.colors.error
                  }}>
                    {match
                      ? '✓ Strings match - Palindrome!'
                      : '✗ Strings don\'t match - Not a palindrome'}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Two Pointer specific */}
          {isTwoPointer && (
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

              {skippedLeft && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    → Skipped non-alphanumeric from left
                  </div>
                </div>
              )}

              {skippedRight && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.accent + '20',
                  border: `2px solid ${theme.colors.accent}`,
                  boxShadow: `0 2px 8px ${theme.colors.accent}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.accent }}>
                    ← Skipped non-alphanumeric from right
                  </div>
                </div>
              )}

              {comparing && leftChar && rightChar && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.primary + '20',
                  border: `2px solid ${theme.colors.primary}`,
                  boxShadow: `0 2px 8px ${theme.colors.primary}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                    Comparing: '{leftChar}' vs '{rightChar}'
                  </div>
                </div>
              )}

              {moved && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ Match! Moving pointers inward
                  </div>
                </div>
              )}

              {mismatch && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.error + '20',
                  border: `2px solid ${theme.colors.error}`,
                  boxShadow: `0 2px 8px ${theme.colors.error}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.error }}>
                    ✗ Mismatch found - Not a palindrome
                  </div>
                </div>
              )}

              {palindrome && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ All characters matched - Palindrome!
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
                className="text-2xl font-bold p-3 rounded-lg text-center"
                style={{
                  backgroundColor: result ? theme.colors.success + '20' : theme.colors.error + '20',
                  border: `2px solid ${result ? theme.colors.success : theme.colors.error}`,
                  boxShadow: `0 2px 8px ${result ? theme.colors.success : theme.colors.error}30`,
                  color: result ? theme.colors.success : theme.colors.error,
                }}
              >
                {result ? '✓ Valid Palindrome' : '✗ Not a Palindrome'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
