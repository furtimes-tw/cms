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
    useAsTitle: 'filename',
    group: '內容管理',
  },
  access: {
    admin: isLoggedIn,
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
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
    {
      name: 'caption',
      label: '圖片說明',
      type: 'text',
      admin: {
        description: '顯示在圖片下方的說明文字。',
      },
    },
    {
      name: 'credit',
      label: '圖片來源 / 攝影者',
      type: 'text',
      admin: {
        description: '提供圖片的來源或攝影者資訊，尊重版權並增加內容可信度。',
      },
    },
  ],
}
