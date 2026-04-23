import type { Access } from 'payload'

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

export const canManageContent: Access = ({ req: { user } }) => {
  const role = user?.role
  return role === 'admin' || role === 'editor' || role === 'reporter'
}
