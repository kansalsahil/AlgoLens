import { useMemo, useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import { useTheme } from '../../hooks';
import type { CodeSnippet, ProgrammingLanguage } from '../../core/types';

interface CodeDisplayProps {
  code: string;
  language?: string;
  highlightedLine?: number;
  codeLanguages?: CodeSnippet[]; // Multi-language support
}

const LANGUAGE_LABELS: Record<ProgrammingLanguage, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  java: 'Java',
  csharp: 'C#',
  python: 'Python',
  cpp: 'C++',
  go: 'Go',
};

const LANGUAGE_PREFERENCE_KEY = 'algolens-preferred-language';

export function CodeDisplay({ code, language = 'typescript', highlightedLine, codeLanguages }: CodeDisplayProps) {
  const { theme } = useTheme();

  // Load preferred language from localStorage, default to Java
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(() => {
    const saved = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    // Default to Java if no preference, or if saved preference is TypeScript
    if (!saved || saved === 'typescript') {
      return 'java';
    }
    return (saved as ProgrammingLanguage);
  });

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem(LANGUAGE_PREFERENCE_KEY, selectedLanguage);
  }, [selectedLanguage]);

  // Determine available languages (exclude TypeScript)
  const availableLanguages = useMemo(() => {
    if (!codeLanguages || codeLanguages.length === 0) {
      return ['java' as ProgrammingLanguage];
    }
    // Filter out TypeScript, keep only Java and C#
    return codeLanguages
      .filter(snippet => snippet.language !== 'typescript' && snippet.language !== 'javascript')
      .map(snippet => snippet.language);
  }, [codeLanguages]);

  // Get current code based on selected language
  const currentCode = useMemo(() => {
    if (!codeLanguages || codeLanguages.length === 0) {
      return code;
    }
    const snippet = codeLanguages.find(s => s.language === selectedLanguage);
    return snippet?.code || code;
  }, [code, codeLanguages, selectedLanguage]);

  // Line highlighting works for both Java and C# (they have matching line numbers)
  const shouldHighlightLine = true;

  // Use Prism.highlight to get HTML string instead of DOM manipulation
  const highlightedLines = useMemo(() => {
    const lines = currentCode.split('\n');
    const lang = selectedLanguage === 'csharp' ? 'csharp' : selectedLanguage;
    return lines.map(line => {
      try {
        const grammar = Prism.languages[lang];
        if (grammar) {
          return Prism.highlight(line, grammar, lang);
        }
        return line;
      } catch {
        return line;
      }
    });
  }, [currentCode, selectedLanguage]);

  // Create a stable key based on code content to force re-render on code change
  const codeKey = useMemo(() => currentCode.slice(0, 50) + selectedLanguage, [currentCode, selectedLanguage]);

  return (
    <div className="p-6" style={{ backgroundColor: theme.colors.surface }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold" style={{ color: theme.colors.text }}>Code</h3>

        {/* Language Selector */}
        {availableLanguages.length > 1 && (
          <div className="flex gap-2">
            {availableLanguages.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className="px-3 py-1 rounded-md text-sm font-medium transition-all"
                style={{
                  backgroundColor: selectedLanguage === lang ? theme.colors.primary : theme.colors.background,
                  color: selectedLanguage === lang ? '#ffffff' : theme.colors.text,
                  border: `1px solid ${selectedLanguage === lang ? theme.colors.primary : theme.colors.border}`,
                }}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="relative rounded-md overflow-hidden"
        style={{ backgroundColor: theme.colors.codeBackground }}
      >
        <pre className="p-4 overflow-x-auto">
          <code key={codeKey} className={`language-${selectedLanguage}`}>
            {highlightedLines.map((lineHtml, index) => {
              const lineNumber = index + 1;
              return (
                <div
                  key={`line-${lineNumber}`}
                  style={{
                    backgroundColor: shouldHighlightLine && highlightedLine === lineNumber
                      ? theme.colors.codeHighlight
                      : 'transparent',
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
