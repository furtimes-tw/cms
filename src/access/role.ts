import type { Access, FieldAccess, PayloadRequest } from 'payload'

export type UserRole = 'admin' | 'editor' | 'reporter'

export type PayloadUser = {
  id?: string | number
  role?: UserRole
}

export const isAdminUser = (user?: PayloadUser | null): boolean => {
  return user?.role === 'admin'
}

type BooleanAccess = (args: {
  req: PayloadRequest
}) => boolean | Promise<boolean>

export const isLoggedIn: BooleanAccess = ({ req: { user } }) => {
  return Boolean(user)
}

export const adminsOnly: BooleanAccess = ({ req: { user } }) => {
  return isAdminUser(user as PayloadUser | null)
}

export const isAdmin = adminsOnly

export const canManageContent: BooleanAccess = ({ req: { user } }) => {
  const role = (user as PayloadUser | null)?.role

  return role === 'admin' || role === 'editor' || role === 'reporter'
}

export const selfOrAdmin: Access = ({ req: { user }, id }) => {
  if (!user) return false

  const currentUser = user as PayloadUser

  if (isAdminUser(currentUser)) {
    return true
  }

  if (id) {
    return String(currentUser.id) === String(id)
  }

  return {
    id: {
      equals: currentUser.id,
    },
  }
}

export const adminFieldOnly: FieldAccess = ({ req: { user } }) => {
  return isAdminUser(user as PayloadUser | null)
}

export const loggedInFieldOnly: FieldAccess = ({ req: { user } }) => {
  return Boolean(user)
}
