import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardMain,
  HoverCardTitle,
  HoverCardFooter,
} from '@components/hover-card'
import { Text } from '@components/text'
import { Link } from '@components/link'
import { Badge } from '@components/badge'
import { Flex } from '@components/flex'

import type { AlmanacReferenceProps } from './types'

const AlmanacReference = ({ text, title, excerpt, link, categories }: AlmanacReferenceProps) => {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger hasIcon>
        {text}
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardTitle>
          <Text tag='p' type='productive-body' size='body-base' collapse><strong>{title}</strong></Text>
        </HoverCardTitle>
        <HoverCardMain>
          <Flex direction='column' gap='small'>
            <Text tag='p' type='productive-body' size='body-base' collapse>{excerpt}</Text>
            {categories.map((category) => (
              <Flex key={category._id} gap='small'>
                <Badge
                  size='small'
                  text={category.title}
                  type='neutral'
                />
              </Flex>
            ))}
          </Flex>
        </HoverCardMain>
        <HoverCardFooter>
          <Text tag='p' type='productive-body' size='body-base' collapse>
            <Link href={link}>Learn more in the Almanac</Link>
          </Text>
        </HoverCardFooter>
      </HoverCardContent>
    </HoverCard>
  )
}

export { AlmanacReference }