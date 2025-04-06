'use client'

import React from 'react'
import type { PayloadComponent } from 'payload'

interface InlineChordData {
  root?: string
  quality?: string
  extension?: string
  alternateBass?: string
}

const InlineChordLabel: React.FC<{ data: InlineChordData }> = ({ data }) => {
  const title = data?.root
    ? `${data.root}${data.quality || ''}${data.extension || ''}${data.alternateBass ? `/${data.alternateBass}` : ''}`
    : 'Chord'
  return <span>{title}</span>
}

export default InlineChordLabel as unknown as PayloadComponent
