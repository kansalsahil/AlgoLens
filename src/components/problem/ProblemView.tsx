import { useState, useEffect } from 'react';
import { useProblem, useAnimation } from '../../hooks';
import { ProblemDescription } from './ProblemDescription';
import { SolutionSelector } from './SolutionSelector';
import { CodeDisplay } from './CodeDisplay';
import { VisualizationCanvas } from './VisualizationCanvas';
import { PlaybackControls } from '../visualization/PlaybackControls';
import { CollapsiblePanel } from '../layout/CollapsiblePanel';

export function ProblemView() {
  const { currentProblem, currentSolution, currentInput, selectSolution } = useProblem();
  const { executeSolution, currentStep, state } = useAnimation();
  const [hasRun, setHasRun] = useState(false);

  // Auto-run when problem or solution changes
  useEffect(() => {
    const runSolution = async () => {
      if (currentSolution && currentInput) {
        try {
          await executeSolution(currentSolution, currentInput);
          setHasRun(true);
        } catch (error) {
          console.error('Error running solution:', error);
        }
      }
    };

    setHasRun(false);
    // Small delay to allow UI to update
    const timer = setTimeout(() => {
      runSolution();
    }, 100);

    return () => clearTimeout(timer);
  }, [currentProblem?.id, currentSolution?.id, currentInput, executeSolution]);

  if (!currentProblem) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a problem to get started
      </div>
    );
  }

  const VisualizerComponent = currentSolution?.visualizerComponent || currentProblem.defaultVisualizerComponent;

  return (
    <div className="h-full flex flex-col">
      {/* Top: Problem Description Panel */}
      <CollapsiblePanel title="Problem Description" defaultOpen={true} position="top">
        <div className="max-h-64 overflow-y-auto">
          <ProblemDescription problem={currentProblem} />
          <div className="border-t border-gray-200">
            <SolutionSelector
              solutions={currentProblem.solutions}
              currentSolution={currentSolution}
              onSelectSolution={selectSolution}
            />
          </div>
        </div>
      </CollapsiblePanel>

      {/* Middle: Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Visualization Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto">
            {hasRun && currentStep ? (
              <VisualizationCanvas
                VisualizerComponent={VisualizerComponent}
                visualizationProps={{
                  step: currentStep,
                  isAnimating: state.isPlaying,
                  transitionDuration: 0.3,
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="animate-pulse text-gray-500">Loading visualization...</div>
                </div>
              </div>
            )}
          </div>

          {/* Playback Controls */}
          {hasRun && <PlaybackControls />}
        </div>

        {/* Right Side: Code Panel */}
        {currentSolution && (
          <div className="w-full lg:w-96 max-h-full flex flex-col">
            <CollapsiblePanel title="Solution Code" defaultOpen={true} position="right">
              <div className="max-h-96 overflow-y-auto">
                <CodeDisplay
                  code={currentSolution.code}
                  highlightedLine={currentStep?.lineNumber}
                />
              </div>
            </CollapsiblePanel>
          </div>
        )}
      </div>
    </div>
  );
}
