import { useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import { useTheme } from '../../hooks';

interface CodeDisplayProps {
  code: string;
  language?: string;
  highlightedLine?: number;
}

export function CodeDisplay({ code, language = 'typescript', highlightedLine }: CodeDisplayProps) {
  const { theme } = useTheme();

  // Use Prism.highlight to get HTML string instead of DOM manipulation
  const highlightedLines = useMemo(() => {
    const lines = code.split('\n');
    return lines.map(line => {
      try {
        const grammar = Prism.languages[language];
        if (grammar) {
          return Prism.highlight(line, grammar, language);
        }
        return line;
      } catch {
        return line;
      }
    });
  }, [code, language]);

  // Create a stable key based on code content to force re-render on code change
  const codeKey = useMemo(() => code.slice(0, 50), [code]);

  return (
    <div className="p-6" style={{ backgroundColor: theme.colors.surface }}>
      <h3 className="text-lg font-semibold mb-3" style={{ color: theme.colors.text }}>Code</h3>
      <div
        className="relative rounded-md overflow-hidden"
        style={{ backgroundColor: theme.colors.codeBackground }}
      >
        <pre className="p-4 overflow-x-auto">
          <code key={codeKey} className={`language-${language}`}>
            {highlightedLines.map((lineHtml, index) => {
              const lineNumber = index + 1;
              return (
                <div
                  key={`line-${lineNumber}`}
                  style={{
                    backgroundColor: highlightedLine === lineNumber ? theme.colors.codeHighlight : 'transparent',
                  }}
                >
                  <span
                    className="inline-block w-8 text-right mr-4 select-none"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {lineNumber}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: lineHtml || ' ' }} />
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
