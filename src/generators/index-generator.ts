import fs from 'fs'
import path from 'path'
import ejs from 'ejs'

export const generateIndex = async (): Promise<void> => {
  return new Promise((resolve) => {
    const templatePath = path.join(__dirname, 'templates', 'index.ejs')
    const templateDest = path.join(__dirname, '..', '..', 'docs', 'index.html')
    const data = {
      title: 'Opensource Data',
      githubLink: 'https://github.com/developersdo/opensource-data',
      dataSources: ['users.json'],
      lastUpdated: new Date(),
    }

    ejs.renderFile(templatePath, data, (error, rendered) => {
      if (error) throw error
      fs.writeFileSync(templateDest, rendered)
      resolve()
    })
  })
}
