import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter, StackAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function ValidParenthesesVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, stack, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    currentString,
    iterations,
    pairs,
    pairFound,
    pairIndex,
    removing,
    removed,
    previousLength,
    newLength,
    noPairFound,
    allMatched,
    result,
    map,
    currentChar,
    isClosing,
    isOpening,
    expected,
    stackTop,
    matches,
    mismatch,
    popped,
    pushing,
    stackSize,
    unmatchedBrackets,
  } = custom || {};

  const isReplacement = iterations !== undefined;
  const isStack = map !== undefined;

  return (
    <div className="space-y-8">
      {/* String and Stack Visualization - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* String Visualization */}
        <div className="space-y-2">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Input String
          </div>
          <ArrayAdapter array={array} transitionDuration={transitionDuration} />
        </div>

        {/* Stack Visualization (for stack solution) */}
        {isStack && (
          <div className="space-y-2">
            <div
              className="text-center text-sm font-medium"
              style={{ color: theme.colors.textSecondary }}
            >
              {stack && stack.length > 0 ? `Stack (${stack.length} opening bracket${stack.length > 1 ? 's' : ''})` : 'Stack (empty)'}
            </div>
            {stack && stack.length > 0 ? (
              <StackAdapter
                stack={stack}
                transitionDuration={transitionDuration}
                config={{
                  title: 'Opening Brackets',
                }}
              />
            ) : (
              <div
                className="text-center p-8 rounded-xl"
                style={{
                  backgroundColor: theme.colors.surface,
                  border: `3px dashed ${theme.colors.border}`,
                  color: theme.colors.textSecondary,
                  boxShadow: `inset 0 2px 8px ${theme.colors.border}20`,
                }}
              >
                <div className="text-lg font-semibold">Empty Stack</div>
                <div className="text-sm mt-2">No unmatched opening brackets</div>
              </div>
            )}
          </div>
        )}
      </div>

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
              {isReplacement ? 'String Replacement (O(n²))' : 'Stack (O(n))'}
            </div>
          </div>

          {/* Replacement Solution specific */}
          {isReplacement && (
            <>
              {iterations !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Iterations
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {iterations}
                  </div>
                </div>
              )}

              {currentString !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Length
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {currentString.length}
                  </div>
                </div>
              )}

              {pairs && (
                <div className="col-span-2 space-y-2">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Valid Pairs to Remove
                  </div>
                  <div className="flex gap-2">
                    {pairs.map((pair: string) => (
                      <div
                        key={pair}
                        className="px-3 py-2 rounded font-mono font-bold"
                        style={{
                          backgroundColor: pair === pairFound
                            ? theme.colors.success + '30'
                            : theme.colors.background,
                          border: `2px solid ${pair === pairFound ? theme.colors.success : theme.colors.border}`,
                          color: theme.colors.text,
                        }}
                      >
                        {pair}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pairFound && removing && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ Found "{pairFound}" at index {pairIndex} - removing
                  </div>
                </div>
              )}

              {removed && previousLength !== undefined && (
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Progress
                  </div>
                  <div className="text-lg" style={{ color: theme.colors.text }}>
                    Length: {previousLength} → {newLength} (removed 2 chars)
                  </div>
                </div>
              )}

              {noPairFound && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.error + '20',
                  border: `2px solid ${theme.colors.error}`,
                  boxShadow: `0 2px 8px ${theme.colors.error}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.error }}>
                    ✗ No valid pairs found - Invalid brackets
                  </div>
                </div>
              )}

              {allMatched && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ✓ All brackets matched - String is empty
                  </div>
                </div>
              )}
            </>
          )}

          {/* Stack Solution specific */}
          {isStack && (
            <>
              {currentChar && (
                <>
                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Current Character
                    </div>
                    <div className="text-3xl font-bold" style={{ color: theme.colors.primary }}>
                      '{currentChar}'
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Type
                    </div>
                    <div className="text-xl font-semibold" style={{
                      color: isOpening ? theme.colors.primary : theme.colors.accent
                    }}>
                      {isOpening ? 'Opening' : isClosing ? 'Closing' : '-'}
                    </div>
                  </div>
                </>
              )}

              {stackSize !== undefined && (
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Stack Size
                  </div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {stackSize}
                  </div>
                </div>
              )}

              {isClosing && expected && (
                <>
                  <div className="space-y-1">
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                      Expected Match
                    </div>
                    <div className="text-2xl font-bold" style={{ color: theme.colors.accent }}>
                      '{expected}'
                    </div>
                  </div>

                  {stackTop !== undefined && (
                    <div className="col-span-2 rounded-lg p-3" style={{
                      backgroundColor: matches
                        ? theme.colors.success + '20'
                        : theme.colors.error + '20',
                      border: `2px solid ${matches ? theme.colors.success : theme.colors.error}`,
                      boxShadow: `0 2px 8px ${matches ? theme.colors.success : theme.colors.error}30`,
                    }}>
                      <div className="text-sm font-medium" style={{
                        color: matches ? theme.colors.success : theme.colors.error
                      }}>
                        {matches
                          ? `✓ Match! Top of stack is '${stackTop}'`
                          : stackTop
                          ? `✗ Mismatch! Top is '${stackTop}', expected '${expected}'`
                          : '✗ Stack is empty - no matching opening bracket'}
                      </div>
                    </div>
                  )}
                </>
              )}

              {pushing && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.primary + '20',
                  border: `2px solid ${theme.colors.primary}`,
                  boxShadow: `0 2px 8px ${theme.colors.primary}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                    ↑ Pushing '{currentChar}' to stack
                  </div>
                </div>
              )}

              {popped && (
                <div className="col-span-2 rounded-lg p-3" style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                  boxShadow: `0 2px 8px ${theme.colors.success}30`,
                }}>
                  <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                    ↓ Popped '{popped}' from stack - Match successful
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
                    ✗ Bracket mismatch detected - Invalid string
                  </div>
                </div>
              )}

              {unmatchedBrackets && (
                <div className="col-span-2 space-y-2">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Unmatched Opening Brackets
                  </div>
                  <div className="flex gap-2">
                    {unmatchedBrackets.map((bracket: string, idx: number) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded font-mono text-xl font-bold"
                        style={{
                          backgroundColor: theme.colors.error + '30',
                          border: `2px solid ${theme.colors.error}`,
                          color: theme.colors.error,
                        }}
                      >
                        {bracket}
                      </div>
                    ))}
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
                className="text-2xl font-bold p-3 rounded text-center"
                style={{
                  backgroundColor: result ? theme.colors.success + '20' : theme.colors.error + '20',
                  border: `2px solid ${result ? theme.colors.success : theme.colors.error}`,
                  color: result ? theme.colors.success : theme.colors.error,
                }}
              >
                {result ? '✓ Valid Parentheses' : '✗ Invalid Parentheses'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
