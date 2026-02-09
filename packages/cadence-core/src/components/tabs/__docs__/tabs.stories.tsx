import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../index'
import { Text } from '../../text'

const meta: Meta<typeof Tabs> = {
  title: 'Cadence / Components / Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Tabs organize content into separate views where only one view is visible at a time. Built on Radix UI's Tabs primitive and styled with Cadence Design System tokens.

## Components

- **Tabs**: Root component that manages tab state
- **TabsList**: Container for all tab triggers
- **TabsTrigger**: Individual clickable tab button
- **TabsContent**: Content panel for each tab

## Accessibility

- Full keyboard navigation support (arrow keys between triggers)
- Automatic or manual activation modes
- ARIA roles and attributes are handled by Radix UI
- Supports horizontal and vertical orientations
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" padding="medium">
        <Text type="productive-body" size="body-base">
          Content for Tab 1. This is the default active tab.
        </Text>
      </TabsContent>
      <TabsContent value="tab2" padding="medium">
        <Text type="productive-body" size="body-base">
          Content for Tab 2. Click the tab trigger to reveal this content.
        </Text>
      </TabsContent>
      <TabsContent value="tab3" padding="medium">
        <Text type="productive-body" size="body-base">
          Content for Tab 3. Each tab panel can contain any content.
        </Text>
      </TabsContent>
    </Tabs>
  ),
}

export const Contained: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList isContained>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" padding="large" background="faint">
        <Text type="productive-body" size="body-base">
          Overview content with a contained tab list and faint background.
        </Text>
      </TabsContent>
      <TabsContent value="details" padding="large" background="faint">
        <Text type="productive-body" size="body-base">
          Details content panel with the same styling.
        </Text>
      </TabsContent>
      <TabsContent value="settings" padding="large" background="faint">
        <Text type="productive-body" size="body-base">
          Settings content panel.
        </Text>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the `isContained` prop on `TabsList` to add a border and background to the trigger area.',
      },
    },
  },
}

export const WithBackgrounds: Story = {
  render: () => (
    <Tabs defaultValue="primary">
      <TabsList>
        <TabsTrigger value="primary">Primary</TabsTrigger>
        <TabsTrigger value="brand">Brand</TabsTrigger>
        <TabsTrigger value="success">Success</TabsTrigger>
        <TabsTrigger value="warning">Warning</TabsTrigger>
      </TabsList>
      <TabsContent value="primary" padding="large" background="primary">
        <Text type="productive-body" size="body-base">
          Content with primary background.
        </Text>
      </TabsContent>
      <TabsContent value="brand" padding="large" background="brand">
        <Text type="productive-body" size="body-base">
          Content with brand background.
        </Text>
      </TabsContent>
      <TabsContent value="success" padding="large" background="success">
        <Text type="productive-body" size="body-base">
          Content with success background.
        </Text>
      </TabsContent>
      <TabsContent value="warning" padding="large" background="warning">
        <Text type="productive-body" size="body-base">
          Content with warning background.
        </Text>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TabsContent supports various `background` options: primary, faint, high-contrast, brand, interactive, success, warning, and critical.',
      },
    },
  },
}

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active Tab</TabsTrigger>
        <TabsTrigger value="disabled" disabled>Disabled Tab</TabsTrigger>
        <TabsTrigger value="another">Another Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="active" padding="medium">
        <Text type="productive-body" size="body-base">
          This tab is active. The second tab is disabled and cannot be clicked.
        </Text>
      </TabsContent>
      <TabsContent value="another" padding="medium">
        <Text type="productive-body" size="body-base">
          Content for the third tab.
        </Text>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Individual tab triggers can be disabled using the `disabled` prop.',
      },
    },
  },
}

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('first')

    return (
      <div>
        <Text type="productive-body" size="body-small" color="faint">
          Active tab: {activeTab}
        </Text>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="first">First</TabsTrigger>
            <TabsTrigger value="second">Second</TabsTrigger>
            <TabsTrigger value="third">Third</TabsTrigger>
          </TabsList>
          <TabsContent value="first" padding="medium">
            <Text type="productive-body" size="body-base">
              First tab content. The active tab state is controlled externally.
            </Text>
          </TabsContent>
          <TabsContent value="second" padding="medium">
            <Text type="productive-body" size="body-base">
              Second tab content.
            </Text>
          </TabsContent>
          <TabsContent value="third" padding="medium">
            <Text type="productive-body" size="body-base">
              Third tab content.
            </Text>
          </TabsContent>
        </Tabs>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the `value` and `onValueChange` props to control the active tab externally.',
      },
    },
  },
}
