import classnames from 'classnames'
import {
	MusicText,
	Accidental,
	Clef,
	BarValue,
	RhythmicValue,
	MusicSymbol,
} from '@components/music-notation'
import s from '../inline-highlight.module.css'

import type { MusicTextRendererProps } from './types'

const MusicTextRenderer = ({ values, className }: MusicTextRendererProps) => {
	const classes = classnames(s.root, className)

	const item = values.map((i) => {
		switch (i._type) {
			case 'musicText':
				return <MusicText text={i.musicText} />
			case 'accidental':
				return <Accidental value={i.options} />
			case 'barValue':
				return <BarValue value={i.options} />
			case 'rhythmicValue':
				return <RhythmicValue value={i.options} />
			case 'clef':
				return <Clef value={i.options} />
			case 'musicSymbol':
				return <MusicSymbol value={i.options} />
			default:
				throw new Error('Incorrect or unsupported item type.')
		}
	})

	return <span className={classes}>{item}</span>
}

export { MusicTextRenderer }
export type { MusicTextRendererProps }
