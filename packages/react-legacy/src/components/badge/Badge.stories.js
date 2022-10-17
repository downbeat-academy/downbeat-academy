import React from 'react'
import { withDesign } from 'storybook-addon-designs'
import { Badge } from './Badge'

export default {
    title: 'Components/Badge',
    component: Badge,
    decorators: [withDesign],
    argTypes: {
        text: 'Badge Text',
        type: {
            options: [
                'neutral',
                'informational',
                'positive',
                'warning',
                'critical',
            ],
            control: { type: 'select' }
        },
        size: {
            options: [
                'small',
                'default',
                'large',
            ]
        }
    }
}

const Template = (args) => <Badge {...args}>{args.text}</Badge>

export const Default = Template.bind({})

Default.args = {
    text: 'Badge text',
    size: 'default',
    type: 'neutral',
}

Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/zjft7NvdfMnRyEm8HTsnIX/Base-Components?node-id=773%3A858',
    },
    a11y: {
        config: {
            rules: [
                {
                    id: 'color-contrast',
                    enabled: true,
                }
            ]
        }
    }
}