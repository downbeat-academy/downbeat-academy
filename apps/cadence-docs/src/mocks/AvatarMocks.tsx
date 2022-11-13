import Image from 'next/image'
import { Avatar } from '@downbeat-academy/cadence-core'
import image from '../assets/images/jory-tindall-avatar.jpg'

export const avatarImage = <Image src={image} alt='Jory Tindall Avatar' />

export const avatars = [
    <Avatar
        name='Jory Tindall'
        imageUrl='/jory-tindall-avatar.jpg'
        hasBorder={true}
        key='Jory Tindall'
    />,
    <Avatar
        name='Jory Tindall'
        hasBorder={true}
        key='Jory Tindall'
    />,
    <Avatar
        name='Jory Tindall'
        imageObject={avatarImage}
        hasBorder={true}
        key='Jory Tindall'
    />
]