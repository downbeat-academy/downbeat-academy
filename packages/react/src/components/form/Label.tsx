import { styled } from '../../stitches.config'
import * as LabelPrimitive from '@radix-ui/react-label'

export const Label = styled(LabelPrimitive.Root, {
    fontFamily: '$interfaceBody',
    fontWeight: '800',
    color: '$blackberry1000',

    variants: {
        size: {
            small: {},
            default: {
                fontSize: '$interfaceSmall',
            },
            large: {},
        }
    },

    defaultVariants: {
        size: 'default',
    }
})