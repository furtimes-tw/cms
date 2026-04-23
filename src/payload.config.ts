import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Posts } from './collections/Posts'
import { Announcements } from './collections/Announcements'
import { Sponsors } from './collections/Sponsors'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const allowedDevOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://192.168.50.105:3000',
  'http://192.168.50.74:3001',
]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  
  collections: [Posts, Announcements, Sponsors, Tags, Users, Media],
  editor: lexicalEditor(),
  
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
  }),
  
  sharp,
  plugins: [],
  
  cors: allowedDevOrigins,
  csrf: allowedDevOrigins,
 })
