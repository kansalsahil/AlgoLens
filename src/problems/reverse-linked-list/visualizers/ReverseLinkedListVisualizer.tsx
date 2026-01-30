import { motion } from 'framer-motion';
import { VisualizationProps, ListNode } from '../../../core/types';
import { StackAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function ReverseLinkedListVisualizer({ step, transitionDuration = 0.4 }: VisualizationProps) {
  const { visualizationData, variables } = step;
  const { linkedLists, stack, custom } = visualizationData;
  const { theme } = useTheme();

  const linkedList = linkedLists?.[0];
  if (!linkedList) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  // Extract pointer variables for iterative solution
  const prev = variables?.prev;
  const curr = variables?.curr;
  const next = variables?.next;
  const showPointers = prev !== undefined || curr !== undefined || next !== undefined;

  // Get all nodes and next pointers from custom data
  const allNodes: (ListNode & { next: ListNode | null })[] = custom?.allNodes || [];
  const colors = theme.colors.linkedList;

  // Use fixed layout visualization if we have allNodes data
  const useFixedLayout = allNodes.length > 0;

  return (
    <div className="space-y-8">
      {useFixedLayout ? (
        <div className="flex flex-col gap-8">
          {/* Linked List and Stack side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fixed layout visualization with dynamic arrows */}
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

          <div className="relative">
            {/* All nodes in fixed positions */}
            <div className="flex items-center gap-16">
              {allNodes.map((node, index) => {
                const isPrev = node.value === prev;
                const isCurr = node.value === curr;
                const isNext = node.value === next;
                const isHighlighted = linkedList.highlightedNodes?.includes(node.id);

                return (
                  <div key={node.id} className="flex flex-col items-center relative">
                    {/* Pointer labels above */}
                    <div className="mb-2 flex flex-col items-center gap-1 min-h-[40px]">
                      {isPrev && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{
                            backgroundColor: '#f59e0b',
                            color: '#ffffff'
                          }}
                        >
                          prev
                        </motion.div>
                      )}
                      {isCurr && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{
                            backgroundColor: '#ef4444',
                            color: '#ffffff'
                          }}
                        >
                          curr
                        </motion.div>
                      )}
                      {isNext && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{
                            backgroundColor: '#10b981',
                            color: '#ffffff'
                          }}
                        >
                          next
                        </motion.div>
                      )}
                    </div>

                    {/* Node */}
                    <motion.div
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
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
                      <span
                        className="text-lg font-semibold"
                        style={{ color: isHighlighted ? colors.highlightText : colors.text }}
                      >
                        {node.value}
                      </span>
                    </motion.div>

                    {/* Arrow showing where this node's next pointer points */}
                    {node.next !== null && (
                      <svg
                        className="absolute top-[50px]"
                        style={{
                          left: '50%',
                          width: '100px',
                          height: '80px',
                          overflow: 'visible',
                        }}
                      >
                        <defs>
                          <marker
                            id={`arrowhead-${node.id}`}
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                          </marker>
                        </defs>

                        {/* Calculate arrow direction */}
                        {(() => {
                          const targetIndex = allNodes.findIndex(n => n.id === node.next?.id);
                          const direction = targetIndex > index ? 'forward' : 'back';
                          const distance = Math.abs(targetIndex - index);

                          if (direction === 'forward') {
                            // Arrow pointing right
                            const arrowLength = distance * 80 + 16;
                            return (
                              <motion.line
                                key={`arrow-${node.id}-${node.next?.id}`}
                                x1="8"
                                y1="0"
                                x2={arrowLength}
                                y2="0"
                                stroke="#6366f1"
                                strokeWidth="2.5"
                                markerEnd={`url(#arrowhead-${node.id})`}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: transitionDuration }}
                              />
                            );
                          } else {
                            // Arrow pointing back (curved)
                            const arrowWidth = distance * 80;
                            const curveHeight = 40;
                            return (
                              <motion.path
                                key={`arrow-${node.id}-${node.next?.id}`}
                                d={`M 8,0 Q 8,${curveHeight} ${-arrowWidth + 8},${curveHeight} T ${-arrowWidth + 8},0`}
                                stroke="#6366f1"
                                strokeWidth="2.5"
                                fill="none"
                                markerEnd={`url(#arrowhead-${node.id})`}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: transitionDuration }}
                              />
                            );
                          }
                        })()}
                      </svg>
                    )}

                    {/* Arrow to null indicator */}
                    {node.next === null && (
                      <div className="absolute top-[50px] left-1/2 flex items-center">
                        <svg width="40" height="20" viewBox="0 0 40 20">
                          <defs>
                            <marker
                              id={`arrowhead-null-${node.id}`}
                              markerWidth="10"
                              markerHeight="7"
                              refX="9"
                              refY="3.5"
                              orient="auto"
                            >
                              <polygon points="0 0, 10 3.5, 0 7" fill={theme.colors.textSecondary} />
                            </marker>
                          </defs>
                          <motion.line
                            x1="8"
                            y1="10"
                            x2="35"
                            y2="10"
                            stroke={theme.colors.textSecondary}
                            strokeWidth="2"
                            markerEnd={`url(#arrowhead-null-${node.id})`}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: transitionDuration }}
                          />
                        </svg>
                        <span className="text-xs ml-1" style={{ color: theme.colors.textSecondary }}>null</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
            </div>

            {/* Stack Visualizer - Using StackAdapter */}
            {stack && stack.length > 0 && (
              <div>
                <StackAdapter
                  stack={stack}
                  transitionDuration={transitionDuration}
                  config={{
                    title: 'Call Stack'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        // Fallback to default rendering for recursive solution
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

            {/* Simple node display */}
            <div className="flex items-center gap-4">
              {(() => {
                const nodes: ListNode[] = [];
                let current: ListNode | null | undefined = linkedList.head;
                while (current) {
                  nodes.push(current);
                  current = current.next;
                }
                return nodes.map((node, index) => (
                  <div key={node.id} className="flex items-center">
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: colors.background,
                        border: `2px solid ${colors.border}`,
                      }}
                    >
                      <span className="text-lg font-semibold" style={{ color: colors.text }}>
                        {node.value}
                      </span>
                    </div>
                    {index < nodes.length - 1 && (
                      <div className="mx-2">→</div>
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>

          {stack && stack.length > 0 && (
            <div>
              <StackAdapter
                stack={stack}
                transitionDuration={transitionDuration}
              />
            </div>
          )}
        </div>
      )}

      {/* Info Panel - Show pointer values for iterative solution */}
      {showPointers && (
        <div
          className="rounded-lg shadow-md p-6 max-w-2xl mx-auto"
          style={{
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`
          }}
        >
          <div className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>
            Pointer Values
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                prev
              </div>
              <div
                className="text-lg font-mono font-semibold px-3 py-2 rounded"
                style={{
                  backgroundColor: theme.colors.background,
                  color: theme.colors.linkedList.primary,
                }}
              >
                {prev === null || prev === 'null' ? 'null' : prev}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                curr
              </div>
              <div
                className="text-lg font-mono font-semibold px-3 py-2 rounded"
                style={{
                  backgroundColor: theme.colors.background,
                  color: theme.colors.linkedList.primary,
                }}
              >
                {curr === null || curr === 'null' ? 'null' : curr}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                next
              </div>
              <div
                className="text-lg font-mono font-semibold px-3 py-2 rounded"
                style={{
                  backgroundColor: theme.colors.background,
                  color: theme.colors.linkedList.primary,
                }}
              >
                {next === null || next === 'null' ? 'null' : next}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
