import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Problem, Solution, ProblemTag } from '../core/types';
import { ProblemRegistry } from '../core/registry';

interface ProblemContextValue {
  currentProblem: Problem | null;
  currentSolution: Solution | null;
  currentInput: any;
  selectProblem: (problemId: string) => void;
  selectSolution: (solutionId: string) => void;
  setInput: (input: any) => void;
  allProblems: Problem[];
  categories: string[];
  allTags: ProblemTag[];
}

const ProblemContext = createContext<ProblemContextValue | null>(null);

export function ProblemProvider({ children }: { children: ReactNode }) {
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [currentSolution, setCurrentSolution] = useState<Solution | null>(null);
  const [currentInput, setCurrentInput] = useState<any>(null);
  const [allProblems, setAllProblems] = useState<Problem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<ProblemTag[]>([]);

  useEffect(() => {
    // Small delay to ensure problems are registered
    const timer = setTimeout(() => {
      const registry = ProblemRegistry.getInstance();
      const problems = registry.getAllProblems();
      setAllProblems(problems);
      setCategories(registry.getCategories());
      setAllTags(registry.getAllTags());
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const selectProblem = useCallback((problemId: string) => {
    const registry = ProblemRegistry.getInstance();
    const problem = registry.getProblem(problemId);
    if (problem) {
      setCurrentProblem(problem);
      // Select first solution by default
      if (problem.solutions.length > 0) {
        setCurrentSolution(problem.solutions[0]);
      }
      // Set default input from first example
      if (problem.examples.length > 0) {
        setCurrentInput(problem.examples[0].input);
      }
    }
  }, []);

  const selectSolution = useCallback((solutionId: string) => {
    if (!currentProblem) return;
    const solution = currentProblem.solutions.find(s => s.id === solutionId);
    if (solution) {
      setCurrentSolution(solution);
    }
  }, [currentProblem]);

  const setInput = useCallback((input: any) => {
    setCurrentInput(input);
  }, []);

  const value: ProblemContextValue = useMemo(() => ({
    currentProblem,
    currentSolution,
    currentInput,
    selectProblem,
    selectSolution,
    setInput,
    allProblems,
    categories,
    allTags,
  }), [currentProblem, currentSolution, currentInput, selectProblem, selectSolution, setInput, allProblems, categories, allTags]);

  return (
    <ProblemContext.Provider value={value}>
      {children}
    </ProblemContext.Provider>
  );
}

export function useProblem() {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error('useProblem must be used within ProblemProvider');
  }
  return context;
}
