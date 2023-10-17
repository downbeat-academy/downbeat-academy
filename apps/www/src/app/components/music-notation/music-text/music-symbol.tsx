import type { MusicSymbolProps } from "./types";

const MusicSymbol = ({
  value,
}: MusicSymbolProps) => {

  const renderMusicSymbol = () => {
    switch (value) {
      case 'dal-segno': return '𝄉'
      case 'da-capo': return '𝄊'
      case 'segno': return '𝄋'
      case 'fermata': return '𝄐'
      case 'breath-mark': return '𝄒'
      case 'caesura': return '𝄓'
      case 'coda': return '𝄌'
      default: console.error('Unsupported music symbol')
    }
  }

  return <>{renderMusicSymbol()}</>
}

export { MusicSymbol }
export type { MusicSymbolProps }