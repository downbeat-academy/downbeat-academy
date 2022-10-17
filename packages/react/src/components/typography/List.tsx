import { styled } from '../../stitches.config'

export const OrderedList = styled('ol', {
    color: '$textPrimary',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '$6',
    marginLeft: '$6',
    marginBottom: '$6',

    'li': {
        paddingLeft: '$3',
    },

    variants: {
        context: {
            display: {
                fontFamily: '$displayBody',
                fontSize: '$displayBase',
                lineHeight: '$displayBody',
            },
            interface: {
                fontFamily: '$interfaceBody',
                fontSize: '$interfaceBody',
                lineHeight: '$interfaceBody',
            }
        }
    },

    defaultVariants: {
        context: 'display'
    }
})

export const UnorderedList = styled('ul', {
    color: '$textPrimary',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '$6',
    marginLeft: '$6',
    marginBottom: '$6',

    'li': {
        paddingLeft: '$3',
    },

    variants: {
        context: {
            display: {
                fontFamily: '$displayBody',
                fontSize: '$displayBase',
                lineHeight: '$displayBody',
            },
            interface: {
                fontFamily: '$interfaceBody',
                fontSize: '$interfaceBase',
                lineHeight: '$interfaceBody',
            }
        }
    },

    defaultVariants: {
        context: 'display'
    }
})

export const DefinitionList = styled('dl', {
    color: '$textPrimary',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '$6',
    marginLeft: '$6',
    marginBottom: '$6',

    'dd, dt': {
        paddingLeft: '$3',
    },

    variants: {
        context: {
            display: {
                fontFamily: '$displayBody',
                fontSize: '$displayBase',
                lineHeight: '$displayBody',
            },
            interface: {
                fontFamily: '$interfaceBody',
                fontSize: '$interfaceBase',
                lineHeight: '$interfaceBody',
            }
        }
    },

    defaultVariants: {
        context: 'display'
    }
})