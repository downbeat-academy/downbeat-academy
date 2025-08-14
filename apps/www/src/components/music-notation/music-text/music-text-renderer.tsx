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

	if (!values) return null

	const item = values.map((i) => {
		switch (i._type) {
			case 'musicText':
				return <MusicText text={i.musicText || ''} key={i._key} />
			case 'accidental':
				return <Accidental value={i.options} key={i._key} />
			case 'barValue':
				return <BarValue value={i.options} key={i._key} />
			case 'rhythmicValue':
				return <RhythmicValue value={i.options} key={i._key} />
			case 'clef':
				return <Clef value={i.options} key={i._key} />
			case 'musicSymbol':
				return <MusicSymbol value={i.options} key={i._key} />
			default:
				throw new Error('Incorrect or unsupported item type.')
		}
	})

	return <span className={classes}>{item}</span>
}

export { MusicTextRenderer }
export type { MusicTextRendererProps }
