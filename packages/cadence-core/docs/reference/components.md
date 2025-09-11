# Component Reference

Complete reference for all components in the Cadence Core library.

## Layout Components

### Flex
Flexible layout container with design token spacing and alignment options.

**Import:** `import { Flex } from 'cadence-core'`

**Props:**
- `direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'`
- `align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'`
- `justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'`
- `gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `wrap?: boolean`

**Example:**
```tsx
<Flex direction="column" align="center" gap="md">
  <Text>Header</Text>
  <Button>Action</Button>
</Flex>
```

### Grid
CSS Grid layout with responsive breakpoints and design system integration.

**Import:** `import { Grid, GridItem } from 'cadence-core'`

**Grid Props:**
- `columns?: number | { sm?: number, md?: number, lg?: number }`
- `gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `rows?: number`

**GridItem Props:**
- `colSpan?: number | { sm?: number, md?: number, lg?: number }`
- `rowSpan?: number`

**Example:**
```tsx
<Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="md">
  <GridItem colSpan={{ sm: 1, md: 2 }}>
    <Card>Featured Content</Card>
  </GridItem>
  <GridItem>
    <Card>Regular Content</Card>
  </GridItem>
</Grid>
```

### Card
Content container with elevation and spacing options.

**Import:** `import { Card, CardContent, CardImage } from 'cadence-core'`

**Card Props:**
- `variant?: 'default' | 'outlined' | 'elevated'`
- `padding?: 'none' | 'sm' | 'md' | 'lg'`

**Example:**
```tsx
<Card variant="elevated" padding="md">
  <CardImage src="/image.jpg" alt="Description" />
  <CardContent>
    <Text variant="heading">Card Title</Text>
    <Text>Card description content.</Text>
  </CardContent>
</Card>
```

## Form Components

### Button
Primary interactive element with multiple variants and states.

**Import:** `import { Button } from 'cadence-core'`

**Props:**
- `variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'`
- `size?: 'sm' | 'md' | 'lg'`
- `disabled?: boolean`
- `loading?: boolean`
- `fullWidth?: boolean`
- `type?: 'button' | 'submit' | 'reset'`

**Example:**
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Primary Action
</Button>
```

### Input
Text input component with validation states and accessibility features.

**Import:** `import { Input } from 'cadence-core'`

**Props:**
- `type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'`
- `placeholder?: string`
- `disabled?: boolean`
- `error?: boolean`
- `required?: boolean`
- `fullWidth?: boolean`

**Example:**
```tsx
<Input
  type="email"
  placeholder="Enter your email"
  error={hasError}
  required
/>
```

### Textarea
Multi-line text input with auto-resize capability.

**Import:** `import { Textarea } from 'cadence-core'`

**Props:**
- `placeholder?: string`
- `disabled?: boolean`
- `error?: boolean`
- `required?: boolean`
- `rows?: number`
- `resize?: 'none' | 'vertical' | 'horizontal' | 'both'`

### Checkbox
Single checkbox or checkbox group with custom styling.

**Import:** `import { Checkbox } from 'cadence-core'`

**Props:**
- `checked?: boolean`
- `disabled?: boolean`
- `error?: boolean`
- `indeterminate?: boolean`
- `label?: string`

**Example:**
```tsx
<Checkbox
  checked={isChecked}
  onChange={setIsChecked}
  label="Accept terms and conditions"
/>
```

### Radio
Radio button component with group functionality.

**Import:** `import { Radio } from 'cadence-core'`

**Props:**
- `value: string`
- `checked?: boolean`
- `disabled?: boolean`
- `name?: string`
- `label?: string`

### RadioCard
Card-style radio buttons for enhanced visual selection.

**Import:** `import { RadioCardGroup, RadioCardItem } from 'cadence-core'`

**RadioCardGroup Props:**
- `value?: string`
- `onChange?: (value: string) => void`
- `name?: string`

**RadioCardItem Props:**
- `value: string`
- `disabled?: boolean`
- `children: ReactNode`

### Switch
Toggle switch for binary states.

**Import:** `import { Switch } from 'cadence-core'`

**Props:**
- `checked?: boolean`
- `disabled?: boolean`
- `size?: 'sm' | 'md' | 'lg'`
- `label?: string`

### Field
Form field wrapper providing labels, validation, and help text.

