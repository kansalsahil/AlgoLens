# Adapter Pattern Architecture

## Overview

The Algolens project uses a **generic adapter pattern** to decouple problem visualizers from primitive visualization components. This architecture provides:

- ✅ **Isolation**: Changes to primitive components don't cascade to problems
- ✅ **Extensibility**: Problems can customize visualizations through configuration
- ✅ **Code Reuse**: Shared animation and rendering logic in adapters
- ✅ **Flexibility**: Easy to override or replace any part of the visualization

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Problem Visualizers                       │
│  (TwoSumVisualizer, TreeTraversalVisualizer, etc.)              │
│                                                                   │
│  - Import adapters from core/adapters                            │
│  - Provide optional configuration                                │
│  - Focus on problem-specific logic                               │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ Uses
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Generic Adapters                            │
│                    (core/adapters/)                              │
│                                                                   │
│  ArrayAdapter    StackAdapter    TreeAdapter                     │
│  - Accept configuration props                                    │
│  - Provide hook points for customization                         │
│  - Handle common animation/rendering logic                       │
│  - Delegate to primitives or use custom render                   │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ Wraps
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Primitive Components                           │
│                 (components/primitives/)                         │
│                                                                   │
│  ArrayVisualizer  StackVisualizer  TreeVisualizer                │
│  - Core rendering logic                                          │
│  - Animation implementations                                     │
│  - Generic, reusable components                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── core/
│   └── adapters/                    ← Generic, extensible adapters
│       ├── ArrayAdapter.tsx
│       ├── StackAdapter.tsx
│       ├── TreeAdapter.tsx
│       └── index.ts
│
├── components/
│   └── primitives/                  ← Low-level visualization components
│       ├── ArrayVisualizer.tsx
│       ├── StackVisualizer.tsx
│       ├── TreeVisualizer.tsx
│       └── LinkedListVisualizer.tsx
│
└── problems/
    ├── two-sum/
    │   ├── visualizers/
    │   │   └── TwoSumVisualizer.tsx      ← Uses ArrayAdapter
    │   └── config/                        ← Optional: custom configurations
    │       └── arrayAdapterConfig.ts
    │
    ├── reverse-linked-list/
    │   └── visualizers/
    │       └── ReverseLinkedListVisualizer.tsx  ← Uses StackAdapter
    │
    └── binary-tree-inorder/
        └── visualizers/
            └── TreeTraversalVisualizer.tsx      ← Uses TreeAdapter + StackAdapter
```

## How It Works

### 1. Basic Usage (No Customization)

Problems can use adapters with zero configuration:

```tsx
import { ArrayAdapter } from '../../../core/adapters';

export function TwoSumVisualizer({ step, transitionDuration }: VisualizationProps) {
  const { arrays } = step.visualizationData;

  return (
    <ArrayAdapter
      array={arrays[0]}
      transitionDuration={transitionDuration}
    />
  );
}
```

**Result**: Adapter delegates to primitive component for default rendering.

---

### 2. Configuration-Based Customization

Problems can customize behavior through configuration:

```tsx
import { ArrayAdapter, ArrayAdapterConfig } from '../../../core/adapters';

const config: ArrayAdapterConfig = {
  layout: {
    elementSize: { width: 80, height: 80 },
    gap: 8,
  },
  animations: {
    element: {
      whileHover: { scale: 1.1 },
    },
  },
  onElementClick: (value, index) => {
    console.log(`Clicked: ${value} at ${index}`);
  },
};

export function TwoSumVisualizer({ step }: VisualizationProps) {
  return <ArrayAdapter array={step.visualizationData.arrays[0]} config={config} />;
}
```

**Result**: Adapter uses custom configuration while maintaining default rendering.

---

### 3. Hook-Based Customization

Problems can inject custom logic through hooks:

```tsx
const config: ArrayAdapterConfig = {
  getElementStyle: (value, index, isHighlighted, theme) => {
    // Custom styling logic
    if (isHighlighted) {
      return {
        boxShadow: `0 0 20px ${theme.colors.array.highlightBorder}`,
        transform: 'scale(1.15)',
      };
    }
    return {};
  },
};
```

**Result**: Adapter calls the hook for each element, allowing problem-specific styling.

---

### 4. Custom Rendering

Problems can completely replace rendering logic:

```tsx
const config: ArrayAdapterConfig = {
  useCustomRender: true,
  renderElement: (value, index, isHighlighted, theme) => {
    return (
      <div style={{ /* custom styles */ }}>
        {value}
      </div>
    );
  },
  renderPointer: (pointer, theme) => {
    return <CustomPointerComponent pointer={pointer} />;
  },
};
```

**Result**: Adapter uses problem's custom renderers instead of defaults.

---

## Available Adapters

### ArrayAdapter

**Configuration Interface**: `ArrayAdapterConfig`

**Hook Points**:
- `getElementStyle`: Custom element styling
- `renderElement`: Custom element renderer
- `renderPointer`: Custom pointer renderer
- `renderIndex`: Custom index renderer
- `onElementClick`: Click handler
- `onElementHover`: Hover handler

**Layout Options**:
- `direction`: 'horizontal' | 'vertical'
- `elementSize`: { width, height }
- `gap`: spacing between elements

**Example**:
```tsx
<ArrayAdapter
  array={data}
  config={{
    layout: { elementSize: { width: 80, height: 80 } },
    onElementClick: (value, index) => console.log(value),
  }}
