interface OpenSheetMusicDisplayProps {
  file: string,
  drawTitle?: boolean,
  drawSubtitle?: boolean,
  drawComposer?: boolean,
  drawLyricist?: boolean,
  drawCredits?: boolean,
  drawPartNames?: boolean,
  drawMetronomeMarks?: boolean,
  drawTimeSignatures?: boolean,
  drawMeasureNumbers?: false,
  drawMeasureNumbersOnlyAtSystemStart?: boolean,
  drawLyrics?: boolean,
  measureNumberInterval?: number,
  autoResize?: boolean,
  className?: string,
}

interface MusicNotationProps {
  file: string,
  title?: string,
  className?,
}

export type {
  OpenSheetMusicDisplayProps,
  MusicNotationProps,
}