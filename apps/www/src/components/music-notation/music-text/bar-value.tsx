import type { BarValueProps } from "./types"

const BarValue = ({
  value,
}: BarValueProps) => {

  const renderBarValue = () => {
    switch (value) {
      case 'single': return '𝄀'
      case 'double': return '𝄁'
      case 'final': return '𝄂'
      case 'final-reverse': return '𝄃'
      case 'dashed': return '𝄄'
      case 'repeat-left': return '𝄆'
      case 'repeat-right': return '𝄇'
      default: console.error('Unsupported bar value')
    }
  }

  return <>{renderBarValue()}</>
}

export { BarValue } 
export type { BarValueProps }