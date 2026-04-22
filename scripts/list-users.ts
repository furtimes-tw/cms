import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })

  const users = await payload.find({
    collection: 'users',
    limit: 50,
    overrideAccess: true,
  })

  console.log(
    users.docs.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      blocked: user.blocked,
    }))
  )

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
