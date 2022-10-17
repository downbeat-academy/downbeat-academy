import { styled } from '../../stitches.config'

export const HelperText = styled('p', {
    fontFamily: '$interfaceBody',
    margin: '0',

    variants: {
        size: {
            small: {},
            default: {
                fontSize: '$interfaceSmall',
                lineHeight: '$interfaceBody',
            },
            large: {},
        },
        state: {
            default: {
                color: '$blackberry500',
            },
            warning: {},
            error: {},
            success: {}
        }
    },

    defaultVariants: {
        size: 'default',
        state: 'default',
    }
})