// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Globals
import { Footer } from '@/globals/Footer'

// Collections
import { Users } from '@/collections/payload-collections/Users'
import { Media } from '@/collections/payload-collections/Media'
import { Pages } from '@/collections/general-content/Pages'
import { Articles } from '@/collections/educational-content/Articles'
import { Categories } from '@/collections/meta/Categories'
import { Difficulties } from '@/collections/meta/Difficulties'
import { Genres } from '@/collections/meta/Genres'
import { Instruments } from '@/collections/meta/Instruments'
import { People } from '@/collections/meta/People'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Pages,
    Articles,
    Categories,
    Difficulties,
    Genres,
    Instruments,
    People,
    Users,
    Media,
  ],
  globals: [
    Footer,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
