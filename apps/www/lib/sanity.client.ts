import { createClient } from 'next-sanity'

interface SanityClientProps {
  projectId: string,
  dataset: string,
  apiVersion: string,
  useCdn: boolean,
}

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false
})