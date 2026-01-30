# Architecture: Before vs After

## Before: Direct Coupling (❌ Changes Cascade)

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Problem Layer                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│   │  TwoSumVisualizer│  │ TreeTraversal    │  │ ReverseLinkedList│ │
│   │                  │  │ Visualizer       │  │ Visualizer       │ │
│   │ imports:         │  │ imports:         │  │ imports:         │ │
│   │ ArrayVisualizer  │  │ TreeVisualizer   │  │ StackVisualizer  │ │
│   │                  │  │ StackVisualizer  │  │                  │ │
│   └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘ │
│            │                     │  │                    │           │
│            │                     │  │                    │           │
└────────────┼─────────────────────┼──┼────────────────────┼───────────┘
             │                     │  │                    │
             │  DIRECT IMPORT      │  │                    │
             │  (TIGHT COUPLING)   │  │                    │
             ▼                     ▼  ▼                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Primitive Components                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│   │ ArrayVisualizer  │  │ TreeVisualizer   │  │ StackVisualizer  │ │
│   │                  │  │                  │  │                  │ │
│   │ - Animation      │  │ - Node rendering │  │ - Frame display  │ │
│   │ - Styling        │  │ - Edge drawing   │  │ - Stack layout   │ │
│   │ - Layout         │  │ - Traversal      │  │ - Parameters     │ │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘ │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

Problem: ANY change to ArrayVisualizer breaks TwoSumVisualizer!
         ❌ Change prop name → TwoSumVisualizer breaks
         ❌ Add required prop → TwoSumVisualizer breaks
         ❌ Refactor internals → Risk of breaking TwoSumVisualizer
         ❌ Cannot customize without modifying primitive
```

---

## After: Adapter Pattern (✅ Changes Isolated)

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Problem Layer                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│   │  TwoSumVisualizer│  │ TreeTraversal    │  │ ReverseLinkedList│ │
│   │                  │  │ Visualizer       │  │ Visualizer       │ │
│   │ imports:         │  │ imports:         │  │ imports:         │ │
│   │ ArrayAdapter  ◄──┼──┼─TreeAdapter   ◄──┼──┼─StackAdapter  ◄──┤ │
│   │                  │  │ StackAdapter     │  │                  │ │
│   │ config:          │  │                  │  │ config:          │ │
│   │ arrayConfig.ts   │  │                  │  │ { title: '...' } │ │
│   └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘ │
│            │                     │  │                    │           │
│            │  ADAPTER IMPORT     │  │                    │           │
│            │  (LOOSE COUPLING)   │  │                    │           │
└────────────┼─────────────────────┼──┼────────────────────┼───────────┘
             │                     │  │                    │
             │                     │  │                    │
             ▼                     ▼  ▼                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Adapter Layer (NEW!)                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│   │  ArrayAdapter    │  │  TreeAdapter     │  │  StackAdapter    │ │
│   │                  │  │                  │  │                  │ │
│   │ • Config API     │  │ • Config API     │  │ • Config API     │ │
│   │ • Hook points    │  │ • Hook points    │  │ • Hook points    │ │
│   │ • Customization  │  │ • Customization  │  │ • Customization  │ │
│   │ • Fallback logic │  │ • Fallback logic │  │ • Fallback logic │ │
│   └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘ │
│            │                     │                      │           │
│            │  WRAPS PRIMITIVE    │                      │           │
│            │  (ADAPTER PATTERN)  │                      │           │
└────────────┼─────────────────────┼──────────────────────┼───────────┘
             │                     │                      │
             │                     │                      │
             ▼                     ▼                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Primitive Components                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│   │ ArrayVisualizer  │  │ TreeVisualizer   │  │ StackVisualizer  │ │
│   │                  │  │                  │  │                  │ │
│   │ - Animation      │  │ - Node rendering │  │ - Frame display  │ │
│   │ - Styling        │  │ - Edge drawing   │  │ - Stack layout   │ │
│   │ - Layout         │  │ - Traversal      │  │ - Parameters     │ │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘ │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

Benefits: Changes to ArrayVisualizer are isolated!
          ✅ Change prop name → Only update ArrayAdapter
          ✅ Add required prop → Adapter handles default
          ✅ Refactor internals → Problems unaffected
          ✅ Problems customize via config, not modification
```

---

## Impact Comparison

### Scenario: Update ArrayVisualizer API

| Action | Before (Direct) | After (Adapter) |
|--------|----------------|-----------------|
| Change ArrayVisualizer prop name | ❌ Update TwoSumVisualizer<br>❌ Update all array-using problems<br>❌ Risk of breaking code | ✅ Update ArrayAdapter only<br>✅ Problems unchanged<br>✅ No breaking changes |
| Add new required prop | ❌ Update all consumers<br>❌ Breaking change | ✅ Adapter provides default<br>✅ Backward compatible |
| Refactor ArrayVisualizer internals | ⚠️ Risk of breaking behavior<br>⚠️ Hard to test in isolation | ✅ Adapter absorbs changes<br>✅ Easy to test |
| Add new feature | ❌ Must add to ArrayVisualizer<br>❌ Affects all users | ✅ Add to adapter config<br>✅ Optional for problems |

