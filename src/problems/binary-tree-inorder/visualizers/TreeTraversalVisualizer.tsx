import { VisualizationProps } from '../../../core/types';
import { TreeVisualizer, StackVisualizer } from '../../../components/primitives';
import { useTheme } from '../../../hooks';

export function TreeTraversalVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { trees, custom, stack } = visualizationData;
  const { theme } = useTheme();

  const tree = trees?.[0];
  if (!tree) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const { result, curr } = custom || {};

  const isRecursive = stack && stack.length > 0 && stack[0]?.functionName === 'traverse';

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <TreeVisualizer tree={tree} transitionDuration={transitionDuration} />
        </div>
        
        {stack && stack.length > 0 && (
          <div>
            <StackVisualizer 
              stack={stack} 
              transitionDuration={transitionDuration}
              title={isRecursive ? 'Call Stack' : 'Stack'}
            />
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div
        className="rounded-lg shadow-md p-6 max-w-2xl mx-auto"
        style={{
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <div className="grid grid-cols-1 gap-4">
          {result !== undefined && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                result
              </div>
              <div
                className="text-lg font-mono p-2 rounded"
                style={{
                  color: theme.colors.text,
                  backgroundColor: theme.colors.background,
                }}
              >
                [{result.join(', ')}]
              </div>
            </div>
          )}

          {curr !== undefined && (
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                curr
              </div>
              <div className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                {curr}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
