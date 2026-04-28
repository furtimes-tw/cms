import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn, canManageContent } from '../access/role'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: {
    singular: '公告',
    plural: '公告',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pinned', 'publishedAt', 'updatedAt'],
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
      name: 'title',
      label: '公告標題',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: '公開網址用，請使用英文與短橫線，例如：my-announcement',
      },
    },
    {
      name: 'body',
      label: '公告內容',
      type: 'richText',
      required: true,
    },
    {
      name: 'pinned',
      label: '置頂',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'publishedAt',
      label: '發布時間',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  timestamps: true,
}
