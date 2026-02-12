import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

// CSS animations for coins
const coinAnimations = `
@keyframes coinFlip {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

@keyframes coinBounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.1);
  }
}

@keyframes highlight {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}
`;

export function CoinChangeVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  if (!custom) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    coins,
    amount,
    currentAmount,
    currentCoin,
    dp,
    dpTable,
    memoArray,
    treeNodes,
    phase,
    result,
    prevAmount,
    prevCoins,
    newCoins,
    formula,
    complete,
    minCoins,
  } = custom;

  const coinColors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <>
      <style>{coinAnimations}</style>
      <div className="space-y-8">
        {/* DP Array Visualization (for Tabulation) */}
        {arrays && arrays.length > 0 && (
          <div className="space-y-2">
            <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              DP Array (minimum coins for each amount)
            </div>
            <ArrayAdapter array={arrays[0]} transitionDuration={transitionDuration} />
          </div>
        )}

        {/* Coins Display */}
        <div className="space-y-3">
          <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
            Available Coins
          </div>
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
            }}
          >
            <div className="flex gap-4 justify-center items-center flex-wrap">
              {coins.map((coin: number, idx: number) => {
                const isActive = currentCoin === coin;
                const color = coinColors[idx % coinColors.length];
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-2"
                    style={{
                      animation: isActive ? 'coinBounce 0.6s ease-in-out infinite' : 'none',
                    }}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? color : color + '80',
                        border: `4px solid ${isActive ? '#fff' : color}`,
                        color: '#fff',
                        boxShadow: isActive ? `0 0 20px ${color}` : `0 4px 10px ${color}40`,
                      }}
                    >
                      {coin}
                    </div>
                    <div
                      className="text-sm font-semibold px-2 py-1 rounded"
                      style={{
                        color: isActive ? color : theme.colors.textSecondary,
                        backgroundColor: isActive ? color + '20' : 'transparent',
                      }}
                    >
                      {isActive ? 'Using' : `Coin ${coin}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* DP Table Visualization */}
        {dpTable && dpTable.length > 0 && (
          <div className="space-y-3">
            <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              DP Table: Amount → Minimum Coins
            </div>
            <div
              className="p-6 rounded-xl overflow-x-auto"
              style={{
                backgroundColor: theme.colors.surface,
                border: `2px solid ${theme.colors.border}`,
              }}
            >
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(dpTable.length, 12)}, minmax(60px, 1fr))` }}>
                {dpTable.slice(0, Math.min(dpTable.length, amount + 1)).map((entry: any) => {
                  const isCurrent = entry.current;
                  const isTarget = entry.target;
                  const isConsidering = entry.considering;
                  const isUpdated = entry.updated;

                  let bgColor = theme.colors.background;
                  let borderColor = theme.colors.border;
                  let textColor = theme.colors.text;

                  if (isTarget && complete) {
                    bgColor = '#10b98140';
                    borderColor = '#10b981';
                    textColor = '#10b981';
                  } else if (isUpdated) {
                    bgColor = '#10b98130';
                    borderColor = '#10b981';
                  } else if (isCurrent) {
                    bgColor = '#fbbf2430';
                    borderColor = '#fbbf24';
                  } else if (isConsidering) {
                    bgColor = '#3b82f630';
                    borderColor = '#3b82f6';
                  } else if (entry.minCoins !== null && entry.minCoins !== undefined) {
                    bgColor = theme.colors.primary + '20';
                    borderColor = theme.colors.primary;
                  }

                  return (
                    <div
                      key={entry.amount}
                      className="p-3 rounded-lg text-center transition-all duration-300"
                      style={{
                        backgroundColor: bgColor,
                        border: `2px solid ${borderColor}`,
                        animation: isCurrent || isUpdated ? 'highlight 1s ease-in-out' : 'none',
                      }}
                    >
                      <div className="text-xs font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                        Amount {entry.amount}
                      </div>
                      <div className="text-2xl font-bold" style={{ color: textColor }}>
                        {entry.minCoins === null || entry.minCoins === undefined ? '∞' : entry.minCoins}
                      </div>
                      {entry.minCoins !== null && entry.minCoins !== undefined && entry.minCoins > 0 && (
                        <div className="text-xs mt-1" style={{ color: theme.colors.textSecondary }}>
                          {entry.minCoins} coin{entry.minCoins !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Show formula during computation */}
              {formula && (
                <div className="mt-6">
                  <div
                    className="p-4 rounded-lg text-center"
                    style={{
                      backgroundColor: theme.colors.primary + '20',
                      border: `2px solid ${theme.colors.primary}`,
                    }}
                  >
                    <div className="text-sm font-mono font-bold" style={{ color: theme.colors.primary }}>
                      {formula}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Memoization Cache */}
        {memoArray && memoArray.length > 0 && (
          <div className="space-y-3">
            <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Memoization Cache
            </div>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: theme.colors.surface,
                border: `2px solid ${theme.colors.border}`,
              }}
            >
              <div className="grid grid-cols-4 gap-3">
                {memoArray.map((entry: any) => (
                  <div
                    key={entry.amount}
                    className="p-3 rounded-lg text-center transition-all duration-300"
                    style={{
                      backgroundColor: entry.highlight ? theme.colors.primary + '30' : theme.colors.background,
                      border: `2px solid ${entry.highlight ? theme.colors.primary : theme.colors.border}`,
                    }}
                  >
                    <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                      dp[{entry.amount}]
                    </div>
                    <div
                      className="text-xl font-bold mt-1"
                      style={{ color: entry.minCoins === -1 ? '#ef4444' : theme.colors.text }}
                    >
                      {entry.minCoins === -1 ? 'X' : entry.minCoins}
                    </div>
                    {entry.minCoins > 0 && (
                      <div className="text-xs mt-1" style={{ color: theme.colors.textSecondary }}>
                        {entry.minCoins} coins
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recursion Tree (for Recursive solution) */}
        {treeNodes && treeNodes.length > 0 && phase !== 'start' && (
          <div className="space-y-3">
            <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Recursion Tree
            </div>
            <div
              className="p-6 rounded-xl overflow-x-auto"
              style={{
                backgroundColor: theme.colors.surface,
                border: `2px solid ${theme.colors.border}`,
              }}
            >
              <div className="space-y-4 min-w-max">
                {Array.from(new Set(treeNodes.map((node: any) => node.depth))).map((d) => {
                  const nodesAtDepth = treeNodes.filter((node: any) => node.depth === d);
                  return (
                    <div key={String(d)} className="flex gap-2 justify-center items-center flex-wrap">
                      {nodesAtDepth.map((node: any, idx: number) => {
                        const hasResult = node.result !== undefined;
                        const isImpossible = node.result === -1;
                        return (
                          <div
                            key={`${d}-${idx}`}
                            className="p-2 rounded-lg text-center min-w-[70px] transition-all duration-300"
                            style={{
                              backgroundColor: hasResult
                                ? isImpossible
                                  ? '#ef444440'
                                  : '#10b98140'
                                : '#fbbf2440',
                              border: `2px solid ${hasResult ? (isImpossible ? '#ef4444' : '#10b981') : '#fbbf24'}`,
                            }}
                          >
                            <div className="text-xs font-semibold" style={{ color: theme.colors.text }}>
                              amount={node.amount}
                            </div>
                            {hasResult && (
                              <div
                                className="text-lg font-bold mt-1"
                                style={{ color: isImpossible ? '#ef4444' : '#10b981' }}
                              >
                                {isImpossible ? 'X' : node.result}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Current Computation Info Panel */}
        <div
          className="rounded-xl p-6 space-y-4"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
            boxShadow: `0 4px 16px ${theme.colors.border}40`,
          }}
        >
          <div className="space-y-3">
            {/* Current Amount */}
            {currentAmount !== undefined && currentAmount >= 0 && !complete && (
              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Current Amount
                </div>
                <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                  {currentAmount}
                </div>
              </div>
            )}

            {/* Current Coin */}
            {currentCoin !== undefined && (
              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Trying Coin
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: coinColors[coins.indexOf(currentCoin) % coinColors.length],
                  }}
                >
                  {currentCoin}
                </div>
              </div>
            )}

            {/* Computation Details */}
            {prevAmount !== undefined && prevCoins !== undefined && (
              <div
                className="p-4 rounded-lg space-y-2"
                style={{
                  backgroundColor: theme.colors.background,
                  border: `2px solid ${theme.colors.border}`,
                }}
              >
                <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  <strong>Previous Amount:</strong> {prevAmount} requires {prevCoins} coins
                </div>
                {newCoins !== undefined && (
                  <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    <strong>New Count:</strong> {prevCoins} + 1 = {newCoins} coins
                  </div>
                )}
              </div>
            )}

            {/* Minimum Coins Tracker */}
            {minCoins !== undefined && minCoins !== null && (
              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Current Minimum
                </div>
                <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
                  {minCoins} coins
                </div>
              </div>
            )}

            {/* Phase Information */}
            {phase && !complete && (
              <div
                className="p-3 rounded-lg"
                style={{
                  backgroundColor:
                    phase === 'impossible' || phase === 'skip_coin'
                      ? '#ef444420'
                      : phase === 'updated' || phase === 'cache_hit'
                      ? '#10b98120'
                      : theme.colors.primary + '20',
                  border: `2px solid ${
                    phase === 'impossible' || phase === 'skip_coin'
                      ? '#ef4444'
                      : phase === 'updated' || phase === 'cache_hit'
                      ? '#10b981'
                      : theme.colors.primary
                  }`,
                }}
              >
                <div
                  className="text-sm font-semibold capitalize"
                  style={{
                    color:
                      phase === 'impossible' || phase === 'skip_coin'
                        ? '#ef4444'
                        : phase === 'updated' || phase === 'cache_hit'
                        ? '#10b981'
                        : theme.colors.primary,
                  }}
                >
                  {phase.replace(/_/g, ' ')}
                </div>
              </div>
            )}

            {/* Final Result */}
            {complete && result !== undefined && (
              <div
                className="rounded-lg p-6 text-center"
                style={{
                  backgroundColor: result >= 0 ? '#10b98120' : '#ef444420',
                  border: `2px solid ${result >= 0 ? '#10b981' : '#ef4444'}`,
                }}
              >
                <div className="text-sm font-medium mb-2" style={{ color: theme.colors.textSecondary }}>
                  Final Answer
                </div>
                {result >= 0 ? (
                  <>
                    <div className="text-3xl font-bold" style={{ color: '#10b981' }}>
                      {result} coins
                    </div>
                    <div className="text-sm mt-2" style={{ color: theme.colors.textSecondary }}>
                      Minimum coins for amount {amount}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold" style={{ color: '#ef4444' }}>
                      No Solution
                    </div>
                    <div className="text-sm mt-2" style={{ color: theme.colors.textSecondary }}>
                      Amount {amount} cannot be made with given coins
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* DP Formula Explanation */}
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="text-sm font-medium mb-3" style={{ color: theme.colors.textSecondary }}>
            Dynamic Programming Formula
          </div>
          <div
            className="p-4 rounded-lg font-mono text-center space-y-2"
            style={{
              backgroundColor: theme.colors.background,
              border: `2px solid ${theme.colors.border}`,
              color: theme.colors.text,
            }}
          >
            <div className="text-base">dp[amount] = min(dp[amount - coin] + 1)</div>
            <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
              for all coins where coin ≤ amount
            </div>
          </div>
          <div className="text-xs mt-3 text-center space-y-1" style={{ color: theme.colors.textSecondary }}>
            <div>For each amount, try using each coin and take the minimum.</div>
            <div>
              <strong>Base case:</strong> dp[0] = 0 (zero coins for zero amount)
            </div>
            <div>
              <strong>Result:</strong> dp[amount] gives minimum coins needed
            </div>
          </div>
        </div>

        {/* Visual Coin Example */}
        {currentCoin && currentAmount && currentAmount >= currentCoin && (
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
            }}
          >
            <div className="text-sm font-medium mb-4 text-center" style={{ color: theme.colors.textSecondary }}>
              Coin Selection Visualization
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-xs mb-2" style={{ color: theme.colors.textSecondary }}>
                  Previous Amount
                </div>
                <div className="text-4xl font-bold" style={{ color: '#3b82f6' }}>
                  {prevAmount !== undefined ? prevAmount : currentAmount - currentCoin}
                </div>
              </div>
              <div className="text-3xl">+</div>
              <div className="text-center">
                <div className="text-xs mb-2" style={{ color: theme.colors.textSecondary }}>
                  Use Coin
                </div>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto"
                  style={{
                    backgroundColor: coinColors[coins.indexOf(currentCoin) % coinColors.length],
                    color: '#fff',
                    animation: 'coinFlip 1s ease-in-out infinite',
                  }}
                >
                  {currentCoin}
                </div>
              </div>
              <div className="text-3xl">=</div>
              <div className="text-center">
                <div className="text-xs mb-2" style={{ color: theme.colors.textSecondary }}>
                  Current Amount
                </div>
                <div className="text-4xl font-bold" style={{ color: '#10b981' }}>
                  {currentAmount}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
