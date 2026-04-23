import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '../access/role'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    singular: '編輯帳號',
    plural: '編輯帳號',
  },
  admin: {
    useAsTitle: 'username',
    defaultColumns: ['username', 'email', 'role', 'blocked'],
    group: '系統管理',
  },
  // access: {
  //   admin: isLoggedIn,
  //   read: isLoggedIn,
  //   create: isAdmin,
  //   update: isAdmin,
  //   delete: isAdmin,
  // },
  fields: [
    {
      name: 'username',
      label: '使用者名稱',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      label: '角色',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      saveToJWT: true,
      options: [
        { label: '管理員', value: 'admin' },
        { label: '編輯', value: 'editor' },
        { label: '記者', value: 'reporter' },
      ],
    },
    {
      name: 'blocked',
      label: '停用',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  timestamps: true,
}
