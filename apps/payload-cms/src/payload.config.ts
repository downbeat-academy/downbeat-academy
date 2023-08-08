import { buildConfig } from 'payload/config';
import path from 'path';

import Users from './collections/Users';

// Pages
import Pages from './collections/pages/Pages';

// Educational content
import Articles from './collections/educational-content/Articles';
import Resources from './collections/educational-content/Resources';
import Snippets from './collections/educational-content/Snippets';
import Podcasts from './collections/educational-content/Podcasts';
import Lessons from './collections/educational-content/Lessons';
import Courses from './collections/educational-content/Courses';
import Curricula from './collections/educational-content/Curricula';

// Meta
import { Categories } from './collections/meta/Categories';
import { Banners } from './collections/marketing/Banners';
import { Difficulties } from './collections/meta/Difficulties';
import { Genres } from './collections/meta/Genres';
import { Instruments } from './collections/meta/Instruments';
import { People } from './collections/meta/People'
import { Media } from './collections/meta/Media'

// Globals
import { HeaderNav } from './globals/HeaderNav';
import { Settings } from './globals/Settings';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    // Pages
    Pages,
    // Educational content
    Articles,
    Resources,
    Snippets,
    Podcasts,
    Lessons,
    Courses,
    Curricula,
    // Meta
    Categories,
    Banners,
    Difficulties,
    Genres,
    Instruments,
    People,
    Media,
    // Marketing
  ],
  globals: [
    HeaderNav,
    Settings,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
