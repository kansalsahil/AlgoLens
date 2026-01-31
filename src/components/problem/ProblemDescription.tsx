import { Problem, ListNode } from '../../core/types';
import { DIFFICULTY_COLORS } from '../../config';
import { useTheme } from '../../hooks';

interface ProblemDescriptionProps {
  problem: Problem;
}

// Helper to safely stringify values, including linked lists
function safeStringify(value: any): string {
  if (value === null || value === undefined) {
    return String(value);
  }

  // Check if it's a linked list (has id, value, and next properties)
  if (typeof value === 'object' && 'value' in value && 'next' in value && 'id' in value) {
    // Convert linked list to array representation
    const values: any[] = [];
    let current: ListNode | null = value;
    const seen = new Set<string>();

    while (current !== null) {
      // Detect cycles
      if (seen.has(current.id)) {
        values.push('...(cycle)');
        break;
      }
      seen.add(current.id);
      values.push(current.value);
      current = current.next;
    }
    return `[${values.join(',')}]`;
  }

  // Check if it's an object with linked list properties
  if (typeof value === 'object') {
    const result: any = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = safeStringify(value[key]);
      }
    }

    // If all values are strings (already stringified), format nicely
    const allStrings = Object.values(result).every(v => typeof v === 'string');
    if (allStrings) {
      const formatted = Object.entries(result)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      return `{ ${formatted} }`;
    }

    return JSON.stringify(result);
  }

  // For arrays
  if (Array.isArray(value)) {
    return `[${value.map(v => safeStringify(v)).join(',')}]`;
  }

  // For primitives
  return JSON.stringify(value);
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
                {safeStringify(example.input)}
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
                {safeStringify(example.output)}
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
