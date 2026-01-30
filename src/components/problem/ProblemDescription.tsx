import { Problem } from '../../core/types';
import { DIFFICULTY_COLORS } from '../../config';
import { useTheme } from '../../hooks';

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const { theme } = useTheme();

  return (
    <div className="p-6 space-y-6">
      {/* Title and Difficulty */}
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>{problem.title}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${DIFFICULTY_COLORS[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
      </div>

      {/* Description */}
      <div className="prose max-w-none">
        <p className="whitespace-pre-wrap" style={{ color: theme.colors.text }}>{problem.description}</p>
      </div>

      {/* Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: theme.colors.text }}>Examples</h3>
        {problem.examples.map((example, index) => (
          <div
            key={index}
            className="p-4 rounded-lg space-y-2 transition-all duration-200 hover:shadow-lg"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
              boxShadow: `0 2px 8px ${theme.colors.border}40`,
            }}
          >
            <div>
              <span className="font-medium" style={{ color: theme.colors.text }}>Input:</span>
              <code
                className="ml-2 text-sm px-2 py-1 rounded"
                style={{
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                {JSON.stringify(example.input)}
              </code>
            </div>
            <div>
              <span className="font-medium" style={{ color: theme.colors.text }}>Output:</span>
              <code
                className="ml-2 text-sm px-2 py-1 rounded"
                style={{
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                {JSON.stringify(example.output)}
              </code>
            </div>
            {example.explanation && (
              <div>
                <span className="font-medium" style={{ color: theme.colors.text }}>Explanation:</span>
                <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>{example.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: theme.colors.text }}>Constraints</h3>
        <ul className="list-disc list-inside space-y-1" style={{ color: theme.colors.text }}>
          {problem.constraints.map((constraint, index) => (
            <li key={index} className="text-sm">{constraint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
