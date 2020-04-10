import fs from 'fs'
import path from 'path'
import gzipSize from 'gzip-size'
import prettyBytes from 'pretty-bytes'

import { User } from '../db/models/User'

export const generateUsers = async (): Promise<void> => {
  const users = await User.findAll()
  const targetFile = path.join(__dirname, '..', '..', 'docs/users.json')
  const usersJsonText = JSON.stringify(users)
  fs.writeFileSync(targetFile, usersJsonText, { encoding: 'utf8' })
  console.log(`GZip size: ${prettyBytes(await gzipSize(usersJsonText))}`)
}
