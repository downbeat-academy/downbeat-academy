import { styled } from '../../stitches.config'
import * as LabelPrimitive from '@radix-ui/react-label'

const StyledLabel = styled(LabelPrimitive.Root, {
    fontFamily: '$interfaceBody',
    color: '$textPrimary',

    variants: {
        size: {
            small: { fontSize: '$interfaceExtraSmall' },
            default: { fontSize: '$interfaceSmall' },
            large: { fontSize: '$interfaceBase' },
        },
        bold: {
            true: {
                fontWeight: 'bold',
            }
        }
    },

    defaultVariants: {
        size: 'default',
    }
})

export const Label = StyledLabel