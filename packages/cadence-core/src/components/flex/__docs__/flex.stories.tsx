import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from '../../badge';
import { Flex } from '../index'

const meta: Meta<typeof Flex> = {
  title: "Cadence / Components / Flex",
  component: Flex,
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
    },
    gap: {
      control: 'select',
      options: ['none', '2x-small', 'x-small', 'small', 'medium', 'large', 'x-large', '2x-large', '3x-large'],
    },
    padding: {
      control: 'select',
      options: ['none', '2x-small', 'x-small', 'small', 'medium', 'large', 'x-large', '2x-large', '3x-large'],
    },
    alignItems: {
      control: 'select',
      options: ['stretch', 'start', 'center', 'end'],
    },
    alignContent: {
      control: 'select',
      options: ['stretch', 'start', 'center', 'end'],
    },
    justifyContent: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
    },
    background: {
      control: 'select',
      options: ['primary', 'faint', 'high-contrast', 'brand', 'interactive', 'success', 'warning', 'critical'],
    },
    wrap: {
      control: 'boolean',
    },
    tag: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside', 'nav', 'header', 'footer', 'main', 'ul', 'ol'],
    },
  },
}

export default meta;
type Story = StoryObj<typeof Flex>;

// Helper component for visual demonstration
const Box = ({ children, width, height }: { children?: React.ReactNode; width?: string; height?: string }) => (
  <div style={{
    padding: '1rem',
    background: 'var(--color-background-faint)',
    border: '1px solid var(--color-border-default)',
    borderRadius: '4px',
    width: width || 'auto',
    height: height || 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    {children}
  </div>
);

// Direction Stories
export const Row: Story = {
  args: {
    direction: 'row',
    gap: 'medium',
    children: [
      <Badge key="1" text='Item 1' type='success' style='outlined' />,
      <Badge key="2" text='Item 2' type='error' style='filled' />,
      <Badge key="3" text='Item 3' type='warning' style='light' />,
    ]
  }
}

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 'medium',
    children: [
      <Badge key="1" text='Item 1' type='success' style='outlined' />,
      <Badge key="2" text='Item 2' type='error' style='filled' />,
      <Badge key="3" text='Item 3' type='warning' style='light' />,
    ]
  }
}

// Gap Stories
export const GapNone: Story = {
  name: 'Gap: None',
  args: {
    direction: 'row',
    gap: 'none',
    children: [
      <Badge key="1" text='No gap' type='neutral' style='filled' />,
      <Badge key="2" text='between' type='neutral' style='filled' />,
      <Badge key="3" text='items' type='neutral' style='filled' />,
    ]
  }
}

export const GapSmall: Story = {
  name: 'Gap: Small',
  args: {
    direction: 'row',
    gap: 'small',
    children: [
      <Badge key="1" text='Small' type='neutral' style='filled' />,
      <Badge key="2" text='gap' type='neutral' style='filled' />,
      <Badge key="3" text='spacing' type='neutral' style='filled' />,
    ]
  }
}

export const GapLarge: Story = {
  name: 'Gap: Large',
  args: {
    direction: 'row',
    gap: 'large',
    children: [
      <Badge key="1" text='Large' type='neutral' style='filled' />,
      <Badge key="2" text='gap' type='neutral' style='filled' />,
      <Badge key="3" text='spacing' type='neutral' style='filled' />,
    ]
  }
}

// Padding Stories
export const PaddingSmall: Story = {
  name: 'Padding: Small',
  args: {
    direction: 'row',
    gap: 'medium',
    padding: 'small',
    background: 'faint',
    children: [
      <Badge key="1" text='Small padding' type='neutral' style='outlined' />,
      <Badge key="2" text='around content' type='neutral' style='outlined' />,
    ]
  }
}

export const PaddingLarge: Story = {
  name: 'Padding: Large',
  args: {
    direction: 'row',
    gap: 'medium',
    padding: 'large',
    background: 'faint',
    children: [
      <Badge key="1" text='Large padding' type='neutral' style='outlined' />,
      <Badge key="2" text='around content' type='neutral' style='outlined' />,
    ]
  }
}

// Align Items Stories
export const AlignItemsStart: Story = {
  name: 'Align Items: Start',
  render: () => (
    <Flex direction="row" gap="medium" alignItems="start" style={{ height: '150px', background: 'var(--color-background-faint)' }}>
      <Box height="40px">Short</Box>
      <Box height="80px">Medium</Box>
      <Box height="60px">Taller</Box>
    </Flex>
  ),
}

