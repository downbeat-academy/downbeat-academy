# Cadence Icons Documentation

This directory contains comprehensive documentation for the Cadence Icons library, part of the Downbeat Academy design system.

## Documentation Structure

### 📁 [setup/](./setup/)
Development environment and build configuration guides
- [development-guide.md](./setup/development-guide.md) - Local development setup and icon creation workflow

### 📁 [reference/](./reference/)
Icon library reference and usage guides  
- [icons.md](./reference/icons.md) - Complete icon library reference with examples
- [usage-guide.md](./reference/usage-guide.md) - Implementation patterns and best practices

## Package Overview

**Cadence Icons** is the icon library for the Downbeat Academy design system, providing:

- **SVG Icons**: Scalable vector icons optimized for web
- **React Components**: Pre-built React components for each icon
- **TypeScript Support**: Full type definitions and IntelliSense
- **Consistent Styling**: Icons follow design system principles
- **Tree Shaking**: Import only the icons you need
- **Customizable**: Support for size, color, and accessibility props

## Quick Start

### Installation
```bash
# In your app (if not using workspace)
npm install cadence-icons

# In monorepo (already available)
pnpm install
```

### Basic Usage
```tsx
import { PlayFill, PauseFill, Heart } from 'cadence-icons'

function AudioControls() {
  return (
    <div>
      <PlayFill size={24} color="currentColor" />
      <PauseFill size={24} color="currentColor" />
      <Heart size={20} color="red" />
    </div>
  )
}
```

### Development
```bash
# Start development server (icon viewer)
pnpm icons:dev

# Add new icon (add SVG to src/assets/)
# Then rebuild components
pnpm icons:build

# Build package
pnpm --filter=cadence-icons build
```

## Available Icons

### Audio & Media
- **PlayFill**, **PlayOutline** - Play controls
- **PauseFill**, **PauseOutline** - Pause controls  
- **StopFill**, **StopOutline** - Stop controls
- **NextFill**, **NextOutline** - Next track
- **PreviousFill**, **PreviousOutline** - Previous track
- **FastForwardFill**, **FastForwardOutline** - Fast forward
- **RewindFill**, **RewindOutline** - Rewind
- **Volume**, **VolumeQuiet**, **VolumeMute**, **VolumeNone** - Volume controls
- **Microphone**, **MicrophoneAlt**, **MicrophoneOff** - Audio input
- **Headphones** - Audio output
- **Music**, **MusicOff** - Music indicators
- **Playlist** - Playlist management

### Navigation & UI
- **ChevronUp**, **ChevronDown**, **ChevronLeft**, **ChevronRight** - Directional
- **ChevronsUp**, **ChevronsLeft**, **ChevronsRight** - Double chevrons
- **CaretUp**, **CaretDown**, **CaretLeft**, **CaretRight** - Small arrows
- **ArrowBack** - Back navigation
- **ArrowBar[Direction]** - Arrow with bar indicators
- **ArrowBarTo[Direction]** - Arrow to edge indicators
- **OpenNewWindow** - External links

### Actions & Controls
- **Check** - Confirmations
- **X** - Close/cancel
- **Plus** - Add/create
- **Minus** - Remove/subtract
- **Download** - File downloads
- **Refresh**, **Reload** - Refresh actions
- **ArrowsMaximize**, **ArrowsMinimize** - Size controls
- **ArrowsMove**, **ArrowsShuffle**, **ArrowsSort** - Organization

### Status & Feedback
- **CheckCircleOutline** - Success states
- **ErrorCircleOutline**, **XCircleOutline** - Error states  
- **AlertCircleOutline**, **AlertTriangleOutline** - Warnings
- **InfoCircleOutline**, **QuestionCircleOutline** - Information
- **WarningTriangleOutline** - Warnings
- **MinusCircleOutline**, **PlusCircleOutline** - Quantity controls

### Interface Elements
- **Dot**, **DotFilled** - Status indicators
- **Repeat** - Loop/repeat indicators

### Social & External
- **Facebook**, **Instagram**, **Twitter**, **Youtube**, **Tiktok** - Social platforms

## Icon Properties

All icons support these common props:

```typescript
interface IconProps {
  size?: number | string    // Default: 24
  color?: string           // Default: 'currentColor'  
  className?: string       // Additional CSS classes
  'aria-label'?: string    // Accessibility label
  'aria-hidden'?: boolean  // Hide from screen readers
  role?: string           // ARIA role (default: 'img')
}
```

## Usage Patterns

### Basic Icon
```tsx
import { PlayFill } from 'cadence-icons'

<PlayFill size={32} color="#007AFF" />
```

### With Accessibility
```tsx
import { Download } from 'cadence-icons'

<Download 
  size={20} 
  aria-label="Download file" 
  role="img"
/>
```

