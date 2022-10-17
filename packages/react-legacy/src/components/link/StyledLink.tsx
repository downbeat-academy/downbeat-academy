import { styled } from '../../stitches.config'

export const StyledLink = styled('a', {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    textDecoration: 'underline',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$2',

    '&:hover': {
        cursor: 'pointer',
    },

    variants: {
        style: {
            expressive: {
                textDecorationColor: '$passionFruit600',
                textDecorationThickness: '$space$2',
                textUnderlineOffset: '$space$1',
                transition: '$1',
                padding: '$1 0',

                '&:hover': {
                    cursor: 'pointer',
                    background: '$passionFruit100',
                    textDecorationColor: '$passionFruit100',
                },
            },
            default: {
                textDecorationColor: 'inherit',
                textDecorationThickness: 'auto',
                textUnderlineOffset: 'auto',
            }
        },
    },

    defaultVariants: {
        style: 'default',
    }
})