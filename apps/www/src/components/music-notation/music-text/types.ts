interface MusicTextItem {
	_type: 'musicText' | 'accidental' | 'barValue' | 'rhythmicValue' | 'clef' | 'musicSymbol'
	_key: string
	musicText?: string
	options?: string | any
}

interface MusicTextRendererProps {
	values?: MusicTextItem[]
	className?: string
}

interface MusicTextProps {
	text: string
}

interface BarValueProps {
	value?: string
}

interface ClefProps {
	value?: string
}

interface AccidentalProps {
	value?: any
}

interface RhythmicValueProps {
	value?: string
}

interface MusicSymbolProps {
	value?: string
}

export type {
	MusicTextRendererProps,
	MusicTextProps,
	BarValueProps,
	ClefProps,
	AccidentalProps,
	RhythmicValueProps,
	MusicSymbolProps,
}
