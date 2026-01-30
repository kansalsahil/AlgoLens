import { useState } from 'react';
import { useAnimation, useTheme } from '../../hooks';
import { SPEED_OPTIONS } from '../../config';
import { soundEffects } from '../../utils/sounds';

export function PlaybackControls() {
  const {
    state,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    goToStep,
    setSpeed,
  } = useAnimation();

  const { theme } = useTheme();
  const { isPlaying, currentStepIndex, steps, speed } = state;
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundEffects.setEnabled(newState);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    goToStep(index);
  };

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: theme.colors.surface,
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Current Step Description */}
        {steps.length > 0 && (
          <div
            className="text-center text-sm font-medium py-3 px-4 rounded-lg"
            style={{
              color: theme.colors.text,
              backgroundColor: theme.colors.background,
              border: `2px solid ${theme.colors.primary}40`,
              boxShadow: `0 2px 12px ${theme.colors.primary}20, inset 0 1px 2px ${theme.colors.background}`,
            }}
          >
            {steps[currentStepIndex]?.description || 'No description'}
          </div>
        )}

        {/* Progress Slider */}
        <div className="flex items-center gap-3">
          <span className="text-sm w-16" style={{ color: theme.colors.textSecondary }}>
            Step {currentStepIndex + 1} / {steps.length || 1}
          </span>
          <input
            type="range"
            min="0"
            max={Math.max(0, steps.length - 1)}
            value={currentStepIndex}
            onChange={handleSliderChange}
            className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: theme.colors.border,
              accentColor: theme.colors.primary,
            }}
            disabled={steps.length === 0}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-2">
          {/* Reset */}
          <button
            onClick={reset}
            disabled={steps.length === 0}
            className="px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: steps.length === 0 ? theme.colors.border : theme.colors.background,
              color: steps.length === 0 ? theme.colors.textSecondary : theme.colors.text,
              border: `2px solid ${theme.colors.border}`,
              boxShadow: steps.length === 0 ? 'none' : `0 2px 6px ${theme.colors.border}40`,
            }}
            title="Reset"
          >
            ↺
          </button>

          {/* Step Backward */}
          <button
            onClick={stepBackward}
            disabled={steps.length === 0 || currentStepIndex === 0}
            className="px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: (steps.length === 0 || currentStepIndex === 0) ? theme.colors.border : theme.colors.background,
              color: (steps.length === 0 || currentStepIndex === 0) ? theme.colors.textSecondary : theme.colors.text,
              border: `2px solid ${theme.colors.border}`,
              boxShadow: (steps.length === 0 || currentStepIndex === 0) ? 'none' : `0 2px 6px ${theme.colors.border}40`,
            }}
            title="Step Backward"
          >
            ⏮
          </button>

          {/* Play/Pause */}
          <button
            onClick={isPlaying ? pause : play}
            disabled={steps.length === 0}
            className="px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
            style={{
              backgroundColor: steps.length === 0 ? theme.colors.border : theme.colors.primary,
              color: '#ffffff',
              border: `2px solid ${steps.length === 0 ? theme.colors.border : theme.colors.primary}`,
              boxShadow: steps.length === 0 ? 'none' : `0 4px 12px ${theme.colors.primary}40`,
            }}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Step Forward */}
          <button
            onClick={stepForward}
            disabled={steps.length === 0 || currentStepIndex >= steps.length - 1}
            className="px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: (steps.length === 0 || currentStepIndex >= steps.length - 1) ? theme.colors.border : theme.colors.background,
              color: (steps.length === 0 || currentStepIndex >= steps.length - 1) ? theme.colors.textSecondary : theme.colors.text,
              border: `2px solid ${theme.colors.border}`,
              boxShadow: (steps.length === 0 || currentStepIndex >= steps.length - 1) ? 'none' : `0 2px 6px ${theme.colors.border}40`,
            }}
            title="Step Forward"
          >
            ⏭
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-1.5"
            style={{
              backgroundColor: soundEnabled ? theme.colors.primary : theme.colors.background,
              color: soundEnabled ? '#ffffff' : theme.colors.text,
              border: `2px solid ${soundEnabled ? theme.colors.primary : theme.colors.border}`,
              boxShadow: soundEnabled ? `0 4px 12px ${theme.colors.primary}40` : `0 2px 6px ${theme.colors.border}40`,
            }}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {soundEnabled ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              )}
            </svg>
          </button>

          {/* Speed Selector */}
          <select
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            disabled={steps.length === 0}
            className="px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-lg"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              border: `2px solid ${theme.colors.border}`,
              boxShadow: `0 2px 6px ${theme.colors.border}40`,
            }}
          >
            {SPEED_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
