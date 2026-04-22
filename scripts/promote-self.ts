import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })

  const targetEmail = process.env.PROMOTE_EMAIL

  if (!targetEmail) {
    throw new Error('Missing PROMOTE_EMAIL in environment variables')
  }

  const users = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: targetEmail,
      },
    },
    limit: 1,
    overrideAccess: true,
  })

  if (!users.docs.length) {
    throw new Error(`No user found with email: ${targetEmail}`)
  }

  const user = users.docs[0]

  const result = await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      role: 'admin',
      blocked: false,
    },
    overrideAccess: true,
  })

  console.log('Promoted user:', {
    id: result.id,
    email: result.email,
    role: result.role,
    blocked: result.blocked,
  })

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
