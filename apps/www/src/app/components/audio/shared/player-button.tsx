import {
  PlayFill,
  PauseFill,
  RewindFill,
  FastForwardFill,
  NextFill,
  PreviousFill,
  Volume,
  VolumeMute,
  VolumeQuiet,
} from 'cadence-icons'
import classnames from 'classnames'
import s from './player-button.module.scss'

import type { PlayerButtonProps } from './types'

const PlayerButton = ({
  onClick,
  ariaLabel,
  type,
  size = 'medium',
  className
}: PlayerButtonProps) => {

  const defaultIconSize = 16

  const getTypes = (type) => {
    switch (type) {
      case 'play':
        return <PlayFill width={defaultIconSize} />
      case 'pause':
        return <PauseFill width={defaultIconSize} />
      case 'rewind':
        return <RewindFill width={defaultIconSize} />
      case 'fast-forward':
        return <FastForwardFill width={defaultIconSize} />
      case 'previous':
        return <PreviousFill width={defaultIconSize} />
      case 'next':
        return <NextFill width={defaultIconSize} />
      case 'volume':
        return <Volume width={defaultIconSize} />
      case 'volume-mute':
        return <VolumeMute width={defaultIconSize} />
      case 'volume-quiet':
        return <VolumeQuiet width={defaultIconSize} />
      default:
        return <PlayFill width={defaultIconSize} />
    }
  }

  const classes = classnames([
    s.root,
    s[size],
    className,
  ])

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {getTypes(type)}
    </button>
  )
}

export { PlayerButton }