import classnames from 'classnames'
import { buildFileUrl, getFile } from '@sanity/asset-utils'
import { sanityConfig } from '@lib/sanity.config'
import { toKebabCase } from '@utils/stringFormat'
import * as Tabs from '@components/tabs'
import { Text } from '@components/text'
import { OpenSheetMusicDisplay } from './open-sheet-music-display'
import s from './music-notation.module.scss'

import type { MusicNotationProps } from './types'

const MusicNotation = ({
  files,
  title,
  description,
  className,
}: MusicNotationProps) => {

  const classes = classnames([
    s.root,
    className,
  ])

  // console.log(files[0])

  const renderTriggers = files.map(file => {

    const label = toKebabCase(file.label)

    return (
      <Tabs.Trigger
        value={label}
        key={label}
        // disabled={files.length === 1 ? true : false}
      >{file.label}</Tabs.Trigger>
    )
  })

  const renderContent = files.map(file => {

    // Get the file asset information from Sanity
    const fileData = getFile(file.asset, sanityConfig);
    const label = toKebabCase(file.label)

    return (
      <Tabs.Content value={label} key={label}>
        <OpenSheetMusicDisplay file={buildFileUrl(fileData.asset, sanityConfig)} />
      </Tabs.Content>
    )
  })

  return (
    <div className={classes}>
      <Text tag='p' type='productive-body' size='body-large'>{title}</Text>
      <Text tag='p' type='productive-body' size='body-base'>{description}</Text>
      <Tabs.Root
        defaultValue={toKebabCase(files[0].label)}
      >
        <Tabs.List>
          {renderTriggers}
        </Tabs.List>
        {renderContent}
      </Tabs.Root>
    </div>
  )
}

export { MusicNotation }