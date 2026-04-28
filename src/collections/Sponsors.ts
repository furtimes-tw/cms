import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn, canManageContent } from '../access/role'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  labels: {
    singular: '贊助夥伴',
    plural: '贊助夥伴',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sponsorType', 'class', 'featured', 'updatedAt'],
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
      name: 'sponsorType',
      label: '贊助類型',
      type: 'select',
      required: true,
      defaultValue: 'company',
      options: [
        { label: '公司/組織', value: 'company' },
        { label: '個人', value: 'individual' },
       ],
    },
    {
      name: 'tier',
      label: '贊助級別',
      type: 'select',
      required: true,
      defaultValue: 'supporter',
      options: [
        { label: '主要贊助', value: 'primary' },
        { label: '協力贊助', value: 'secondary' },
        { label: '一般贊助', value: 'standard' },
        { label: '個人贊助', value: 'supporter' },
        { label: '特別贊助', value: 'special' },
      ],
    },
    {
      name: 'featured',
      label: '首頁顯示',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: '勾選後可顯示於首頁贊助區。',
      },
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
    {
      name: 'description',
      label: '簡介',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
