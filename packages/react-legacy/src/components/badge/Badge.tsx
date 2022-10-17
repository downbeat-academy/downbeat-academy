import React from 'react'
import { styled } from '../../stitches.config'

export const Badge = styled('span', {
    fontFamily: '$interfaceBody',
    fontWeight: 'bold',
    lineHeight: '$interfaceBody',
    display: 'inline-flex',
    flexDirection: 'row',
    flexGrow: '0',
    flexShrink: '0',
    flexWrap: 'no-wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '$2',
    borderRadius: '$2',
    boxSizing: 'border-box',
    textDecoration: 'none',

    variants: {
        type: {
            neutral: {},
            informational: {},
            positive: {},
            warning: {},
            critical: {}
        },
        style: {
            fill: {
                background: 'inherit',
                color: 'inherit',
            },
            outline: {
                background: 'none',
                border: '1px solid',
            }
        },
        size: {
            small: { 
                fontSize: '$interfaceExtraSmall',
                padding: '1px 8px',
                height: '20px',

                '& svg': {
                    transform: 'scale(0.5)',
                }
            },
            default: { 
                fontSize: '$interfaceSmall', 
                padding: '1px 8px',
                height: '24px',

                '& svg': {
                    transform: 'scale(0.66)'
                }
            },
            large: { 
                fontSize: '$interfaceBase',
                padding: '2px 8px',
                height: '30px',

                '& svg': {
                    transform: 'scale(0.83)'
                }
            },
        },
    },

    compoundVariants: [
        {
            type: 'neutral',
            style: 'fill',
            css: {
                background: '$grayscale200',
                color: '$grayscale800',
            }
        },
        {
            type: 'informational',
            style: 'fill',
            css: {
                background: '$blueberry200',
                color: '$blueberry800',
            }
        },
        {
            type: 'positive',
            style: 'fill',
            css: {
                background: '$kale200',
                color: '$kale800',
            }
        },
        {
            type: 'warning',
            style: 'fill',
            css: {
                background: '$pineapple200',
                color: '$pineapple800',
            }
        },
        {
            type: 'critical',
            style: 'fill',
            css: {
                background: '$pomegranate200',
                color: '$pomegranate800',
            }
        },
        {
            type: 'neutral',
            style: 'outline',
            css: {
                color: '$grayscale800',
                border: '1px solid $grayscale800',
            }
        },
        {
            type: 'informational',
            style: 'outline',
            css: {
                color: '$blueberry600',
                border: '1px solid $blueberry600',
            }
        },
        {
            type: 'positive',
            style: 'outline',
            css: {
                color: '$kale800',
                border: '1px solid $kale800',                
            }
        },
        {
            type: 'warning',
            style: 'outline',
            css: {
                color: '$pineapple700',
                border: '1px solid $colors$pineapple700',
            }
        },
        {
            type: 'critical',
            style: 'outline',
            css: {
                color: '$pomegranate500',
                border: '1px solid $pomegranate500',
            }
        }
    ],

    defaultVariants: {
        type: 'neutral',
        style: 'fill',
        size: 'default'
    }
})