---

## Customization Comparison

### Scenario: Two-Sum needs custom array styling

#### Before (Direct Import)
```tsx
Option 1: Fork ArrayVisualizer
  ❌ Duplicates code
  ❌ Misses updates to original
  ❌ Maintenance nightmare

Option 2: Add props to ArrayVisualizer
  ❌ Bloats shared component
  ❌ Affects all users
  ❌ Creates unused props for most

Option 3: Wrapper component
  ⚠️ Partial solution
  ⚠️ Still coupled to ArrayVisualizer API
  ⚠️ Duplicates some logic
```

#### After (Adapter Pattern)
```tsx
Solution: Config file
  ✅ No code duplication
  ✅ Clean separation
  ✅ Easy to maintain
  ✅ Type-safe configuration
  ✅ Self-documenting

// problems/two-sum/config/arrayConfig.ts
export const twoSumConfig: ArrayAdapterConfig = {
  getElementStyle: (value, index, isHighlighted, theme) => ({
    backgroundColor: value < 0 ? theme.colors.error : undefined,
    boxShadow: isHighlighted ? `0 0 20px ${theme.colors.primary}` : 'none',
  }),
  layout: { gap: 8 },
  animations: { element: { whileHover: { scale: 1.1 } } },
};

// problems/two-sum/visualizers/TwoSumVisualizer.tsx
<ArrayAdapter array={data} config={twoSumConfig} />
```

---

## Dependency Flow

### Before: Tight Coupling
```
TwoSumVisualizer
  └─► ArrayVisualizer (DIRECT DEPENDENCY)
        └─► framer-motion
        └─► useTheme

Change ArrayVisualizer → TwoSumVisualizer MUST change
```

### After: Loose Coupling
```
TwoSumVisualizer
  └─► ArrayAdapter (INDIRECT DEPENDENCY)
        └─► ArrayVisualizer (INTERNAL DETAIL)
              └─► framer-motion
              └─► useTheme

Change ArrayVisualizer → ArrayAdapter absorbs → TwoSumVisualizer unchanged
```

---

## Configuration Layers

```
┌─────────────────────────────────────────────────────┐
│              Problem Visualizer                      │
│  (Provides data + optional config)                  │
└───────────────────┬─────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│              Adapter Configuration                   │
│                                                      │
│  • getElementStyle() ─────► Custom styling hook     │
│  • renderElement() ───────► Custom element renderer │
│  • layout ────────────────► Size, gap, direction    │
│  • animations ────────────► Motion props            │
│  • onElementClick() ──────► Event handler           │
│  • ... (14+ options)                                │
└───────────────────┬─────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│              Adapter Logic                           │
│                                                      │
│  IF config provided:                                │
│    → Apply custom styling                           │
│    → Use custom renderers                           │
│    → Apply layout options                           │
│  ELSE:                                              │
│    → Delegate to primitive                          │
│                                                      │
│  IF useCustomRender = true:                         │
│    → Full custom rendering                          │
│  ELSE:                                              │
│    → Enhanced default rendering                     │
└───────────────────┬─────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│           Primitive Visualizer                       │
│  (Core rendering + animation logic)                 │
└─────────────────────────────────────────────────────┘
```

---

## Evolution Path

### Phase 1: Migration (✅ COMPLETED)
```
• Create adapters with config interfaces
• Update all problems to use adapters
• Maintain backward compatibility
```

### Phase 2: Customization (🎯 NEXT)
```
• Add problem-specific configs
• Implement custom styling hooks
• Add event handlers where needed
```

### Phase 3: Enhancement (🔮 FUTURE)
```
• Create config presets
• Add more adapters (Graph, Heap, Matrix)
• Performance optimizations
• Advanced composition patterns
```

---

## Summary

**Architecture Pattern**: Adapter (Wrapper) Pattern

**Problem Solved**: Cascading changes from shared components

**Key Insight**: Add an indirection layer that handles integration, allowing problems to customize through configuration instead of modification.

**Result**:
- ✅ Problems isolated from primitive changes
- ✅ Easy customization via configuration
- ✅ No code duplication
- ✅ Backward compatible
- ✅ Type-safe
- ✅ Well documented

**Developer Experience**:
```typescript
// Simple
<ArrayAdapter array={data} />

// Customized
<ArrayAdapter array={data} config={myConfig} />

// Fully custom
<ArrayAdapter array={data} config={{ useCustomRender: true, ... }} />
```

---

**The adapter pattern successfully decouples problems from visualizations! 🎉**
