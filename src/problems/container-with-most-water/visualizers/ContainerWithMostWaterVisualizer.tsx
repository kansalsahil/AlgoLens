import { VisualizationProps } from '../../../core/types';
import { ArrayAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

// CSS animations for water effects
const waterAnimations = `
@keyframes waterFill {
  0% {
    height: 0%;
    opacity: 0;
  }
  100% {
    height: var(--target-height);
    opacity: 1;
  }
}

@keyframes waterWave {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes waterShimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes waterRipple {
  0% {
    box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: inset 0 0 40px rgba(59, 130, 246, 0.5);
  }
  100% {
    box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.3);
  }
}

@keyframes pourWater {
  0% {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: bottom;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: bottom;
  }
}
`;

export function ContainerWithMostWaterVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { arrays, custom } = visualizationData;
  const { theme } = useTheme();

  const array = arrays?.[0];
  if (!array || !custom) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    height,
    maxArea,
    left,
    right,
    currentArea,
    currentWidth,
    currentMinHeight,
    bestLeft,
    bestRight,
    newMaxFound,
    calculating,
    comparing,
    complete,
    movedPointer,
  } = custom;

  const hasValidPointers = left >= 0 && right >= 0 && left < height.length && right < height.length;
  const hasBestPointers = bestLeft >= 0 && bestRight >= 0;

  return (
    <>
      <style>{waterAnimations}</style>
      <div className="space-y-8">
        {/* Array Visualization */}
      <div className="space-y-2">
        <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
          Height Array
        </div>
        <ArrayAdapter array={array} transitionDuration={transitionDuration} />
      </div>

      {/* Container Visualization with Vertical Bars */}
      <div className="space-y-3">
        <div className="text-center text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
          Container Visualization
        </div>
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="relative flex items-end justify-around gap-1 h-64">
            {height.map((h: number, idx: number) => {
              const maxHeight = Math.max(...height);
              const barHeight = (h / maxHeight) * 100;

              // Determine bar color
              let barColor = theme.colors.background;
              let borderColor = theme.colors.border;

              if (complete && hasBestPointers) {
                if (idx === bestLeft || idx === bestRight) {
                  barColor = idx === bestLeft ? '#3b82f6' : '#10b981';
                  borderColor = barColor;
                }
              } else if (hasValidPointers && (idx === left || idx === right)) {
                barColor = idx === left ? '#3b82f6' : '#10b981';
                borderColor = barColor;
              }

              // Determine if bar is in container
              const isInContainer =
                hasValidPointers && idx >= left && idx <= right;
              const isInBestContainer =
                hasBestPointers && idx >= bestLeft && idx <= bestRight;

              return (
                <div key={idx} className="flex flex-col items-center gap-1 flex-1 relative">
                  {/* Height label */}
                  <div
                    className="text-xs font-semibold absolute"
                    style={{
                      color: theme.colors.text,
                      top: `-${barHeight}% - 20px`,
                      transform: 'translateY(-100%)',
                    }}
                  >
                    {h}
                  </div>

                  {/* Vertical bar */}
                  <div
                    className="w-full rounded-t transition-all duration-300 relative"
                    style={{
                      height: `${barHeight}%`,
                      backgroundColor: barColor,
                      border: `2px solid ${borderColor}`,
                      minHeight: '10px',
                    }}
                  >
                    {/* Water fill for current container with animations */}
                    {!complete && hasValidPointers && isInContainer && currentMinHeight && (
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-t overflow-hidden"
                        style={{
                          height: `${(currentMinHeight / maxHeight) * 100}%`,
                          background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(96, 165, 250, 0.3) 100%)',
                          backgroundSize: '200% 200%',
                          border: '1px solid rgba(59, 130, 246, 0.6)',
                          animation: 'pourWater 0.6s ease-out, waterShimmer 3s linear infinite, waterRipple 2s ease-in-out infinite',
                          boxShadow: 'inset 0 -2px 10px rgba(59, 130, 246, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {/* Water surface wave effect */}
                        <div
                          className="absolute top-0 left-0 right-0"
                          style={{
                            height: '4px',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                            animation: 'waterWave 2s ease-in-out infinite',
                          }}
                        />
                      </div>
                    )}

                    {/* Water fill for best container with animations */}
                    {complete && hasBestPointers && isInBestContainer && (
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-t overflow-hidden"
                        style={{
                          height: `${(Math.min(height[bestLeft], height[bestRight]) / maxHeight) * 100}%`,
                          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.5) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(52, 211, 153, 0.4) 100%)',
                          backgroundSize: '200% 200%',
                          border: '1px solid rgba(16, 185, 129, 0.7)',
                          animation: 'pourWater 0.8s ease-out, waterShimmer 3s linear infinite, waterRipple 2s ease-in-out infinite',
                          boxShadow: 'inset 0 -2px 10px rgba(16, 185, 129, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        {/* Water surface wave effect */}
                        <div
                          className="absolute top-0 left-0 right-0"
                          style={{
                            height: '4px',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                            animation: 'waterWave 2s ease-in-out infinite',
                          }}
                        />
                        {/* Sparkle effect for best solution */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                            animation: 'waterShimmer 4s linear infinite reverse',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Index label */}
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    {idx}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 text-xs" style={{ color: theme.colors.textSecondary }}>
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
              <span>Left Line</span>
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
              <span>Right Line</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '3px',
                }}
              />
              <span>Water Container</span>
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
          {/* Left Pointer */}
          {hasValidPointers && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Left Pointer
              </div>
              <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>
                Index {left}
                <div className="text-base" style={{ color: theme.colors.textSecondary }}>
                  Height: {height[left]}
                </div>
              </div>
            </div>
          )}

          {/* Right Pointer */}
          {hasValidPointers && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                Right Pointer
              </div>
              <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
                Index {right}
                <div className="text-base" style={{ color: theme.colors.textSecondary }}>
                  Height: {height[right]}
                </div>
              </div>
            </div>
          )}

          {/* Current Area Calculation */}
          {(calculating || comparing) && currentArea !== undefined && (
            <>
              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Width
                </div>
                <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                  {currentWidth}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  Min Height
                </div>
                <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                  {currentMinHeight}
                </div>
              </div>

              <div
                className="col-span-2 rounded-lg p-3"
                style={{
                  backgroundColor: theme.colors.primary + '20',
                  border: `2px solid ${theme.colors.primary}`,
                }}
              >
                <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                  Current Area: {currentWidth} × {currentMinHeight} = {currentArea}
                </div>
              </div>
            </>
          )}

          {/* Maximum Area */}
          <div className="col-span-2 space-y-1">
            <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
              Maximum Area
            </div>
            <div className="text-3xl font-bold" style={{ color: '#10b981' }}>
              {maxArea}
            </div>
          </div>

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
                New maximum area found: {maxArea}
              </div>
            </div>
          )}

          {/* Pointer Movement Info */}
          {movedPointer && (
            <div
              className="col-span-2 rounded-lg p-3"
              style={{
                backgroundColor: movedPointer === 'left' ? '#3b82f6' + '20' : '#10b981' + '20',
                border: `2px solid ${movedPointer === 'left' ? '#3b82f6' : '#10b981'}`,
              }}
            >
              <div
                className="text-sm font-medium"
                style={{ color: movedPointer === 'left' ? '#3b82f6' : '#10b981' }}
              >
                Moved {movedPointer} pointer (shorter line)
              </div>
            </div>
          )}

          {/* Final Result */}
          {complete && hasBestPointers && (
            <div
              className="col-span-2 rounded-lg p-4 text-center"
              style={{
                backgroundColor: '#10b981' + '20',
                border: `2px solid #10b981`,
              }}
            >
              <div className="text-lg font-bold" style={{ color: '#10b981' }}>
                Maximum Container Area: {maxArea}
              </div>
              <div className="text-sm mt-2" style={{ color: theme.colors.textSecondary }}>
                Container between indices {bestLeft} and {bestRight}
                <br />
                Width: {bestRight - bestLeft}, Height: {Math.min(height[bestLeft], height[bestRight])}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
