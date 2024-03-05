import { BentoBox, BentoItem } from '@components/bento'

export default function BentoTest() {

  return (
    <BentoBox isFullHeight>
      <BentoItem
        background='interactive'
        height={3}
        width={3}
      >
        Item 1
      </BentoItem>
      <BentoItem
        background='brand'
        height={6}
        width={3}
      >Item 2</BentoItem>
      <BentoItem
        background='primary'
        height={3}
        width={6}
      >
        Item 3
      </BentoItem>
      <BentoItem
        background='faint'
        height={9}
        width={3}
      >
        Item 4
      </BentoItem>
      <BentoItem
        background='success'
        height={6}
        width={3}
      >
        Item 5
      </BentoItem>
      <BentoItem
        background='high-contrast'
        height={6}
        width={3}
      >Item 6</BentoItem>
      <BentoItem
        background='warning'
        height={3}
        width={3}
      >
        Item 7
      </BentoItem>
      <BentoItem
        background='critical'
        height={3}
        width={9}
      >
        Item 8
      </BentoItem>
    </BentoBox>
  )
}