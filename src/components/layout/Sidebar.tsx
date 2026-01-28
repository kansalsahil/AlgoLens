import { useState } from 'react';
import { useProblem } from '../../hooks';
import { DIFFICULTY_COLORS } from '../../config';
import { Problem } from '../../core/types';

export function Sidebar() {
  const { allProblems, categories, currentProblem, selectProblem } = useProblem();
  const [isOpen, setIsOpen] = useState(true);

  const getProblemsByCategory = (category: string): Problem[] => {
    return allProblems.filter(p => p.category === category);
  };

  if (!isOpen) {
    return (
      <aside className="w-12 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-200 rounded transition-colors text-gray-600 rotate-180"
          title="Show problems"
          style={{ writingMode: 'vertical-rl' }}
        >
          ←
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <h2 className="text-lg font-semibold text-gray-800">Problems</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-600"
          title="Hide problems"
        >
          ←
        </button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">

        {categories.map(category => {
          const categoryProblems = getProblemsByCategory(category);
          if (categoryProblems.length === 0) return null;

          return (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                {category}
              </h3>
              <div className="space-y-1">
                {categoryProblems.map(problem => (
                  <button
                    key={problem.id}
                    onClick={() => selectProblem(problem.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      currentProblem?.id === problem.id
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{problem.title}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          DIFFICULTY_COLORS[problem.difficulty]
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {allProblems.length === 0 && (
          <p className="text-sm text-gray-500">No problems available</p>
        )}
      </div>
    </aside>
  );
}
