import React from 'react'
import { Logo } from './index'

export default {
    title: 'Foundations/Logo',
    argTypes: {
        width: 'width',
        color: 'color',
        type: {
            options: [ 'symbol', 'text', 'lockup' ],
            control: { type: 'select' }
        }
    }
}

export const Logos = (args) => <Logo {...args} />

Logos.args = { 
    color: '$passionFruit600',
    width: '250',
    type: 'symbol'
}