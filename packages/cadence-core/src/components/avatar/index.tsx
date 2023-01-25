import BoringAvatar from 'boring-avatars'
import classnames from 'classnames'
import { AvatarProps } from './types'
import s from './avatar.module.scss'

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
		{ [s.rounded]: rounded },
		{ [s.hasBorder]: hasBorder }
	)

	const getSize = (size: string) => {
		switch (size) {
			case 'small':
				return 40
			case 'medium':
				return 64
			case 'large':
				return 80
		}
	}

	const placeholderColors = ['#6b75f6', '#43a2ff', '#b10010', '#4ccad1']

	return (
		<div className={classes}>
			{imageObject === undefined && imageUrl === undefined ? (
				<BoringAvatar
					size={getSize(size)}
					name={name}
					variant="marble"
					square={true}
					colors={placeholderColors}
				/>
			) : imageObject !== undefined && imageUrl === undefined ? (
				imageObject
			) : imageObject === undefined && imageUrl !== undefined ? (
				<img src={imageUrl} alt={name} />
			) : null}
		</div>
	)
}

export type { AvatarProps }
export { Avatar }
