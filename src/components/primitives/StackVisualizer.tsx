import { motion } from 'framer-motion';
import { StackFrame } from '../../core/types';
import { useTheme } from '../../hooks';

interface StackVisualizerProps {
  stack: StackFrame[];
  transitionDuration?: number;
  title?: string;
}

export function StackVisualizer({ stack, transitionDuration = 0.4, title = 'Stack' }: StackVisualizerProps) {
  const { theme } = useTheme();
  const colors = theme.colors;

  if (!stack || stack.length === 0) {
    return null;
  }

  // Stack: last element is the top (most recent call)
  // Display from top to bottom (north to south)
  const displayStack = [...stack].reverse();

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-lg font-semibold"
        style={{ color: colors.primary }}
      >
        {title}
      </motion.h3>

      <div className="flex flex-col gap-2 w-full max-w-md relative">
        {/* Top of Stack Pointer/Marker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-2 mb-1"
        >
          <div className="flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.primary}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 L12 8 M12 2 L8 6 M12 2 L16 6" />
            </svg>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: colors.primary }}
            >
              Top
            </span>
          </div>
        </motion.div>

        {/* Stack Frames - Top to Bottom */}
        {displayStack.map((frame, index) => {
          const isTop = index === 0; // Top of stack (most recent call)
          const stackDepth = displayStack.length - index;

          return (
            <motion.div
              key={`${frame.functionName}-${stackDepth}`}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{
                duration: transitionDuration,
                delay: index * 0.05,
                ease: "easeOut"
              }}
              className="rounded-lg p-4 relative"
              style={{
                backgroundColor: colors.surface,
                border: isTop 
                  ? `3px solid ${colors.primary}` 
                  : `2px solid ${colors.border}`,
              }}
            >
              {/* Top marker indicator on the frame itself */}
              {isTop && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-3 left-4"
                >
                  <div
                    className="px-2 py-0.5 rounded text-xs font-semibold"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: '#ffffff',
                    }}
                  >
                    Active
                  </div>
                </motion.div>
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.span
                      className="text-sm font-semibold"
                      style={{ color: colors.text }}
                    >
                      {frame.functionName}
                    </motion.span>
                  </div>
                  
                  {frame.parameters && Object.keys(frame.parameters).length > 0 && (
                    <div className="space-y-1 mt-2">
                      {Object.entries(frame.parameters).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 text-sm">
                          <span className="font-mono" style={{ color: colors.textSecondary }}>
                            {key}:
                          </span>
                          <span className="font-mono font-medium" style={{ color: colors.text }}>
                            {value === null ? 'null' : value === undefined ? 'undefined' : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="text-xs font-mono" style={{ color: colors.textSecondary }}>
                  #{stackDepth}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: transitionDuration, delay: displayStack.length * 0.05 }}
          className="flex items-center justify-center gap-2 mt-1"
        >
          <div
            className="h-px flex-1"
            style={{ backgroundColor: colors.border }}
          />
          <span
            className="text-xs font-mono px-2"
            style={{ color: colors.textSecondary }}
          >
            Bottom
          </span>
          <div
            className="h-px flex-1"
            style={{ backgroundColor: colors.border }}
          />
        </motion.div>
      </div>

      {displayStack.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: transitionDuration, delay: displayStack.length * 0.05 }}
          className="text-xs text-center"
          style={{ color: colors.textSecondary }}
        >
          {displayStack.length} frame{displayStack.length !== 1 ? 's' : ''} in stack
        </motion.div>
      )}
    </div>
  );
}
