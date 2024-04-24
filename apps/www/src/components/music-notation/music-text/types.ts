interface MusicTextRendererProps {
	values?: any
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
