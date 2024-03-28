import classnames from 'classnames'
import { buildFileUrl, getFile } from '@sanity/asset-utils'
import { sanityConfig } from '@lib/sanity/sanity.config'
import { toKebabCase } from '@utils/stringFormat'
import * as Tabs from '@components/tabs'
import { Text } from '@components/text'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
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

  const renderTriggers = files.map(file => {

    const label = toKebabCase(file.label)

    return (
      <Tabs.Trigger
        value={label}
        key={label}
      >{file.label}</Tabs.Trigger>
    )
  })

  const renderContent = files.map(file => {

    // Get the file asset information from Sanity
    const fileData = getFile(file.asset, sanityConfig);
    const label = toKebabCase(file.label)

    return (
      <Tabs.Content
        value={label}
        padding='large'
        background='primary'
        key={label}
      >
        <OpenSheetMusicDisplay
          file={buildFileUrl(fileData.asset, sanityConfig)}
        />
      </Tabs.Content>
    )
  })

  return (
    <SectionContainer className={classes}>
      {title &&
        <SectionTitle
          title={<Text tag='h5' type='productive-body' size='body-large' collapse>{title}</Text>}
          subtitle={description && <Text tag='p' type='productive-body' size='body-base'>{description}</Text>}
        />
      }
      <Tabs.Root
        defaultValue={toKebabCase(files[0].label)}
        className={s.content}
      >
        <Tabs.List>
          {renderTriggers}
        </Tabs.List>
        {renderContent}
      </Tabs.Root>
    </SectionContainer>
  )
}

export { MusicNotation }