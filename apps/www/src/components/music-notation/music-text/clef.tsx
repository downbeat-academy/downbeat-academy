import type { ClefProps } from './types'

const Clef = ({ value }: ClefProps) => {
	const renderClef = () => {
		switch (value) {
			case 'treble-clef':
				return '𝄞'
			case 'alto-clef':
				return '𝄡'
			case 'bass-clef':
				return '𝄢'
			case 'drum-clef':
				return '𝄦'
			default:
				console.error('Unsupported clef type')
		}
	}

	return <>{renderClef()}</>
}

export { Clef }
export type { ClefProps }
