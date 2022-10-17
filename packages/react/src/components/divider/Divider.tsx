import { styled } from '../../stitches.config'

export const Divider = styled('hr', {
    border: '0',
    backgroundColor: '$grayscale300',

    variants: {
        width: {
            1: {
                height: '1px',
            },
            2: {
                height: '2px',
            },
            4: {
                height: '4px',
            }
        }
    },

    defaultVariants: {
        width: 1,
    }
})