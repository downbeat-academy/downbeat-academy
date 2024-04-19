import { Text } from 'components/text'
import { Link } from 'components/link'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardMain,
  HoverCardTitle,
  HoverCardFooter,
} from 'components/hover-card'

export default function HoverCardTest() {
  return (
    <Text type='expressive-body' tag='p' size='body-base'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{' '}
      <HoverCard openDelay={200}>
        <HoverCardTrigger>
          hover me
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardTitle>
            <Text type='productive-body' tag='p' size='body-base' collapse>
              <strong>This is the title</strong>
            </Text>
          </HoverCardTitle>
          <HoverCardMain>
            <Text type='productive-body' tag='p' size='body-base' collapse>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </HoverCardMain>
          <HoverCardFooter>
            <Text type='productive-body' tag='p' size='body-base' collapse>
              <Link href='/'>Learn more</Link>
            </Text>
          </HoverCardFooter>
        </HoverCardContent>
      </HoverCard>
      {' '}incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  )
}