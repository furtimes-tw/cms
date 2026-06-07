import type { CollectionConfig } from 'payload'

import {
  adminFieldOnly,
  adminsOnly,
  isAdminUser,
  isLoggedIn,
  loggedInFieldOnly,
  selfOrAdmin,
} from '../access/role'

type CMSUser = {
  id?: string | number
  role?: 'admin' | 'editor' | 'reporter'
}

export const Users: CollectionConfig = {
  slug: 'users',

  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    forgotPassword: {
      expiration: 15 * 60 * 1000,
    },
  },

  labels: {
    singular: '編輯帳號',
    plural: '編輯帳號',
  },

  admin: {
    useAsTitle: 'username',
    defaultColumns: ['username', 'email', 'role', 'blocked'],
    group: '系統管理',
  },

  access: {
    admin: isLoggedIn,
    read: selfOrAdmin,
    create: adminsOnly,
    update: selfOrAdmin,
    delete: adminsOnly,
    unlock: adminsOnly,
  },

  hooks: {
    beforeLogin: [
      async ({ user }) => {
        if ((user as CMSUser & { blocked?: boolean })?.blocked) {
          throw new Error('此帳號已被停用，請聯絡管理員。')
        }

        return user
      },
    ],

    beforeChange: [
      async ({ data, req }) => {
        if (!isAdminUser(req.user as CMSUser | null)) {
          delete data.role
          delete data.blocked
          delete data.username
          delete data.loginAttempts
          delete data.lockUntil
        }

        return data
      },
    ],
  },

  fields: [
    {
      name: 'username',
      label: '使用者名稱',
      type: 'text',
      required: true,
      unique: true,
      access: {
        create: adminFieldOnly,
        read: loggedInFieldOnly,
        update: adminFieldOnly,
      },
    },
    {
      name: 'role',
      label: '角色',
      type: 'select',
      required: true,
      defaultValue: 'reporter',
      saveToJWT: true,
      options: [
        { label: '管理員', value: 'admin' },
        { label: '編輯', value: 'editor' },
        { label: '記者', value: 'reporter' },
      ],
      access: {
        create: adminFieldOnly,
        read: loggedInFieldOnly,
        update: adminFieldOnly,
      },
    },
    {
      name: 'blocked',
      label: '停用',
      type: 'checkbox',
      defaultValue: false,
      access: {
        create: adminFieldOnly,
        read: loggedInFieldOnly,
        update: adminFieldOnly,
      },
      admin: {
        description: '停用後，該帳號將無法登入後台。',
      },
    },
  ],

  timestamps: true,
}
