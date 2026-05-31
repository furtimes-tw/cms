import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { en } from '@payloadcms/translations/languages/en'
import { zhTw } from '@payloadcms/translations/languages/zhTw'

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
    meta: {
      titleSuffix: '- FurTimes CMS',
      description: '獸時報內容管理系統',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: [
        '@/components/admin/FurTimesDashboard',
      ],
    },
  },

  i18n: {
    supportedLocales: {
      en,
      zhTw,
    },
    fallbackLanguage: 'zhTw',
  },

  collections: [Posts, Announcements, Sponsors, Tags, Users, Media],
  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  sharp,
  plugins: [
    s3Storage({
    collections: {
      media: {
        disablePayloadAccessControl: true,
        generateFileURL: ({ filename, prefix }) => {
          const key = prefix ? `${prefix}/${filename}` : filename
          return `${process.env.S3_PUBLIC_URL}/${key}`
        },
      },
    },
    bucket: process.env.S3_BUCKET || '',
    config: {
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION || 'auto',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
      forcePathStyle: true,
    },
  }),
  ],

  cors: allowedDevOrigins,
  csrf: allowedDevOrigins,
 })
