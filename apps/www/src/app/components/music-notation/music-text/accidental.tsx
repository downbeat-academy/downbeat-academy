import type { AccidentalProps } from "./types";

const Accidental = ({
  value,
}: AccidentalProps) => {

  const renderAccidental = value.map(v => {
    switch (v.options) {
      case 'quarter-note': return '♩'
    }
  })
  return <>{renderAccidental}</>
}

export { Accidental }