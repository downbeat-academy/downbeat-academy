import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
} from '@components/tooltip'
import { Button } from '@components/button'

export default function TooltipTest() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button text='Hover me' variant='primary' size='medium' />
        </TooltipTrigger>
        <TooltipContent side='right'>
          {/* <TooltipArrow /> */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </TooltipContent>
      </Tooltip>
    </>
  )
}