/>
```

---

### StackAdapter

**Configuration Interface**: `StackAdapterConfig`

**Hook Points**:
- `getFrameStyle`: Custom frame styling
- `renderFrame`: Custom frame renderer
- `renderParameters`: Custom parameter display
- `renderTopIndicator`: Custom "Top" indicator
- `renderBottomIndicator`: Custom "Bottom" indicator
- `onFrameClick`: Click handler
- `onFrameHover`: Hover handler

**Layout Options**:
- `maxWidth`: Max width of stack container
- `frameGap`: Spacing between frames
- `showFrameNumbers`: Show/hide frame numbers

**Display Options**:
- `showActiveLabel`: Show/hide "Active" label on top frame
- `reverseOrder`: Reverse stack display order

**Example**:
```tsx
<StackAdapter
  stack={frames}
  config={{
    title: 'Call Stack',
    layout: { maxWidth: 400 },
    displayOptions: { showActiveLabel: true },
  }}
/>
```

---

### TreeAdapter

**Configuration Interface**: `TreeAdapterConfig`

**Hook Points**:
- `getNodeStyle`: Custom node styling
- `renderNode`: Custom node renderer
- `renderEdge`: Custom edge renderer
- `renderTraversalBadge`: Custom traversal order badge
- `onNodeClick`: Click handler
- `onNodeHover`: Hover handler

**Layout Options**:
- `svgWidth`, `svgHeight`: SVG canvas size
- `horizontalSpacing`: Horizontal gap between nodes
- `verticalSpacing`: Vertical gap between levels
- `nodeRadius`: Node circle radius

**Display Options**:
- `showTraversalOrder`: Show/hide traversal numbers
- `showEdges`: Show/hide edges
- `animateEdges`: Enable/disable edge animations

**Example**:
```tsx
<TreeAdapter
  tree={data}
  config={{
    layout: { svgWidth: 800, nodeRadius: 40 },
    displayOptions: { showTraversalOrder: true },
  }}
/>
```

---

## Benefits of This Architecture

### ✅ Problem Isolation

Changes to `ArrayVisualizer.tsx` only affect:
- The `ArrayAdapter.tsx` wrapper
- Problems using `ArrayAdapter` see no breaking changes (adapter handles compatibility)

**Before (Direct Import)**:
```
ArrayVisualizer.tsx change
  ↓
❌ TwoSumVisualizer breaks
❌ OtherArrayProblem breaks
❌ AnotherProblem breaks
```

**After (Adapter Pattern)**:
```
ArrayVisualizer.tsx change
  ↓
ArrayAdapter.tsx updated (single location)
  ↓
