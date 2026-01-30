import { motion, MotionProps } from 'framer-motion';
import { StackVisualizer as PrimitiveStackVisualizer } from '../../components/primitives';
import { StackFrame } from '../types';
import { useTheme } from '../../hooks';
import React from 'react';

/**
 * Configuration interface for customizing StackAdapter behavior
 */
export interface StackAdapterConfig {
  /**
   * Custom title for the stack
   */
  title?: string;

  /**
   * Custom styling hook for stack frames
   */
  getFrameStyle?: (
    frame: StackFrame,
    isTop: boolean,
    theme: any
  ) => React.CSSProperties;

  /**
   * Custom renderer for stack frames (replaces default)
   */
  renderFrame?: (
    frame: StackFrame,
    index: number,
    isTop: boolean,
    stackDepth: number,
    theme: any
  ) => React.ReactNode;

  /**
   * Custom renderer for the "Top" indicator
   */
  renderTopIndicator?: (theme: any) => React.ReactNode;

  /**
   * Custom renderer for the "Bottom" indicator
   */
  renderBottomIndicator?: (stackSize: number, theme: any) => React.ReactNode;

  /**
   * Custom renderer for function parameters
   */
  renderParameters?: (
    parameters: Record<string, any>,
    theme: any
  ) => React.ReactNode;

  /**
   * Layout configuration
   */
  layout?: {
    maxWidth?: number;
    frameGap?: number;
    showFrameNumbers?: boolean;
  };

  /**
   * Custom animation variants
   */
  animations?: {
    frame?: MotionProps;
    topIndicator?: MotionProps;
  };

  /**
   * Event handlers
   */
  onFrameClick?: (frame: StackFrame, index: number) => void;
  onFrameHover?: (frame: StackFrame, index: number) => void;

  /**
   * Display options
   */
  displayOptions?: {
    showActiveLabel?: boolean;
    reverseOrder?: boolean;
  };

  /**
   * Whether to use custom rendering or delegate to primitive
   */
  useCustomRender?: boolean;
}

export interface StackAdapterProps {
  /**
   * Stack frames data
   */
  stack: StackFrame[];

  /**
   * Transition duration for animations
   */
  transitionDuration?: number;

  /**
   * Configuration for customizing adapter behavior
   */
  config?: StackAdapterConfig;
}

/**
 * Generic StackAdapter that wraps the primitive StackVisualizer
 * and provides extensibility through configuration hooks.
 *
 * Problems can customize behavior by providing config without modifying
 * the adapter or primitive components.
 */
