import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn, canManageContent } from '../access/role'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: '媒體',
    plural: '媒體',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'alt',
    group: '內容管理',
  },
  access: {
    admin: isLoggedIn,
    read: () => true,
    create: canManageContent,
    update: canManageContent,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      label: '替代文字',
      type: 'text',
      admin: {
        description: '提供圖片描述，利於無障礙與 SEO。',
      },
    },
  ],
}
