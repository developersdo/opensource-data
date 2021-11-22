import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import prettyBytes from 'pretty-bytes'
import gzipSize from 'gzip-size'

export const generateIndex = async (): Promise<void> => {
  return new Promise((resolve) => {
    const usersJsonPath = path.join(__dirname, '..', '..', 'docs', 'users.json')
    const usersJsonContents = fs.readFileSync(usersJsonPath).toString()
    const usersJsonFileSize = prettyBytes(usersJsonContents.length)
    const usersJsonFileGzipSize = prettyBytes(gzipSize.sync(usersJsonContents))

    const reposJsonPath = path.join(__dirname, '..', '..', 'docs', 'repos.json')
    const reposJsonContents = fs.readFileSync(reposJsonPath).toString()
    const reposJsonFileSize = prettyBytes(reposJsonContents.length)
    const reposJsonFileGzipSize = prettyBytes(gzipSize.sync(reposJsonContents))

    const templatePath = path.join(__dirname, 'templates', 'index.ejs')
    const templateDest = path.join(__dirname, '..', '..', 'docs', 'index.html')
    const data = {
      title: 'Opensource Data',
      githubLink: 'https://github.com/developersdo/opensource-data',
      dataSources: [
        {
          filename: 'users.json',
          size: usersJsonFileSize,
          gzipSize: usersJsonFileGzipSize,
        },
        {
          filename: 'repos.json',
          size: reposJsonFileSize,
          gzipSize: reposJsonFileGzipSize,
        },
      ],
      lastUpdated: new Date(),
    }

    ejs.renderFile(templatePath, data, (error, rendered) => {
      if (error) throw error
      fs.writeFileSync(templateDest, rendered)
      resolve()
    })
  })
}
