import { motion } from 'framer-motion';
import { LinkedListVisualization, ListNode } from '../../core/types';
import { useTheme } from '../../hooks';

interface LinkedListVisualizerProps {
  linkedList: LinkedListVisualization;
  transitionDuration?: number;
}

export function LinkedListVisualizer({ linkedList, transitionDuration = 0.4 }: LinkedListVisualizerProps) {
  const { head, highlightedNodes = [], pointers = [] } = linkedList;
  const { theme } = useTheme();
  const colors = theme.colors.linkedList;

  if (!head) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center p-8"
        style={{ color: theme.colors.textSecondary }}
      >
        Empty linked list
      </motion.div>
    );
  }

  // Convert linked list to array for easier rendering
  const nodes: ListNode[] = [];
  let current: ListNode | null | undefined = head;
  while (current) {
    nodes.push(current);
    current = current.next;
  }

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-lg font-semibold"
        style={{ color: colors.primary }}
      >
        {linkedList.name}
      </motion.h3>

      <div className="flex items-start gap-4">
        {nodes.map((node, index) => {
          const isHighlighted = highlightedNodes.includes(node.id);
          const nodePointers = pointers.filter(p => p.nodeId === node.id);

          return (
            <div key={node.id} className="flex items-center">
              {/* Node with Pointers */}
              <div className="flex flex-col items-center">
                {/* Pointer Labels (above) */}
                {nodePointers.length > 0 && (
                  <div className="mb-2 flex flex-col items-center gap-1">
                    {nodePointers.map((pointer, pIndex) => (
                      <motion.div
                        key={`${pointer.name}-${pIndex}`}
                        initial={{ opacity: 0, y: -15, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.8 }}
                        transition={{ duration: transitionDuration, ease: "easeInOut" }}
                        className="text-sm font-bold"
                        style={{ color: pointer.color || colors.primary }}
                      >
                        {pointer.name}
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: transitionDuration * 0.5 }}
                      className="text-center"
                      style={{ color: colors.primary }}
                    >
                      ↓
                    </motion.div>
                  </div>
                )}

                {/* Node Box - Fill + Border when highlighted */}
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
                    {node.value}
                  </motion.span>
                </motion.div>
              </div>

              {/* Arrow to next node */}
              {index < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: transitionDuration * 0.8, delay: index * 0.05, ease: "easeOut" }}
                  className="flex items-center mx-2"
                >
                  <svg width="30" height="20" viewBox="0 0 30 20">
                    <defs>
                      <marker
                        id={`arrowhead-ll-${index}`}
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill={colors.primary} />
                      </marker>
                    </defs>
                    <line
                      x1="0"
                      y1="10"
                      x2="25"
                      y2="10"
                      stroke={colors.primary}
                      strokeWidth="2"
                      markerEnd={`url(#arrowhead-ll-${index})`}
                    />
                  </svg>
                </motion.div>
              )}

              {/* Null indicator for last node */}
              {index === nodes.length - 1 && (
                <div className="flex items-center mx-2">
                  <svg width="30" height="20" viewBox="0 0 30 20">
                    <defs>
                      <marker
                        id="arrowhead-null"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill={theme.colors.textSecondary} />
                      </marker>
                    </defs>
                    <line
                      x1="0"
                      y1="10"
                      x2="25"
                      y2="10"
                      stroke={theme.colors.textSecondary}
                      strokeWidth="2"
                      markerEnd="url(#arrowhead-null)"
                    />
                  </svg>
                  <span className="text-sm ml-1" style={{ color: theme.colors.textSecondary }}>null</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