export const AlignItemsCenter: Story = {
  name: 'Align Items: Center',
  render: () => (
    <Flex direction="row" gap="medium" alignItems="center" style={{ height: '150px', background: 'var(--color-background-faint)' }}>
      <Box height="40px">Short</Box>
      <Box height="80px">Medium</Box>
      <Box height="60px">Taller</Box>
    </Flex>
  ),
}

export const AlignItemsEnd: Story = {
  name: 'Align Items: End',
  render: () => (
    <Flex direction="row" gap="medium" alignItems="end" style={{ height: '150px', background: 'var(--color-background-faint)' }}>
      <Box height="40px">Short</Box>
      <Box height="80px">Medium</Box>
      <Box height="60px">Taller</Box>
    </Flex>
  ),
}

export const AlignItemsStretch: Story = {
  name: 'Align Items: Stretch',
  render: () => (
    <Flex direction="row" gap="medium" alignItems="stretch" style={{ height: '150px', background: 'var(--color-background-faint)' }}>
      <Box>Stretch</Box>
      <Box>to fill</Box>
      <Box>height</Box>
    </Flex>
  ),
}

// Justify Content Stories
export const JustifyStart: Story = {
  name: 'Justify Content: Start',
  render: () => (
    <Flex direction="row" gap="medium" justifyContent="start" style={{ background: 'var(--color-background-faint)', padding: '1rem' }}>
      <Badge text='Start' type='neutral' style='filled' />
      <Badge text='aligned' type='neutral' style='filled' />
      <Badge text='items' type='neutral' style='filled' />
    </Flex>
  ),
}

export const JustifyCenter: Story = {
  name: 'Justify Content: Center',
  render: () => (
    <Flex direction="row" gap="medium" justifyContent="center" style={{ background: 'var(--color-background-faint)', padding: '1rem' }}>
      <Badge text='Center' type='neutral' style='filled' />
      <Badge text='aligned' type='neutral' style='filled' />
      <Badge text='items' type='neutral' style='filled' />
    </Flex>
  ),
}

export const JustifyEnd: Story = {
  name: 'Justify Content: End',
  render: () => (
    <Flex direction="row" gap="medium" justifyContent="end" style={{ background: 'var(--color-background-faint)', padding: '1rem' }}>
      <Badge text='End' type='neutral' style='filled' />
      <Badge text='aligned' type='neutral' style='filled' />
      <Badge text='items' type='neutral' style='filled' />
    </Flex>
  ),
}

export const JustifySpaceBetween: Story = {
  name: 'Justify Content: Space Between',
  render: () => (
    <Flex direction="row" gap="medium" justifyContent="space-between" style={{ background: 'var(--color-background-faint)', padding: '1rem' }}>
      <Badge text='Space' type='neutral' style='filled' />
      <Badge text='between' type='neutral' style='filled' />
      <Badge text='items' type='neutral' style='filled' />
    </Flex>
  ),
}

export const JustifySpaceAround: Story = {
  name: 'Justify Content: Space Around',
  render: () => (
    <Flex direction="row" gap="medium" justifyContent="space-around" style={{ background: 'var(--color-background-faint)', padding: '1rem' }}>
      <Badge text='Space' type='neutral' style='filled' />
      <Badge text='around' type='neutral' style='filled' />
      <Badge text='items' type='neutral' style='filled' />
    </Flex>
  ),
}

export const JustifySpaceEvenly: Story = {
  name: 'Justify Content: Space Evenly',
  render: () => (
    <Flex direction="row" gap="medium" justifyContent="space-evenly" style={{ background: 'var(--color-background-faint)', padding: '1rem' }}>
      <Badge text='Space' type='neutral' style='filled' />
      <Badge text='evenly' type='neutral' style='filled' />
      <Badge text='items' type='neutral' style='filled' />
    </Flex>
  ),
}

// Wrap Stories
export const WrapEnabled: Story = {
  name: 'Wrap: Enabled',
  render: () => (
    <Flex direction="row" gap="small" wrap style={{ maxWidth: '300px', background: 'var(--color-background-faint)', padding: '1rem' }}>
      <Badge text='Item 1' type='neutral' style='filled' />
      <Badge text='Item 2' type='neutral' style='filled' />
      <Badge text='Item 3' type='neutral' style='filled' />
      <Badge text='Item 4' type='neutral' style='filled' />
      <Badge text='Item 5' type='neutral' style='filled' />
      <Badge text='Item 6' type='neutral' style='filled' />
      <Badge text='Item 7' type='neutral' style='filled' />
      <Badge text='Item 8' type='neutral' style='filled' />
    </Flex>
  ),
}

