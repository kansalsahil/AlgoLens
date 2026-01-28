import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsiblePanelProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export function CollapsiblePanel({ title, children, defaultOpen = true, position = 'right' }: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getStyles = () => {
    switch (position) {
      case 'left':
        return 'border-r';
      case 'right':
        return 'border-l';
      case 'top':
        return 'border-b';
      case 'bottom':
        return 'border-t';
      default:
        return 'border-l';
    }
  };

  const getButtonStyles = () => {
    switch (position) {
      case 'left':
        return isOpen ? '→' : '←';
      case 'right':
        return isOpen ? '←' : '→';
      case 'top':
        return isOpen ? '↓' : '↑';
      case 'bottom':
        return isOpen ? '↑' : '↓';
      default:
        return isOpen ? '←' : '→';
    }
  };

  return (
    <div className={`relative bg-white ${getStyles()} border-gray-200 flex flex-col`}>
      {/* Header with collapse button */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-600"
          title={isOpen ? 'Collapse' : 'Expand'}
        >
          {getButtonStyles()}
        </button>
      </div>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
