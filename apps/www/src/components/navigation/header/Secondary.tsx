import Link from 'next/link'
import { Flex, Button, Badge, Text } from 'cadence-core'
import s from '@styles/components/navigation/secondary.module.scss'

const Secondary = () => {
  return (
    <aside className={s.wrapper}>
      <div className={s.content}>
        <Flex>
          <Badge text='Downbeat Academy 3.0' type='informational' style='fill' />
          <Text category='body' type='productive' size='small' tag='p' collapse>Welcome to Downbeat Academy 3.0 🚀</Text>
        </Flex>
        <Flex direction='row' gap='x-small'>
          <Button variant='tertiary' size='small' text='Login' />
          <Button variant='primary' size='small' text='Sign up for free' />
        </Flex>
      </div>
    </aside>
  )
}

export { Secondary };