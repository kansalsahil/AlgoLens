import { VisualizationProps } from '../../core/types';

interface VisualizationCanvasProps {
  VisualizerComponent: React.ComponentType<VisualizationProps>;
  visualizationProps: VisualizationProps;
}

export function VisualizationCanvas({ VisualizerComponent, visualizationProps }: VisualizationCanvasProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
      <VisualizerComponent {...visualizationProps} />
    </div>
  );
}
