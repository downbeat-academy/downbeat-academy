import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'

// Collections
import Users from './collections/Users'
import People from './collections/People'
import Categories from './collections/Categories'
import Difficulties from './collections/Difficulties'
import Instruments from './collections/Instruments'
import Articles from './collections/Articles'
import Media from './collections/Media'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // LinkFeature({
      //   // Example showing how to customize the built-in fields
      //   // of the Link feature
      //   fields: [
      //     {
      //       name: 'rel',
      //       label: 'Rel Attribute',
      //       type: 'select',
      //       hasMany: true,
      //       options: ['noopener', 'noreferrer', 'nofollow'],
      //       admin: {
      //         description:
      //           'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
      //       },
      //     },
      //   ],
      // }),
      // UploadFeature({
      //   collections: {
      //     uploads: {
      //       // Example showing how to customize the built-in fields
      //       // of the Upload feature
      //       fields: [
      //         {
      //           name: 'caption',
      //           type: 'richText',
      //           editor: lexicalEditor(),
      //         },
      //       ],
      //     },
      //   },
      // }),
      // This is incredibly powerful. You can re-use your Payload blocks
      // directly in the Lexical editor as follows:
      // BlocksFeature({
      //   blocks: [
      //     Banner,
      //     CallToAction,
      //   ],
      // }),
    ]
  }),
  collections: [
    Users,
    People,
    Categories,
    Difficulties,
    Instruments,
    Articles,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
