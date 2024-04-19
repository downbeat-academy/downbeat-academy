import Link from "next/link"
import { linkResolver } from "@utils/linkResolver"
import { Text } from '@components/text'
import { Flex } from "@components/flex"
import { Badge } from "@components/badge"
import s from './lexicon-item.module.scss'

const LexiconItem = ({
  title,
  url,
  album,
  track,
  timestamp,
}) => {

  return (
    <Link href={linkResolver(url, 'lexicon')} className={s.root}>
      <Text
        tag='h2'
        size='h4'
        type='expressive-headline'
        color='primary'
        collapse
      >{title}</Text>
      <Flex direction='row' gap='small' wrap>
        <Badge
          text={`Album: ${album}`}
          type='neutral'
          style='outlined'
          size='small'
        />
        <Badge
          text={`Track: ${track}`}
          type='neutral'
          style='outlined'
          size='small'
        />
        <Badge
          text={timestamp}
          type='neutral'
          style='outlined'
          size='small'
        />
      </Flex>
    </Link>
  )
}

export { LexiconItem }