// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Payload Collections
import { Users } from './collections/payload-collections/Users'
import { Media } from './collections/payload-collections/Media'

// General Content
import { Pages } from './collections/general-content/Pages'

// Educational Content
import { Articles } from './collections/educational-content/Articles'

// Meta
import { Categories } from './collections/meta/Categories'
import { Difficulties } from './collections/meta/Difficulties'
import { Genres } from './collections/meta/Genres'
import { Instruments } from './collections/meta/Instruments'
import { People } from './collections/meta/People'

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
    // General Content
    Pages,
    // Educational Content
    Articles,
    // Meta
    Categories,
    Difficulties,
    Genres,
    Instruments,
    People,
    // Payload Collections
    Users,
    Media,
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