export function StackAdapter({
  stack,
  transitionDuration = 0.4,
  config = {},
}: StackAdapterProps) {
  const { theme } = useTheme();

  // If no custom configuration, delegate to primitive
  if (!config.useCustomRender && Object.keys(config).length <= 1) {
    // Allow title override even without custom render
    return (
      <PrimitiveStackVisualizer
        stack={stack}
        transitionDuration={transitionDuration}
        title={config.title}
      />
    );
  }

  // Return null if no stack
  if (!stack || stack.length === 0) {
    return null;
  }

  const colors = theme.colors;
  const layout = config.layout || {};
  const displayOptions = config.displayOptions || {};

  // Stack: last element is the top (most recent call)
  // Display from top to bottom unless reversed
  const displayStack = displayOptions.reverseOrder
    ? [...stack]
    : [...stack].reverse();

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-lg font-semibold"
        style={{ color: colors.primary }}
      >
        {config.title || 'Stack'}
      </motion.h3>

      <div
        className="flex flex-col gap-2 w-full relative"
        style={{
          maxWidth: layout.maxWidth ? `${layout.maxWidth}px` : '28rem',
          gap: layout.frameGap ? `${layout.frameGap}px` : undefined,
        }}
      >
        {/* Top Indicator */}
        {config.renderTopIndicator ? (
          config.renderTopIndicator(theme)
        ) : (
          <DefaultTopIndicator colors={colors} animations={config.animations?.topIndicator} />
        )}

        {/* Stack Frames */}
        {displayStack.map((frame, index) => {
          const isTop = index === 0;
          const stackDepth = displayStack.length - index;

          // Use custom frame renderer if provided
          if (config.renderFrame) {
            return (
              <div
                key={`${frame.functionName}-${stackDepth}`}
                onClick={() => config.onFrameClick?.(frame, index)}
                onMouseEnter={() => config.onFrameHover?.(frame, index)}
              >
                {config.renderFrame(frame, index, isTop, stackDepth, theme)}
              </div>
            );
          }

          // Default rendering with custom styling
          const customStyle = config.getFrameStyle?.(frame, isTop, theme);

          return (
            <motion.div
              key={`${frame.functionName}-${stackDepth}`}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{
                duration: transitionDuration,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
              className="rounded-lg p-4 relative cursor-pointer"
              style={{
                backgroundColor: colors.surface,
                border: isTop
                  ? `3px solid ${colors.primary}`
                  : `2px solid ${colors.border}`,
                ...customStyle,
              }}
              onClick={() => config.onFrameClick?.(frame, index)}
              onMouseEnter={() => config.onFrameHover?.(frame, index)}
              {...config.animations?.frame}
            >
              {/* Active label */}
              {isTop && (displayOptions.showActiveLabel !== false) && (
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

                  {/* Parameters */}
                  {frame.parameters && Object.keys(frame.parameters).length > 0 && (
                    <div className="space-y-1 mt-2">
                      {config.renderParameters ? (
                        config.renderParameters(frame.parameters, theme)
                      ) : (
                        <DefaultParametersRenderer
                          parameters={frame.parameters}
                          colors={colors}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Frame number */}
                {(layout.showFrameNumbers !== false) && (
                  <div
                    className="text-xs font-mono"
                    style={{ color: colors.textSecondary }}
                  >
                    #{stackDepth}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Bottom Indicator */}
        {config.renderBottomIndicator ? (
          config.renderBottomIndicator(displayStack.length, theme)
        ) : (
          <DefaultBottomIndicator
            stackSize={displayStack.length}
            colors={colors}
            transitionDuration={transitionDuration}
          />
        )}
      </div>

      {/* Stack size info */}
      {displayStack.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: transitionDuration,
            delay: displayStack.length * 0.05,
          }}
          className="text-xs text-center"
          style={{ color: colors.textSecondary }}
        >
          {displayStack.length} frame{displayStack.length !== 1 ? 's' : ''} in
          stack
        </motion.div>
      )}
    </div>
  );
}

// Default renderer components
function DefaultTopIndicator({
  colors,
  animations,
}: {
  colors: any;
  animations?: MotionProps;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-2 mb-1"
      {...animations}
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
  );
}

function DefaultBottomIndicator({
  stackSize,
  colors,
  transitionDuration,
}: {
  stackSize: number;
  colors: any;
  transitionDuration: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: transitionDuration, delay: stackSize * 0.05 }}
      className="flex items-center justify-center gap-2 mt-1"
    >
      <div className="h-px flex-1" style={{ backgroundColor: colors.border }} />
      <span
        className="text-xs font-mono px-2"
        style={{ color: colors.textSecondary }}
      >
        Bottom
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: colors.border }} />
    </motion.div>
  );
}

function DefaultParametersRenderer({
  parameters,
  colors,
}: {
  parameters: Record<string, any>;
  colors: any;
}) {
  return (
    <>
      {Object.entries(parameters).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2 text-sm">
          <span className="font-mono" style={{ color: colors.textSecondary }}>
            {key}:
          </span>
          <span className="font-mono font-medium" style={{ color: colors.text }}>
            {value === null
              ? 'null'
              : value === undefined
              ? 'undefined'
              : String(value)}
          </span>
        </div>
      ))}
    </>
  );
}
