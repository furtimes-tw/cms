import type { Access } from 'payload'

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

export const canManageContent: Access = ({ req: { user } }) => {
  return ['admin', 'editor', 'reporter'].includes(user?.role)
}
