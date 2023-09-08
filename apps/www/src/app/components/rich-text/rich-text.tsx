import { PortableText } from "@portabletext/react";
import { Components } from './components'

const RichText = ({ value }) => {
  return (
    <PortableText
      value={value}
      // @ts-ignore
      components={Components}
    />
  )
}

export { RichText }