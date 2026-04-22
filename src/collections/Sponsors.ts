import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn, canManageContent } from '../access/role'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  labels: {
    singular: '贊助商',
    plural: '贊助商',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
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
      name: 'name',
      label: '名稱',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'link',
      label: '連結',
      type: 'text',
      admin: {
        description: '可填官方網站或活動頁面連結。',
      },
    },
    // {
    //   name: 'tier',
    //   label: '贊助等級',
    //   type: 'select',
    //   required: true,
    //   options: [
    //     { label: '金級', value: 'Gold' },
    //     { label: '銀級', value: 'Silver' },
    //     { label: '銅級', value: 'Bronze' },
    //     { label: '特別', value: 'Special' },
    //   ],
    // },
  ],
  timestamps: true,
}
