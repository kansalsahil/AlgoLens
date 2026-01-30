import { motion, MotionProps } from 'framer-motion';
import { TreeVisualizer as PrimitiveTreeVisualizer } from '../../components/primitives';
import { TreeVisualization, TreeNode } from '../types';
import { useTheme } from '../../hooks';
import React from 'react';

/**
 * Configuration interface for customizing TreeAdapter behavior
 */
export interface TreeAdapterConfig {
  /**
   * Custom styling hook for tree nodes
   */
  getNodeStyle?: (
    node: TreeNode,
    isHighlighted: boolean,
    theme: any
  ) => React.CSSProperties;

  /**
   * Custom renderer for tree nodes (replaces default)
   */
  renderNode?: (
    node: TreeNode,
    isHighlighted: boolean,
    traversalOrder: number | undefined,
    x: number,
    y: number,
    theme: any
  ) => React.ReactNode;

  /**
   * Custom renderer for edges between nodes
   */
  renderEdge?: (
    from: TreeNode,
    to: TreeNode,
    isHighlighted: boolean,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    theme: any
  ) => React.ReactNode;

  /**
   * Custom renderer for traversal order badges
   */
  renderTraversalBadge?: (
    order: number,
    x: number,
    y: number,
    theme: any
  ) => React.ReactNode;

  /**
   * Layout configuration
   */
  layout?: {
    svgWidth?: number;
    svgHeight?: number;
    horizontalSpacing?: number;
    verticalSpacing?: number;
    nodeRadius?: number;
  };

  /**
   * Display options
   */
  displayOptions?: {
    showTraversalOrder?: boolean;
    showEdges?: boolean;
    animateEdges?: boolean;
  };

  /**
   * Custom animation variants
   */
  animations?: {
    node?: MotionProps;
    edge?: MotionProps;
    badge?: MotionProps;
  };

  /**
   * Event handlers
   */
  onNodeClick?: (node: TreeNode) => void;
  onNodeHover?: (node: TreeNode) => void;

  /**
   * Whether to use custom rendering or delegate to primitive
   */
  useCustomRender?: boolean;
}

export interface TreeAdapterProps {
  /**
   * Tree visualization data
   */
  tree: TreeVisualization;

  /**
   * Transition duration for animations
   */
  transitionDuration?: number;

  /**
   * Configuration for customizing adapter behavior
   */
  config?: TreeAdapterConfig;
}

/**
 * Generic TreeAdapter that wraps the primitive TreeVisualizer
 * and provides extensibility through configuration hooks.
 *
 * Problems can customize behavior by providing config without modifying
 * the adapter or primitive components.
 */
export function TreeAdapter({
  tree,
  transitionDuration = 0.4,
  config = {},
}: TreeAdapterProps) {
  const { theme } = useTheme();

  // If no custom configuration, delegate to primitive
  if (!config.useCustomRender && Object.keys(config).length === 0) {
    return (
      <PrimitiveTreeVisualizer
        tree={tree}
        transitionDuration={transitionDuration}
      />
    );
  }

  const { root, highlightedNodes = [], traversalPath = [] } = tree;
  const colors = theme.colors.tree;
  const layout = config.layout || {};
  const displayOptions = config.displayOptions || {};

  if (!root) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center p-8"
        style={{ color: theme.colors.textSecondary }}
      >
        Empty tree
      </motion.div>
    );
  }

  const svgWidth = layout.svgWidth || 600;
  const svgHeight = layout.svgHeight || 450;
  const startX = svgWidth / 2;
  const startY = 60;
  const horizontalSpacing = layout.horizontalSpacing || 120;
  const verticalSpacing = layout.verticalSpacing || 100;
  const nodeRadius = layout.nodeRadius || 32;

  const elements: JSX.Element[] = [];

  // Recursively render tree
  const renderTreeRecursive = (
    node: TreeNode | null,
    x: number,
    y: number,
    hSpacing: number
  ): void => {
    if (!node) return;

    const isHighlighted = highlightedNodes.includes(node.id);
    const traversalOrder = traversalPath.indexOf(node.id);
    const displayOrder = traversalOrder >= 0 ? traversalOrder + 1 : undefined;

    // Render left child
    if (node.left && (displayOptions.showEdges !== false)) {
      const leftX = x - hSpacing;
      const leftY = y + verticalSpacing;
      const isEdgeHighlighted =
        highlightedNodes.includes(node.id) ||
        highlightedNodes.includes(node.left.id);

      if (config.renderEdge) {
        elements.push(
          <g key={`edge-${node.id}-left`}>
            {config.renderEdge(
              node,
              node.left,
              isEdgeHighlighted,
              x,
              y + nodeRadius,
              leftX,
              leftY - nodeRadius,
              theme
            )}
          </g>
        );
      } else {
        elements.push(
          <DefaultEdgeRenderer
            key={`edge-${node.id}-left`}
            x1={x}
            y1={y + nodeRadius}
            x2={leftX}
            y2={leftY - nodeRadius}
            isHighlighted={isEdgeHighlighted}
            colors={colors}
            transitionDuration={transitionDuration}
            animations={config.animations?.edge}
          />
        );
      }

      renderTreeRecursive(node.left, leftX, leftY, hSpacing / 2);
    }

    // Render right child
    if (node.right && (displayOptions.showEdges !== false)) {
      const rightX = x + hSpacing;
      const rightY = y + verticalSpacing;
      const isEdgeHighlighted =
        highlightedNodes.includes(node.id) ||
        highlightedNodes.includes(node.right.id);

      if (config.renderEdge) {
        elements.push(
          <g key={`edge-${node.id}-right`}>
            {config.renderEdge(
              node,
              node.right,
              isEdgeHighlighted,
              x,
              y + nodeRadius,
              rightX,
              rightY - nodeRadius,
              theme
            )}
          </g>
        );
      } else {
        elements.push(
          <DefaultEdgeRenderer
            key={`edge-${node.id}-right`}
            x1={x}
            y1={y + nodeRadius}
            x2={rightX}
            y2={rightY - nodeRadius}
            isHighlighted={isEdgeHighlighted}
            colors={colors}
            transitionDuration={transitionDuration}
            animations={config.animations?.edge}
          />
        );
      }

      renderTreeRecursive(node.right, rightX, rightY, hSpacing / 2);
    }

    // Render current node
    if (config.renderNode) {
      elements.push(
        <g
          key={`node-${node.id}`}
          onClick={() => config.onNodeClick?.(node)}
          onMouseEnter={() => config.onNodeHover?.(node)}
          style={{ cursor: config.onNodeClick ? 'pointer' : 'default' }}
        >
          {config.renderNode(
            node,
            isHighlighted,
            displayOrder,
            x,
            y,
            theme
          )}
        </g>
      );
    } else {
      elements.push(
        <DefaultNodeRenderer
          key={`node-${node.id}`}
          node={node}
          isHighlighted={isHighlighted}
          traversalOrder={displayOrder}
          x={x}
          y={y}
          nodeRadius={nodeRadius}
          colors={colors}
          transitionDuration={transitionDuration}
          animations={config.animations?.node}
          badgeAnimations={config.animations?.badge}
          onNodeClick={config.onNodeClick}
          onNodeHover={config.onNodeHover}
          showTraversalOrder={displayOptions.showTraversalOrder !== false}
          renderTraversalBadge={config.renderTraversalBadge}
          theme={theme}
        />
      );
    }
  };

  renderTreeRecursive(root, startX, startY, horizontalSpacing);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-lg font-semibold"
        style={{ color: colors.primary }}
      >
        {tree.name}
      </motion.h3>
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {elements}
      </motion.svg>
    </div>
  );
}

