import { AnimationEngine } from './AnimationEngine';
import { Solution, SolutionExecution, VisualizationData } from '../types';

export class AnimationController {
  private engine: AnimationEngine;
  private executionContext: SolutionExecution | null = null;

  constructor() {
    this.engine = new AnimationEngine();
  }

  async executeSolution<TInput, TOutput>(
    solution: Solution<TInput, TOutput>,
    input: TInput
  ): Promise<void> {
    try {
      // Execute the solution to get animation steps
      this.executionContext = solution.execute(input);

      // Load steps into the animation engine
      this.engine.loadSteps(this.executionContext.steps);
    } catch (error) {
      console.error('Error executing solution:', error);
      throw error;
    }
  }

  getCurrentVisualization(): VisualizationData | null {
    const currentStep = this.engine.getCurrentStep();
    return currentStep ? currentStep.visualizationData : null;
  }

  getCurrentCodeLine(): number | null {
    const currentStep = this.engine.getCurrentStep();
    return currentStep?.lineNumber ?? null;
  }

  getCurrentVariables(): Record<string, any> | null {
    const currentStep = this.engine.getCurrentStep();
    return currentStep?.variables ?? null;
  }

  getCurrentStepDescription(): string | null {
    const currentStep = this.engine.getCurrentStep();
    return currentStep?.description ?? null;
  }

  getResult(): any {
    return this.executionContext?.result ?? null;
  }

  getEngine(): AnimationEngine {
    return this.engine;
  }

  destroy(): void {
    this.engine.destroy();
    this.executionContext = null;
  }
}
