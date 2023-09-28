import classnames from 'classnames'
import { OpenSheetMusicDisplay } from './open-sheet-music-display'
import s from './music-notation.module.scss'

import type { MusicNotationProps } from './types'

const MusicNotation = ({
  file,
  className,
}: MusicNotationProps) => {

  const classes = classnames([
    s.root,
    className,
  ])

  return (
    <div className={classes}>
      <p>Rendering some music notation</p>
      <OpenSheetMusicDisplay
        file={file}
      />
    </div>
  )
}

export { MusicNotation }