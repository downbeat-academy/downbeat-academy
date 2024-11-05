'use client'

import dynamic from 'next/dynamic'
import { OpenSheetMusicDisplayProps } from './types'

const OSMDComponent = dynamic(
  () => import('./osmd-component'),
  {
    loading: () => (
      <div className="flex items-center justify-center w-full min-h-[200px] bg-gray-50 rounded-md">
        <p>Loading...</p>
      </div>
    ),
    ssr: false // Disable server-side rendering since OSMD requires browser APIs
  }
)

// Export a clean interface for the parent component
export const OpenSheetMusicDisplay = (props: OpenSheetMusicDisplayProps) => (
  <OSMDComponent {...props} />
)