// Default renderer components
function DefaultEdgeRenderer({
  x1,
  y1,
  x2,
  y2,
  isHighlighted,
  colors,
  transitionDuration,
  animations,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isHighlighted: boolean;
  colors: any;
  transitionDuration: number;
  animations?: MotionProps;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={isHighlighted ? colors.highlightBorder : colors.border}
      strokeWidth={isHighlighted ? 3 : 2}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: transitionDuration * 0.8, ease: 'easeOut' }}
      {...animations}
    />
  );
}

function DefaultNodeRenderer({
  node,
  isHighlighted,
  traversalOrder,
  x,
  y,
  nodeRadius,
  colors,
  transitionDuration,
  animations,
  badgeAnimations,
  onNodeClick,
  onNodeHover,
  showTraversalOrder,
  renderTraversalBadge,
  theme,
}: {
  node: TreeNode;
  isHighlighted: boolean;
  traversalOrder: number | undefined;
  x: number;
  y: number;
  nodeRadius: number;
  colors: any;
  transitionDuration: number;
  animations?: MotionProps;
  badgeAnimations?: MotionProps;
  onNodeClick?: (node: TreeNode) => void;
  onNodeHover?: (node: TreeNode) => void;
  showTraversalOrder: boolean;
  renderTraversalBadge?: (
    order: number,
    x: number,
    y: number,
    theme: any
  ) => React.ReactNode;
  theme: any;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.3, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: transitionDuration * 1.2, ease: 'easeOut' }}
      onClick={() => onNodeClick?.(node)}
      onMouseEnter={() => onNodeHover?.(node)}
      style={{ cursor: onNodeClick ? 'pointer' : 'default' }}
      {...animations}
    >
      {/* Node circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={nodeRadius - 4}
        initial={{ r: nodeRadius - 8 }}
        animate={{
          r: isHighlighted ? nodeRadius : nodeRadius - 4,
          fill: isHighlighted ? colors.highlightBg : colors.background,
          strokeWidth: isHighlighted ? 3 : 2,
        }}
        stroke={isHighlighted ? colors.highlightBorder : colors.border}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
      />

      {/* Node text */}
      <motion.text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-lg font-semibold"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: isHighlighted ? 1.1 : 1,
          fill: isHighlighted ? colors.highlightText : colors.text,
        }}
        transition={{ duration: transitionDuration * 0.8, ease: 'easeInOut' }}
      >
        {node.value}
      </motion.text>

      {/* Traversal order badge */}
      {showTraversalOrder && traversalOrder !== undefined && (
        <>
          {renderTraversalBadge ? (
            renderTraversalBadge(traversalOrder, x, y, theme)
          ) : (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: transitionDuration * 0.6,
                delay: transitionDuration * 0.2,
                ease: 'easeOut',
              }}
              {...badgeAnimations}
            >
              <circle
                cx={x + nodeRadius - 4}
                cy={y - nodeRadius + 4}
                r="12"
                fill={colors.primary}
              />
              <text
                x={x + nodeRadius - 4}
                y={y - nodeRadius + 4}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold"
                fill="#ffffff"
              >
                {traversalOrder}
              </text>
            </motion.g>
          )}
        </>
      )}
    </motion.g>
  );
}
