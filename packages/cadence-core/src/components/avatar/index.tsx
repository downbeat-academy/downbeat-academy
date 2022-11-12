import BoringAvatar from 'boring-avatars'
import classnames from 'classnames'
import { AvatarProps } from './types'
import s from './avatar.module.css'

const Avatar = ({
    size = 'medium',
    imageObject,
    imageUrl,
    name,
    rounded = true,
    hasBorder = false,
}: AvatarProps) => {

    const classes = classnames(
        s.root,
        s['size--' + size],
        {[s.rounded]: rounded},
        {[s.hasBorder]: hasBorder},
    )

    const getSize = (size: string) => {
        switch (size) {
            case 'small': return 40;
            case 'medium': return 64;
            case 'large': return 80;
        }
    }

    const placeholderColors = [
        'var(--color-palette-passion-fruit-500',
        'var(--color-palette-blueberry-500',
        'var(--color-palette-pomegranate-300',
        'var(--color-palette-kale-500',
    ]

    return (
        <div className={classes}>
            {imageObject === undefined && imageUrl === undefined ?            
                <BoringAvatar
                    size={getSize(size)}
                    name={name}
                    variant='marble'
                    square={true}
                    colors={placeholderColors}
                /> :
                imageObject !== undefined && imageUrl === undefined ?
                imageObject :
                imageObject === undefined && imageUrl !== undefined ?
                <img src={imageUrl} alt={name} /> : null
            }
        </div>
    )
}

export type { AvatarProps }
export { Avatar }