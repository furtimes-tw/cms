import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn, canManageContent } from '../access/role'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: '文章',
    plural: '文章',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
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
      label: '標題',
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
        description: '建議使用英文、短橫線格式，例如 pycon-tw-2026。',
      },
    },
    {
      name: 'content',
      label: '內文',
      type: 'richText',
      required: true,
      admin: {
        description: '文章主要內容。',
      },
    },
    {
      name: 'thumbnail',
      label: '縮圖',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: '文章封面或列表縮圖。',
      },
    },
    {
      name: 'category',
      label: '文章分類',
      type: 'select',
      required: true,
      options: [
        { label: '快訊', value: 'Newsflash' },
        { label: '報導', value: 'Report' },
        { label: '贊助', value: 'Sponsor' },
        { label: '專欄', value: 'Column' },
        { label: '專訪', value: 'Interview' },
      ],
      admin: {
        description: '請選擇文章的主要類型。',
      },
    },
    {
      name: 'tags',
      label: '標籤',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        description: '可選多個，用於搜尋與分類輔助。',
      },
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
