import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn, canManageContent } from '../access/role'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: '標籤',
    plural: '標籤',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
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
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: '建議使用英文、短橫線格式，例如 furry-news。',
      },
    },
  ],
  timestamps: true,
}
