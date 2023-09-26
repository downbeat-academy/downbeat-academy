import type { RhythmicValueProps } from "./types";

const RhythmicValue = ({
  value,
}: RhythmicValueProps) => {

  const renderRhythmicValue = () => {
    switch (value) {
      case 'whole-note': return '𝅝'
      case 'half-note': return '𝅗𝅥'
      case 'quarter-note': return '𝅘𝅥'
      case 'eighth-note': return '𝅘𝅥𝅮'
      case 'sixteenth-note': return '𝅘𝅥𝅯'
      case 'thirty-second-note': return '𝅘𝅥𝅰'
      default: console.error('Unsupported rhythmic value')
    }
  }

  return <>{renderRhythmicValue()}</>
}

export { RhythmicValue }
export type { RhythmicValueProps }