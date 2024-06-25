import type { AccidentalProps } from './types'

const Accidental = ({ value }: AccidentalProps) => {
	const renderAccidentalValue = () => {
		switch (value) {
			case 'flat':
				return '♭'
			case 'sharp':
				return '♯'
			case 'double-flat':
				return '𝄫'
			case 'double-shart':
				return '𝄪'
			case 'natural':
				return '♮'
			default:
				console.error('Unsupported accidental type')
		}
	}

	return <>{renderAccidentalValue()}</>
}

export { Accidental }
export type { AccidentalProps }
