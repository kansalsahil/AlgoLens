import { AnimationStep } from '../types';

export interface AnimationState {
  steps: AnimationStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;
  loop: boolean;
}

export class AnimationEngine {
  private state: AnimationState;
  private intervalId: number | null = null;
  private listeners: Set<(state: AnimationState) => void> = new Set();
  private baseSpeed = 1000; // Base duration in ms

  constructor(initialState?: Partial<AnimationState>) {
    this.state = {
      steps: [],
      currentStepIndex: 0,
      isPlaying: false,
      speed: 1,
      loop: false,
      ...initialState,
    };
  }

  // Playback controls
  play(): void {
    if (this.state.steps.length === 0) return;

    // If at the end, reset to beginning
    if (this.state.currentStepIndex >= this.state.steps.length - 1) {
      this.state.currentStepIndex = 0;
    }

    this.state.isPlaying = true;
    this.notifyListeners();
    this.startTicking();
  }

  pause(): void {
    this.state.isPlaying = false;
    this.stopTicking();
    this.notifyListeners();
  }

  reset(): void {
    this.stopTicking();
    this.state.currentStepIndex = 0;
    this.state.isPlaying = false;
    this.notifyListeners();
  }

  stepForward(): void {
    if (this.state.currentStepIndex < this.state.steps.length - 1) {
      this.state.currentStepIndex++;
      this.notifyListeners();
    }
  }

  stepBackward(): void {
    if (this.state.currentStepIndex > 0) {
      this.state.currentStepIndex--;
      this.notifyListeners();
    }
  }

  goToStep(index: number): void {
    if (index >= 0 && index < this.state.steps.length) {
      this.state.currentStepIndex = index;
      this.notifyListeners();
    }
  }

  setSpeed(speed: number): void {
    this.state.speed = speed;
    this.notifyListeners();

    // Restart ticking if playing to apply new speed
    if (this.state.isPlaying) {
      this.stopTicking();
      this.startTicking();
    }
  }

  toggleLoop(): void {
    this.state.loop = !this.state.loop;
    this.notifyListeners();
  }

  // State management
  loadSteps(steps: AnimationStep[]): void {
    this.stopTicking();
    this.state.steps = steps;
    this.state.currentStepIndex = 0;
    this.state.isPlaying = false;
    this.notifyListeners();
  }

  getCurrentStep(): AnimationStep | null {
    if (this.state.steps.length === 0) return null;
    return this.state.steps[this.state.currentStepIndex] || null;
  }

  getState(): AnimationState {
    return { ...this.state };
  }

  // Observer pattern for React integration
  subscribe(listener: (state: AnimationState) => void): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Private helper methods
  private notifyListeners(): void {
    const stateCopy = this.getState();
    this.listeners.forEach(listener => listener(stateCopy));
  }

  private startTicking(): void {
    if (this.intervalId !== null) return;

    const tick = () => {
      if (!this.state.isPlaying) return;

      const currentStep = this.getCurrentStep();
      const duration = this.calculateStepDuration(currentStep);

      this.intervalId = window.setTimeout(() => {
        if (this.state.currentStepIndex < this.state.steps.length - 1) {
          this.state.currentStepIndex++;
          this.notifyListeners();
          tick(); // Schedule next tick
        } else {
          // Reached the end
          if (this.state.loop) {
            this.state.currentStepIndex = 0;
            this.notifyListeners();
            tick(); // Continue looping
          } else {
            this.pause();
          }
        }
      }, duration);
    };

    tick();
  }

  private stopTicking(): void {
    if (this.intervalId !== null) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  private calculateStepDuration(step: AnimationStep | null): number {
    if (!step) return this.baseSpeed;
    const stepDuration = step.duration || this.baseSpeed;
    return stepDuration / this.state.speed;
  }

  // Cleanup
  destroy(): void {
    this.stopTicking();
    this.listeners.clear();
  }
}
