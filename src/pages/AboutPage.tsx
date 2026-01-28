import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks';
import { motion } from 'framer-motion';

export function AboutPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: theme.colors.background }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div
          className="rounded-2xl p-8 md:p-12 shadow-lg"
          style={{
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          {/* Logo/Title */}
          <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: theme.colors.text }}>
            Algolens
          </h1>

          {/* Content */}
          <div className="space-y-4 mb-8 text-center leading-relaxed" style={{ color: theme.colors.textSecondary }}>
            <p>
              Visualizations accelerate learning by transforming abstract algorithms into concrete, memorable experiences. Research shows that visual information is processed <strong style={{ color: theme.colors.text }}>60,000 times faster</strong> than text and is retained in memory significantly longer.
            </p>
            <p>
              Algolens provides step-by-step animated visualizations that help you understand not just <em style={{ color: theme.colors.primary }}>what</em> an algorithm does, but <em style={{ color: theme.colors.primary }}>how</em> and <em style={{ color: theme.colors.primary }}>why</em> it works.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: theme.colors.primary,
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Explore Problems
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
