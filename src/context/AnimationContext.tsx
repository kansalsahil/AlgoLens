import { createContext, useContext, useEffect, useState, useRef, ReactNode, useCallback, useMemo } from 'react';
import { AnimationController, AnimationState } from '../core/animation';
import { AnimationStep, Solution } from '../core/types';
import { soundEffects } from '../utils/sounds';

interface AnimationContextValue {
  controller: AnimationController;
  state: AnimationState;
  currentStep: AnimationStep | null;
  play: () => void;
  pause: () => void;
  reset: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  goToStep: (index: number) => void;
  setSpeed: (speed: number) => void;
  toggleLoop: () => void;
  executeSolution: (solution: Solution, input: any) => Promise<void>;
}

const AnimationContext = createContext<AnimationContextValue | null>(null);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const controllerRef = useRef(new AnimationController());
  const [state, setState] = useState<AnimationState>({
    steps: [],
    currentStepIndex: 0,
    isPlaying: false,
    speed: 1,
    loop: false,
  });
  const [currentStep, setCurrentStep] = useState<AnimationStep | null>(null);
  const prevStepIndexRef = useRef<number>(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    const controller = controllerRef.current;
    const engine = controller.getEngine();

    // Subscribe to state changes
    const unsubscribe = engine.subscribe((newState) => {
      // Only update state and play sounds if component is still mounted
      if (!isMountedRef.current) return;
      
      setState(newState);
      const newStep = engine.getCurrentStep();
      setCurrentStep(newStep);

      // Play sound when step changes during playback (only if mounted)
      if (newState.isPlaying && newState.currentStepIndex !== prevStepIndexRef.current && isMountedRef.current) {
        // Play different sounds based on step type
        switch (newStep?.type) {
          case 'return':
            soundEffects.playSuccess();
            break;
          case 'comparison':
            soundEffects.playCompare();
            break;
          case 'assignment':
            soundEffects.playAssignment();
            break;
          case 'iteration':
            soundEffects.playIteration();
            break;
          case 'initialization':
            soundEffects.playInitialization();
            break;
          case 'custom':
            soundEffects.playHighlight();
            break;
          default:
            soundEffects.playStep();
        }
      }
      prevStepIndexRef.current = newState.currentStepIndex;
    });

    return () => {
      isMountedRef.current = false;
      // Pause animation on unmount
      engine.pause();
      unsubscribe();
      controller.destroy();
    };
  }, []);

  const play = useCallback(() => {
    controllerRef.current.getEngine().play();
  }, []);

  const pause = useCallback(() => {
    controllerRef.current.getEngine().pause();
  }, []);

  const reset = useCallback(() => {
    controllerRef.current.getEngine().reset();
  }, []);

  const stepForward = useCallback(() => {
    controllerRef.current.getEngine().stepForward();
  }, []);

  const stepBackward = useCallback(() => {
    controllerRef.current.getEngine().stepBackward();
  }, []);

  const goToStep = useCallback((index: number) => {
    controllerRef.current.getEngine().goToStep(index);
  }, []);

  const setSpeed = useCallback((speed: number) => {
    controllerRef.current.getEngine().setSpeed(speed);
  }, []);

  const toggleLoop = useCallback(() => {
    controllerRef.current.getEngine().toggleLoop();
  }, []);

  const executeSolution = useCallback(async (solution: Solution, input: any) => {
    await controllerRef.current.executeSolution(solution, input);
  }, []);

  const value: AnimationContextValue = useMemo(() => ({
    controller: controllerRef.current,
    state,
    currentStep,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    goToStep,
    setSpeed,
    toggleLoop,
    executeSolution,
  }), [state, currentStep, play, pause, reset, stepForward, stepBackward, goToStep, setSpeed, toggleLoop, executeSolution]);

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider');
  }
  return context;
}
