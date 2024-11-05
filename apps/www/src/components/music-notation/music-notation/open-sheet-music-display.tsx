'use client'

import dynamic from 'next/dynamic'
import { OpenSheetMusicDisplayProps } from './types'
import { SkeletonLoader } from '@components/loader/skeleton'
import { Text } from '@components/text'

const OSMDComponent = dynamic(
  () => import('./osmd-component'),
  {
    loading: () => (
			<Text tag='h1' size='mega'>
				<SkeletonLoader count={1} />
			</Text>
    ),
    ssr: false
  }
)

// Export a clean interface for the parent component
export const OpenSheetMusicDisplay = (props: OpenSheetMusicDisplayProps) => (
  <OSMDComponent {...props} />
)