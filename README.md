# Algolens

Algolens is a React application for visualizing LeetCode problem solutions with step-by-step animations.

## Features

- **Interactive Visualizations**: See algorithms come to life with animated visualizations of arrays, trees, and linked lists
- **Multiple Solutions**: Compare different approaches to the same problem (e.g., hash map vs brute force for Two Sum)
- **Playback Controls**: Play, pause, step forward/backward, adjust speed, and loop through algorithm execution
- **Code Highlighting**: See which line of code is executing at each step
- **Modular Architecture**: Easy to add new problems and solutions

## Initial Problems

1. **Two Sum** (Array) - Hash Map and Brute Force solutions
2. **Reverse Linked List** (Linked List) - Iterative and Recursive solutions
3. **Binary Tree Inorder Traversal** (Tree) - Recursive and Iterative solutions

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Prism.js** - Code syntax highlighting

## Project Structure

```
src/
├── core/              # Core abstractions (types, engine, registry)
├── problems/          # Problem modules (self-contained)
├── components/        # React components (layout, primitives, problem)
├── hooks/             # Custom React hooks
├── context/           # React Context providers
├── utils/             # Utility functions
└── config/            # Configuration constants
```

## Architecture

### Core Concepts

- **Problem**: Contains metadata, solutions, and default visualizer
- **Solution**: Contains code, execution logic, and complexity info
- **AnimationStep**: Represents a single step with visualization data
- **AnimationEngine**: Manages playback (play, pause, step, speed control)
- **ProblemRegistry**: Central registry where problems auto-register

### Adding a New Problem

1. Create a new directory in `src/problems/[problem-name]/`
2. Define metadata in `metadata.ts`
3. Implement solutions in `solutions/` directory
4. Create visualizer in `visualizers/` directory (or reuse primitive)
5. Export problem from `index.ts` with `registerProblem()` call
6. Import the problem in `src/problems/index.ts`

The problem will automatically appear in the UI!

## Usage

1. Select a problem from the sidebar
2. Choose a solution approach
3. Click "Run" to start the visualization
4. Use playback controls to navigate through the algorithm execution
5. Watch the code highlighting sync with the visualization

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
