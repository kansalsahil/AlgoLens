import { motion } from 'framer-motion';
import { VisualizationProps, ListNode } from '../../../core/types';
import { useTheme } from '../../../hooks';

export function LinkedListCycleVisualizer({ step, transitionDuration = 0.4 }: VisualizationProps) {
  const { visualizationData, variables } = step;
  const { linkedLists, annotations, custom } = visualizationData;
  const { theme } = useTheme();

  if (!linkedLists || linkedLists.length === 0) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const list = linkedLists[0];
  const colors = theme.colors.linkedList;

  // Collect nodes (handle cycles carefully)
  const nodes: ListNode[] = [];
  const nodeIds = new Set<string>();
  let current: ListNode | null | undefined = list.head;

  while (current && !nodeIds.has(current.id)) {
    nodes.push(current);
    nodeIds.add(current.id);
    current = current.next;
  }

  const hasCycle = custom?.hasCycle || false;
  const cyclePos = custom?.cyclePos || -1;
  const visited = custom?.visited || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-lg font-semibold"
          style={{ color: colors.primary }}
        >
          {list.name}
        </motion.h3>

        <div
          className="p-8 rounded-xl w-full relative"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
            boxShadow: `0 4px 6px -1px ${theme.colors.border}40`,
          }}
        >
          {nodes.length === 0 ? (
            <div
              className="text-center py-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Empty list
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center justify-center gap-6">
                {nodes.map((node, index) => {
                  const isHighlighted = list.highlightedNodes?.includes(node.id);
                  const pointers = list.pointers?.filter((p) => p.nodeId === node.id) || [];
                  const isVisited = visited.includes(node.id);

                  return (
                    <div key={node.id} className="flex items-center relative">
                      <div className="flex flex-col items-center gap-2">
                        {pointers.length > 0 && (
                          <div className="flex flex-col gap-1">
                            {pointers.map((pointer, pIdx) => (
                              <motion.div
                                key={pIdx}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs font-bold px-2 py-1 rounded whitespace-nowrap"
                                style={{
                                  backgroundColor: pointer.color || colors.primary,
                                  color: '#ffffff',
                                }}
                              >
                                {pointer.name}
                              </motion.div>
                            ))}
                          </div>
                        )}
                        <motion.div
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: transitionDuration, ease: 'easeInOut' }}
                          className="relative w-20 h-20 flex flex-col items-center justify-center rounded-xl transition-all"
                          style={{
                            backgroundColor: isHighlighted ? colors.highlightBg : colors.background,
                            border: `2px solid ${isHighlighted ? colors.highlightBorder : colors.border}`,
                            boxShadow: isHighlighted
                              ? `0 4px 6px -1px ${colors.highlightBorder}40`
                              : 'none',
                          }}
                        >
                          <span
                            className="text-lg font-semibold"
                            style={{ color: isHighlighted ? colors.highlightText : colors.text }}
                          >
                            {node.value}
                          </span>
                          {isVisited && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: '#10b981',
                                color: '#ffffff',
                              }}
                            >
                              ✓
                            </motion.div>
                          )}
                        </motion.div>
                        {hasCycle && index === cyclePos && (
                          <div className="text-xs font-medium mt-1" style={{ color: '#ef4444' }}>
                            cycle start
                          </div>
                        )}
                      </div>

                      {/* Forward arrows */}
                      {index < nodes.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: transitionDuration }}
                          className="mx-3 text-2xl font-bold"
                          style={{ color: colors.primary }}
                        >
                          →
                        </motion.div>
                      )}

                      {/* Cycle arrow back to cycle start */}
                      {hasCycle && index === nodes.length - 1 && cyclePos >= 0 && (
                        <svg
                          className="absolute"
                          style={{
                            left: '50%',
                            top: '90px',
                            width: `${(nodes.length - cyclePos) * 104}px`,
                            height: '100px',
                            overflow: 'visible',
                          }}
                        >
                          <defs>
                            <marker
                              id="cycle-arrowhead"
                              markerWidth="10"
                              markerHeight="7"
                              refX="9"
                              refY="3.5"
                              orient="auto"
                            >
                              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                            </marker>
                          </defs>
                          <motion.path
                            d={`M 52,0 Q 52,50 ${-(nodes.length - cyclePos - 1) * 104 - 52},50 T ${-(nodes.length - cyclePos - 1) * 104 - 52},0`}
                            stroke="#ef4444"
                            strokeWidth="2.5"
                            fill="none"
                            markerEnd="url(#cycle-arrowhead)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: transitionDuration, delay: 0.3 }}
                          />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {variables && Object.keys(variables).length > 0 && (
        <div
          className="rounded-lg shadow-md p-6 max-w-2xl mx-auto"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
            boxShadow: `0 4px 6px -1px ${theme.colors.border}30`,
          }}
        >
          <div className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>
            Variables
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(variables).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                  {key}
                </div>
                <div
                  className="text-base font-mono font-semibold px-3 py-2 rounded-lg break-words"
                  style={{
                    backgroundColor: theme.colors.background,
                    color: colors.primary,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  {value === null || value === 'null' ? 'null' : String(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {annotations && annotations.length > 0 && (
        <div className="flex justify-center">
          {annotations.map((annotation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="px-6 py-3 rounded-lg text-lg font-semibold"
              style={{
                backgroundColor:
                  annotation.style === 'success' ? '#10b98120' : theme.colors.surface,
                color: annotation.style === 'success' ? '#10b981' : theme.colors.text,
                border: `2px solid ${annotation.style === 'success' ? '#10b981' : theme.colors.border}`,
              }}
            >
              {annotation.text}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