### In Buttons
```tsx
import { PlusCircleOutline } from 'cadence-icons'
import { Button } from 'cadence-core'

<Button>
  <PlusCircleOutline size={16} />
  Add Item
</Button>
```

### Custom Styling
```tsx
import { Heart } from 'cadence-icons'

<Heart 
  size={24}
  className="favorite-icon"
  style={{ color: isLiked ? 'red' : 'gray' }}
/>
```

## Icon Development Workflow

### Adding New Icons

1. **Add SVG file** to `src/assets/`
2. **Name consistently**: `kebab-case.svg`
3. **Optimize SVG**: Remove unnecessary attributes, ensure viewBox is `0 0 24 24`
4. **Generate components**: `pnpm icons:build`
5. **Test icon**: `pnpm icons:dev`
6. **Build package**: `pnpm build`

### SVG Optimization Guidelines

```svg
<!-- Good: Clean, optimized SVG -->
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 5v14l11-7z" fill="currentColor"/>
</svg>

<!-- Bad: Complex SVG with unnecessary attributes -->
<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g id="Layer_1" transform="translate(0.000000,0.000000)" fill="#000000">
    <path d="M8 5v14l11-7z"/>
  </g>
</svg>
```

### Component Generation

Icons are automatically generated as React components using SVGR:

```typescript
// Generated component structure
import { forwardRef } from 'react'
import type { IconProps } from '../types'

export const PlayFill = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = 'currentColor', ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...props}
    >
      <path d="M8 5v14l11-7z" fill={color} />
    </svg>
  )
)

PlayFill.displayName = 'PlayFill'
```

## Design Guidelines

### Icon Design Principles
- **24x24 Grid**: All icons fit within a 24x24 pixel grid
- **Consistent Weight**: 2px stroke width for outlined icons
- **Simple Shapes**: Clear, recognizable forms
- **Scalable**: Look good from 16px to 48px+
- **Accessible**: Sufficient contrast and clear shapes

### Naming Conventions
- **Descriptive**: Clear purpose (Play, Pause, Download)
- **Variant Suffix**: Fill, Outline, Alt versions
- **Consistent**: Follow existing patterns
- **PascalCase**: Component names in PascalCase

### Icon Variants
- **Fill**: Solid icons for active states
- **Outline**: Stroke-based icons for inactive states
- **Alt**: Alternative versions of same concept

## Build System

### Development Build
```bash
# Clean generated components
pnpm clean

# Generate components from SVGs
pnpm svgr

# Build package
pnpm build
```

### Scripts Overview
- `pnpm ensure-icons` - Verify all SVGs have components
- `pnpm clean` - Remove generated components
- `pnpm svgr` - Generate React components from SVGs
- `pnpm icons:build` - Clean and regenerate components
- `pnpm build` - Build package for distribution

## Integration with Design System

### With Cadence Core Components
```tsx
import { Button } from 'cadence-core'
import { Download } from 'cadence-icons'

<Button variant="primary">
  <Download size={16} />
  Download Report
</Button>
```

### With Design Tokens
```css
.icon-button {
  color: var(--color-primary-500);
  background: var(--color-surface-100);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
}
```

## Accessibility

### Screen Reader Support
```tsx
// Decorative icon (hidden from screen readers)
<Heart aria-hidden="true" />

// Functional icon (with label)
<Download aria-label="Download file" role="img" />

// In button context (button provides label)
<button aria-label="Like this post">
  <Heart aria-hidden="true" />
</button>
```

### Color and Contrast
- Icons inherit text color by default (`currentColor`)
- Ensure sufficient contrast (4.5:1 for normal text)
- Don't rely on color alone to convey information

## Performance

### Tree Shaking
```tsx
// Good: Import only needed icons
import { PlayFill, PauseFill } from 'cadence-icons'

// Bad: Import entire library
import * as Icons from 'cadence-icons'
```

### Bundle Size
- Individual icons are small (~1-2KB each)
- Only imported icons are included in bundle
- SVG format provides optimal compression

## For AI Agents

When working with cadence-icons:

### Finding Icons
1. Check `src/assets/` for available SVG files
2. Look at generated components in `src/components/`
3. Reference the icon viewer at `pnpm icons:dev`

### Adding Icons
1. Add optimized SVG to `src/assets/`
2. Run `pnpm icons:build` to generate component
3. Export from `src/index.ts` if not auto-exported
4. Test with `pnpm icons:dev`

### Common Tasks
- **New Icon**: Add SVG → generate → build → test
- **Update Icon**: Replace SVG → regenerate → test
- **Find Usage**: Search codebase for icon component name

## Related Documentation

- [Usage Guide](./reference/usage-guide.md) - Implementation patterns
- [Icon Reference](./reference/icons.md) - Complete icon list
- [Development Guide](./setup/development-guide.md) - Development workflows
- [Root agents.md](../../../agents.md) - Monorepo development guide