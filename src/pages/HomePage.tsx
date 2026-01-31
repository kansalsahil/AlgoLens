import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProblem, useTheme } from '../hooks';
import { DIFFICULTY_COLORS } from '../config';
import { ThemeSelector } from '../components/ui/ThemeSelector';
import { getIconForTag } from '../components/ui/DataStructureIcons';
import { SearchableDropdown, OptionCategory } from '../components/ui/SearchableDropdown';
import { ProblemTag } from '../core/types';
import { motion, AnimatePresence } from 'framer-motion';

export function HomePage() {
  const { allProblems, allTags } = useProblem();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<ProblemTag[]>([]);

  // Filter problems based on search and tags
  const filteredProblems = useMemo(() => {
    let filtered = allProblems;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        problem =>
          problem.title.toLowerCase().includes(query) ||
          problem.description.toLowerCase().includes(query) ||
          (problem.tags && problem.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(problem =>
        problem.tags && problem.tags.length > 0 &&
        selectedTags.every(tag => problem.tags.includes(tag))
      );
    }

    return filtered;
  }, [allProblems, searchQuery, selectedTags]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  // Categorize tags
  const tagCategories: OptionCategory<ProblemTag>[] = useMemo(() => {
    const dataStructures: ProblemTag[] = ['Array', 'Linked List', 'Tree', 'Hash Map', 'Stack', 'Queue', 'Graph'];
    const algorithms: ProblemTag[] = ['Binary Search', 'Two Pointers', 'Sliding Window', 'Dynamic Programming', 'Greedy', 'Backtracking'];
    const approaches: ProblemTag[] = ['Recursive', 'Iterative'];
    const other: ProblemTag[] = ['String'];

    const categories: OptionCategory<ProblemTag>[] = [];

    const dataStructureTags = allTags.filter(tag => dataStructures.includes(tag));
    if (dataStructureTags.length > 0) {
      categories.push({ label: 'Data Structures', options: dataStructureTags });
    }

    const algorithmTags = allTags.filter(tag => algorithms.includes(tag));
    if (algorithmTags.length > 0) {
      categories.push({ label: 'Algorithms', options: algorithmTags });
    }

    const approachTags = allTags.filter(tag => approaches.includes(tag));
    if (approachTags.length > 0) {
      categories.push({ label: 'Approaches', options: approachTags });
    }

    const otherTags = allTags.filter(tag => other.includes(tag));
    if (otherTags.length > 0) {
      categories.push({ label: 'Other', options: otherTags });
    }

    return categories;
  }, [allTags]);

  const renderTagIcon = (tag: ProblemTag) => {
    const IconComponent = getIconForTag(tag);
    if (IconComponent) {
      return <IconComponent size={16} color="currentColor" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: theme.colors.background }}>
      {/* Two Vertical Lines */}
      <div 
        className="fixed left-1/4 top-0 bottom-0 w-px pointer-events-none"
        style={{ backgroundColor: theme.colors.border, opacity: 0.3 }}
      />
      <div 
        className="fixed right-1/4 top-0 bottom-0 w-px pointer-events-none"
        style={{ backgroundColor: theme.colors.border, opacity: 0.3 }}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b" style={{ borderColor: theme.colors.border }}>
          <div>
            <h1 
              className="text-5xl font-extrabold mb-2 tracking-tight"
              style={{ 
                color: theme.colors.primary,
                fontFamily: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              Algolens
            </h1>
            <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
              Master algorithms through visual storytelling
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/about')}
              className="px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              style={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.primary;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.surface;
                e.currentTarget.style.color = theme.colors.text;
              }}
            >
              About
            </button>
            <ThemeSelector />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              width="20"
              height="20"
              fill="none"
              stroke={theme.colors.textSecondary}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {(searchQuery || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded text-sm font-medium hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: '#ffffff',
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Divider */}
        <div 
          className="mb-6 h-px"
          style={{ backgroundColor: theme.colors.border }}
        />

        {/* Filter Tags - Categorized */}
        {tagCategories.length > 0 && (
          <div className="mb-8">
            <SearchableDropdown
              categories={tagCategories}
              selected={selectedTags}
              onChange={setSelectedTags}
              placeholder="Select tags to filter..."
              label="Filter by Tags"
              renderIcon={(tag) => renderTagIcon(tag)}
            />
          </div>
        )}

        {/* Horizontal Divider */}
        <div 
          className="mb-6 h-px"
          style={{ backgroundColor: theme.colors.border }}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
            {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} found
            {selectedTags.length > 0 && ` (${selectedTags.length} filter${selectedTags.length !== 1 ? 's' : ''} active)`}
          </p>
        </div>

        {/* Problems Grid */}
        {filteredProblems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredProblems.map(problem => (
                  <motion.button
                    key={problem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate(`/problem/${problem.id}`)}
                    className="text-left p-6 rounded-xl hover:shadow-xl transition-all group relative overflow-hidden"
                    style={{
                      backgroundColor: theme.colors.surface,
                      border: `1px solid ${theme.colors.border}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = theme.colors.primary;
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = theme.colors.border;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      className="absolute top-0 right-0 w-32 h-32 opacity-5"
                      style={{
                        background: `radial-gradient(circle, ${theme.colors.primary} 0%, transparent 70%)`,
                      }}
                    />
                    <div className="flex items-start justify-between mb-3 relative z-10">
                      <h3
                        className="text-xl font-bold group-hover:opacity-80 transition-opacity flex-1 pr-2"
                        style={{ color: theme.colors.text }}
                      >
                        {problem.title}
                      </h3>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                          DIFFICULTY_COLORS[problem.difficulty]
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <p
                      className="text-sm line-clamp-2 mb-4 relative z-10"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {problem.description.substring(0, 120)}...
                    </p>
                    {problem.tags && problem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                        {problem.tags.slice(0, 3).map(tag => {
                          const IconComponent = getIconForTag(tag);
                          return (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded font-medium"
                              style={{
                                backgroundColor: theme.colors.primary + '15',
                                color: theme.colors.primary,
                              }}
                            >
                              {IconComponent && (
                                <span className="inline-flex items-center gap-1">
                                  {renderTagIcon(tag)}
                                  {tag}
                                </span>
                              )}
                              {!IconComponent && tag}
                            </span>
                          );
                        })}
                        {problem.tags.length > 3 && (
                          <span
                            className="text-xs px-2 py-1 rounded font-medium"
                            style={{
                              backgroundColor: theme.colors.primary + '15',
                              color: theme.colors.primary,
                            }}
                          >
                            +{problem.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <div
                      className="flex items-center gap-2 text-sm font-semibold relative z-10"
                      style={{ color: theme.colors.primary }}
                    >
                      <span>Explore</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl mb-2" style={{ color: theme.colors.textSecondary }}>
              No problems found
            </p>
            <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
