import React from 'react'
import BoringAvatar from "boring-avatars"
import { styled } from '../../stitches.config'

type Props = {
    size?: 'small' | 'default' | 'large',
    name: string,
    children?: any
}

export const Avatar = ({ 
    size,
    name,
    children,
}: Props) => {

    return (
        <AvatarWrapper
            size={size}
        >
            {!children ?            
                <BoringAvatar
                    // size={size}
                    variant='marble'
                    name={name}
                    square={true}
                    colors={[
                        '#5665EF',
                        '#47B0C5',
                        '#F24866',
                        '#F8DC6E',
                        '#43A2FF',
                    ]}
                /> :
                <>{children}</>
            }
        </AvatarWrapper>
    )
}

const AvatarWrapper = styled('div', {
    borderRadius: '50%',

    '& img, & *': {
        borderRadius: '50%',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },

    variants: {
        size: {
            small: {
                height: '$space$8',
                width: '$space$8',
            },
            default: {
                height: '$space$9',
                width: '$space$9',
            },
            large: {
                height: '$space$10',
                width: '$space$10',
            },
        }
    },

    defaultVariants: {
        size: 'default'
    }
})


