import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function BestTimeToBuySellStockVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array || !custom) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    prices,
    minPrice,
    maxProfit,
    currentDay,
    currentPrice,
    minPriceDay,
    bestBuyDay,
    bestSellDay,
    currentProfit,
    buyPrice,
    sellPrice,
    newMinFound,
    newMaxFound,
    calculating,
    comparing,
    complete,
  } = custom;

  return (
    <div className="space-y-8">
      {/* Price Chart Visualization */}
      <div className="space-y-2">
        <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
          Stock Prices Over Time
        </div>
        <ArrayAdapter array={array} transitionDuration={transitionDuration} />
      </div>

      {/* Stock Chart Bars */}
      <div className="space-y-3">
        <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
          Price Chart
        </div>
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="flex items-end justify-around gap-2 h-48">
            {prices.map((price: number, idx: number) => {
              const maxPrice = Math.max(...prices);
              const height = (price / maxPrice) * 100;

              let barColor = theme.colors.background;
              if (complete && idx === bestBuyDay) barColor = '#3b82f6';
              else if (complete && idx === bestSellDay) barColor = '#10b981';
              else if (idx === currentDay) barColor = '#fbbf24';
              else if (idx === minPriceDay && !complete) barColor = '#3b82f680';
              else if (idx === bestBuyDay && !complete) barColor = '#3b82f680';
              else if (idx === bestSellDay && !complete) barColor = '#10b98180';

              return (
                <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                  <div className="text-xs font-semibold" style={{ color: theme.colors.text }}>
                    ${price}
                  </div>
                  <div
                    className="w-full rounded-t transition-all duration-300"
                    style={{
                      height: `${height}%`,
                      backgroundColor: barColor,
                      border: `2px solid ${theme.colors.border}`,
                      minHeight: '20px',
                    }}
                  />
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    D{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mt-4 text-xs" style={{ color: theme.colors.textSecondary }}>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#3b82f6',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Buy Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#10b981',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Sell Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#fbbf24',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '3px',
                }}
              />
              <span>Current</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div
        className="rounded-xl p-6 space-y-4"
        style={{
          backgroundColor: theme.colors.surface,
          border: `2px solid ${theme.colors.border}`,
          boxShadow: `0 4px 16px ${theme.colors.border}40`,
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Current Day */}
          {currentDay !== undefined && currentDay >= 0 && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Current Day
              </div>
              <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                Day {currentDay + 1}
              </div>
            </div>
          )}

          {/* Current Price */}
          {currentPrice !== undefined && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Current Price
              </div>
              <div className="text-2xl font-bold" style={{ color: '#fbbf24' }}>
                ${currentPrice}
              </div>
            </div>
          )}

          {/* Minimum Price */}
          {minPrice !== undefined && minPrice !== Infinity && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Minimum Price
              </div>
              <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>
                ${minPrice}
                {minPriceDay >= 0 && (
                  <span className="text-sm ml-2" style={{ color: theme.colors.textSecondary }}>
                    (Day {minPriceDay + 1})
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Maximum Profit */}
          <div className="space-y-1">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Maximum Profit
            </div>
            <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
              ${maxProfit}
            </div>
          </div>

          {/* Current Transaction */}
          {(buyPrice !== undefined || (bestBuyDay >= 0 && !complete)) && (
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Transaction Details
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {(buyPrice !== undefined || bestBuyDay >= 0) && (
                  <div>
                    <span style={{ color: theme.colors.textSecondary }}>Buy: </span>
                    <span className="font-semibold" style={{ color: '#3b82f6' }}>
                      ${buyPrice !== undefined ? buyPrice : prices[bestBuyDay]} (Day {(buyPrice !== undefined ? currentDay : bestBuyDay) + 1})
                    </span>
                  </div>
                )}
                {(sellPrice !== undefined || bestSellDay >= 0) && (
                  <div>
                    <span style={{ color: theme.colors.textSecondary }}>Sell: </span>
                    <span className="font-semibold" style={{ color: '#10b981' }}>
                      ${sellPrice !== undefined ? sellPrice : prices[bestSellDay]} (Day {(sellPrice !== undefined ? currentDay : bestSellDay) + 1})
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Current Profit Calculation */}
          {currentProfit !== undefined && (calculating || comparing) && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: theme.colors.primary + '20',
                border: `2px solid ${theme.colors.primary}`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                Current Profit: ${currentProfit}
              </div>
            </div>
          )}

          {/* New Min Found */}
          {newMinFound && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: '#3b82f6' + '20',
                border: `2px solid #3b82f6`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#3b82f6' }}>
                📉 New minimum price found: ${minPrice}
              </div>
            </div>
          )}

          {/* New Max Found */}
          {newMaxFound && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: '#10b981' + '20',
                border: `2px solid #10b981`,
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#10b981' }}>
                📈 New maximum profit found: ${maxProfit}
              </div>
            </div>
          )}

          {/* Final Result */}
          {complete && (
            <div
              className="col-span-2 rounded-lg p-4 text-center"
              style={{
                backgroundColor: maxProfit > 0 ? '#10b981' + '20' : theme.colors.background,
                border: `2px solid ${maxProfit > 0 ? '#10b981' : theme.colors.border}`,
              }}
            >
              <div className="text-lg font-bold" style={{ color: maxProfit > 0 ? '#10b981' : theme.colors.text }}>
                {maxProfit > 0
                  ? `✓ Maximum Profit: $${maxProfit}`
                  : '✗ No Profitable Transaction'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
