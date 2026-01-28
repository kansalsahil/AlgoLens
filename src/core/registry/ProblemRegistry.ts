import { Problem, ProblemTag } from '../types';

export class ProblemRegistry {
  private static instance: ProblemRegistry;
  private problems: Map<string, Problem> = new Map();
  private categories: Map<string, string[]> = new Map(); // Deprecated, kept for backward compatibility

  private constructor() {}

  static getInstance(): ProblemRegistry {
    if (!ProblemRegistry.instance) {
      ProblemRegistry.instance = new ProblemRegistry();
    }
    return ProblemRegistry.instance;
  }

  register(problem: Problem): void {
    this.validate(problem);

    // Migrate category to tags if needed
    if (!problem.tags || problem.tags.length === 0) {
      if (problem.category) {
        problem.tags = [problem.category as ProblemTag];
      }
    }

    // Add to problems map
    this.problems.set(problem.id, problem);

    // Update categories map for backward compatibility
    if (problem.category) {
      if (!this.categories.has(problem.category)) {
        this.categories.set(problem.category, []);
      }
      const categoryProblems = this.categories.get(problem.category)!;
      if (!categoryProblems.includes(problem.id)) {
        categoryProblems.push(problem.id);
      }
    }
  }

  getProblem(id: string): Problem | undefined {
    return this.problems.get(id);
  }

  getAllProblems(): Problem[] {
    return Array.from(this.problems.values());
  }

  getProblemsByCategory(category: string): Problem[] {
    const problemIds = this.categories.get(category) || [];
    return problemIds
      .map(id => this.problems.get(id))
      .filter((p): p is Problem => p !== undefined);
  }

  getCategories(): string[] {
    return Array.from(this.categories.keys());
  }

  getAllTags(): ProblemTag[] {
    const tagSet = new Set<ProblemTag>();
    this.problems.forEach(problem => {
      if (problem.tags && problem.tags.length > 0) {
        problem.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }

  getProblemsByTags(tags: ProblemTag[]): Problem[] {
    if (tags.length === 0) {
      return this.getAllProblems();
    }
    return this.getAllProblems().filter(problem =>
      problem.tags && problem.tags.length > 0 &&
      tags.every(tag => problem.tags.includes(tag))
    );
  }

  private validate(problem: Problem): void {
    if (!problem.id) {
      throw new Error('Problem must have an id');
    }
    if (!problem.title) {
      throw new Error('Problem must have a title');
    }
    if (!problem.tags || problem.tags.length === 0) {
      // Fallback to category for backward compatibility
      if (!problem.category) {
        throw new Error('Problem must have tags or category');
      }
    }
    if (!problem.solutions || problem.solutions.length === 0) {
      throw new Error('Problem must have at least one solution');
    }
    if (!problem.defaultVisualizerComponent) {
      throw new Error('Problem must have a default visualizer component');
    }
  }
}

// Convenience function for problem modules
export function registerProblem(problem: Problem): void {
  ProblemRegistry.getInstance().register(problem);
}
