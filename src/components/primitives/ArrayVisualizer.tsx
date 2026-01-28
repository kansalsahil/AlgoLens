import { motion } from 'framer-motion';
import { ArrayVisualization } from '../../core/types';
import { useTheme } from '../../hooks';

interface ArrayVisualizerProps {
  array: ArrayVisualization;
  transitionDuration?: number;
}

export function ArrayVisualizer({ array, transitionDuration = 0.4 }: ArrayVisualizerProps) {
  const { values, highlights = [], pointers = [] } = array;
  const { theme } = useTheme();
  const colors = theme.colors.array;

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Array Name */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-lg font-semibold"
        style={{ color: colors.primary }}
      >
        {array.name}
      </motion.h3>

      {/* Array Visualization */}
      <div className="flex items-start gap-1">
        {values.map((value, index) => {
          const isHighlighted = highlights.includes(index);
          const pointer = pointers.find(p => p.index === index);

          return (
            <div key={index} className="flex flex-col items-center">
              {/* Pointer Label (above) */}
              {pointer && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  transition={{ duration: transitionDuration, ease: "easeInOut" }}
                  className="mb-2 text-sm font-bold"
                  style={{ color: pointer.color || colors.primary }}
                >
                  {pointer.name}
                  <div className="text-center">↓</div>
                </motion.div>
              )}

              {/* Array Element - Fill + Border when highlighted */}
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: transitionDuration,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 flex items-center justify-center rounded-lg transition-all"
                style={{
                  backgroundColor: isHighlighted ? colors.highlightBg : colors.background,
                  border: isHighlighted 
                    ? `3px solid ${colors.highlightBorder}` 
                    : `2px solid ${colors.border}`,
                }}
              >
                <motion.span
                  animate={{
                    scale: isHighlighted ? 1.05 : 1,
                  }}
                  transition={{ duration: transitionDuration * 0.7, ease: "easeInOut" }}
                  className="text-lg font-semibold"
                  style={{ color: isHighlighted ? colors.highlightText : colors.text }}
                >
                  {value}
                </motion.span>
              </motion.div>

              {/* Index Label (below) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-2 text-xs font-medium"
                style={{ color: colors.text }}
              >
                {index}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
