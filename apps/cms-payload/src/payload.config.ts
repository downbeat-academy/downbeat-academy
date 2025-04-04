// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Globals
import { Footer } from '@/globals/Footer'
import { SiteSettings } from '@/globals/SiteSettings'
import { Navigation } from './globals/Navigation'

// Collections
import { Pages } from '@/collections/general-content/Pages'
import { ErrorPages } from './collections/general-content/ErrorPages'
import { Articles } from '@/collections/educational-content/Articles'
import { Categories } from '@/collections/meta/Categories'
import { Difficulties } from '@/collections/meta/Difficulties'
import { Genres } from '@/collections/meta/Genres'
import { Instruments } from '@/collections/meta/Instruments'
import { People } from '@/collections/meta/People'
import { Resources } from '@/collections/educational-content/Resources'
import { Lexicons } from '@/collections/educational-content/Lexicons'
import { Handbooks } from '@/collections/educational-content/Handbooks'
import { Snippets } from '@/collections/educational-content/Snippets'
import { Podcasts } from '@/collections/educational-content/Podcasts'

// Payload Collections
import { Users } from '@/collections/payload-collections/Users'
import { Media } from '@/collections/payload-collections/Media'
import { NotationFiles } from '@/collections/payload-collections/NotationFiles'
import { Lessons } from '@/collections/educational-content/Lessons'
import { Courses } from './collections/educational-content/Courses'
import { Curricula } from './collections/educational-content/Curricula'

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
    ErrorPages,
    Articles,
    Categories,
    Difficulties,
    Genres,
    Instruments,
    People,
    Users,
    Media,
    Resources,
    NotationFiles,
    Lexicons,
    Handbooks,
    Snippets,
    Podcasts,
    Lessons,
    Courses,
    Curricula,
  ],
  globals: [Footer, SiteSettings, Navigation],
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
    // vercelBlobStorage({
    //   enabled: true,
    //   collections: {
    //     media: true,
    //     'notation-files': true,
    //   },
    //   token: process.env.BLOB_READ_WRITE_TOKEN,
    // }),
  ],
})
