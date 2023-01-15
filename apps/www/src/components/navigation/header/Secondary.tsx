import { Flex, Button } from 'cadence-core'
import s from '@styles/components/navigation/secondary.module.scss'

const Secondary = () => {
  return (
    <aside className={s.wrapper}>
      <div className={s.content}>
        <p>Secondary nav</p>
        <Flex direction='row' gap='x-small'>
          <Button variant='primary' size='small' text='Sign up' />
          <Button variant='tertiary' size='small' text='Login' />
        </Flex>
      </div>
    </aside>
  )
}

export { Secondary };