✅ TwoSumVisualizer unchanged
✅ OtherArrayProblem unchanged
✅ AnotherProblem unchanged
```

---

### ✅ Extensibility Without Modification

Problems can customize without touching shared code:

**Problem-specific config file**:
```typescript
// problems/two-sum/config/arrayConfig.ts
export const twoSumArrayConfig: ArrayAdapterConfig = {
  // Custom configuration for two-sum
};
```

**No changes needed to**:
- `core/adapters/ArrayAdapter.tsx`
- `components/primitives/ArrayVisualizer.tsx`
- Other problems

---

### ✅ Progressive Enhancement

Problems can start simple and add customization as needed:

**Level 1**: Use adapter with no config
```tsx
<ArrayAdapter array={data} />
```

**Level 2**: Add configuration
```tsx
<ArrayAdapter array={data} config={{ layout: { gap: 8 } }} />
```

**Level 3**: Add hooks
```tsx
<ArrayAdapter array={data} config={{
  getElementStyle: (v, i, h) => ({ /* custom */ })
}} />
```

**Level 4**: Full custom rendering
```tsx
<ArrayAdapter array={data} config={{
  useCustomRender: true,
  renderElement: (v, i, h, t) => <CustomElement />
}} />
```

---

### ✅ Testability

Adapters can be tested independently:

```tsx
// Test adapter with different configs
describe('ArrayAdapter', () => {
  it('renders with default config', () => {
    render(<ArrayAdapter array={mockData} />);
  });

  it('applies custom styling', () => {
    const config = { getElementStyle: jest.fn() };
    render(<ArrayAdapter array={mockData} config={config} />);
    expect(config.getElementStyle).toHaveBeenCalled();
  });
});
```

---

## Migration Guide

### Migrating Existing Problems

**Before**:
```tsx
import { ArrayVisualizer } from '../../../components/primitives';

export function ProblemVisualizer({ step }) {
  return <ArrayVisualizer array={step.visualizationData.arrays[0]} />;
}
```

**After**:
```tsx
import { ArrayAdapter } from '../../../core/adapters';

export function ProblemVisualizer({ step }) {
  return <ArrayAdapter array={step.visualizationData.arrays[0]} />;
}
```

**That's it!** The adapter provides the same interface as the primitive.

---

### Adding Customization Later

Once migrated, add config as needed:

```tsx
import { ArrayAdapter, ArrayAdapterConfig } from '../../../core/adapters';

const config: ArrayAdapterConfig = {
  layout: { gap: 8 },
  onElementClick: handleClick,
};

export function ProblemVisualizer({ step }) {
  return <ArrayAdapter array={step.visualizationData.arrays[0]} config={config} />;
}
```

---

## Best Practices

1. **Start with no config**: Use adapters without configuration first
2. **Use config over custom render**: Prefer configuration hooks over full custom rendering
3. **Keep config separate**: Store complex configs in separate files (`config/adapterConfig.ts`)
4. **Document custom behavior**: Comment why custom configuration is needed
5. **Test edge cases**: Test custom configs with various data inputs

---

## Future Enhancements

Potential improvements to the adapter pattern:

1. **Adapter Composition**: Allow combining multiple configs
2. **Theme Integration**: Make adapters theme-aware
3. **Performance Optimization**: Add memoization for custom renderers
4. **More Adapters**: Create adapters for other data structures (graphs, heaps, etc.)
5. **Config Presets**: Provide preset configurations for common use cases

---

## Example: Complete Custom Adapter Usage

```tsx
// problems/my-problem/config/arrayConfig.ts
import { ArrayAdapterConfig } from '../../../core/adapters';

export const myProblemArrayConfig: ArrayAdapterConfig = {
  // Layout customization
  layout: {
    direction: 'horizontal',
    elementSize: { width: 80, height: 80 },
    gap: 12,
  },

  // Styling hook
  getElementStyle: (value, index, isHighlighted, theme) => {
    if (value < 0) {
      return { backgroundColor: theme.colors.error + '30' };
    }
    if (isHighlighted) {
      return {
        boxShadow: `0 0 20px ${theme.colors.array.highlightBorder}`,
        transform: 'scale(1.15)',
      };
    }
    return {};
  },

  // Event handlers
  onElementClick: (value, index) => {
    console.log(`Clicked ${value} at index ${index}`);
  },

  // Custom animations
  animations: {
    element: {
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.95 },
    },
    pointer: {
      initial: { y: -20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
  },
};

// problems/my-problem/visualizers/MyProblemVisualizer.tsx
import { ArrayAdapter } from '../../../core/adapters';
import { myProblemArrayConfig } from '../config/arrayConfig';

export function MyProblemVisualizer({ step, transitionDuration }) {
  return (
    <ArrayAdapter
      array={step.visualizationData.arrays[0]}
      transitionDuration={transitionDuration}
      config={myProblemArrayConfig}
    />
  );
}
```

---

## Summary

The adapter pattern in Algolens provides a clean separation between:
- **Primitives**: Core visualization logic
- **Adapters**: Extensibility layer
- **Problems**: Problem-specific customization

This architecture ensures that:
1. Problems are isolated from primitive changes
2. Customization is easy through configuration
3. Code reuse is maximized
4. Testing is straightforward
5. Future enhancements are possible without breaking existing code

**Key Principle**: *Problems configure adapters, adapters wrap primitives, primitives handle rendering.*
