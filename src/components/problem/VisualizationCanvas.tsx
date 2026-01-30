import { VisualizationProps } from '../../core/types';
import { useTheme } from '../../hooks';

interface VisualizationCanvasProps {
  VisualizerComponent: React.ComponentType<VisualizationProps>;
  visualizationProps: VisualizationProps;
}

export function VisualizationCanvas({ VisualizerComponent, visualizationProps }: VisualizationCanvasProps) {
  const { theme } = useTheme();

  return (
    <div className="flex-1 flex items-center justify-center p-8" style={{ backgroundColor: theme.colors.background }}>
      <VisualizerComponent {...visualizationProps} />
    </div>
  );
}
