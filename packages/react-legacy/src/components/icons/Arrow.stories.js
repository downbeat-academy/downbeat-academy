import React from 'react'
import { Arrow } from './Arrow'

export default {
    title: 'Foundations/Icons/Arrows',
    argTypes: {
        icon: {
            options: [ 'arrow', 'chevron', 'chevronSquare', 'chevronCircle' ],
            control: { 
                type: 'select',
                labels: {
                    'Chevron': 'chevron',
                    'Chevron Square': 'chevronSquare',
                    'Chevron Circle': 'chevronCircle',
                    'Arrow': 'arrow',
                }
            }
        },
        size: {
            options: [ 'extraSmall', 'small', 'medium', 'large' ],
            control: { type: 'radio' }
        },
        direction: {
            options: [ 'up', 'right', 'down', 'left' ],
            control: { type: 'radio' },
        },
        color: 'color',
    }
}

export const Arrows = (args) => <Arrow {...args} />

Arrows.args = {
    size: 'small',
    color: '$blackberry1000',
    direction: 'right',
    icon: 'arrow'
}

Arrows.paramters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/tX0lYmayOr7NR0T3bdM90Y/Foundations?node-id=4%3A375'
    }
}