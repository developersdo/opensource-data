import fs from 'fs'
import path from 'path'
import gzipSize from 'gzip-size'
import prettyBytes from 'pretty-bytes'

import { Repo } from '../db/models/Repo'

export const generateRepos = async (): Promise<void> => {
  const repos = await Repo.findAll()
  const targetFile = path.join(__dirname, '..', '..', 'docs/repos.json')
  const reposJsonText = JSON.stringify(repos)
  fs.writeFileSync(targetFile, reposJsonText, { encoding: 'utf8' })
  console.log(`GZip size: ${prettyBytes(await gzipSize(reposJsonText))}`)
}
