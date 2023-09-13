interface MusicTextRendererProps {
  values?: any,
  className?: string,
}

interface MusicTextProps {
  text: string,
}

interface BarValueProps {
  value?: string,
}

interface ClefProps {
  value?: string,
}

interface AccidentalProps {
  value?: string,
}

interface RhythmicValueProps {
  value?: string,
}

export type {
  MusicTextRendererProps,
  MusicTextProps,
  BarValueProps,
  ClefProps,
  AccidentalProps,
  RhythmicValueProps
}