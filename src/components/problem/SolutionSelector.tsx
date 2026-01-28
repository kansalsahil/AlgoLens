import { Solution } from '../../core/types';
import { useTheme } from '../../hooks';

interface SolutionSelectorProps {
  solutions: Solution[];
  currentSolution: Solution | null;
  onSelectSolution: (solutionId: string) => void;
}

export function SolutionSelector({ solutions, currentSolution, onSelectSolution }: SolutionSelectorProps) {
  const { theme } = useTheme();

  return (
    <div className="p-6" style={{ backgroundColor: theme.colors.surface }}>
      <h3 className="text-lg font-semibold mb-3" style={{ color: theme.colors.text }}>Solution</h3>
      <div className="space-y-2">
        {solutions.map(solution => (
          <div key={solution.id}>
            <label
              className="flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: currentSolution?.id === solution.id ? theme.colors.primary + '20' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (currentSolution?.id !== solution.id) {
                  e.currentTarget.style.backgroundColor = theme.colors.primary + '10';
                  e.currentTarget.style.borderColor = theme.colors.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (currentSolution?.id !== solution.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = theme.colors.border;
                }
              }}
            >
              <input
                type="radio"
                name="solution"
                value={solution.id}
                checked={currentSolution?.id === solution.id}
                onChange={() => onSelectSolution(solution.id)}
                className="w-4 h-4 flex-shrink-0"
                style={{ accentColor: theme.colors.primary }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium" style={{ color: theme.colors.text }}>{solution.name}</div>
                <div className="text-sm" style={{ color: theme.colors.textSecondary }}>{solution.description}</div>
                <div className="text-xs mt-1" style={{ color: theme.colors.textSecondary }}>
                  Time: {solution.timeComplexity} | Space: {solution.spaceComplexity}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
