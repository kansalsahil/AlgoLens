import { useState, useRef, useEffect } from 'react';
import type React from 'react';
import { useTheme } from '../../hooks';

interface SearchableDropdownProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  label: string;
  renderIcon?: (option: string) => React.ReactNode;
}

export function SearchableDropdown({
  options,
  selected,
  onChange,
  placeholder,
  label,
  renderIcon,
}: SearchableDropdownProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
    setSearchQuery('');
  };

  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter(item => item !== option));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="mb-3">
        <div className="text-sm font-semibold" style={{ color: theme.colors.textSecondary }}>
          {label}
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 rounded-lg border text-left transition-all flex items-center justify-between"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: isOpen ? theme.colors.primary : theme.colors.border,
            color: theme.colors.text,
          }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {selected.length === 0 ? (
              <span style={{ color: theme.colors.textSecondary }}>{placeholder}</span>
            ) : (
              <div className="flex flex-wrap gap-1 flex-1">
                {selected.slice(0, 2).map(option => (
                  <span
                    key={option}
                    className="text-xs px-2 py-1 rounded font-medium flex items-center gap-1"
                    style={{
                      backgroundColor: theme.colors.primary + '20',
                      color: theme.colors.primary,
                    }}
                  >
                    {renderIcon && renderIcon(option)}
                    {option}
                    <button
                      onClick={(e) => removeOption(option, e)}
                      className="ml-1 hover:opacity-70"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selected.length > 2 && (
                  <span
                    className="text-xs px-2 py-1 rounded font-medium"
                    style={{
                      backgroundColor: theme.colors.primary + '20',
                      color: theme.colors.primary,
                    }}
                  >
                    +{selected.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke={theme.colors.textSecondary}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className="absolute z-50 w-full mt-2 rounded-lg border shadow-xl max-h-64 overflow-hidden"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            {/* Search input */}
            <div className="p-2 border-b-2" style={{ borderColor: theme.colors.border }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  focusRingColor: theme.colors.primary,
                }}
                autoFocus
              />
            </div>

            {/* Options list */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="p-4 text-center text-sm" style={{ color: theme.colors.textSecondary }}>
                  No options found
                </div>
              ) : (
                filteredOptions.map(option => {
                  const isSelected = selected.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleOption(option)}
                      className="w-full px-4 py-2 text-left hover:bg-opacity-50 transition-all flex items-center gap-2"
                      style={{
                        backgroundColor: isSelected
                          ? theme.colors.primary + '20'
                          : 'transparent',
                        color: isSelected ? theme.colors.primary : theme.colors.text,
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded border flex items-center justify-center"
                        style={{
                          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                          backgroundColor: isSelected ? theme.colors.primary : 'transparent',
                        }}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      {renderIcon && renderIcon(option)}
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
