import { PortableText } from "@portabletext/react"
import { RichTextProps } from "./types"
import { components } from './components'

const RichText = ({ value }: RichTextProps) => {
  return (
    <PortableText
      value={value}
      // @ts-ignore
      components={components}
    />
  )
}

export { RichText }