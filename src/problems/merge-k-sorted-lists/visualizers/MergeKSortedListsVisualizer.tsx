import { motion } from 'framer-motion';
import { VisualizationProps, ListNode } from '../../../core/types';
import { useTheme } from '../../../hooks';

export function MergeKSortedListsVisualizer({ step, transitionDuration = 0.4 }: VisualizationProps) {
  const { visualizationData, variables } = step;
  const { linkedLists, annotations } = visualizationData;
  const { theme } = useTheme();

  if (!linkedLists || linkedLists.length === 0) {
    return (
      <div
        className="text-center py-8"
        style={{ color: theme.colors.textSecondary }}
      >
        No lists to merge
      </div>
    );
  }

  const colors = theme.colors.linkedList;

  const renderLinkedList = (list: typeof linkedLists[0], compact: boolean = false) => {
    const nodes: ListNode[] = [];
    const seen = new Set<string>();
    let current: ListNode | null | undefined = list.head;

    // Traverse with cycle detection
    while (current) {
      // Prevent infinite loops from circular references
      if (seen.has(current.id)) {
        break;
      }
      seen.add(current.id);
      nodes.push(current);
      current = current.next;
    }

    if (nodes.length === 0) {
      return (
        <div
          className="px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: theme.colors.surface,
            color: theme.colors.textSecondary,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          null
        </div>
      );
    }

    const nodeSize = compact ? 'w-12 h-12' : 'w-16 h-16';
    const fontSize = compact ? 'text-sm' : 'text-lg';

    return (
      <div className="flex items-center gap-3 flex-wrap">
        {nodes.map((node, index) => {
          const isHighlighted = list.highlightedNodes?.includes(node.id);
          const pointer = list.pointers?.find((p) => p.nodeId === node.id);

          return (
            <div key={node.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                {pointer && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: pointer.color || colors.primary,
                      color: '#ffffff',
                    }}
                  >
                    {pointer.name}
                  </motion.div>
                )}
                <motion.div
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: transitionDuration, ease: 'easeInOut' }}
                  className={`${nodeSize} flex items-center justify-center rounded-lg transition-all`}
                  style={{
                    backgroundColor: isHighlighted ? colors.highlightBg : colors.background,
                    border: `2px solid ${isHighlighted ? colors.highlightBorder : colors.border}`,
                    boxShadow: isHighlighted
                      ? `0 4px 6px -1px ${colors.highlightBorder}40`
                      : 'none',
                  }}
                >
                  <span
                    className={`${fontSize} font-semibold`}
                    style={{ color: isHighlighted ? colors.highlightText : colors.text }}
                  >
                    {node.value}
                  </span>
                </motion.div>
              </div>
              {index < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: transitionDuration }}
                  className={`mx-1 ${compact ? 'text-base' : 'text-xl'} font-bold`}
                  style={{ color: colors.primary }}
                >
                  →
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const isMultipleLists = linkedLists.length > 2;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {linkedLists.map((list, idx) => (
          <motion.div
            key={list.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`${isMultipleLists ? 'text-base' : 'text-lg'} font-semibold`}
              style={{ color: colors.primary }}
            >
              {list.name}
            </motion.h3>
            <div
              className={`${isMultipleLists ? 'p-4' : 'p-6'} rounded-xl w-full`}
              style={{
                backgroundColor: theme.colors.surface,
                border: `2px solid ${theme.colors.border}`,
                boxShadow: `0 4px 6px -1px ${theme.colors.border}30`,
              }}
            >
              <div className="flex justify-center">
                {renderLinkedList(list, isMultipleLists)}
              </div>
            </div>
          </motion.div>
        ))}
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
                  className="text-lg font-mono font-semibold px-3 py-2 rounded-lg"
                  style={{
                    backgroundColor: theme.colors.background,
                    color: colors.primary,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  {value === null || value === 'null' ? 'null' : value}
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