**Import:** `import { Field, Label, HelperText, ValidationMessage } from 'cadence-core'`

**Field Props:**
- `error?: boolean`
- `required?: boolean`
- `children: ReactNode`

**Example:**
```tsx
<Field error={hasError} required>
  <Label>Email Address</Label>
  <Input type="email" error={hasError} />
  <HelperText>We'll never share your email</HelperText>
  {hasError && <ValidationMessage>Please enter a valid email</ValidationMessage>}
</Field>
```

## Typography Components

### Text
Semantic text component with design system typography scale.

**Import:** `import { Text } from 'cadence-core'`

**Props:**
- `variant?: 'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'overline'`
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'`
- `weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'`
- `color?: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error'`
- `align?: 'left' | 'center' | 'right' | 'justify'`

**Example:**
```tsx
<Text variant="heading" size="xl" weight="bold">
  Section Headline
</Text>
<Text variant="body" color="muted">
  Supporting description text.
</Text>
```

### List
Styled ordered and unordered lists.

**Import:** `import { List } from 'cadence-core'`

**Props:**
- `type?: 'unordered' | 'ordered'`
- `variant?: 'default' | 'compact'`
- `children: ReactNode`

**Example:**
```tsx
<List type="unordered">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</List>
```

## Feedback Components

### Badge
Small status indicators and labels.

**Import:** `import { Badge } from 'cadence-core'`

**Props:**
- `variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'`
- `size?: 'sm' | 'md' | 'lg'`
- `dot?: boolean`
- `children: ReactNode`

**Example:**
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning" dot>Pending</Badge>
```

### Banner
System-wide notifications and messages.

**Import:** `import { Banner, BannerContent, BannerActions } from 'cadence-core'`

**Banner Props:**
- `variant?: 'info' | 'success' | 'warning' | 'error'`
- `dismissible?: boolean`
- `onDismiss?: () => void`

**Example:**
```tsx
<Banner variant="info" dismissible onDismiss={handleDismiss}>
  <BannerContent>
    <Text weight="medium">New feature available</Text>
    <Text size="sm">Check out our latest updates.</Text>
  </BannerContent>
  <BannerActions>
    <Button variant="tertiary" size="sm">Learn More</Button>
  </BannerActions>
</Banner>
```

## Brand Components

### Brand
Logo and brand element components.

**Import:** `import { LogoSymbol, LogoText, LogoLockup } from 'cadence-core'`

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl'`
- `color?: 'primary' | 'white' | 'black'`

**Example:**
```tsx
<LogoLockup size="lg" color="primary" />
<LogoSymbol size="md" color="white" />
```

## Form Layout Components

### HorizontalWrapper
Layout wrapper for horizontal form arrangements.

**Import:** `import { HorizontalWrapper } from 'cadence-core'`

**Props:**
- `gap?: 'sm' | 'md' | 'lg'`
- `align?: 'start' | 'center' | 'end'`

### CheckboxCard
Card-style checkbox for enhanced selection interfaces.

**Import:** `import { CheckboxCardGroup, CheckboxCardItem } from 'cadence-core'`

## Styling Guidelines

### CSS Modules
All components use CSS modules for scoped styling:
```tsx
// Component styles are automatically scoped
import styles from './button.module.css'

<button className={styles.button}>Button</button>
```

### Design Tokens
Components automatically use design tokens from cadence-tokens:
- **Colors**: `var(--color-primary-500)`
- **Spacing**: `var(--space-md)`
- **Typography**: `var(--font-size-lg)`
- **Radii**: `var(--radius-md)`

### Custom Styling
Override component styles using CSS custom properties:
```css
.custom-button {
  --button-background: var(--color-brand-500);
  --button-text: var(--color-white);
}
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and descriptions  
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Meets contrast ratio requirements
- **Semantic HTML**: Uses appropriate HTML elements

## TypeScript Support

Full TypeScript coverage with:
- **Prop Types**: Strict typing for all component props
- **Event Handlers**: Typed event callbacks
- **Ref Support**: forwardRef support where appropriate
- **Generic Components**: Type-safe generic props

## Related Documentation

- [Development Guide](../setup/development-guide.md) - Local development setup
- [Component Architecture](../implementation/component-architecture.md) - Implementation details
- [Storybook Guide](../setup/storybook-guide.md) - Interactive documentation