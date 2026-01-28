import { motion } from 'framer-motion';
import { TreeVisualization, TreeNode } from '../../core/types';
import { useTheme } from '../../hooks';
import type { Theme } from '../../config/themes';

interface TreeVisualizerProps {
  tree: TreeVisualization;
  transitionDuration?: number;
}

interface TreeNodeProps {
  node: TreeNode;
  isHighlighted: boolean;
  traversalOrder?: number;
  transitionDuration: number;
  x: number;
  y: number;
  colors: Theme['colors']['tree'];
}

function TreeNodeComponent({ node, isHighlighted, traversalOrder, transitionDuration, x, y, colors }: TreeNodeProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.3, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: transitionDuration * 1.2, ease: "easeOut" }}
    >
      {/* Main circle - Use border for highlighting */}
      <motion.circle
        cx={x}
        cy={y}
        r="32"
        initial={{ r: 28 }}
        animate={{
          r: isHighlighted ? 36 : 32,
          fill: isHighlighted ? colors.highlightBg : colors.background,
          strokeWidth: isHighlighted ? 3 : 2,
        }}
        stroke={isHighlighted ? colors.highlightBorder : colors.border}
        transition={{ duration: transitionDuration, ease: "easeInOut" }}
      />
      
      {/* Text */}
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
        transition={{ duration: transitionDuration * 0.8, ease: "easeInOut" }}
      >
        {node.value}
      </motion.text>
      
      {/* Traversal order badge */}
      {traversalOrder !== undefined && (
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: transitionDuration * 0.6, delay: transitionDuration * 0.2, ease: "easeOut" }}
        >
          <circle
            cx={x + 28}
            cy={y - 28}
            r="12"
            fill={colors.primary}
          />
          <text
            x={x + 28}
            y={y - 28}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-bold"
            fill="#ffffff"
          >
            {traversalOrder}
          </text>
        </motion.g>
      )}
    </motion.g>
  );
}

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  horizontalSpacing: number,
  verticalSpacing: number,
  highlightedNodes: string[],
  traversalPath: string[],
  transitionDuration: number,
  elements: JSX.Element[],
  colors: Theme['colors']['tree']
): void {
  if (!node) return;

  const isHighlighted = highlightedNodes.includes(node.id);
  const traversalOrder = traversalPath.indexOf(node.id);
  const displayOrder = traversalOrder >= 0 ? traversalOrder + 1 : undefined;

  // Render left child edge
  if (node.left) {
    const leftX = x - horizontalSpacing;
    const leftY = y + verticalSpacing;
    const isEdgeHighlighted = highlightedNodes.includes(node.id) || highlightedNodes.includes(node.left.id);
    elements.push(
      <motion.line
        key={`edge-${node.id}-left`}
        x1={x}
        y1={y + 32}
        x2={leftX}
        y2={leftY - 32}
        stroke={isEdgeHighlighted ? colors.highlightBorder : colors.border}
        strokeWidth={isEdgeHighlighted ? 3 : 2}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: transitionDuration * 0.8, ease: "easeOut" }}
      />
    );
    renderTree(node.left, leftX, leftY, horizontalSpacing / 2, verticalSpacing, highlightedNodes, traversalPath, transitionDuration, elements, colors);
  }

  // Render right child edge
  if (node.right) {
    const rightX = x + horizontalSpacing;
    const rightY = y + verticalSpacing;
    const isEdgeHighlighted = highlightedNodes.includes(node.id) || highlightedNodes.includes(node.right.id);
    elements.push(
      <motion.line
        key={`edge-${node.id}-right`}
        x1={x}
        y1={y + 32}
        x2={rightX}
        y2={rightY - 32}
        stroke={isEdgeHighlighted ? colors.highlightBorder : colors.border}
        strokeWidth={isEdgeHighlighted ? 3 : 2}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: transitionDuration * 0.8, ease: "easeOut" }}
      />
    );
    renderTree(node.right, rightX, rightY, horizontalSpacing / 2, verticalSpacing, highlightedNodes, traversalPath, transitionDuration, elements, colors);
  }

  // Render current node
  elements.push(
    <TreeNodeComponent
      key={`node-${node.id}`}
      node={node}
      isHighlighted={isHighlighted}
      traversalOrder={displayOrder}
      transitionDuration={transitionDuration}
      x={x}
      y={y}
      colors={colors}
    />
  );
}

export function TreeVisualizer({ tree, transitionDuration = 0.4 }: TreeVisualizerProps) {
  const { root, highlightedNodes = [], traversalPath = [] } = tree;
  const { theme } = useTheme();
  const colors = theme.colors.tree;

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

  const elements: JSX.Element[] = [];
  const svgWidth = 600;
  const svgHeight = 450;
  const startX = svgWidth / 2;
  const startY = 60;
  const horizontalSpacing = 120;
  const verticalSpacing = 100;

  renderTree(root, startX, startY, horizontalSpacing, verticalSpacing, highlightedNodes, traversalPath, transitionDuration, elements, colors);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {elements}
      </motion.svg>
    </div>
  );
}
