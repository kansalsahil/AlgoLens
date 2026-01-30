import { motion, MotionProps } from 'framer-motion';
import { ArrayVisualizer as PrimitiveArrayVisualizer } from '../../components/primitives';
import { ArrayVisualization } from '../types';
import { useTheme } from '../../hooks';
import React from 'react';

/**
 * Configuration interface for customizing ArrayAdapter behavior
 */
export interface ArrayAdapterConfig {
  /**
   * Custom styling hook for array elements
   */
  getElementStyle?: (
    value: number | string,
    index: number,
    isHighlighted: boolean,
    theme: any
  ) => React.CSSProperties;

  /**
   * Custom renderer for array elements (replaces default)
   */
  renderElement?: (
    value: number | string,
    index: number,
    isHighlighted: boolean,
    theme: any
  ) => React.ReactNode;

  /**
   * Custom renderer for pointer labels
   */
  renderPointer?: (
    pointer: { name: string; index: number; color?: string },
    theme: any
  ) => React.ReactNode;

  /**
   * Custom renderer for index labels
   */
  renderIndex?: (index: number, theme: any) => React.ReactNode;

  /**
   * Layout configuration
   */
  layout?: {
    direction?: 'horizontal' | 'vertical';
    elementSize?: { width: number; height: number };
    gap?: number;
  };

  /**
   * Custom animation variants
   */
  animations?: {
    element?: MotionProps;
    pointer?: MotionProps;
  };

  /**
   * Event handlers
   */
  onElementClick?: (value: number | string, index: number) => void;
  onElementHover?: (value: number | string, index: number) => void;

  /**
   * Whether to use custom rendering or delegate to primitive
   */
  useCustomRender?: boolean;
}

export interface ArrayAdapterProps {
  /**
   * Array visualization data
   */
  array: ArrayVisualization;

  /**
   * Transition duration for animations
   */
  transitionDuration?: number;

  /**
   * Configuration for customizing adapter behavior
   */
  config?: ArrayAdapterConfig;
}

/**
 * Generic ArrayAdapter that wraps the primitive ArrayVisualizer
 * and provides extensibility through configuration hooks.
 *
 * Problems can customize behavior by providing config without modifying
 * the adapter or primitive components.
 */
export function ArrayAdapter({
  array,
  transitionDuration = 0.4,
  config = {},
}: ArrayAdapterProps) {
  const { theme } = useTheme();

  // If no custom configuration, delegate to primitive
  if (!config.useCustomRender && Object.keys(config).length === 0) {
    return (
      <PrimitiveArrayVisualizer
        array={array}
        transitionDuration={transitionDuration}
      />
    );
  }

  // Custom rendering using configuration hooks
  const { values, highlights = [], pointers = [] } = array;
  const colors = theme.colors.array;
  const layout = config.layout || {};
  const elementSize = layout.elementSize || { width: 64, height: 64 };
  const gap = layout.gap || 4;

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Array Name */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-lg font-semibold"
        style={{ color: colors.primary }}
      >
        {array.name}
      </motion.h3>

      {/* Array Visualization */}
      <div
        className="flex items-start"
        style={{
          gap: `${gap}px`,
          flexDirection: layout.direction === 'vertical' ? 'column' : 'row',
        }}
      >
        {values.map((value, index) => {
          const isHighlighted = highlights.includes(index);
          const pointer = pointers.find((p) => p.index === index);

          // Use custom element renderer if provided
          if (config.renderElement) {
            return (
              <div key={index} className="flex flex-col items-center">
                {pointer &&
                  (config.renderPointer ? (
                    config.renderPointer(pointer, theme)
                  ) : (
                    <DefaultPointerRenderer
                      pointer={pointer}
                      colors={colors}
                      transitionDuration={transitionDuration}
                      animations={config.animations?.pointer}
                    />
                  ))}

                {config.renderElement(value, index, isHighlighted, theme)}

                {config.renderIndex ? (
                  config.renderIndex(index, theme)
                ) : (
                  <DefaultIndexRenderer index={index} colors={colors} />
                )}
              </div>
            );
          }

          // Default rendering with custom styling
          const customStyle = config.getElementStyle?.(
            value,
            index,
            isHighlighted,
            theme
          );

          return (
            <div key={index} className="flex flex-col items-center">
              {/* Pointer Label */}
              {pointer &&
                (config.renderPointer ? (
                  config.renderPointer(pointer, theme)
                ) : (
                  <DefaultPointerRenderer
                    pointer={pointer}
                    colors={colors}
                    transitionDuration={transitionDuration}
                    animations={config.animations?.pointer}
                  />
                ))}

              {/* Array Element */}
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  duration: transitionDuration,
                  ease: 'easeInOut',
                }}
                className="flex items-center justify-center rounded-lg transition-all cursor-pointer"
                style={{
                  width: `${elementSize.width}px`,
                  height: `${elementSize.height}px`,
                  backgroundColor: isHighlighted
                    ? colors.highlightBg
                    : colors.background,
                  border: isHighlighted
                    ? `3px solid ${colors.highlightBorder}`
                    : `2px solid ${colors.border}`,
                  ...customStyle,
                }}
                onClick={() => config.onElementClick?.(value, index)}
                onMouseEnter={() => config.onElementHover?.(value, index)}
                {...config.animations?.element}
              >
                <motion.span
                  animate={{ scale: isHighlighted ? 1.05 : 1 }}
                  transition={{
                    duration: transitionDuration * 0.7,
                    ease: 'easeInOut',
                  }}
                  className="text-lg font-semibold"
                  style={{
                    color: isHighlighted ? colors.highlightText : colors.text,
                  }}
                >
                  {value}
                </motion.span>
              </motion.div>

              {/* Index Label */}
              {config.renderIndex ? (
                config.renderIndex(index, theme)
              ) : (
                <DefaultIndexRenderer index={index} colors={colors} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Default renderer components
function DefaultPointerRenderer({
  pointer,
  colors,
  transitionDuration,
  animations,
}: {
  pointer: { name: string; index: number; color?: string };
  colors: any;
  transitionDuration: number;
  animations?: MotionProps;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.8 }}
      transition={{ duration: transitionDuration, ease: 'easeInOut' }}
      className="mb-2 text-sm font-bold"
      style={{ color: pointer.color || colors.primary }}
      {...animations}
    >
      {pointer.name}
      <div className="text-center">↓</div>
    </motion.div>
  );
}

function DefaultIndexRenderer({
  index,
  colors,
}: {
  index: number;
  colors: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-2 text-xs font-medium"
      style={{ color: colors.text }}
    >
      {index}
    </motion.div>
  );
}
