'use client'

import classnames from 'classnames'
import * as Tabs from '@radix-ui/react-tabs'
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
      <Tabs.Root defaultValue='concert-c'>
        <Tabs.List>
          <Tabs.Trigger value='concert-c'>Concert C</Tabs.Trigger>
          <Tabs.Trigger value='bb'>Bb</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='concert-c'>
          <p>Concert c</p>
          <OpenSheetMusicDisplay
            file={file} 
          />
        </Tabs.Content>
        <Tabs.Content value='bb'>
          <p>Bb instruments</p>
          <OpenSheetMusicDisplay
            file={file} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export { MusicNotation }