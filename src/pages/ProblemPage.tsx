import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useProblem, useAnimation, useTheme } from '../hooks';
import { ProblemDescription } from '../components/problem/ProblemDescription';
import { SolutionSelector } from '../components/problem/SolutionSelector';
import { CodeDisplay } from '../components/problem/CodeDisplay';
import { VisualizationCanvas } from '../components/problem/VisualizationCanvas';
import { PlaybackControls } from '../components/visualization/PlaybackControls';
import { ResizablePanel } from '../components/layout/ResizablePanel';
import { ThemeSelector } from '../components/ui/ThemeSelector';

export function ProblemPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const { selectProblem, currentProblem, currentSolution, currentInput, selectSolution } = useProblem();
  const { executeSolution, currentStep, state, pause, reset } = useAnimation();
  const { theme } = useTheme();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const executeSolutionRef = useRef(executeSolution);

  // Keep ref up to date
  useEffect(() => {
    executeSolutionRef.current = executeSolution;
  }, [executeSolution]);

  // Select problem on mount and when problemId changes
  useEffect(() => {
    if (problemId) {
      // Small delay to ensure problems are registered
      const timer = setTimeout(() => {
        selectProblem(problemId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [problemId, selectProblem]);

  // Pause animation when navigating away or when problemId changes
  useEffect(() => {
    return () => {
      // Cleanup: pause animation and reset when component unmounts or problemId changes
      pause();
      reset();
    };
  }, [problemId, pause, reset]);

  // Auto-run when problem or solution changes
  useEffect(() => {
    let isMounted = true;

    const runSolution = async () => {
      if (currentSolution && currentInput && isMounted) {
        try {
          await executeSolutionRef.current(currentSolution, currentInput);
          if (isMounted) {
            setIsInitialLoad(false);
          }
        } catch (error) {
          console.error('Error running solution:', error);
          if (isMounted) {
            setIsInitialLoad(false);
          }
        }
      }
    };

    runSolution();

    return () => {
      isMounted = false;
    };
  }, [currentProblem?.id, currentSolution?.id, currentInput]);

  if (!currentProblem) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Problem not found
      </div>
    );
  }

  const VisualizerComponent = currentSolution?.visualizerComponent || currentProblem.defaultVisualizerComponent;

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: theme.colors.background }}>
      {/* Header with back button */}
      <div
        className="px-4 py-3 flex items-center justify-between shadow-sm"
        style={{
          backgroundColor: theme.colors.surface,
          borderBottom: `2px solid ${theme.colors.border}`,
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1 rounded transition-colors"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.border}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.primary;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.background;
              e.currentTarget.style.color = theme.colors.text;
            }}
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold" style={{ color: theme.colors.text }}>
            {currentProblem.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSelector />
          {!showLeftPanel && (
            <button
              onClick={() => setShowLeftPanel(true)}
              className="px-3 py-1 rounded transition-colors text-sm"
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.primary;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.background;
                e.currentTarget.style.color = theme.colors.text;
              }}
            >
              Show Description
            </button>
          )}
          {!showRightPanel && (
            <button
              onClick={() => setShowRightPanel(true)}
              className="px-3 py-1 rounded transition-colors text-sm"
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.primary;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.background;
                e.currentTarget.style.color = theme.colors.text;
              }}
            >
              Show Code
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Problem Description */}
        {showLeftPanel && (
          <ResizablePanel defaultWidth={400} minWidth={300} maxWidth={600} side="left">
            <div
              className="h-full overflow-y-auto relative"
              style={{ backgroundColor: theme.colors.surface }}
            >
              <button
                onClick={() => setShowLeftPanel(false)}
                className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full shadow-sm flex items-center justify-center transition-colors text-sm"
                style={{
                  backgroundColor: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  color: theme.colors.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.background;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.surface;
                }}
                title="Hide Description"
              >
                ◀
              </button>
              <div className="pr-12">
                <ProblemDescription problem={currentProblem} />
              </div>
            </div>
          </ResizablePanel>
        )}

        {/* Middle: Visualization Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-auto">
            {!isInitialLoad && currentStep ? (
              <VisualizationCanvas
                VisualizerComponent={VisualizerComponent}
                visualizationProps={{
                  step: currentStep,
                  isAnimating: state.isPlaying,
                  transitionDuration: 0.5,
                }}
              />
            ) : (
              <div
                className="h-full flex items-center justify-center"
                style={{ backgroundColor: theme.colors.background }}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <div
                      className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                      style={{ borderColor: theme.colors.primary, borderTopColor: 'transparent' }}
                    ></div>
                  </div>
                  <div className="font-medium" style={{ color: theme.colors.textSecondary }}>Preparing visualization...</div>
                </div>
              </div>
            )}
          </div>

          {/* Playback Controls */}
          {!isInitialLoad && <PlaybackControls />}
        </div>

        {/* Right Panel: Solution Selector & Code Display */}
        {showRightPanel && currentSolution && (
          <ResizablePanel defaultWidth={450} minWidth={300} maxWidth={700} side="right">
            <div
              className="h-full flex flex-col overflow-hidden"
              style={{ backgroundColor: theme.colors.surface }}
            >
              <div
                className="flex-shrink-0 relative"
                style={{ borderBottom: `1px solid ${theme.colors.border}` }}
              >
                <button
                  onClick={() => setShowRightPanel(false)}
                  className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full shadow-sm flex items-center justify-center transition-colors text-sm"
                  style={{
                    backgroundColor: theme.colors.surface,
                    border: `1px solid ${theme.colors.border}`,
                    color: theme.colors.text,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.background;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.surface;
                  }}
                  title="Hide Code"
                >
                  ▶
                </button>
                <div className="pl-12">
                  <SolutionSelector
                    solutions={currentProblem.solutions}
                    currentSolution={currentSolution}
                    onSelectSolution={selectSolution}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <CodeDisplay
                  code={currentSolution.code}
                  highlightedLine={currentStep?.lineNumber}
                />
              </div>
            </div>
          </ResizablePanel>
        )}
      </div>
    </div>
  );
}