export const WrapDisabled: Story = {
  name: 'Wrap: Disabled (default)',
  render: () => (
    <Flex direction="row" gap="small" style={{ maxWidth: '300px', background: 'var(--color-background-faint)', padding: '1rem', overflow: 'auto' }}>
      <Badge text='Item 1' type='neutral' style='filled' />
      <Badge text='Item 2' type='neutral' style='filled' />
      <Badge text='Item 3' type='neutral' style='filled' />
      <Badge text='Item 4' type='neutral' style='filled' />
      <Badge text='Item 5' type='neutral' style='filled' />
      <Badge text='Item 6' type='neutral' style='filled' />
      <Badge text='Item 7' type='neutral' style='filled' />
      <Badge text='Item 8' type='neutral' style='filled' />
    </Flex>
  ),
}

// Background Stories
export const BackgroundPrimary: Story = {
  name: 'Background: Primary',
  args: {
    direction: 'row',
    gap: 'medium',
    padding: 'medium',
    background: 'primary',
    children: [
      <Badge key="1" text='Primary background' type='neutral' style='outlined' />,
    ]
  }
}

export const BackgroundFaint: Story = {
  name: 'Background: Faint',
  args: {
    direction: 'row',
    gap: 'medium',
    padding: 'medium',
    background: 'faint',
    children: [
      <Badge key="1" text='Faint background' type='neutral' style='outlined' />,
    ]
  }
}

export const BackgroundHighContrast: Story = {
  name: 'Background: High Contrast',
  args: {
    direction: 'row',
    gap: 'medium',
    padding: 'medium',
    background: 'high-contrast',
    children: [
      <Badge key="1" text='High contrast background' type='neutral' style='light' />,
    ]
  }
}

export const BackgroundBrand: Story = {
  name: 'Background: Brand',
  args: {
    direction: 'row',
    gap: 'medium',
    padding: 'medium',
    background: 'brand',
    children: [
      <Badge key="1" text='Brand background' type='neutral' style='light' />,
    ]
  }
}

export const BackgroundSuccess: Story = {
  name: 'Background: Success',
  args: {
    direction: 'row',
    gap: 'medium',
    padding: 'medium',
    background: 'success',
    children: [
      <Badge key="1" text='Success background' type='success' style='outlined' />,
    ]
  }
}

export const BackgroundWarning: Story = {
  name: 'Background: Warning',
  args: {
    direction: 'row',
    gap: 'medium',
    padding: 'medium',
    background: 'warning',
    children: [
      <Badge key="1" text='Warning background' type='warning' style='outlined' />,
    ]
  }
}

export const BackgroundCritical: Story = {
  name: 'Background: Critical',
  args: {
    direction: 'row',
    gap: 'medium',
    padding: 'medium',
    background: 'critical',
    children: [
      <Badge key="1" text='Critical background' type='error' style='outlined' />,
    ]
  }
}

// Semantic Tag Stories
export const SemanticNav: Story = {
  name: 'Semantic Tag: nav',
  args: {
    tag: 'nav',
    direction: 'row',
    gap: 'medium',
    children: [
      <Badge key="1" text='Home' type='neutral' style='outlined' />,
      <Badge key="2" text='About' type='neutral' style='outlined' />,
      <Badge key="3" text='Contact' type='neutral' style='outlined' />,
    ]
  }
}

export const SemanticSection: Story = {
  name: 'Semantic Tag: section',
  args: {
    tag: 'section',
    direction: 'column',
    gap: 'medium',
    padding: 'medium',
    background: 'faint',
    children: [
      <Badge key="1" text='Section content' type='neutral' style='outlined' />,
      <Badge key="2" text='with semantic markup' type='neutral' style='outlined' />,
    ]
  }
}

// Combined Example
export const ComplexLayout: Story = {
  name: 'Complex Layout Example',
  render: () => (
    <Flex direction="column" gap="large" padding="large" background="faint">
      <Flex direction="row" gap="medium" justifyContent="space-between" alignItems="center">
        <Badge text='Logo' type='neutral' style='filled' />
        <Flex direction="row" gap="small">
          <Badge text='Nav 1' type='neutral' style='outlined' />
          <Badge text='Nav 2' type='neutral' style='outlined' />
          <Badge text='Nav 3' type='neutral' style='outlined' />
        </Flex>
      </Flex>
      <Flex direction="row" gap="medium" wrap>
        <Box width="200px">Card 1</Box>
        <Box width="200px">Card 2</Box>
        <Box width="200px">Card 3</Box>
      </Flex>
      <Flex direction="row" gap="small" justifyContent="center">
        <Badge text='Footer content' type='neutral' style='light' />
      </Flex>
    </Flex>
  ),
}
