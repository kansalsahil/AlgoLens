import { VisualizationProps } from '../../../core/types';
import { TreeAdapter, StackAdapter } from '../../../core/adapters';
import { useTheme } from '../../../hooks';

export function ValidateBSTVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { visualizationData } = step;
  const { trees, custom, stack } = visualizationData;
  const { theme } = useTheme();

  const tree = trees?.[0];
  if (!tree) {
    return <div style={{ color: theme.colors.textSecondary }}>No visualization data</div>;
  }

  const {
    nodeRanges = {},
    violationNode,
    violationMessage,
    currentNode,
    currentValue,
    currentMin,
    currentMax,
    checking,
    validNode,
    violation,
    exploringLeft,
    exploringRight,
    nextRange,
    subtreeValid,
    isBaseCase,
    returnValue,
    complete,
    // Inorder traversal specific
    prev,
    traversalOrder = [],
    visiting,
    comparison,
    prevValue,
    updatingPrev,
  } = custom || {};

  const isRecursive = stack && stack.length > 0;
  const isInorderMode = traversalOrder.length > 0 || prev !== undefined;

  // Enhance tree nodes with range information
  const enhancedTree = tree.root ? {
    ...tree,
    root: enhanceNode(tree.root),
  } : tree;

  function enhanceNode(node: any): any {
    if (!node) return null;

    const range = nodeRanges[node.id];
    const isViolation = violationNode === node.id;
    const isValid = validNode && currentNode === node.id;
    const isCurrent = currentNode === node.id;

    return {
      ...node,
      left: node.left ? enhanceNode(node.left) : null,
      right: node.right ? enhanceNode(node.right) : null,
      meta: {
        ...node.meta,
        range,
        isViolation,
        isValid,
        isCurrent,
      },
    };
  }

  // Custom tree rendering with range labels
  const TreeWithRanges = () => (
    <div className="relative">
      <TreeAdapter tree={enhancedTree} transitionDuration={transitionDuration} />

      {/* Range annotations overlay */}
      {Object.keys(nodeRanges).length > 0 && !isInorderMode && (
        <div className="absolute top-0 left-0 w-full pointer-events-none">
          <div className="text-xs text-center mt-2" style={{ color: theme.colors.textSecondary }}>
            Node ranges show valid value bounds: (min, max)
          </div>
        </div>
      )}
    </div>
  );

  const bounceStyle = `
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }
    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 5px currentColor;
      }
      50% {
        box-shadow: 0 0 20px currentColor;
      }
    }
  `;

  return (
    <>
      <style>{bounceStyle}</style>
      <div className="space-y-8">
        {/* Violation Banner */}
        {violation && violationMessage && (
          <div
            className="text-lg font-bold px-4 py-3 rounded-lg text-center"
            style={{
              backgroundColor: theme.colors.error + '20',
              border: `2px solid ${theme.colors.error}`,
              color: theme.colors.error,
              animation: 'pulse-glow 1s ease-in-out infinite',
            }}
          >
            ✗ {violationMessage}
          </div>
        )}

        {/* Complete Banner */}
        {complete && !violation && (
          <div
            className="text-lg font-bold px-4 py-3 rounded-lg text-center"
            style={{
              backgroundColor: theme.colors.success + '20',
              border: `2px solid ${theme.colors.success}`,
              color: theme.colors.success,
            }}
          >
            ✓ Valid Binary Search Tree
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tree Visualization */}
          <div>
            <TreeWithRanges />
          </div>

          {/* Stack or Traversal Info */}
          {isRecursive && stack && stack.length > 0 ? (
            <div>
              <StackAdapter
                stack={stack}
                transitionDuration={transitionDuration}
                config={{
                  title: isInorderMode ? 'Call Stack (Inorder)' : 'Call Stack (Range Check)',
                }}
              />
            </div>
          ) : isInorderMode && traversalOrder.length > 0 ? (
            <div className="space-y-2">
              <div
                className="text-center text-sm font-medium"
                style={{ color: theme.colors.textSecondary }}
              >
                Inorder Traversal Sequence
              </div>
              <div
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: theme.colors.surface,
                  border: `2px solid ${theme.colors.border}`,
                  minHeight: '400px',
                }}
              >
                <div className="flex flex-wrap gap-3 justify-center">
                  {traversalOrder.map((value: number, idx: number) => (
                    <div key={idx} className="text-center">
                      <div
                        className="px-4 py-3 rounded-lg font-mono font-bold transition-all duration-300"
                        style={{
                          backgroundColor: idx === traversalOrder.length - 1
                            ? theme.colors.primary
                            : theme.colors.background,
                          border: `2px solid ${
                            idx === traversalOrder.length - 1
                              ? theme.colors.primary
                              : theme.colors.border
                          }`,
                          color: idx === traversalOrder.length - 1 ? '#fff' : theme.colors.text,
                          minWidth: '60px',
                        }}
                      >
                        {value}
                      </div>
                      {idx < traversalOrder.length - 1 && (
                        <div className="text-2xl font-bold mt-1" style={{ color: theme.colors.primary }}>
                          &lt;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {traversalOrder.length > 1 && (
                  <div className="mt-4 text-center text-sm" style={{ color: theme.colors.textSecondary }}>
                    Sorted sequence indicates valid BST
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Info Panel */}
        <div
          className="rounded-xl shadow-md p-6 space-y-4 max-w-3xl mx-auto"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.border}`,
          }}
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Validation Status */}
            <div className="col-span-2 space-y-2">
              <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                BST Validation Status
              </div>
              <div
                className="text-3xl font-bold"
                style={{
                  color: violation
                    ? theme.colors.error
                    : complete
                    ? theme.colors.success
                    : theme.colors.primary,
                }}
              >
                {violation ? '✗ Invalid' : complete ? '✓ Valid' : 'Checking...'}
              </div>
            </div>

            {/* Current Node Info (Range Mode) */}
            {!isInorderMode && currentNode && currentValue !== undefined && (
              <>
                <div className="col-span-2 space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Node
                  </div>
                  <div className="text-2xl font-semibold" style={{ color: theme.colors.primary }}>
                    {currentValue}
                  </div>
                </div>

                {checking && currentMin !== undefined && currentMax !== undefined && (
                  <div className="col-span-2">
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: theme.colors.primary + '20',
                        border: `2px solid ${theme.colors.primary}`,
                      }}
                    >
                      <div className="text-lg font-bold mb-2" style={{ color: theme.colors.primary }}>
                        Valid Range Check
                      </div>
                      <div className="font-mono text-lg" style={{ color: theme.colors.text }}>
                        {currentMin} &lt; <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{currentValue}</span> &lt; {currentMax}
                      </div>
                      <div className="text-sm mt-2" style={{ color: theme.colors.textSecondary }}>
                        Node must be strictly within this range
                      </div>
                    </div>
                  </div>
                )}

                {validNode && (
                  <div
                    className="col-span-2 p-4 rounded-lg"
                    style={{
                      backgroundColor: theme.colors.success + '20',
                      border: `2px solid ${theme.colors.success}`,
                    }}
                  >
                    <div className="text-lg font-bold" style={{ color: theme.colors.success }}>
                      ✓ Node is Valid
                    </div>
                    <div className="text-sm" style={{ color: theme.colors.text }}>
                      {currentMin} &lt; {currentValue} &lt; {currentMax}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Current Node Info (Inorder Mode) */}
            {isInorderMode && visiting && currentNode && (
              <>
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Current Node
                  </div>
                  <div className="text-xl font-semibold" style={{ color: theme.colors.primary }}>
                    {currentValue}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                    Previous Value
                  </div>
                  <div className="text-xl font-semibold" style={{ color: theme.colors.text }}>
                    {prevValue ?? 'null'}
                  </div>
                </div>
              </>
            )}

            {/* Comparison Result (Inorder Mode) */}
            {comparison && !violation && (
              <div
                className="col-span-2 p-4 rounded-lg"
                style={{
                  backgroundColor: theme.colors.success + '20',
                  border: `2px solid ${theme.colors.success}`,
                }}
              >
                <div className="text-lg font-bold" style={{ color: theme.colors.success }}>
                  ✓ Valid Order
                </div>
                <div className="text-sm font-mono" style={{ color: theme.colors.text }}>
                  {prevValue === null ? `First node: ${currentValue}` : `${prevValue} < ${currentValue}`}
                </div>
              </div>
            )}

            {/* Violation Info */}
            {violation && (
              <div
                className="col-span-2 p-4 rounded-lg"
                style={{
                  backgroundColor: theme.colors.error + '20',
                  border: `2px solid ${theme.colors.error}`,
                }}
              >
                <div className="text-lg font-bold" style={{ color: theme.colors.error }}>
                  ✗ BST Property Violated
                </div>
                <div className="text-sm" style={{ color: theme.colors.text }}>
                  {violationMessage}
                </div>
              </div>
            )}

            {/* Direction Indicators */}
            {exploringLeft && nextRange && (
              <div
                className="col-span-2 p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.primary + '15',
                  border: `1px solid ${theme.colors.primary}`,
                }}
              >
                <div className="text-sm font-medium mb-1" style={{ color: theme.colors.primary }}>
                  ← Exploring left subtree
                </div>
                <div className="text-xs font-mono" style={{ color: theme.colors.textSecondary }}>
                  New range: ({nextRange.min}, {nextRange.max})
                </div>
              </div>
            )}

            {exploringRight && nextRange && (
              <div
                className="col-span-2 p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.primary + '15',
                  border: `1px solid ${theme.colors.primary}`,
                }}
              >
                <div className="text-sm font-medium mb-1" style={{ color: theme.colors.primary }}>
                  → Exploring right subtree
                </div>
                <div className="text-xs font-mono" style={{ color: theme.colors.textSecondary }}>
                  New range: ({nextRange.min}, {nextRange.max})
                </div>
              </div>
            )}

            {/* Subtree Valid */}
            {subtreeValid && (
              <div
                className="col-span-2 p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.success + '15',
                  border: `1px solid ${theme.colors.success}`,
                }}
              >
                <div className="text-sm font-medium" style={{ color: theme.colors.success }}>
                  ✓ Subtree validation complete
                </div>
              </div>
            )}

            {/* Base Case Info */}
            {isBaseCase && (
              <div
                className="col-span-2 p-4 rounded-lg"
                style={{
                  backgroundColor: theme.colors.warning + '20',
                  border: `2px solid ${theme.colors.warning}`,
                }}
              >
                <div className="text-lg font-bold" style={{ color: theme.colors.warning }}>
                  Base Case
                </div>
                <div className="text-sm" style={{ color: theme.colors.text }}>
                  Null node, returning {returnValue}
                </div>
              </div>
            )}

            {/* Update Prev (Inorder Mode) */}
            {updatingPrev && (
              <div
                className="col-span-2 p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.primary + '15',
                  border: `1px solid ${theme.colors.primary}`,
                }}
              >
                <div className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                  Updating previous value: prev = {prev}
                </div>
              </div>
            )}

            {/* Algorithm Type Indicator */}
            {!complete && !violation && (
              <div className="col-span-2 text-center">
                <div className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                  Method: {isInorderMode ? 'Inorder Traversal' : 'Recursive Range Validation'}
                </div>
              </div>
            )}

            {/* Traversal Order Display */}
            {complete && isInorderMode && traversalOrder.length > 0 && (
              <div className="col-span-2">
                <div className="text-sm font-medium mb-2" style={{ color: theme.colors.textSecondary }}>
                  Complete Inorder Traversal
                </div>
                <div
                  className="p-3 rounded-lg font-mono text-center"
                  style={{
                    backgroundColor: theme.colors.success + '15',
                    border: `1px solid ${theme.colors.success}`,
                    color: theme.colors.text,
                  }}
                >
                  [{traversalOrder.join(' &lt; ')}]
                </div>
              </div>
            )}

            {/* Node Range Summary */}
            {complete && !isInorderMode && Object.keys(nodeRanges).length > 0 && !violation && (
              <div className="col-span-2">
                <div className="text-sm font-medium mb-2" style={{ color: theme.colors.textSecondary }}>
                  All nodes satisfied their range constraints
                </div>
                <div
                  className="p-3 rounded-lg text-center text-sm"
                  style={{
                    backgroundColor: theme.colors.success + '15',
                    border: `1px solid ${theme.colors.success}`,
                    color: theme.colors.text,
                  }}
                >
                  Validated {Object.keys(nodeRanges).length} node{Object.keys(nodeRanges).length > 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
